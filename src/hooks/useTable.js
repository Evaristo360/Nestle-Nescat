import { useState } from 'react';

const useTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return {
    onChangePage: (page) => setPage(page),
    onChangePageSize: (pageSize) => setPageSize(pageSize),
    page,
    pageSize
  };
};

export default useTable;
