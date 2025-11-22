const MOONSHOT_API_KEY = 'sk-0f7kVim0ybokOgdT6z8Da48eqZFoHtryhYMCXgsg3uqJKNRM'
const MOONSHOT_API_URL = 'https://api.moonshot.cn/v1/chat/completions'
const PROMPT = `
  你是一个把自然语言界面描述转换成界面 Schema 的专业助手。
  Schema 必须是合法的 JSON 对象，根组件类型为 "page"。
  仅使用以下注册组件类型：form, divider, flex, grid, pagination, input-text, select, button, card, page, table。
  组件格式示例（参考此结构生成类似 Schema）：
  {
    "type": "page",
    "title": "页面标题",
    "body": [
      {
        "type": "card",
        "header": "卡片头部",
        "body": [
          { "type": "input-text", "name": "keyword", "placeholder": "输入关键字" },
          { "type": "button", "text": "搜索", "action": "search" }
        ]
      },
      {
        "type": "table",
        "columns": [
          { "label": "ID", "field": "id" },
          { "label": "名字", "field": "name" }
        ],
        "data": "$data.users"
      }
    ]
  }
  注意：使用 "body" 作为子组件数组；属性如 "title", "header", "columns" 等直接放置在对象中；对于输入使用 "input-text" 类型。
  请严格遵守此格式，只返回合法 JSON，不要添加任何额外文本或解释。`;

export async function generateSchemaFromNaturalText(userText) {
  const systemPrompt = PROMPT

  const moonshotKey = MOONSHOT_API_KEY;

  const res = await fetch(MOONSHOT_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${moonshotKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "kimi-k2-thinking-turbo",
      temperature: 0,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userText }
      ]
    })
  });

  const data = await res.json();

  console.log(123, data)

  if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
    throw new Error('Invalid API response format');
  }

  const content = data.choices[0].message.content.replace(/```json|```/g, "").trim();
  return JSON.parse(content);
}

export async function onRequest({ request }) {
  const { userText, systemPrompt } = await request.json();
  const moonshotKey = process.env.MOONSHOT_API_KEY;

  const resp = await fetch("https://api.moonshot.cn/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${moonshotKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "kimi-k2-thinking-turbo",
      temperature: 0,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userText }
      ]
    })
  });

  const json = await resp.json();
  return new Response(JSON.stringify({ output: json.choices[0].message.content }), {
    headers: { "Content-Type": "application/json" }
  });
}