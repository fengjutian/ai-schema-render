import React from 'react'
import { Button as ArcoButton } from '@arco-design/web-react';

function Button({ schema, context }) {
  const onClick = () => {
        if (!context) return; // 防止 context 未定义

    switch (schema.action) {
      case 'search':
        const q = context.getValue('keyword') || ''; // 支持 schema 中的搜索字段
        const all = context.resolve('$data.users') || []; // 假设数据路径
        const filtered = all.filter(u => u.name?.toLowerCase().includes(q.toLowerCase()));
        context.setData('users', filtered);
        break;
      case 'reset':
        context.setData('users', context.resolve('$data.users') || []); // 重置到原始数据
        context.setValue('keyword', ''); // 清空搜索字段
        break;
      default:
        console.log(`Unhandled action: ${schema.action}`);
        break;
     }
   }

     const { type = 'primary', disabled = false, ...buttonProps } = schema.props || {};

  return (
    <ArcoButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="ml-2" // 添加间距以适应 flex 布局
      {...buttonProps}
    >
      {schema.text || 'Button'}
    </ArcoButton>
  );
 

  }

// register('button', Button)
export default Button
