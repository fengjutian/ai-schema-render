import React from 'react';
import { Pagination as ArcoPagination } from '@arco-design/web-react';

const Pagination = ({ schema, context }) => {
  // const { total = 0, pageSize = 10, current = 1 } = schema.props || {};
  const { total = 0, pageSize = 10, current = 1, size = 'default', simple = false, ...paginationProps } = schema.props || {};

  const handlePageChange = (page) => {
    // 这里可以添加分页逻辑，例如更新 context 中的数据
    console.log(`Page changed to ${page}`);
    // 示例：更新 context
    // context.setData({ ...context.data, currentPage: page });
    if (context && context.setData) {
      // 更新当前页
      context.setData({ ...context.data, currentPage: page });
      // 示例：分页数据（假设 context.data.tableData 是完整数组）
      const allData = context.data.tableData || [];
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const displayedData = allData.slice(start, end);
      context.setData({ ...context.data, displayedTableData: displayedData });
    }

  };

  return (
    <div className="flex justify-center mt-4">
      <ArcoPagination
        total={total}
        pageSize={pageSize}
        current={current}
        onChange={handlePageChange}
        showTotal={(total) => `总计 ${total} 项`}
        size={size}
        simple={total <= pageSize ? true : simple}
        {...paginationProps}
      />
    </div>
  );
};

export default Pagination;
