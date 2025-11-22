import React from 'react'

function Table({ schema, context }) {
  const data = context.resolve(schema.data || '$data.users') || []
  const title = schema.title || ''
  const emptyMessage = schema.emptyMessage || '暂无数据'
  const striped = schema.striped || false

  return (
    <div className="overflow-x-auto mt-4">
      {title && <h4 className="text-lg font-bold mb-2">{title}</h4>}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="text-left text-sm text-gray-300">
            {schema.columns.map(col => (
              <th key={col.field} className="px-3 py-2">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={schema.columns.length} className="px-3 py-2 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={row.id || i} className={`border-t border-gray-700 ${striped && i % 2 === 0 ? 'bg-gray-800' : ''}`}>
                {schema.columns.map(col => (
                  <td key={col.field} className="px-3 py-2">{row[col.field]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

// 已移除本地注册，请确保在 registry.tsx 中注册
export default Table
