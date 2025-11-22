import React from 'react';
import { Input as ArcoInput } from '@arco-design/web-react';

const Input = ({ schema, context }) => {
  const name = schema.name || 'input';
  const value = context.getValue(name) || '';

  const handleChange = (value) => {
    context.setValue(name, value);
  };

  const { placeholder, ...inputProps } = schema.props || {};

  return (
    <ArcoInput
      placeholder={schema.placeholder || placeholder}
      value={value}
      onChange={handleChange}
      className="w-full mb-2" // 保留基本样式，移除特定颜色以匹配 Arco 主题
      {...inputProps}
    />
  );
};

export default Input;
