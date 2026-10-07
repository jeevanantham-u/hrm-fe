import { useEffect, useState } from "react";
import { Edit3, ShieldCheck } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import Modal from "../components/common/Modal";
import FormField from "../components/common/FormField";
import { listUsers, updateUser, updateUserRole } from "../api/hrmApi";
import { ROLE_NAMES } from "../utils/permissions";
import { useAppDispatch } from "../hooks/redux";
import { showToast } from "../features/ui/uiSlice";
import "./UsersPage.css";

export default function UsersPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState({
    username: "",
    email: "",
    role_id: 5,
    is_active: 1,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    listUsers().then((r) => setRows(r.data.data || []));
  }, []);

  function edit(row) {
    setEditing(row);
    setDraft({
      username: row.username,
      email: row.email,
      role_id: row.role_id,
      is_active: row.is_active,
    });
  }

  async function save() {
    setSaving(true);
    try {
      const r = await updateUser(editing.id, {
        username: draft.username,
        email: draft.email,
        is_active: Number(draft.is_active),
      });

      if (editing.id !== 1)
        await updateUserRole(editing.id, Number(draft.role_id));
      setRows((v) =>
        v.map((x) =>
          x.id === editing.id
            ? { ...x, ...r.data.data, role_id: Number(draft.role_id) }
            : x,
        ),
      );
      setEditing(null);
      dispatch(
        showToast({ type: "success", message: "User updated successfully" }),
      );
    } catch (e) {
      dispatch(showToast({ type: "error", message: e.message }));
    } finally {
      setSaving(false);
    }
  }

  const columns = [
    {
      label: "User",
      key: "username",
      render: (r) => (
        <div className="user-cell">
          <div className="avatar avatar--small">
            {r.username.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <strong>{r.username}</strong>
            <span>{r.email}</span>
          </div>
        </div>
      ),
    },
    {
      label: "Role",
      key: "role_id",
      render: (r) => (
        <span className="role-pill">
          <ShieldCheck size={12} />
          {r.role_name || ROLE_NAMES[r.role_id] || `Role ${r.role_id}`}
        </span>
      ),
    },
    {
      label: "Employee ID",
      key: "employee_id",
      render: (r) => r.employee_id || "—",
    },
    {
      label: "Status",
      key: "is_active",
      render: (r) => (
        <StatusBadge status={r.is_active ? "Active" : "Inactive"} />
      ),
    },
    {
      label: "",
      key: "action",
      render: (r) => (
        <button
          className="icon-btn"
          onClick={() => edit(r)}
          aria-label="Edit user"
        >
          <Edit3 size={15} />
        </button>
      ),
    },
  ];
  return (
    <div className="users-page gsap-page">
      <PageHeader
        title="Users"
        subtitle="Manage login accounts, status and role assignment."
      />
      <DataTable columns={columns} rows={rows} />
      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title="Update user"
      >
        <div className="modal-grid">
          <FormField label="Username">
            <input
              value={draft.username}
              onChange={(e) => setDraft({ ...draft, username: e.target.value })}
            />
          </FormField>
          <FormField label="Email">
            <input
              type="email"
              value={draft.email}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            />
          </FormField>
          <FormField label="Role">
            <select
              value={draft.role_id}
              disabled={editing?.id === 1}
              onChange={(e) =>
                setDraft({ ...draft, role_id: Number(e.target.value) })
              }
            >
              {Object.entries(ROLE_NAMES).map(([id, name]) => (
                <option key={id} value={id}>
                  {id} — {name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Status">
            <select
              value={draft.is_active}
              onChange={(e) =>
                setDraft({ ...draft, is_active: Number(e.target.value) })
              }
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </FormField>
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={() => setEditing(null)}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={saving} onClick={save}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
