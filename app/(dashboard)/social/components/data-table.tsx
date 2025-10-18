"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className="
        rounded-md border border-gray-200 dark:border-gray-800 
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        shadow-sm transition-colors duration-300
      "
    >
      <Table>
        {/* ---------- Table Header ---------- */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="
                bg-gray-50 dark:bg-gray-800/70 
                border-b border-gray-200 dark:border-gray-700
              "
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="
                    font-semibold text-gray-700 dark:text-gray-200
                    px-4 py-3 text-left uppercase tracking-wider
                    transition-colors duration-300
                  "
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* ---------- Table Body ---------- */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="
                  border-b border-gray-200 dark:border-gray-800
                  hover:bg-gray-100 dark:hover:bg-gray-800/60
                  transition-colors duration-200
                "
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="
                      px-4 py-3 text-gray-800 dark:text-gray-300
                      transition-colors duration-300
                    "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="
                  h-24 text-center text-gray-600 dark:text-gray-400
                  transition-colors duration-300
                "
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
