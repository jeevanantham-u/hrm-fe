import { ReactNode } from "react";
import "./DataTable.css";

type Column = {
  label: string;
  key: string;
  render?: (row: any) => ReactNode;
};

type DataTableProps = {
  columns: Column[];
  rows?: any[];
  rowKey?: string;
  empty?: string;
};
export default function DataTable({
  columns,
  rows,
  rowKey = "id",
  empty = "No records found.",
}: DataTableProps) {
  return (
    <div className="table-shell">
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <>
              {rows?.length ? (
                rows.map((row) => (
                  <tr key={row[rowKey]} className="gsap-stagger">
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="table-empty">
                    {empty}
                  </td>
                </tr>
              )}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
}
