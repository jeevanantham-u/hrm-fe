import { useEffect, useMemo, useState } from "react";
import { Search, Eye, Pencil } from "lucide-react";

import { listEmployees } from "../api/hrmApi";
import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import "./EmployeesPage.css";
import { useNavigate } from "react-router-dom";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const r = await listEmployees();
      setRows(r.data.data || []);
    })();
  }, []);

  const filltered = useMemo(
    () =>
      rows.filter((e) =>
        `${e.first_name} ${e.last_name} ${e.email} ${e.designation}`.toLowerCase(),
      ),
    [rows],
  );

  const columns = [
    {
      label: "Employee",
      key: "first_name",
      render: (r) => (
        <div className="person-cell">
          <div className="avatar avatar--small">
            {`${r.first_name?.[0] || ""}${r.last_name?.[0] || ""}`}
          </div>
          <div>
            <strong>
              {r.first_name}
              {r.last_name}
            </strong>
            <span>{r.employee_code}</span>
          </div>
        </div>
      ),
    },
    {
      label: "Department",
      key: "department_id",
      render: (r) =>
        ({
          1: "Human Resources",
          2: "Operations",
          3: "Product & Design",
          4: "Finance",
        })[r.department_id] || "Department",
    },
    {
      label: "Designation",
      key: "designation",
    },
    {
      label: "Joining Date",
      key: "joining_date",
    },
    {
      label: "Status",
      key: "status",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      label: "",
      key: "actions",
      render: (r) => (
        <div className="row-actions">
          <button
            className="icon-btn"
            onClick={() => navigate(`/employees/${r.id}`)}
            aria-label="View"
          >
            <Eye size={16} />
          </button>
          <button
            className="icon-btn"
            onClick={() => navigate(`/employees/${r.id}/edit`)}
            aria-label="Edit"
          >
            <Pencil size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section>
      <PageHeader
        title="Employees"
        subtitle={`${rows.length} employee records in your current scope`}
        actionLabel="Add employee"
        actionTo="/employees/new"
      />
      <div className="toolbar-card">
        <div className="employees-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name,email and designation"
          />
        </div>
        <div className="toolbar-summary">
          <span>Showing</span>
          <strong>{rows.length}</strong>
        </div>
      </div>
      <DataTable
        columns={columns}
        rows={filltered}
        empty="No employees match the current search."
      />
    </section>
  );
}
