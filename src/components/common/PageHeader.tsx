import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./PageHeader.css";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionTo?: string;
  back?: boolean;
};

export default function PageHeader({
  title,
  subtitle,
  actionLabel,
  actionTo,
  back = false,
}: PageHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="page-header gsap-page">
      <div className="page-header__copy">
        {back ? (
          <button
            className="ghost-icon"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
        ) : null}
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      {actionLabel ? (
        <button
          className="btn btn-primary"
          onClick={() => navigate(actionTo || "#")}
        >
          <Plus size={16} />
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
