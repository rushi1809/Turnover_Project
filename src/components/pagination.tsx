import React, { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }:any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page:any) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageButtons = () => {
    const buttons = [];
  
    buttons.push(
      <button
        key="start"
        className="text-gray-500 mr-2 hover:text-gray-600"
        onClick={() => handlePageChange(1)}
      >
        {'<<'}
      </button>
    );
  
    buttons.push(
      <button
        key="previous"
        className="text-gray-500 mr-2 hover:text-gray-600"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
      >
        {'<'}
      </button>
    );
  
    const maxPagesToShow = 5; 
    const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow + 1));
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  
    if (startPage > 1) {
      buttons.push(
        <button key="ellipsis-start" className="text-gray-500 mr-2" disabled>
          {'...'}
        </button>
      );
    }
  
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`mr-2 ${currentPage === i ? 'text-black-500 font-bold' : 'text-gray-500'}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
  
    if (endPage < totalPages) {
      buttons.push(
        <button key="ellipsis-end" className="text-gray-500 mr-2" disabled>
          {'...'}
        </button>
      );
    }
  
    buttons.push(
      <button
        key="next"
        className="text-gray-500 mr-2 hover:text-gray-600"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
      >
        {'>'}
      </button>
    );
  
    buttons.push(
      <button
        key="end"
        className="text-gray-500 mr-2 hover:text-gray-600"
        onClick={() => handlePageChange(totalPages)}
      >
        {'>>'}
      </button>
    );
  
    return buttons;
  };
  

  return (
    <nav className="flex justify-center">
      <ul className="flex space-x-2">{renderPageButtons()}</ul>
    </nav>
  );
};

export default Pagination;
