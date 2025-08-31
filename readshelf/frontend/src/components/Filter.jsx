import React from 'react';

const Filter = ({ currentFilter, onFilterChange, bookCounts }) => {
  const filters = [
    { key: 'all', label: 'All Books', count: bookCounts.total },
    { key: 'unread', label: 'Unread', count: bookCounts.unread },
    { key: 'read', label: 'Read', count: bookCounts.read }
  ];

  return (
    <div className="filter-container">
      <h3>Filter Books</h3>
      <div className="filter-options">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            <span className="filter-label">{filter.label}</span>
            <span className="filter-count">({filter.count})</span>
          </button>
        ))}
      </div>
      
      <div className="filter-stats">
        <div className="stat-item">
          <span className="stat-label">Total Books:</span>
          <span className="stat-value">{bookCounts.total}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Progress:</span>
          <span className="stat-value">
            {bookCounts.total > 0 
              ? `${Math.round((bookCounts.read / bookCounts.total) * 100)}%`
              : '0%'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
