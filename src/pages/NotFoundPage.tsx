import { Compass, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="state-page">
      <div className="state-icon">
        <Compass size={25} />
      </div>
      <span>404</span>
      <h1>Page not found</h1>
      <p>The route does not exist in the current HRM application.</p>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft size={15} /> Back to dashboard
      </button>
    </div>
  );
}
