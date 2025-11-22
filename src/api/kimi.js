export async function generateSchemaFromNaturalText(userText) {
  const systemPrompt = `你是一个把自然语言界面描述转换成界面 Schema 的专业助手。请只返回合法 JSON。`;

  const res = await fetch("/api/kimi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userText, systemPrompt })
  });

  const data = await res.json();
  return JSON.parse(data.output.replace(/```json|```/g, ""));
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
      model: "moonshot-v1-32k",
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