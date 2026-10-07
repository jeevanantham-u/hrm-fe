import { ReactNode } from "react";
import "./ChartCard.css";

type ChartCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
};

export default function ChartCard({
  title,
  subtitle,
  children,
  action,
}: ChartCardProps) {
  return (
    <section className="chart-card">
      <div className="chart-card__head">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        {action}
      </div>
      <div className="chart-card__body">{children}</div>
    </section>
  );
}
