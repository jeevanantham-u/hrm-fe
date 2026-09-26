import { Activity, ArrowUpRight, MoreHorizontal } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Sector,
  PieSectorShapeProps,
  Label,
  LabelList,
  LabelProps,
} from "recharts";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import ChartCard from "../components/common/ChartCard";
import StatusBadge from "../components/common/StatusBadge";
import "./DashboardPage.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const colors = ["#2563eb", "#5b8def", "#7ea9f4", "#c8daf8"];
  const MyCustomPie = (props: PieSectorShapeProps) => (
    <Sector {...props} fill={colors[props.index % colors.length]} />
  );
  const MyCustomLabel = (props: LabelProps) => (
    <Label
      {...props}
      fill={colors[(props.index ?? 0) % colors.length]}
      position="outside"
      offset={20}
    />
  );
  const renderLegend = () => (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        justifyContent: "center",
        gap: 12,
        padding: 0,
        margin: 0,
      }}
    >
      {leaveDistribution.map((item, index) => (
        <li
          key={item.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 10,
            color: "#000",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              display: "inline-block",
              borderRadius: "50%",
              background: colors[index % colors.length],
            }}
          />
          {item.name}
        </li>
      ))}
    </ul>
  );

  const attendanceTrend = [
    { name: "Mon", present: 215, late: 18, absent: 8 },
    { name: "Tue", present: 219, late: 14, absent: 8 },
    { name: "Wed", present: 221, late: 12, absent: 8 },
    { name: "Thu", present: 218, late: 16, absent: 7 },
    { name: "Fri", present: 223, late: 10, absent: 6 },
    { name: "Sat", present: 136, late: 536, absent: 3 },
  ];

  const leaveDistribution = [
    { name: "Annual", value: 42 },
    { name: "Casual", value: 31 },
    { name: "Sick", value: 19 },
    { name: "Other", value: 8 },
  ];

  const payrollTrend = [
    { month: "Apr", amount: 16.4 },
    { month: "May", amount: 16.8 },
    { month: "Jun", amount: 17.1 },
    { month: "Jul", amount: 17.6 },
    { month: "Aug", amount: 17.9 },
    { month: "Sep", amount: 18.4 },
  ];

  const dashboardStats = [
    {
      label: "Total Employees",
      value: "248",
      delta: "+12.8%",
      helper: "vs last month",
      icon: "users",
      tone: "blue",
    },
    {
      label: "Present Today",
      value: "223",
      delta: "+4.1%",
      helper: "attendance rate",
      icon: "calendar",
      tone: "green",
    },
    {
      label: "Pending Leaves",
      value: "18",
      delta: "-8.3%",
      helper: "vs last month",
      icon: "clock",
      tone: "amber",
    },
    {
      label: "Payroll This Month",
      value: "₹18.4L",
      delta: "+6.2%",
      helper: "processed",
      icon: "wallet",
      tone: "violet",
    },
  ];

  const mockLeaves = [
    {
      id: 101,
      employee_id: 5,
      employee: "Rahul Dev",
      type: "Annual Leave",
      start_date: "2026-09-21",
      end_date: "2026-09-24",
      days: 4,
      status: "Pending",
      reason: "Family function",
    },
    {
      id: 102,
      employee_id: 2,
      employee: "Divya Raman",
      type: "Sick Leave",
      start_date: "2026-09-17",
      end_date: "2026-09-17",
      days: 1,
      status: "Approved",
      reason: "Medical appointment",
    },
    {
      id: 103,
      employee_id: 4,
      employee: "Priya Shankar",
      type: "Casual Leave",
      start_date: "2026-09-25",
      end_date: "2026-09-26",
      days: 2,
      status: "Pending",
      reason: "Personal work",
    },
    {
      id: 104,
      employee_id: 3,
      employee: "Naveen Raj",
      type: "Annual Leave",
      start_date: "2026-09-15",
      end_date: "2026-09-16",
      days: 2,
      status: "Rejected",
      reason: "Project release window",
    },
  ];

  return (
    <div className="dashboard-page gsap-page">
      <PageHeader title="Dashboard" subtitle="Good afternoon" />
      <div className="stats-grid">
        {dashboardStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="dashboard-grid dashboard-grid--top">
        <ChartCard title="Attendance overview" subtitle="Current week">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={attendanceTrend}
              margin={{ left: -20, right: 10, top: 12, bottom: 0 }}
            >
              <CartesianGrid stroke="#eef3f8" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#90a0b5" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#90a0b5" }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="present"
                stroke="#2563eb"
                fill="#dbeafe"
                strokeWidth={2.5}
              />
              <Area
                type="monotone"
                dataKey="late"
                stroke="#8fb0ee"
                fill="#eef4ff"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Leave distribution" subtitle="Request by type">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={leaveDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={88}
                paddingAngle={3}
                shape={MyCustomPie}
              >
                <LabelList content={MyCustomLabel} />
              </Pie>
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="dashboard-grid dashboard-grid--bottom">
        <ChartCard title="Payroll movement" subtitle="Net payroll • lakhs">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart
              data={payrollTrend}
              margin={{ left: -20, right: 5, top: 8, bottom: 0 }}
            >
              <CartesianGrid stroke="#eef3f8" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#90a0b5" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#90a0b5" }}
              />
              <Tooltip />
              <Bar dataKey="amount" radius={[7, 7, 0, 0]} fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <section className="dashboard-side-card">
          <div className="dashboard-side-card__head">
            <div>
              <h3>Leave requests</h3>
              <p>Latest approvals and pending items</p>
            </div>
            <MoreHorizontal size={18} color="#9aa8bb" />
          </div>
          <div className="leave-preview">
            {mockLeaves.slice(0, 4).map((item) => (
              <div className="leave-preview__row" key={item.id}>
                <div className="avatar avatar--mini">
                  {item.employee
                    .split(" ")
                    .map((v) => v[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="leave-preview__copy">
                  <strong>{item.employee}</strong>
                  <span>
                    {item.type} • {item.days} day{item.days > 1 ? "s" : ""}
                  </span>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
          <button className="text-link" onClick={() => navigate("/leaves")}>
            View all leave requests <ArrowUpRight size={14} />
          </button>
        </section>
      </div>

      <div className="dashboard-health">
        <Activity size={16} />
        <div>
          <strong>System status</strong>
          <span>
            All core HRM modules are responding normally in the current UI
            environment.
          </span>
        </div>
      </div>
    </div>
  );
}
