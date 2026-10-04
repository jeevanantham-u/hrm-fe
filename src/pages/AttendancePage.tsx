import { useEffect, useState } from "react";
import { Clock3, LogIn, LogOut, CalendarDays } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import { checkIn, checkOut, getAttendance } from "../api/hrmApi";
import { showToast } from "../features/ui/uiSlice";
import "./AttendancePage.css";

export default function AttendancePage() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);
  const employeeId = user?.employee_id || 1;
  useEffect(() => {
    getAttendance(employeeId).then((r) => setRows(r.data.data || []));
  }, [employeeId]);
  async function doAction(fn, msg) {
    setBusy(true);
    try {
      const r = await fn();
      dispatch(showToast({ type: "success", message: r.data.message || msg }));
    } catch (e) {
      dispatch(showToast({ type: "error", message: e.message }));
    } finally {
      setBusy(false);
    }
  }
  const columns = [
    { label: "Date", key: "attendance_date" },
    { label: "Check in", key: "check_in" },
    { label: "Check out", key: "check_out" },
    { label: "Hours", key: "total_hours" },
    {
      label: "Status",
      key: "status",
      render: (r) => <StatusBadge status={r.status} />,
    },
  ];
  return (
    <div className="attendance-page gsap-page">
      <PageHeader
        title="Attendance"
        subtitle="Track daily check-in/out and attendance history."
      />
      <div className="attendance-actions">
        <div className="attendance-clock">
          <div className="clock-icon">
            <Clock3 size={20} />
          </div>
          <div>
            <span>Today</span>
            <strong>09:18 AM</strong>
            <small>Saturday, 19 September 2026</small>
          </div>
        </div>
        <div className="attendance-btns">
          <button
            className="btn btn-primary"
            disabled={busy}
            onClick={() => doAction(checkIn, "Check-in successful")}
          >
            <LogIn size={16} /> Check in
          </button>
          <button
            className="btn btn-outline"
            disabled={busy}
            onClick={() => doAction(checkOut, "Check-out successful")}
          >
            <LogOut size={16} /> Check out
          </button>
        </div>
      </div>
      <section className="attendance-summary">
        <div>
          <CalendarDays size={18} />
          <div>
            <span>Present days</span>
            <strong>21</strong>
          </div>
        </div>
        <div>
          <Clock3 size={18} />
          <div>
            <span>Average hours</span>
            <strong>8h 42m</strong>
          </div>
        </div>
        <div>
          <LogIn size={18} />
          <div>
            <span>Late arrivals</span>
            <strong>2</strong>
          </div>
        </div>
      </section>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
