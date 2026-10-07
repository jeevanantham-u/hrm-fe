import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pencil, Mail, Phone, MapPin, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getEmployee } from "../api/hrmApi";
import PageHeader from "../components/common/PageHeader";
import StatusBadge from "../components/common/StatusBadge";
import "./EmployeeDetailsPage.css";

export default function EmployeeDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    getEmployee(id)
      .then((r) => setEmployee(r.data.data))
      .catch(() => setEmployee(null));
  }, [id]);

  if (!employee) {
    return (
      <PageHeader
        title="Employee not found"
        subtitle="The employee record could not be loaded."
        back
      />
    );
  }

  const full = `${employee.first_name} ${employee.last_name}`;

  return (
    <div className="emplyoyee-details-page">
      <PageHeader title={full} subtitle={`${employee.employee_code}`} back />
      <div className="employee-hero">
        <div className="employee-hero__identity">
          <div className="employee-avatar">{`${employee.first_name?.[0] || ""}${employee.last_name?.[0] || ""}`}</div>
          <div>
            <h2>{full}</h2>
            <p>{employee.designation}</p>
            <StatusBadge status={employee.status} />
          </div>
        </div>
        <button
          className="btn btn-outline"
          onClick={() => navigate(`/employees/${employee.id}/edit`)}
        >
          <Pencil size={15} /> Edit profile
        </button>
      </div>

      <div className="detail-grid">
        <section className="detail-card">
          <div className="detail-card__head">
            <h3>Contact & profile</h3>
          </div>
          <div className="detail-list">
            <div>
              <Mail size={16} />
              <span>Email</span>
              <strong>{employee.email}</strong>
            </div>
            <div>
              <Phone size={16} />
              <span>Phone</span>
              <strong>{employee.phone || "—"}</strong>
            </div>
            <div>
              <MapPin size={16} />
              <span>Address</span>
              <strong>{employee.address || "—"}</strong>
            </div>
            <div>
              <CalendarDays size={16} />
              <span>Joining date</span>
              <strong>{employee.joining_date || "—"}</strong>
            </div>
          </div>
        </section>
        <section className="detail-card">
          <div className="detail-card__head">
            <h3>Employment</h3>
          </div>
          <div className="detail-kpis">
            <div>
              <span>Department</span>
              <strong>
                {{
                  1: "Human Resources",
                  2: "Operations",
                  3: "Product & Design",
                  4: "Finance",
                }[employee.department_id] || "—"}
              </strong>
            </div>
            <div>
              <span>Manager ID</span>
              <strong>{employee.manager_id || "—"}</strong>
            </div>
            <div>
              <span>Salary</span>
              <strong>
                ₹{Number(employee.salary || 0).toLocaleString("en-IN")}
              </strong>
            </div>
            <div>
              <span>Employee ID</span>
              <strong>{employee.employee_code || employee.id}</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
