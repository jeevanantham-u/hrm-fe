import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import "./LoginPage.css";

export default function LoginPage(){
  const [show, setShow ] = useState(false);
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
                <p>One workspace for employees, attendance, leave, payroll and access control.</p>
              </div>
              <form action="" className="login-form">
                <label>
                  Email
                  <input 
                    type="email" 
                    placeholder="you@company.com"
                    autoComplete="email" 
                  />
                </label>
                <label>
                  Password 
                     <div className="password-wrap">
                        <input 
                          type="password"
                          placeholder="Enter password"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShow(!show)}
                        >
                          { show ? <Eye size={17}/> : <EyeOff size={17}/> }
                        </button>
                     </div>
                </label>
                <button className="btn btn-primary login-submit" type="submit"> Singn-in <ArrowRight size={16}/></button>
              </form>
            </section> 
            <section className="login-art">
              <div className="art-grid"></div>
              <div className="art-content">
                <span>PEOPLE • PROCESS • CONTROL</span>
                <h2>Simple HR operations.<br/>Clear accountability.</h2>
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
                    <ShieldCheck size={18}/>
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