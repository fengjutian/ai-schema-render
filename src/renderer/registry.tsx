import React from 'react';
import Input from '../components/Input'; // 假设 Input.jsx 对应 input-text

const registry = new Map();

export function register(type, component) {
  registry.set(type, component);
}

// 注册内置组件（假设这些是简单的占位实现；实际中请替换为自定义组件）
register('form', ({ schema, context, children }) => (
  <form className="space-y-4">{children}</form>
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
  <div className="pagination">Pagination: {schema.props?.total || 0} items</div>
));

// 您可以在这里添加更多组件注册，例如从 components/ 导入
register('input-text', ({ schema, context }) => (
  <Input {...schema.props} />
));

register('select', ({ schema, context }) => (
  <select className="border p-2 rounded" {...schema.props}>
    {schema.options?.map((opt, i) => (
      <option key={i} value={opt.value}>{opt.label}</option>
    ))}
  </select>
));

// import Button from '../components/Button';
// register('button', Button);

export function getComponent(type) {
  return registry.get(type) || (() => <div>Unknown: {type}</div>);
}

export function listRegistered() {
  return Array.from(registry.keys());
}
