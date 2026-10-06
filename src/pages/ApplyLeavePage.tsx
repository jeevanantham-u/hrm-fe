import { useState } from "react";
import { CalendarDays, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import FormField from "../components/common/FormField";
import { applyLeave } from "../api/hrmApi";
import { showToast } from "../features/ui/uiSlice";
import "./ApplyLeavePage.css";

export default function ApplyLeavePage() {
  const user = useAppSelector((s) => s.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    leave_type_id: 1,
    start_date: "",
    end_date: "",
    reason: "",
  });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const r = await applyLeave({
        ...form,
        leave_type_id: Number(form.leave_type_id),
      });
      dispatch(
        showToast({
          type: "success",
          message: r.data.message || "Leave request submitted successfully",
        }),
      );
      navigate("/leaves");
    } catch (e) {
      dispatch(showToast({ type: "error", message: e.message }));
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="apply-leave-page">
      <PageHeader
        title="Apply leave"
        subtitle="Submit a leave request for admin."
        back
      />

      <form className="apply-layout" onSubmit={submit}>
        <section className="apply-card">
          <div className="apply-card__head">
            <div>
              <h2>Leave request</h2>
              <p>
                Your request will remain Pending until an authorized approver
                processes it.
              </p>
            </div>
            <CalendarDays size={20} color="#5b7ead" />
          </div>
          <div className="apply-grid">
            <FormField label="Leave type" required>
              <select
                value={form.leave_type_id}
                onChange={(e) => set("leave_type_id", e.target.value)}
              >
                <option value="1">Annual Leave</option>
                <option value="2">Casual Leave</option>
                <option value="3">Sick Leave</option>
                <option value="4">Other</option>
              </select>
            </FormField>
            <div></div>
            <FormField label="Start date" required>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => set("start_date", e.target.value)}
                required
              />
            </FormField>
            <FormField label="End date" required>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => set("end_date", e.target.value)}
                required
              />
            </FormField>
            <div className="apply-field-full">
              <FormField label="Reason">
                <textarea
                  value={form.reason}
                  onChange={(e) => set("reason", e.target.value)}
                  placeholder="Add a short reason for your leave"
                />
              </FormField>
            </div>
          </div>
          <div className="apply-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" disabled={saving}>
              {saving ? "Submitting…" : "Submit leave request"}
            </button>
          </div>
        </section>

        <aside className="apply-tip">
          <div className="apply-tip__icon">
            <Sparkles size={17} />
          </div>
          <strong>Approval workflow</strong>
          <p>
            Self-service users can apply only for their own employee record.
            Department and company approvers see requests within their
            authorized scope.
          </p>
          <div className="apply-tip__row">
            <span>Current status</span>
            <strong>Pending</strong>
          </div>
          <div className="apply-tip__row">
            <span>Employee ID</span>
            <strong>{user?.employee_id || "Not linked"}</strong>
          </div>
        </aside>
      </form>
    </div>
  );
}
