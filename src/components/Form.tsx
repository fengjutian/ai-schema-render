import React from 'react';
import { Form as ArcoForm } from '@arco-design/web-react';

const Form = ({ schema, context, children }) => {
  const { layout = 'horizontal', ...formProps } = schema.props || {};

  const handleSubmit = (values) => {
    // 示例提交逻辑：可以更新 context 或调用 API
    console.log('Form submitted:', values);
    if (context && context.setData) {
      context.setData(values);
    }
  };

  return (
    <ArcoForm
      layout={layout}
      onSubmit={handleSubmit}
      className="space-y-4"
      {...formProps}
    >
      {children}
    </ArcoForm>
  );
};

export default Form;
