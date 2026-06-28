const Pagination = ({
  currentPage,
  totalPages,
  rowsPerPage,
  setRowsPerPage,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className="page-numbers">

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={
              currentPage === page
                ? "active-page"
                : ""
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      <div className="rows-selector">

        <label>Rows:</label>

        <select
          value={rowsPerPage}
          onChange={(e) =>
            setRowsPerPage(Number(e.target.value))
          }
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

      </div>

    </div>
  );
};

export default Pagination;