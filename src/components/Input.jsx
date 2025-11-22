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

register('input', Input)
export default Input
