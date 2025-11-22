import { generateSchemaFromNaturalText } from "./api/kimi";
import { useState } from "react";
import Renderer from "./renderer/Renderer";
import { createContextController } from "./context/controller";


export function NLToSchema() {
const [text, setText] = useState("");
const [schema, setSchema] = useState(null);
const [loading, setLoading] = useState(false);
const context = createContextController({ data: {} });  // 创建 context（如果需要，添加初始数据）


const run = async () => {
setLoading(true);
try {
const s = await generateSchemaFromNaturalText(text);
setSchema(s);
} finally {
setLoading(false);
}
};


return (
<div className="space-y-4 p-6 bg-gray-900 text-gray-100 rounded-lg">
<h2 className="text-xl font-bold">自然语言 → Schema</h2>


<textarea
className="w-full h-32 p-3 rounded bg-gray-800"
placeholder="例如：一个带搜索的商品列表，包含图片、标题、价格"
value={text}
onChange={(e) => setText(e.target.value)}
/>


<button
onClick={run}
className="px-4 py-2 bg-yellow-500 text-black rounded disabled:opacity-50"
disabled={loading}
>
{loading ? "生成中..." : "生成 Schema"}
</button>


{schema && (
<div className="border border-gray-700 p-4 rounded">
<Renderer schema={schema} context={context} />
</div>
)}
</div>
);
}