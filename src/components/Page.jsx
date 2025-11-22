import React from 'react'
import { register } from '../renderer/registry'

function Page({ schema, children }) {
  return (
    <div className="space-y-4">
      {schema.title && <h2 className="text-xl font-bold">{schema.title}</h2>}
      {children}
    </div>
  )
}

register('page', Page)
export default Page