import { generateSchemaFromNaturalText } from "../api/kimi";
import { useState } from "react";
import Renderer from "../renderer/Renderer";
import { createContextController } from "../context/controller";
import MonacoEditor from 'react-monaco-editor';
import { Drawer, Button } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css'

export function NLToSchema() {
  const [text, setText] = useState("");
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editedSchemaText, setEditedSchemaText] = useState("");
  const [error, setError] = useState(null);
  const context = createContextController({ data: {} });
  const [visible, setVisible] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const s = await generateSchemaFromNaturalText(text);
      setSchema(s);
      setEditedSchemaText(JSON.stringify(s, null, 2));
    } finally {
      setVisible(true);
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

      <Button
        onClick={() => setVisible(true)}
 
      >
        查看 Schema
      </Button>

      <Drawer
        width={882}
        title={<span>Schema 查看</span>}
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div className="w-full  rounded flex flex-col">
          <h3 className="text-lg font-bold mb-2">生成的 Schema 预览：</h3>
          <div className="min-h-98 overflow-auto">
            <MonacoEditor
              className="w-full h-full min-h-98"
              language="json"
              theme="vs-dark"
              value={editedSchemaText}
              onChange={(value) => setEditedSchemaText(value || "")}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                formatOnType: true,
                formatOnPaste: true,
                tabSize: 2,
                fontSize: 14,
                lineNumbers: 'on',
                automaticLayout: true,
                wordWrap: 'on',
              }}
              height="450px"
            />
          </div>
          <button
            onClick={applyChanges}
            className="px-4 py-2 bg-green-500 text-black rounded mt-2"
          >
            应用修改并重新渲染
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </Drawer>

      {schema && (
        <>
          <div className="border border-gray-700 p-4 rounded mt-4">
            <Renderer schema={schema} context={context} />
          </div>
        </>
      )}
    </div>
  );
}
