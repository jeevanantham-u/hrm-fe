import type { Key } from "react";
import {
  Users,
  CalendarDays,
  Clock3,
  WalletCards,
  ArrowUpRight,
  ArrowDownRight,
  type LucideIcon,
} from "lucide-react";
import "./StatCard.css";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  calendar: CalendarDays,
  clock: Clock3,
  wallet: WalletCards,
};

type StatCardProps = {
  key?: Key;
  label: string;
  value: string | number;
  delta?: string;
  helper?: string;
  icon?: string;
  tone?: string;
};

export default function StatCard({
  label,
  value,
  delta,
  helper,
  icon = "users",
  tone = "blue",
}: StatCardProps) {
  const Icon = iconMap[icon] || Users;
  const negative = String(delta || "").startsWith("-");
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__top">
        <div>
          <p>{label}</p>
          <strong>{value}</strong>
        </div>
        <div className="stat-card__icon">
          <Icon size={18} />
        </div>
      </div>
      <div className="stat-card__foot">
        <span className={negative ? "down" : "up"}>
          {negative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}{" "}
          {delta}
        </span>
        <span>{helper}</span>
      </div>
    </article>
  );
}
