import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ForbiddenPage.css";
export default function ForbiddenPage({ compact = false }) {
  const navigate = useNavigate();
  return (
    <div className={`state-page ${compact ? "state-page--compact" : ""}`}>
      <div className="state-icon">
        <ShieldAlert size={25} />
      </div>
      <span>403</span>
      <h1>Access restricted</h1>
      <p>
        Your current role does not include the permission required for this
        screen.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft size={15} /> Back to dashboard
      </button>
    </div>
  );
}
