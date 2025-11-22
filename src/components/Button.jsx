import React from 'react'
import { register } from '../renderer/registry'

function Button({ schema, context }) {
  const onClick = () => {
    if (schema.action === 'search') {
      const q = context.getValue('keyword')
      const all = context.resolve('$data.users')
      const filtered = all.filter(u => u.name.toLowerCase().includes((q||'').toLowerCase()))
      context.setData('users', filtered)
    }
  }

  return (
    <button
      className="px-4 py-2 rounded bg-yellow-400 text-black font-medium"
      onClick={onClick}
    >
      {schema.text || 'Button'}
    </button>
  )
}

register('button', Button)
export default Button
