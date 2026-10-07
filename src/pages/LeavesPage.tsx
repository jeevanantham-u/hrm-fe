import { useEffect, useMemo, useState } from "react";
import { Check, X, Eye } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import Modal from "../components/common/Modal";
import FormField from "../components/common/FormField";
import {
  approveLeave,
  getPendingLeaves,
  getEmployeeLeaves,
  rejectLeave,
} from "../api/hrmApi";
import { hasAnyPermission } from "../utils/permissions";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { showToast } from "../features/ui/uiSlice";
import "./LeavesPage.css";

export default function LeavesPage() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<any[]>([]);
  const [mode, setMode] = useState("all");
  const [remarks, setRemarks] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [action, setAction] = useState<any>(null);
  const canApprove = hasAnyPermission(user, "leave.approve");
  useEffect(() => {
    async function load() {
      const r = canApprove
        ? await getPendingLeaves()
        : await getEmployeeLeaves(user?.employee_id || 1);
      setRows(r.data.data || []);
    }
    load();
  }, [canApprove, user?.employee_id]);
  async function process() {
    if (!selected) return;
    try {
      const r =
        action === "approve"
          ? await approveLeave(selected.id, remarks)
          : await rejectLeave(selected.id, remarks);
      setRows((v) =>
        v.map((x) =>
          x.id === selected.id
            ? { ...x, status: action === "approve" ? "Approved" : "Rejected" }
            : x,
        ),
      );
      dispatch(showToast({ type: "success", message: r.data.message }));
      setSelected(null);
      setRemarks("");
    } catch (e) {
      dispatch(showToast({ type: "error", message: e.message }));
    }
  }
  const shown = useMemo(
    () => (mode === "all" ? rows : rows.filter((r) => r.status === mode)),
    [rows, mode],
  );
  const columns = [
    { label: "Employee", key: "employee_id" },
    { label: "Type", key: "leave_type_id" },
    {
      label: "Dates",
      key: "start_date",
      render: (r) => (
        <span>
          {r.start_date} → {r.end_date}
        </span>
      ),
    },
    { label: "Days", key: "days" },
    {
      label: "Status",
      key: "status",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      label: "Action",
      key: "action",
      render: (r) => (
        <div className="row-actions">
          {canApprove && r.status === "Pending" ? (
            <>
              <button
                className="icon-btn icon-btn--green"
                onClick={() => {
                  setSelected(r);
                  setAction("approve");
                }}
              >
                <Check size={15} />
              </button>
              <button
                className="icon-btn icon-btn--red"
                onClick={() => {
                  setSelected(r);
                  setAction("reject");
                }}
              >
                <X size={15} />
              </button>
            </>
          ) : (
            <button
              className="icon-btn"
              onClick={() => {
                setSelected(r);
                setAction("view");
              }}
            >
              <Eye size={15} />
            </button>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="leaves-page gsap-page">
      <PageHeader
        title="Leave"
        subtitle="Apply, review and manage leave requests within your permission scope."
        actionLabel="Apply leave"
        actionTo="/leaves/apply"
      />
      <div className="leave-tabs">
        <button
          className={mode === "all" ? "active" : ""}
          onClick={() => setMode("all")}
        >
          All <span>{rows.length}</span>
        </button>
        <button
          className={mode === "Pending" ? "active" : ""}
          onClick={() => setMode("Pending")}
        >
          Pending
        </button>
        <button
          className={mode === "Approved" ? "active" : ""}
          onClick={() => setMode("Approved")}
        >
          Approved
        </button>
        <button
          className={mode === "Rejected" ? "active" : ""}
          onClick={() => setMode("Rejected")}
        >
          Rejected
        </button>
      </div>
      <DataTable columns={columns} rows={shown} />
      <Modal
        open={Boolean(selected)}
        onClose={() => {
          setSelected(null);
          setRemarks("");
        }}
        title={
          action === "approve"
            ? "Approve leave"
            : action === "reject"
              ? "Reject leave"
              : "Leave request"
        }
      >
        {selected ? (
          <div className="leave-modal">
            <div className="leave-modal__summary">
              <strong>{selected.employee}</strong>
              <span>
                {selected.type} • {selected.start_date} → {selected.end_date}
              </span>
              <StatusBadge status={selected.status} />
            </div>
            {action !== "view" ? (
              <FormField label="Remarks">
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add a short note"
                />
              </FormField>
            ) : (
              <div className="leave-reason">
                <span>Reason</span>
                <strong>{selected.reason || "—"}</strong>
              </div>
            )}{" "}
            {action === "view" ? null : (
              <div className="modal-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => setSelected(null)}
                >
                  Cancel
                </button>
                <button
                  className={`btn ${action === "approve" ? "btn-primary" : "btn-danger"}`}
                  onClick={process}
                >
                  {action === "approve" ? "Approve" : "Reject"}
                </button>
              </div>
            )}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
