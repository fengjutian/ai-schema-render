import React from 'react';
import Input from '../components/Input'; 
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import Form from '../components/Form';

const registry = new Map();

export function register(type, component) {
  registry.set(type, component);
}

register('form', ({ schema, context, children }) => (
  <Form schema={schema} context={context}>{children}</Form>
));

register('divider', ({ schema }) => (
  <hr className="border-gray-300" />
));

register('flex', ({ schema, context, children }) => (
  <div style={{ display: 'flex', ...schema.props }}>{children}</div>
));

register('grid', ({ schema, context, children }) => (
  <div style={{ display: 'grid', ...schema.props }}>{children}</div>
));

register('pagination', ({ schema, context }) => (
  <Pagination schema={schema} context={context} />
));


register('input-text', ({ schema, context }) => (
  <Input schema={schema} context={context} />
));

register('select', ({ schema, context }) => (
  <select className="border p-2 rounded" {...schema.props}>
    {Array.isArray(schema.options) ? schema.options.map((opt, i) => (
      <option key={i} value={opt.value}>{opt.label}</option>
    )) : []}
  </select>
));


register('table', ({ schema, context }) => (
  <Table schema={schema} context={context} />
));

export function getComponent(type) {
  return registry.get(type) || (() => <div>Unknown: {type}</div>);
}

export function listRegistered() {
  return Array.from(registry.keys());
}
