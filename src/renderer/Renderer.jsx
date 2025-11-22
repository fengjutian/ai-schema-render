import React from 'react'
import { getComponent } from '@/renderer/registry'

export default function Renderer({ schema, context }) {
  if (!schema) return null

  if (Array.isArray(schema)) {
    return <>{schema.map((s, i) => <Renderer key={i} schema={s} context={context} />)}</>
  }

  const Comp = getComponent(schema.type)
  if (!Comp) return <div className="text-red-400">Unknown component: {schema.type}</div>

  console.log('schema', schema)

  // const children = schema.body ? <Renderer schema={schema.body} context={context} /> : null

  const childrenSchema = schema.children || schema.body || schema.items;
  const children = childrenSchema ? <Renderer schema={childrenSchema} context={context} /> : null;
  
  console.log('children', children)

  return <Comp schema={schema} context={context}>{children}</Comp>
}
