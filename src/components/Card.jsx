import React from 'react'
import { register } from '../renderer/registry'

function Card({ schema, children }) {
  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-4">
      {schema.header && <div className="text-lg font-medium mb-2">{schema.header}</div>}
      <div>{children}</div>
    </div>
  )
}

register('card', Card)
export default Card
