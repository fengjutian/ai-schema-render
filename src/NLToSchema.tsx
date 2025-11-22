import { generateSchemaFromNaturalText } from "./api/kimi";
import { useState } from "react";
import Renderer from "./renderer/Renderer";
import { createContextController } from "./context/controller";

export function NLToSchema() {
  const [text, setText] = useState("");
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editedSchemaText, setEditedSchemaText] = useState("");
  const [error, setError] = useState(null);
  const context = createContextController({ data: {} }); // 创建 context（如果需要，添加初始数据）

  const run = async () => {
    setLoading(true);
    try {
      const s = await generateSchemaFromNaturalText(text);
      setSchema(s);
      setEditedSchemaText(JSON.stringify(s, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const applyChanges = () => {
    try {
      const newSchema = JSON.parse(editedSchemaText);
      setSchema(newSchema);
      setError(null);
    } catch (e) {
      setError("JSON 解析错误: " + e.message);
    }
  };

  return (
    <div className="space-y-4 bg-gray-900 text-gray-100 rounded-lg">
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

      {/* 添加生成的 Schema 预览 */}
      <h3 className="text-lg font-bold">生成的 Schema 预览：</h3>

      {schema && (
        <>
          <textarea
            className="w-full h-48 p-3 rounded bg-gray-800 text-gray-100 font-mono text-sm"
            value={editedSchemaText}
            onChange={(e) => setEditedSchemaText(e.target.value)}
          />

          <button
            onClick={applyChanges}
            className="px-4 py-2 bg-green-500 text-black rounded mt-2"
          >
            应用修改并重新渲染
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="border border-gray-700 p-4 rounded mt-4">
            <Renderer schema={schema} context={context} />
          </div>
        </>
      )}
    </div>
  );
}