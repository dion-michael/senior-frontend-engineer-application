import { Button } from '@headlessui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { useMemo } from 'react';
import ChevronUp from './icons/ChevronUp';
import ChevronDown from './icons/ChevronDown';

interface TableProps<T>
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  columns: ColumnDef<T>[];
  data: T[];
  pagination: {
    page: number;
    limit: number;
    nextPage: () => void;
    prevPage: () => void;
    limitOptions?: number[];
    pageCount: number;
  };
  sorting?: SortingState;
  setSorting?: OnChangeFn<SortingState>;
  loading?: boolean;
  onRowDoubleClick?: (data: T) => void;
}

const Table = <T,>({
  columns,
  data,
  pagination,
  sorting,
  loading,
  setSorting,
  onRowDoubleClick,
  ...props
}: TableProps<T>) => {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const table = useReactTable({
    columns: memoizedColumns,
    data: memoizedData,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    state: {
      sorting
    },
    onSortingChange: setSorting
  });

  return (
    <table className={`table-auto ${props.className}`}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                {...{
                  className: header.column.getCanSort()
                    ? 'text-left p-4 border-b text-slate-500b text-lg'
                    : '',
                  onClick: header.column.getToggleSortingHandler()
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {{
                  asc: <ChevronDown className="h-4 w-4 inline-block" />,
                  desc: <ChevronUp className="h-4 w-4 inline-block" />
                }[header.column.getIsSorted() as string] ?? null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {loading ? (
          <tr key="loading" className="bg-white border-b text-slate-500">
            <td
              colSpan={table.getAllColumns().length}
              className="text-center p-4 h-20 italic"
            >
              <span>fetching data...</span>
            </td>
          </tr>
        ) : table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`bg-white hover:bg-slate-50 border-b text-slate-500 ${
                onRowDoubleClick ? 'cursor-pointer' : ''
              }`}
              onDoubleClick={() =>
                onRowDoubleClick && onRowDoubleClick(row.original)
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td className="p-4 text-lg" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr key="not found" className="bg-white border-b text-slate-500">
            <td
              colSpan={table.getAllColumns().length}
              className="text-center p-4 h-20 italic"
            >
              <span>no results found</span>
            </td>
          </tr>
        )}
      </tbody>
      {pagination && (
        <tfoot>
          <tr>
            <td className="p-4" colSpan={table.getAllColumns().length}>
              <div className="flex justify-center items-center">
                <div className="flex-0 sm:flex-grow" />
                <Button
                  disabled={pagination.page === 1}
                  className={
                    pagination.page === 1 ? 'btn-disabled' : 'btn-blue'
                  }
                  onClick={pagination.prevPage}
                >
                  prev
                </Button>
                <span className="mx-2 text-slate-500 italic">{`${pagination.page} of ${pagination.pageCount}`}</span>
                <Button
                  disabled={pagination.page === pagination.pageCount}
                  className={
                    pagination.page === pagination.pageCount
                      ? 'btn-disabled'
                      : 'btn-blue'
                  }
                  onClick={pagination.nextPage}
                >
                  next
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};

export default Table;
