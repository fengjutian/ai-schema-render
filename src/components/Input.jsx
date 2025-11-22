import React from 'react'
import { register } from '../renderer/registry'

function Input({ schema, context }) {
  const name = schema.name || 'input'
  const value = context.getValue(name) || ''

  return (
    <input
      className="w-full p-2 rounded bg-gray-600 text-gray-100 mb-2"
      placeholder={schema.placeholder}
      value={value}
      onChange={(e) => context.setValue(name, e.target.value)}
    />
  )
}

// 示例：注册组件（可选，如果使用全局注册表）
// register('input', Input) // 已移动到 registry.tsx
export default Input
