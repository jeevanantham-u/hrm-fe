import { useState, useMemo, useEffect } from "react";
import { Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";
import { clearAuthError, loginUser } from "../features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const canSubmit = useMemo(
    () => email && password && !loading,
    [email, password, loading],
  );

  function submit(e) {
    e.preventDefault();
    dispatch(clearAuthError());
    dispatch(loginUser({ email, password }));
  }
  return (
    <>
      <div className="login-page">
        <section className="login-panel">
          <div className="login-brand">
            <div className="login-brand__mark">H</div>
            <div>
              <strong>HRM</strong>
              <span>People operations</span>
            </div>
          </div>
          <div className="login-copy">
            <span className="eyebrow">WELCOME BACK</span>
            <h1>Manage your people with clarity.</h1>
            <p>
              One workspace for employees, attendance, leave, payroll and access
              control.
            </p>
          </div>
          <form onSubmit={submit} className="login-form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
              />
            </label>
            <label>
              Password
              <div className="password-wrap">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShow(!show)}>
                  {show ? <Eye size={17} /> : <EyeOff size={17} />}
                </button>
              </div>
            </label>
            {error ? <div className="login-error">{error}</div> : null}
            <button
              className="btn btn-primary login-submit"
              disabled={!canSubmit}
            >
              {loading ? (
                "Signing in…"
              ) : (
                <>
                  Sign in <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </section>
        <section className="login-art">
          <div className="art-grid"></div>
          <div className="art-content">
            <span>PEOPLE • PROCESS • CONTROL</span>
            <h2>
              Simple HR operations.
              <br />
              Clear accountability.
            </h2>
            <div className="art-stat-row">
              <div>
                <strong>248</strong>
                <span>Employees</span>
              </div>
              <div>
                <strong>18</strong>
                <span>Pending leave</span>
              </div>
              <div>
                <strong>99.2%</strong>
                <span>Data quality</span>
              </div>
            </div>
            <div>
              <div className="art-card">
                <ShieldCheck size={18} />
                <div>
                  <strong>Role-aware access</strong>
                  <span>Permissions follow the backend policy.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
