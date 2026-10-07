import { useState } from "react";
import { LockKeyhole, UserRound, ShieldCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { saveProfile } from "../features/auth/authSlice";
import { showToast } from "../features/ui/uiSlice";
import { getRoleName, getPermissions } from "../utils/permissions";
import FormField from "../components/common/FormField";
import PageHeader from "../components/common/PageHeader";
import "./ProfilePage.css";

export default function ProfilePage() {
  const user = useAppSelector((s) => s.auth.user);
  const loading = useAppSelector((s) => s.auth.loading);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });
  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  async function save(e) {
    e.preventDefault();
    try {
      const payload: { username: string; email: string; password?: string } = {
        username: form.username,
        email: form.email,
      };
      if (form.password) payload.password = form.password;
      await dispatch(saveProfile(payload)).unwrap();
      dispatch(
        showToast({ type: "success", message: "Profile updated successfully" }),
      );
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message: err.message || "Unable to update profile",
        }),
      );
    }
  }
  return (
    <div className="profile-page gsap-page">
      <PageHeader
        title="My profile"
        subtitle="Update your personal login details. Role and access scope are managed separately."
      />
      <div className="profile-layout">
        <section className="profile-card profile-card--hero">
          <div className="profile-card__cover"></div>
          <div className="profile-card__identity">
            <div className="profile-avatar">
              {(user?.username || "U").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2>{user?.username}</h2>
              <p>{user?.email}</p>
              <span className="role-tag">
                <ShieldCheck size={12} />
                {getRoleName(user)}
              </span>
            </div>
          </div>
          <div className="profile-summary">
            <div>
              <span>Employee ID</span>
              <strong>{user?.employee_id || "Not linked"}</strong>
            </div>
            <div>
              <span>Role ID</span>
              <strong>{user?.role_id || "—"}</strong>
            </div>
            <div>
              <span>Permissions</span>
              <strong>
                {getPermissions(user).includes("*")
                  ? "All"
                  : getPermissions(user).length}
              </strong>
            </div>
          </div>
        </section>
        <form className="profile-card profile-form" onSubmit={save}>
          <div className="profile-card__head">
            <div>
              <h3>Profile details</h3>
              <p>Only username, email and password are editable here.</p>
            </div>
            <UserRound size={18} color="#7e94b4" />
          </div>
          <div className="profile-form__grid">
            <FormField label="Username">
              <input
                value={form.username}
                onChange={(e) => set("username", e.target.value)}
                required
              />
            </FormField>
            <FormField label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                required
              />
            </FormField>
            <FormField
              label="New password"
              hint="Leave blank to keep your current password"
            >
              <div className="profile-password">
                <LockKeyhole size={16} />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  minLength={8}
                />
              </div>
            </FormField>
          </div>
          <div className="profile-form__actions">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Saving…" : "Save profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
