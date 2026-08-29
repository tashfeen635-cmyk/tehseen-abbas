"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const CATEGORY_OPTIONS = [
  { value: "distinguished", label: "DISTINGUISHED PERSONALITIES" },
  { value: "travel", label: "TRAVEL & ADVENTURE" },
  { value: "team", label: "TEAM" },
  { value: "sports", label: "SPORTS" },
  { value: "personal", label: "PERSONAL" },
  { value: "awardsReceived", label: "AWARDS RECEIVED" },
  { value: "awardsPresented", label: "AWARDS PRESENTED" },
];

const TABS = ["Dashboard", "Portfolio", "Experience", "Skills", "Awards", "Settings"];

async function api(url, options = {}) {
  const res = await fetch(url, {
    headers: options.body instanceof FormData ? {} : { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

export default function AdminPage() {
  const [status, setStatus] = useState("loading");
  const [tab, setTab] = useState("Dashboard");
  const [username, setUsername] = useState("");

  useEffect(() => {
    api("/api/admin/check")
      .then((r) => {
        setUsername(r.username || "admin");
        setStatus(r.authenticated ? "authed" : "login");
      })
      .catch(() => setStatus("login"));
  }, []);

  if (status === "loading") return <div className="admin-loader">Loading...</div>;
  if (status === "login") return <Login onSuccess={() => setStatus("authed")} />;

  return <Dashboard username={username} tab={tab} setTab={setTab} onLogout={() => setStatus("login")} />;
}

function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/login", { method: "POST", body: JSON.stringify({ username, password }) });
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login">
      <form className="login-box" onSubmit={submit}>
        <h1>Admin Login</h1>
        <p>Tehseen Abbas Portfolio</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <div className="password-wrap">
          <input
            type={showPw ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="pw-toggle"
            aria-label={showPw ? "Hide password" : "Show password"}
            onClick={() => setShowPw((v) => !v)}
          >
            <i className={`fas ${showPw ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>
        {error && <div className="login-error">{error}</div>}
        <button type="submit" disabled={busy}>{busy ? "Signing in..." : "Sign In"}</button>
        <Link className="back-link" href="/">← Back to site</Link>
      </form>
    </div>
  );
}

function Dashboard({ username, tab, setTab, onLogout }) {
  const logout = async () => {
    await api("/api/admin/logout", { method: "POST" });
    onLogout();
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Portfolio Admin</div>
        <nav>
          {TABS.map((t) => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <span>Welcome, {username}</span>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </header>
        <div className="admin-content">
          {tab === "Dashboard" && <DashboardTab />}
          {tab === "Portfolio" && <PortfolioTab />}
          {tab === "Experience" && <ExperienceTab />}
          {tab === "Skills" && <SkillsTab />}
          {tab === "Awards" && <AwardsTab />}
          {tab === "Settings" && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}

function DashboardTab() {
  const [counts, setCounts] = useState(null);
  useEffect(() => {
    api("/api/portfolio").then((d) =>
      setCounts({
        portfolio: d.portfolio.length,
        experience: d.experience.length,
        skills: d.skills.length,
        awards: d.awards.length,
      })
    );
  }, []);
  if (!counts) return <div className="admin-loader">Loading...</div>;
  const cards = [
    { label: "Portfolio Images", value: counts.portfolio },
    { label: "Experience Entries", value: counts.experience },
    { label: "Skills", value: counts.skills },
    { label: "Awards", value: counts.awards },
  ];
  return (
    <div className="stat-grid">
      {cards.map((c) => (
        <div className="stat-card" key={c.label}>
          <div className="stat-value">{c.value}</div>
          <div className="stat-label">{c.label}</div>
        </div>
      ))}
      <div className="stat-note">
        Use the tabs to manage portfolio images, experience, skills, awards, and site
        content. Changes are saved to the database and appear on the public site on reload.
      </div>
    </div>
  );
}

function PortfolioTab() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("personal");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api("/api/admin/portfolio").then(setItems);
  }, []);

  const load = () => api("/api/admin/portfolio").then(setItems);

  const upload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setBusy(true);
    setMsg("");
    e.target.value = "";
    try {
      let added = 0;
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const { url } = await api("/api/admin/upload", { method: "POST", body: fd });
        await api("/api/admin/portfolio", { method: "POST", body: JSON.stringify({ src: url, category }) });
        added++;
      }
      setMsg(`Uploaded ${added} image${added > 1 ? "s" : ""} to ${CATEGORY_OPTIONS.find((c) => c.value === category)?.label}.`);
      load();
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    await api("/api/admin/portfolio", { method: "DELETE", body: JSON.stringify({ id }) });
    setMsg("Removed.");
    load();
  };

  const setOrder = async (id, sortOrder) => {
    await api("/api/admin/portfolio", { method: "PUT", body: JSON.stringify({ id, sortOrder }) });
    load();
  };

  return (
    <div>
      <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Add Portfolio Image</h2>
        <p className="form-hint">
          Select images from your device — they are uploaded automatically to the chosen category.
        </p>
        <div className="form-row">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label className={`upload-btn${busy ? " disabled" : ""}`}>
            <i className="fas fa-upload"></i> {busy ? "Uploading..." : "Choose images"}
            <input type="file" accept="image/*" multiple onChange={upload} disabled={busy} hidden />
          </label>
        </div>
        {msg && <div className="msg">{msg}</div>}
      </form>

      {CATEGORY_OPTIONS.map((cat) => {
        const catItems = items.filter((i) => i.category === cat.value);
        return (
          <div className="admin-section" key={cat.value}>
            <h3>{cat.label} ({catItems.length})</h3>
            <div className="image-grid">
              {catItems.map((item, idx) => (
                <div className="image-card" key={item.id}>
                  <img src={item.src} alt={item.src} />
                  <div className="image-actions">
                    <button
                      disabled={idx === 0}
                      onClick={() => setOrder(item.id, idx - 1)}
                    >↑</button>
                    <button
                      disabled={idx === catItems.length - 1}
                      onClick={() => setOrder(item.id, idx + 1)}
                    >↓</button>
                    <button className="btn-danger" onClick={() => remove(item.id)}>Delete</button>
                  </div>
                  <div className="image-path" title={item.src}>{item.src}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Generic CRUD editor ---- */
function useCrud(endpoint, blank) {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(blank);
  const [msg, setMsg] = useState("");

  const load = useCallback(() => api(endpoint).then(setRows), [endpoint]);
  useEffect(() => { load(); }, [load]);

  const save = async (e) => {
    e.preventDefault();
    const isNew = !editing.id;
    await api(endpoint, {
      method: isNew ? "POST" : "PUT",
      body: JSON.stringify(editing),
    });
    setMsg("Saved.");
    load();
    if (isNew) setEditing(blank);
  };

  const remove = async (id) => {
    await api(endpoint, { method: "DELETE", body: JSON.stringify({ id }) });
    load();
  };

  return { rows, editing, setEditing, save, remove, msg, setMsg };
}

function Field({ label, value, onChange, name, type = "text", rows }) {
  const common = {
    placeholder: label,
    value: value ?? "",
    onChange: (e) => onChange(name, e.target.value),
  };
  return (
    <label className="field">
      <span>{label}</span>
      {rows ? <textarea {...common} rows={rows} /> : <input {...common} type={type} />}
    </label>
  );
}

function ExperienceTab() {
  const c = useCrud("/api/admin/experience", { icon: "", title: "", description: "", date: "", color: "cyan" });
  return (
    <div>
      <form className="admin-form" onSubmit={c.save}>
        <h2>{c.editing.id ? "Edit" : "Add"} Experience</h2>
        <Field label="Title" name="title" value={c.editing.title} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Font Awesome icon (e.g. fa-laptop-code)" name="icon" value={c.editing.icon} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Color (cyan / yellow / green / blue)" name="color" value={c.editing.color} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Date range" name="date" value={c.editing.date} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Description" name="description" rows={4} value={c.editing.description} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        {c.editing.id && <button type="button" className="btn-cancel" onClick={() => c.setEditing({ icon: "", title: "", description: "", date: "", color: "cyan" })}>Cancel edit</button>}
        <button type="submit">Save</button>
        {c.msg && <div className="msg">{c.msg}</div>}
      </form>
      <div className="admin-list">
        {c.rows.map((r) => (
          <div className="list-row" key={r.id}>
            <div className="list-info">
              <strong>{r.title}</strong>
              <span>{r.date} · {r.color}</span>
            </div>
            <div className="list-actions">
              <button onClick={() => c.setEditing(r)}>Edit</button>
              <button className="btn-danger" onClick={() => c.remove(r.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsTab() {
  const c = useCrud("/api/admin/skills", { icon: "", name: "", target: 0 });
  return (
    <div>
      <form className="admin-form" onSubmit={c.save}>
        <h2>{c.editing.id ? "Edit" : "Add"} Skill</h2>
        <Field label="Skill name" name="name" value={c.editing.name} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Icon (e.g. fa-html5, fa-css3-alt, fa-code, fa-php)" name="icon" value={c.editing.icon} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Target % (0-100)" name="target" type="number" value={c.editing.target} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        {c.editing.id && <button type="button" className="btn-cancel" onClick={() => c.setEditing({ icon: "", name: "", target: 0 })}>Cancel edit</button>}
        <button type="submit">Save</button>
        {c.msg && <div className="msg">{c.msg}</div>}
      </form>
      <div className="admin-list">
        {c.rows.map((r) => (
          <div className="list-row" key={r.id}>
            <div className="list-info">
              <strong>{r.name} — {r.target}%</strong>
              <span>{r.icon}</span>
            </div>
            <div className="list-actions">
              <button onClick={() => c.setEditing(r)}>Edit</button>
              <button className="btn-danger" onClick={() => c.remove(r.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AwardsTab() {
  const c = useCrud("/api/admin/awards", { date: "", title: "", description: "" });
  return (
    <div>
      <form className="admin-form" onSubmit={c.save}>
        <h2>{c.editing.id ? "Edit" : "Add"} Award</h2>
        <Field label="Date" name="date" value={c.editing.date} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Title" name="title" value={c.editing.title} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Description" name="description" rows={3} value={c.editing.description} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        {c.editing.id && <button type="button" className="btn-cancel" onClick={() => c.setEditing({ date: "", title: "", description: "" })}>Cancel edit</button>}
        <button type="submit">Save</button>
        {c.msg && <div className="msg">{c.msg}</div>}
      </form>
      <div className="admin-list">
        {c.rows.map((r) => (
          <div className="list-row" key={r.id}>
            <div className="list-info">
              <strong>{r.title}</strong>
              <span>{r.date}</span>
            </div>
            <div className="list-actions">
              <button onClick={() => c.setEditing(r)}>Edit</button>
              <button className="btn-danger" onClick={() => c.remove(r.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="admin-form">
      <h2>Settings</h2>
      <p>
        All site content is static. The admin password is managed by the
        <code> ADMIN_PASSWORD</code> environment variable — there is nothing to change here.
      </p>
    </div>
  );
}
