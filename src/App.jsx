import React, { useState } from 'react'
import Renderer from './renderer/Renderer'
import defaultSchema from './schemas/demo.json'
import { createContextController } from './context/controller'
import './components/Page'
import './components/Card'
import './components/Table'
import './components/Input'
import './components/Button'
import { NLToSchema } from './renderer/NLToSchema'


export default function App() {
  const [schema, setSchema] = useState(defaultSchema)
  const context = createContextController({
    data: { users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] }
  })

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">AI Schema 生成器</h1>
          </div>
        </header>

        <div className="p-1">
          <NLToSchema />
        </div>

        {/* <main className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <Renderer schema={schema} context={context} />
        </main> */}

      </div>
    </div>
  )
}
