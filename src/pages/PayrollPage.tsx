import { useEffect, useState } from "react";
import { Plus, WalletCards } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import Modal from "../components/common/Modal";
import FormField from "../components/common/FormField";
import { generatePayroll, getMonthPayroll } from "../api/hrmApi";
import { hasPermission } from "../utils/permissions";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { showToast } from "../features/ui/uiSlice";
import "./PayrollPage.css";

export default function PayrollPage() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const [month, setMonth] = useState("2026-09");
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    employee_id: 1,
    basic_salary: 72000,
    allowances: 9000,
    deductions: 4200,
  });
  const canManage = hasPermission(user, "payroll.manage");
  useEffect(() => {
    getMonthPayroll(month).then((r) => setRows(r.data.data || []));
  }, [month]);
  async function submit(e) {
    e.preventDefault();
    try {
      const r = await generatePayroll({
        ...form,
        employee_id: Number(form.employee_id),
        basic_salary: Number(form.basic_salary),
        allowances: Number(form.allowances),
        deductions: Number(form.deductions),
        month,
      });
      dispatch(showToast({ type: "success", message: r.data.message }));
      setOpen(false);
    } catch (e) {
      dispatch(showToast({ type: "error", message: e.message }));
    }
  }
  const columns = [
    { label: "Employee", key: "employee_id" },
    { label: "Month", key: "month" },
    {
      label: "Basic",
      key: "basic_salary",
      render: (r) => `₹${Number(r.basic_salary).toLocaleString("en-IN")}`,
    },
    {
      label: "Allowances",
      key: "allowances",
      render: (r) => `₹${Number(r.allowances).toLocaleString("en-IN")}`,
    },
    {
      label: "Deductions",
      key: "deductions",
      render: (r) => `₹${Number(r.deductions).toLocaleString("en-IN")}`,
    },
    {
      label: "Net salary",
      key: "net_salary",
      render: (r) => (
        <strong className="net-salary">
          ₹{Number(r.net_salary).toLocaleString("en-IN")}
        </strong>
      ),
    },
    {
      label: "Status",
      key: "status",
      render: (r) => <StatusBadge status={r.status} />,
    },
  ];
  return (
    <div className="payroll-page gsap-page">
      <PageHeader
        title="Payroll"
        subtitle="Review monthly payroll and generate paysheet entries."
      />
      <div className="payroll-toolbar">
        <div className="month-select">
          <label>Payroll month</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div className="payroll-summary">
          <div>
            <WalletCards size={16} />
            <span>Total net</span>
            <strong>
              ₹
              {rows
                .reduce((sum, r) => sum + Number(r.net_salary || 0), 0)
                .toLocaleString("en-IN")}
            </strong>
          </div>
          <div>
            <span>Employees processed</span>
            <strong>{rows.length}</strong>
          </div>
        </div>
        {canManage ? (
          <button className="btn btn-primary" onClick={() => setOpen(true)}>
            <Plus size={15} /> Generate
          </button>
        ) : null}
      </div>
      <DataTable columns={columns} rows={rows} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Generate payroll"
      >
        <form className="payroll-form" onSubmit={submit}>
          <FormField label="Employee" required>
            <select
              value={form.employee_id}
              onChange={(e) =>
                setForm({ ...form, employee_id: Number(e.target.value) })
              }
            >
              <option value="1">Arun Kumar</option>
              <option value="2">Divya Raman</option>
              <option value="3">Naveen Raj</option>
              <option value="4">Priya Shankar</option>
            </select>
          </FormField>
          <FormField label="Basic salary" required>
            <input
              type="number"
              value={form.basic_salary}
              onChange={(e) =>
                setForm({ ...form, basic_salary: Number(e.target.value) })
              }
            />
          </FormField>
          <FormField label="Allowances">
            <input
              type="number"
              value={form.allowances}
              onChange={(e) =>
                setForm({ ...form, allowances: Number(e.target.value) })
              }
            />
          </FormField>
          <FormField label="Deductions">
            <input
              type="number"
              value={form.deductions}
              onChange={(e) =>
                setForm({ ...form, deductions: Number(e.target.value) })
              }
            />
          </FormField>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary">Generate payroll</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
