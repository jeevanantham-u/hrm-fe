import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";

import { showToast } from "../features/ui/uiSlice";
import FormField from "../components/common/FormField";
import { getEmployee, createEmployee, updateEmployee } from "../api/hrmApi";
import PageHeader from "../components/common/PageHeader";
import "./EmployeeFormPage.css";

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "Male",
  joining_date: "",
  department_id: "",
  designation: "",
  manager_id: "1",
  salary: "",
  address: "",
  employee_code: "",
  create_account: true,
  username: "",
  account_email: "",
  password: "",
  role_id: "5",
  status: "Active",
};

export default function EmployeeFormPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const editing = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(editing);

  useEffect(() => {
    if (!editing) return;
    getEmployee(id)
      .then((response) =>
        setForm((current) => ({
          ...current,
          ...response.data.data,
          create_account: false,
        })),
      )
      .catch((error) =>
        dispatch(showToast({ type: "error", message: error.message })),
      )
      .finally(() => setLoading(false));
  }, [dispatch, editing, id]);

  const set = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const payload = {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          dob: form.dob,
          gender: form.gender,
          joining_date: form.joining_date,
          department_id: Number(form.department_id),
          designation: form.designation,
          manager_id: Number(form.manager_id),
          salary: Number(form.salary),
          address: form.address,
          status: form.status,
        };

        const response = await updateEmployee(id, payload);

        dispatch(
          showToast({
            type: "success",
            message: response.data.message || "Employee updated successfully",
          }),
        );
      } else {
        const payload = {
          ...form,
          department_id: Number(form.department_id),
          manager_id: Number(form.manager_id),
          salary: Number(form.salary),
        };

        if (form.create_account) {
          payload.role_id = String(Number(form.role_id));
          payload.account_email = form.account_email || form.email;
        } else {
          delete payload.username;
          delete payload.password;
          delete payload.role_id;
          delete payload.account_email;
        }

        delete payload.create_account;

        const response = await createEmployee(payload);

        dispatch(
          showToast({
            type: "success",
            message: response.data.message || "Employee created successfully",
          }),
        );
      }
      navigate("/employees");
    } catch (error) {
      dispatch(showToast({ type: "error", message: error.message }));
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return <div className="loading-panel">Loading employee profile…</div>;

  return (
    <div className="employee-form-page gsap-page">
      <PageHeader
        title={editing ? "Edit employee" : "Add employee"}
        subtitle={
          editing
            ? "Update the employee profile without changing login access."
            : "Create the employee profile and optionally provision a login account."
        }
        back
      />
      <form onSubmit={submit} className="form-layout">
        <section className="form-card">
          <div className="form-card__head">
            <div>
              <h2>Employee details</h2>
              <p>These fields map directly to the employee resource.</p>
            </div>
            {editing ? <span className="edit-chip">EMP-{id}</span> : null}
          </div>
          <div className="form-grid">
            <FormField label="First name" required>
              <input
                value={form.first_name}
                onChange={(e) => set("first_name", e.target.value)}
                required
              />
            </FormField>
            <FormField label="Last name" required>
              <input
                value={form.last_name}
                onChange={(e) => set("last_name", e.target.value)}
                required
              />
            </FormField>
            <FormField label="Work email" required>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                required
              />
            </FormField>
            <FormField label="Phone" required>
              <input
                value={form.phone || ""}
                onChange={(e) => set("phone", e.target.value)}
                required
              />
            </FormField>
            <FormField label="Date of birth" required>
              <input
                type="date"
                value={form.dob || ""}
                onChange={(e) => set("dob", e.target.value)}
                required
              />
            </FormField>
            <FormField label="Gender" required>
              <select
                value={form.gender || "Male"}
                onChange={(e) => set("gender", e.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </FormField>
            <FormField label="Joining date" required>
              <input
                type="date"
                value={form.joining_date || ""}
                onChange={(e) => set("joining_date", e.target.value)}
                required
              />
            </FormField>
            <FormField label="Department" required>
              <select
                value={form.department_id || ""}
                onChange={(e) => set("department_id", e.target.value)}
                required
              >
                <option value="">Select department</option>
                <option value="1">Human Resources</option>
                <option value="2">Operations</option>
                <option value="3">Product & Design</option>
                <option value="4">Finance</option>
              </select>
            </FormField>
            <FormField label="Designation" required>
              <input
                value={form.designation || ""}
                onChange={(e) => set("designation", e.target.value)}
                required
              />
            </FormField>
            <FormField label="Manager" required>
              <select
                value={form.manager_id || "1"}
                onChange={(e) => set("manager_id", e.target.value)}
              >
                <option value="1">Arun Kumar</option>
                <option value="2">Divya Raman</option>
                <option value="4">Priya Shankar</option>
              </select>
            </FormField>
            <FormField label="Monthly salary" required>
              <input
                type="number"
                value={form.salary || ""}
                onChange={(e) => set("salary", e.target.value)}
                required
              />
            </FormField>
            <FormField label="Employee code">
              <input
                value={form.employee_code || ""}
                onChange={(e) => set("employee_code", e.target.value)}
                placeholder="Auto-generated when empty"
                disabled={editing}
              />
            </FormField>
            {editing ? (
              <FormField label="Status">
                <select
                  value={form.status || "Active"}
                  onChange={(e) => set("status", e.target.value)}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>On Leave</option>
                </select>
              </FormField>
            ) : null}
            <div className="form-field-full">
              <FormField label="Address" required>
                <textarea
                  value={form.address || ""}
                  onChange={(e) => set("address", e.target.value)}
                  required
                />
              </FormField>
            </div>
          </div>
        </section>
        {!editing ? (
          <section className="form-card form-card--account">
            <div className="form-card__head">
              <div>
                <h2>Login account</h2>
                <p>
                  Provision a user account and assign the backend role ID in the
                  same flow.
                </p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={form.create_account}
                  onChange={(e) => set("create_account", e.target.checked)}
                />
                <span></span>
              </label>
            </div>
            {form.create_account ? (
              <div className="form-grid">
                <FormField label="Username" required>
                  <input
                    value={form.username}
                    onChange={(e) => set("username", e.target.value)}
                    required
                  />
                </FormField>
                <FormField label="Account email">
                  <input
                    type="email"
                    value={form.account_email}
                    onChange={(e) => set("account_email", e.target.value)}
                    placeholder="Defaults to work email"
                  />
                </FormField>
                <FormField
                  label="Temporary password"
                  required
                  hint="Minimum 8 characters"
                >
                  <input
                    type="password"
                    minLength={8}
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    required
                  />
                </FormField>
                <FormField label="Role" required>
                  <select
                    value={form.role_id}
                    onChange={(e) => set("role_id", e.target.value)}
                  >
                    <option value="1">1 — Super Admin</option>
                    <option value="2">2 — HR</option>
                    <option value="3">3 — HOD</option>
                    <option value="4">4 — Supervisor</option>
                    <option value="5">5 — Employee</option>
                  </select>
                </FormField>
              </div>
            ) : (
              <div className="account-disabled">
                This employee will be created without a login account. You can
                provision one later from the protected user-account workflow.
              </div>
            )}
            <div className="form-actions">
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : "Create employee"}
              </button>
            </div>
          </section>
        ) : (
          <section className="form-card form-card--account edit-note">
            <div className="form-card__head">
              <div>
                <h2>Account access</h2>
                <p>
                  Role, employee linkage and active state remain under
                  user-management permissions.
                </p>
              </div>
            </div>
            <div className="account-disabled">
              Profile editing intentionally avoids changing <code>role_id</code>
              , <code>employee_id</code> or password credentials. Use Users /
              Roles & Permissions for account access changes.
            </div>
            <div className="form-actions">
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : "Save employee"}
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
}
