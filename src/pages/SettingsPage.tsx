import type { ReactNode } from "react";
import { useState } from "react";
import { Bell, Shield, Palette, Globe2, ChevronRight } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import "./SettingsPage.css";

export default function SettingsPage() {
  const [compact, setCompact] = useState(false);
  const [notice, setNotice] = useState(true);
  return (
    <div className="settings-page gsap-page">
      <PageHeader
        title="Settings"
        subtitle="Personal preferences and workspace behaviour."
      />
      <div className="settings-layout">
        <section className="settings-card">
          <div className="settings-section">
            <div className="settings-section__head">
              <div className="setting-icon">
                <Bell size={17} />
              </div>
              <div>
                <h3>Notifications</h3>
                <p>Choose which in-app alerts you receive.</p>
              </div>
            </div>
            <SettingToggle
              label="Leave request alerts"
              checked={notice}
              onChange={setNotice}
            />
            <SettingRow label="Email digests" value="Weekly" />
            <SettingRow label="Approval reminders" value="On" />
          </div>
          <div className="settings-section">
            <div className="settings-section__head">
              <div className="setting-icon">
                <Palette size={17} />
              </div>
              <div>
                <h3>Interface</h3>
                <p>Keep the HRM workspace calm and compact.</p>
              </div>
            </div>
            <SettingToggle
              label="Compact data tables"
              checked={compact}
              onChange={setCompact}
            />
            <SettingRow label="Theme" value="Blue & white" />
            <SettingRow
              label="Language"
              value="English (India)"
              icon={<Globe2 size={15} />}
            />
          </div>
          <div className="settings-section">
            <div className="settings-section__head">
              <div className="setting-icon">
                <Shield size={17} />
              </div>
              <div>
                <h3>Security</h3>
                <p>
                  Authentication and access controls are enforced by the API.
                </p>
              </div>
            </div>
            <SettingRow label="Session token" value="JWT / 60 min" />
            <SettingRow label="Permission source" value="Server RBAC" />
            <SettingRow label="Profile role editing" value="Admin only" />
          </div>
        </section>
        <aside className="settings-side">
          <div className="settings-side__art">
            <div className="orb orb--a"></div>
            <div className="orb orb--b"></div>
            <Shield size={24} />
          </div>
          <h3>Secure by design</h3>
          <p>
            The frontend only mirrors access rules. The PHP backend remains the
            final permission check for every protected request.
          </p>
          <button className="text-button">
            Review security flow <ChevronRight size={14} />
          </button>
        </aside>
      </div>
    </div>
  );
}
function SettingToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="setting-toggle">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <i></i>
    </label>
  );
}
function SettingRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div className="setting-row">
      <span>
        {icon}
        {label}
      </span>
      <strong>{value}</strong>
    </div>
  );
}
