"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "distinguished", label: "Distinguished Personalities" },
  { value: "travel", label: "Travel & Adventure" },
  { value: "team", label: "Team" },
  { value: "sports", label: "Sports" },
  { value: "personal", label: "Personal" },
  { value: "awardsReceived", label: "Awards Received" },
  { value: "awardsPresented", label: "Awards" },
];

const TABS = ["Dashboard", "Portfolio", "Mission & Vision", "Future Vision", "Community", "Testimonials", "Partners", "Settings"];

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

  const refreshUsername = async () => {
    const r = await api("/api/admin/check");
    setUsername(r.username || "admin");
  };

  if (status === "loading") return <div className="admin-loader">Loading...</div>;
  if (status === "login") return <Login onSuccess={() => setStatus("authed")} />;

  return <Dashboard username={username} tab={tab} setTab={setTab} onLogout={() => setStatus("login")} onUsernameUpdate={refreshUsername} />;
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
        <p>Tahseen Abbas Portfolio</p>
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

function Dashboard({ username, tab, setTab, onLogout, onUsernameUpdate }) {
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
          {tab === "Mission & Vision" && <ExperienceTab />}
          {tab === "Future Vision" && <AwardsTab />}
          {tab === "Community" && <CommunityTab />}
          {tab === "Testimonials" && <TestimonialsTab />}
          {tab === "Partners" && <PartnersTab />}
          {tab === "Settings" && <SettingsTab onUsernameUpdate={onUsernameUpdate} />}
        </div>
      </main>
    </div>
  );
}

function DashboardTab() {
  const [counts, setCounts] = useState(null);
  useEffect(() => {
    Promise.all([api("/api/portfolio"), api("/api/partners")]).then(([d, p]) =>
      setCounts({
        portfolio: d.portfolio.length,
        experience: d.experience.length,
        awards: d.awards.length,
        community: d.communities.length,
        testimonials: d.testimonials.length,
        partners: p.length,
      })
    );
  }, []);
  if (!counts) return <div className="admin-loader">Loading...</div>;
  const cards = [
    { label: "Portfolio Images", value: counts.portfolio },
    { label: "Mission & Vision Cards", value: counts.experience },
    { label: "Future Vision Items", value: counts.awards },
    { label: "Community Initiatives", value: counts.community },
    { label: "Testimonials", value: counts.testimonials },
    { label: "Partners", value: counts.partners },
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
        Use the tabs to manage portfolio images, mission &amp; vision, future vision, community
        initiatives, testimonials, partners, and site content. Changes appear on the public site on reload.
      </div>
    </div>
  );
}

function ImageCard({ item, idx, total, onUp, onDown, onDelete, onSave }) {
  const [desc, setDesc] = useState(item.description);
  const dirty = desc !== item.description;
  return (
    <div className="image-card">
      <img src={item.src} alt={item.src} />
      <div className="image-actions">
        <button disabled={idx === 0} onClick={onUp}>↑</button>
        <button disabled={idx === total - 1} onClick={onDown}>↓</button>
        <button className="btn-danger" onClick={onDelete}>Delete</button>
      </div>
      <textarea
        className="portfolio-desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Add description..."
      ></textarea>
      <button
        className="btn-save"
        disabled={!dirty}
        onClick={() => onSave(desc)}
      >
        {dirty ? "Save" : "Saved"}
      </button>
      <div className="image-path" title={item.src}>{item.src}</div>
    </div>
  );
}

function PortfolioTab() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("personal");
  const [description, setDescription] = useState("Chairman Binary Hub Tahseen Abbas");
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
        await api("/api/admin/portfolio", { method: "POST", body: JSON.stringify({ src: url, category, description }) });
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

  const updateDescription = async (id, value) => {
    await api("/api/admin/portfolio", { method: "PUT", body: JSON.stringify({ id, description: value }) });
    setMsg("Description updated.");
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
          <textarea
            placeholder="Description for this image (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          ></textarea>
        </div>
        <div className="form-row">
          <label className={`upload-btn${busy ? " disabled" : ""}`}>
            <i className="fas fa-upload"></i> {busy ? "Uploading..." : "Choose images"}
            <input type="file" accept="image/*" multiple onChange={upload} disabled={busy} hidden />
          </label>
        </div>
        {msg && <div className="msg">{msg}</div>}
      </form>

      {[...CATEGORY_OPTIONS]
        .sort((a, b) => (a.value === category ? -1 : b.value === category ? 1 : 0))
        .map((cat) => {
        const catItems =
          cat.value === "all" ? items : items.filter((i) => i.category === cat.value);
        return (
          <div className="admin-section" key={cat.value}>
            <h3>{cat.label} ({catItems.length})</h3>
            <div className="image-grid">
              {catItems.map((item, idx) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  idx={idx}
                  total={catItems.length}
                  onUp={() => setOrder(item.id, idx - 1)}
                  onDown={() => setOrder(item.id, idx + 1)}
                  onDelete={() => remove(item.id)}
                  onSave={(value) => updateDescription(item.id, value)}
                />
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

  return { rows, editing, setEditing, save, remove, msg, setMsg, load };
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
  const c = useCrud("/api/admin/experience", { icon: "", title: "", description: "", date: "", color: "cyan", image: "" });
  const [uploading, setUploading] = useState(false);

  const onImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { url } = await api("/api/admin/upload", { method: "POST", body: fd });
      c.setEditing({ ...c.editing, image: url });
    } catch (err) {
      c.setMsg(`Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form className="admin-form" onSubmit={c.save}>
        <h2>{c.editing.id ? "Edit" : "Add"} Mission &amp; Vision Card</h2>
        <Field label="Title" name="title" value={c.editing.title} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Font Awesome icon (e.g. fa-laptop-code)" name="icon" value={c.editing.icon} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Color (cyan / yellow / green / blue)" name="color" value={c.editing.color} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Date range" name="date" value={c.editing.date} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Description" name="description" rows={4} value={c.editing.description} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <label className="field">
          <span>Card image</span>
          {c.editing.image && (
            <img src={c.editing.image} alt="Preview" className="field-preview" />
          )}
          <div className="form-row">
            <label className={`upload-btn${uploading ? " disabled" : ""}`}>
              <i className="fas fa-upload"></i>
              {uploading ? "Uploading..." : c.editing.image ? "Replace image" : "Choose image"}
              <input type="file" accept="image/*" onChange={onImage} disabled={uploading} hidden />
            </label>
            {c.editing.image && (
              <button type="button" className="btn-cancel" onClick={() => c.setEditing({ ...c.editing, image: "" })}>Remove</button>
            )}
          </div>
        </label>
        {c.editing.id && <button type="button" className="btn-cancel" onClick={() => c.setEditing({ icon: "", title: "", description: "", date: "", color: "cyan", image: "" })}>Cancel edit</button>}
        <button type="submit">Save</button>
        {c.msg && <div className="msg">{c.msg}</div>}
      </form>
      <div className="admin-list">
        {c.rows.map((r) => (
          <div className="list-row" key={r.id}>
            {r.image && <img src={r.image} alt="" className="list-thumb" />}
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

function CommunityTab() {
  const c = useCrud("/api/admin/community", { icon: "", title: "", description: "" });
  return (
    <div>
      <form className="admin-form" onSubmit={c.save}>
        <h2>{c.editing.id ? "Edit" : "Add"} Community Initiative</h2>
        <Field label="Title" name="title" value={c.editing.title} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Icon (e.g. fa-graduation-cap, fa-users, fa-laptop-code)" name="icon" value={c.editing.icon} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Description" name="description" rows={3} value={c.editing.description} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        {c.editing.id && <button type="button" className="btn-cancel" onClick={() => c.setEditing({ icon: "", title: "", description: "" })}>Cancel edit</button>}
        <button type="submit">Save</button>
        {c.msg && <div className="msg">{c.msg}</div>}
      </form>
      <div className="admin-list">
        {c.rows.map((r) => (
          <div className="list-row" key={r.id}>
            <div className="list-info">
              <strong>{r.title}</strong>
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

function TestimonialsTab() {
  const c = useCrud("/api/admin/testimonials", { text: "", name: "", role: "", avatar: "", approved: true });
  const [uploading, setUploading] = useState(false);

  const onImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { url } = await api("/api/admin/upload", { method: "POST", body: fd });
      c.setEditing({ ...c.editing, avatar: url });
    } catch (err) {
      c.setMsg(`Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const toggleApproved = async (r) => {
    await api("/api/admin/testimonials", {
      method: "PUT",
      body: JSON.stringify({ id: r.id, approved: !r.approved }),
    });
    c.setMsg(r.approved ? "Review unapproved (hidden from site)." : "Review approved (now visible on site).");
    c.load();
  };

  return (
    <div>
      <form className="admin-form" onSubmit={c.save}>
        <h2>{c.editing.id ? "Edit" : "Add"} Testimonial</h2>
        <Field label="Name" name="name" value={c.editing.name} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Role" name="role" value={c.editing.role} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Quote" name="text" rows={3} value={c.editing.text} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <label className="field">
          <span>Avatar image</span>
          {c.editing.avatar && (
            <img src={c.editing.avatar} alt="Preview" className="field-preview" />
          )}
          <div className="form-row">
            <label className={`upload-btn${uploading ? " disabled" : ""}`}>
              <i className="fas fa-upload"></i>
              {uploading ? "Uploading..." : c.editing.avatar ? "Replace image" : "Choose image"}
              <input type="file" accept="image/*" onChange={onImage} disabled={uploading} hidden />
            </label>
            {c.editing.avatar && (
              <button type="button" className="btn-cancel" onClick={() => c.setEditing({ ...c.editing, avatar: "" })}>Remove</button>
            )}
          </div>
        </label>
        <label className="field inline-field">
          <input
            type="checkbox"
            checked={!!c.editing.approved}
            onChange={(e) => c.setEditing({ ...c.editing, approved: e.target.checked })}
          />
          <span>Approved (visible on site)</span>
        </label>
        {c.editing.id && <button type="button" className="btn-cancel" onClick={() => c.setEditing({ text: "", name: "", role: "", avatar: "", approved: true })}>Cancel edit</button>}
        <button type="submit">Save</button>
        {c.msg && <div className="msg">{c.msg}</div>}
      </form>
      <div className="admin-list">
        {c.rows.map((r) => (
          <div className="list-row" key={r.id}>
            <img src={r.avatar || "/images/default-avatar.svg"} alt="" className="list-thumb" />
            <div className="list-info">
              <strong>{r.name} — {r.role}{r.approved === false && <span className="pending-badge">Pending</span>}</strong>
              <span>{r.text}</span>
            </div>
            <div className="list-actions">
              <button className={r.approved === false ? "btn-approve" : ""} onClick={() => toggleApproved(r)}>
                {r.approved === false ? "Approve" : "Hide"}
              </button>
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
  const c = useCrud("/api/admin/awards", { date: "", title: "", description: "", image: "" });
  const [uploading, setUploading] = useState(false);

  const onImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { url } = await api("/api/admin/upload", { method: "POST", body: fd });
      c.setEditing({ ...c.editing, image: url });
    } catch (err) {
      c.setMsg(`Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form className="admin-form" onSubmit={c.save}>
        <h2>{c.editing.id ? "Edit" : "Add"} Future Vision Item</h2>
        <Field label="Date" name="date" value={c.editing.date} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Title" name="title" value={c.editing.title} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <Field label="Description" name="description" rows={3} value={c.editing.description} onChange={(n, v) => c.setEditing({ ...c.editing, [n]: v })} />
        <label className="field">
          <span>Item image</span>
          {c.editing.image && (
            <img src={c.editing.image} alt="Preview" className="field-preview" />
          )}
          <div className="form-row">
            <label className={`upload-btn${uploading ? " disabled" : ""}`}>
              <i className="fas fa-upload"></i>
              {uploading ? "Uploading..." : c.editing.image ? "Replace image" : "Choose image"}
              <input type="file" accept="image/*" onChange={onImage} disabled={uploading} hidden />
            </label>
            {c.editing.image && (
              <button type="button" className="btn-cancel" onClick={() => c.setEditing({ ...c.editing, image: "" })}>Remove</button>
            )}
          </div>
        </label>
        {c.editing.id && <button type="button" className="btn-cancel" onClick={() => c.setEditing({ date: "", title: "", description: "", image: "" })}>Cancel edit</button>}
        <button type="submit">Save</button>
        {c.msg && <div className="msg">{c.msg}</div>}
      </form>
      <div className="admin-list">
        {c.rows.map((r) => (
          <div className="list-row" key={r.id}>
            {r.image && <img src={r.image} alt="" className="list-thumb" />}
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

function PartnersTab() {
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(() => api("/api/admin/partners").then(setRows), []);
  useEffect(() => { load(); }, [load]);

  const add = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setBusy(true);
    setMsg("");
    e.target.value = "";
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const { url } = await api("/api/admin/upload", { method: "POST", body: fd });
        await api("/api/admin/partners", {
          method: "POST",
          body: JSON.stringify({ src: url, name: file.name }),
        });
      }
      setMsg(`Added ${files.length} partner logo${files.length > 1 ? "s" : ""}.`);
      load();
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    await api("/api/admin/partners", { method: "DELETE", body: JSON.stringify({ id }) });
    setMsg("Removed.");
    load();
  };

  return (
    <div>
      <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Add Partner Logo</h2>
        <p className="form-hint">
          Select logo images from your device — they appear in the Partners &amp; Collaborations marquee.
        </p>
        <div className="form-row">
          <label className={`upload-btn${busy ? " disabled" : ""}`}>
            <i className="fas fa-upload"></i> {busy ? "Uploading..." : "Choose images"}
            <input type="file" accept="image/*" multiple onChange={add} disabled={busy} hidden />
          </label>
        </div>
        {msg && <div className="msg">{msg}</div>}
      </form>
      {rows.length === 0 ? (
        <div className="form-hint">No partner logos yet. Add one above.</div>
      ) : (
        <div className="image-grid">
          {rows.map((r) => (
            <div className="image-card" key={r.id}>
              <img src={r.src} alt={r.name || "Partner logo"} />
              <div className="image-actions">
                <button className="btn-danger" onClick={() => remove(r.id)}>Delete</button>
              </div>
              <div className="image-path" title={r.src}>{r.name || "Partner"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsTab({ onUsernameUpdate }) {
  const [pass, setPass] = useState({ current: "", next: "" });
  const [showPw, setShowPw] = useState({ current: false, next: false });
  const [newUser, setNewUser] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const changeUsername = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify({ changeUsername: newUser }),
      });
      setNewUser("");
      setMsg("Username changed.");
      onUsernameUpdate?.();
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify({
          changePassword: { currentPassword: pass.current, newPassword: pass.next },
        }),
      });
      setPass({ current: "", next: "" });
      setMsg("Password changed.");
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <form className="admin-form" onSubmit={changeUsername}>
        <h2>Change Admin Username</h2>
        <input type="text" placeholder="New username" value={newUser}
          onChange={(e) => setNewUser(e.target.value)} required />
        <button type="submit" disabled={busy}>{busy ? "Saving..." : "Change Username"}</button>
      </form>

      <form className="admin-form" onSubmit={changePassword}>
        <h2>Change Admin Password</h2>
        <div className="password-wrap">
          <input type={showPw.current ? "text" : "password"} placeholder="Current password" value={pass.current}
            onChange={(e) => setPass((p) => ({ ...p, current: e.target.value }))} required />
          <button type="button" className="pw-toggle"
            aria-label={showPw.current ? "Hide current password" : "Show current password"}
            onClick={() => setShowPw((s) => ({ ...s, current: !s.current }))}>
            <i className={`fas ${showPw.current ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>
        <div className="password-wrap">
          <input type={showPw.next ? "text" : "password"} placeholder="New password" value={pass.next}
            onChange={(e) => setPass((p) => ({ ...p, next: e.target.value }))} required />
          <button type="button" className="pw-toggle"
            aria-label={showPw.next ? "Hide new password" : "Show new password"}
            onClick={() => setShowPw((s) => ({ ...s, next: !s.next }))}>
            <i className={`fas ${showPw.next ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>
        <button type="submit" disabled={busy}>{busy ? "Saving..." : "Change Password"}</button>
        {msg && <div className="msg">{msg}</div>}
      </form>
    </div>
  );
}
