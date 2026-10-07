import { useEffect, useState } from "react";
import { ShieldCheck, Save, Lock } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import {
  listRoles,
  listPermissions,
  updateRolePermissions,
} from "../api/hrmApi";
import { showToast } from "../features/ui/uiSlice";
import { useAppDispatch } from "../hooks/redux";
import "./RolesPermissionsPage.css";

export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [checked, setChecked] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    Promise.all([listRoles(), listPermissions()]).then(([r, p]) => {
      const roleList = r.data.data || [];
      const permissionList = p.data.data || [];
      setRoles(roleList);
      setPermissions(permissionList);
      const first = roleList[0];
      if (first) {
        setSelected(first);
        setChecked(
          (first.permissions || [])
            .map(
              (name) =>
                permissionList.find(
                  (permission) => permission.permission_name === name,
                )?.id,
            )
            .filter(Boolean),
        );
      }
    });
  }, []);
  function choose(role) {
    setSelected(role);
    setChecked(
      (role.permissions || [])
        .map((name) => permissions.find((p) => p.permission_name === name)?.id)
        .filter(Boolean),
    );
  }
  function toggle(id) {
    setChecked((v) =>
      v.includes(id) ? v.filter((x) => x !== id) : [...v, id],
    );
  }
  async function save() {
    if (!selected) return;
    setSaving(true);
    try {
      await updateRolePermissions(selected.id, checked);
      dispatch(
        showToast({
          type: "success",
          message: `${selected.role_name} permissions updated`,
        }),
      );
    } catch (e) {
      dispatch(showToast({ type: "error", message: e.message }));
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="roles-page gsap-page">
      <PageHeader
        title="Roles & permissions"
        subtitle="Control what each role can access. Backend middleware remains authoritative."
      />
      <div className="roles-layout">
        <aside className="roles-list">
          {roles.map((role) => (
            <button
              className={`role-card ${selected?.id === role.id ? "active" : ""}`}
              key={role.id}
              onClick={() => choose(role)}
            >
              <div className="role-card__icon">
                <ShieldCheck size={17} />
              </div>
              <div>
                <strong>{role.role_name}</strong>
                <span>{role.description}</span>
              </div>
            </button>
          ))}
        </aside>
        <section className="permissions-panel">
          <div className="permissions-head">
            <div>
              <span className="eyebrow">ROLE {selected?.id || "—"}</span>
              <h2>{selected?.role_name || "Select a role"}</h2>
              <p>
                {selected?.description || "Choose a role to edit permissions."}
              </p>
            </div>
            <button
              className="btn btn-primary"
              disabled={!selected || saving}
              onClick={save}
            >
              <Save size={15} />
              {saving ? "Saving…" : "Save permissions"}
            </button>
          </div>
          <div className="permission-note">
            <Lock size={15} />
            <span>
              These controls change the UI permission model and are intended to
              mirror the server-side RBAC matrix.
            </span>
          </div>
          <div className="permission-grid">
            {permissions.map((item) => (
              <label
                className={`permission-item ${checked.includes(item.id) ? "is-checked" : ""}`}
                key={item.id}
              >
                <input
                  type="checkbox"
                  checked={checked.includes(item.id)}
                  onChange={() => toggle(item.id)}
                />
                <span className="permission-item__check"></span>
                <div>
                  <strong>{item.permission_name}</strong>
                  <span>{item.description}</span>
                </div>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
