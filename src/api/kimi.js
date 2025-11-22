const MOONSHOT_API_KEY = 'sk-0f7kVim0ybokOgdT6z8Da48eqZFoHtryhYMCXgsg3uqJKNRM'
const MOONSHOT_API_URL = 'https://api.moonshot.cn/v1/chat/completions'

export async function generateSchemaFromNaturalText(userText) {
  const systemPrompt = `你是一个把自然语言界面描述转换成界面 Schema 的专业助手。请只返回合法 JSON。`;

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