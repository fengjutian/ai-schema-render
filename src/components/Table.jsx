import React from 'react'
import { register } from '../renderer/registry'

function Table({ schema, context }) {
  const data = context.resolve(schema.data || '$data.users') || []

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="text-left text-sm text-gray-300">
            {schema.columns.map(col => (
              <th key={col.field} className="px-3 py-2">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-gray-700">
              {schema.columns.map(col => (
                <td key={col.field} className="px-3 py-2">{row[col.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

register('table', Table)
export default Table
