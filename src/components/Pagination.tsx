import React from 'react';
import { Pagination as ArcoPagination } from '@arco-design/web-react';

const Pagination = ({ schema, context }) => {
  const { total = 0, pageSize = 10, current = 1 } = schema.props || {};

  const handlePageChange = (page) => {
    // 这里可以添加分页逻辑，例如更新 context 中的数据
    console.log(`Page changed to ${page}`);
    // 示例：更新 context
    context.setData({ ...context.data, currentPage: page });
  };

  return (
    <div className="flex justify-center mt-4">
      <ArcoPagination
        total={total}
        pageSize={pageSize}
        current={current}
        onChange={handlePageChange}
        showTotal={(total) => `总计 ${total} 项`}
      />
    </div>
  );
};

export default Pagination;
