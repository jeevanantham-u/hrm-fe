import "./StausBadge.css";

type StatusBadgeProps = { status?: string | null };

export default function StatusBadge({ status }: StatusBadgeProps) {
  const key = String(status || "")
    .toLowerCase()
    .replace(/\s+/g, "-");
  return <span className={`status status--${key}`}>{status}</span>;
}
