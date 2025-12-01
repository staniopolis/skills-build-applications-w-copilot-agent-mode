import React from 'react';

function renderCell(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

const JsonTable = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="p-3 muted">No items to display</div>;
  }

  // determine columns from first item (union with other items is possible, but simple approach)
  const cols = Object.keys(data.reduce((acc, cur) => ({ ...acc, ...cur }), {}));

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            {cols.map(col => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {cols.map(col => (
                <td key={col}>{renderCell(row[col])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JsonTable;
