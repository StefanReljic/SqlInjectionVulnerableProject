import React from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import './styles/custom_table.css';

export default function CustomTable(props) {
  return (
    <div>
      <ReactTable
        data={props.data}
        columns={props.actions.concat(getColumns(props))}
        manual
        page={props.pageNumber}
        pages={props.totalPages}
        defaultPageSize={props.defaultPageSize}
        onPageChange={props.onPageChange}
        showPageSizeOptions={false}
        className="-striped"
      ></ReactTable>
    </div>
  );
}

function getColumns(props) {
  return props.columns.map((column, index) => {
    return {
      Header: createTableHeader(column.header),
      id: column.id,
      accessor: row => row[column.id]
      /*width:
        props.calculateWidth &&
        getColumnWidth(props.data, column.id, column.header),*/
    };
  });
}

export function createTableHeader(header) {
  return (
    <div>
      <b>{header}</b>
    </div>
  );
}

export function createTableCell(value) {
  return <div style={{ textAlign: 'center' }}>{value}</div>;
}

export function getColumnWidth(rows, accessor, headerText) {
  if (rows.length === 0) return 210;
  const maxWidth = 400;
  const magicSpacing = 10;
  const cellLength = Math.max(
    ...rows.map(row => (`${row[accessor]}` || '').length),
    headerText.length
  );
  return Math.min(maxWidth, cellLength * magicSpacing + 200);
}
