import React, { useState } from "react";
import { LayoutDashboard, CalendarCheck, Users, UserRoundCheck, Wrench, Search, Bell, LogOut, Menu, X, TrendingUp, IndianRupee, Clock3, CheckCircle2, MapPin, ArrowUpRight } from "lucide-react";
import "./admin.css";

const seedBookings = [
  { id: "LE-1001", customer: "Rahul Sharma", service: "Plumbing", provider: "Amit Kumar", date: "22 Oct 2026", amount: 800, status: "Pending" },
  { id: "LE-1002", customer: "Priya Singh", service: "Electrical", provider: "Rohit Verma", date: "22 Oct 2026", amount: 1200, status: "Confirmed" },
  { id: "LE-1003", customer: "Arjun Mehta", service: "Home Cleaning", provider: "Neha Services", date: "21 Oct 2026", amount: 1500, status: "Completed" },
  { id: "LE-1004", customer: "Sneha Gupta", service: "AC Service", provider: "CoolNest AC Care", date: "21 Oct 2026", amount: 950, status: "Pending" },
];
const seedProviders = [
  { name: "Amit Kumar", service: "Plumbing", location: "Noida", status: "Approved" },
  { name: "Rohit Verma", service: "Electrical", location: "Delhi", status: "Pending" },
  { name: "Neha Services", service: "Home Cleaning", location: "Ghaziabad", status: "Approved" },
  { name: "CoolNest AC Care", service: "AC Service", location: "Noida", status: "Pending" },
];
const seedUsers = [
  { name: "Rahul Sharma", email: "rahul@example.com", role: "Customer" },
  { name: "Priya Singh", email: "priya@example.com", role: "Customer" },
  { name: "Amit Kumar", email: "amit@example.com", role: "Provider" },
  { name: "Sneha Gupta", email: "sneha@example.com", role: "Customer" },
];
const seedServices = [
  { name: "Home Cleaning", category: "Cleaning", price: "₹499+" },
  { name: "Plumbing", category: "Home Repair", price: "₹299+" },
  { name: "Electrical", category: "Home Repair", price: "₹349+" },
  { name: "AC Service", category: "Appliance Repair", price: "₹599+" },
  { name: "Painting", category: "Home Improvement", price: "₹799+" },
];
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Bookings", icon: CalendarCheck },
  { label: "Providers", icon: UserRoundCheck },
  { label: "Users", icon: Users },
  { label: "Services", icon: Wrench },
];
function Status({ value }) { return <span className={`status status-${value.toLowerCase()}`}>{value}</span>; }

export default function Admin() {
  const [active, setActive] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState(seedBookings);
  const [providers, setProviders] = useState(seedProviders);
  const [users] = useState(seedUsers);
  const [services, setServices] = useState(seedServices);
  const q = search.trim().toLowerCase();
  const filteredBookings = bookings.filter(x => `${x.id} ${x.customer} ${x.service} ${x.provider}`.toLowerCase().includes(q));
  const filteredProviders = providers.filter(x => `${x.name} ${x.service} ${x.location} ${x.status}`.toLowerCase().includes(q));
  const filteredUsers = users.filter(x => `${x.name} ${x.email} ${x.role}`.toLowerCase().includes(q));
  const filteredServices = services.filter(x => `${x.name} ${x.category}`.toLowerCase().includes(q));
  const pending = bookings.filter(x => x.status === "Pending").length;
  const revenue = bookings.filter(x => x.status === "Completed").reduce((sum, x) => sum + x.amount, 0);
  function updateBooking(id, status) { setBookings(old => old.map(x => x.id === id ? { ...x, status } : x)); }
  function updateProvider(name, status) { setProviders(old => old.map(x => x.name === name ? { ...x, status } : x)); }
  function addService() {
    const name = window.prompt("New service name:");
    if (!name?.trim()) return;
    if (services.some(x => x.name.toLowerCase() === name.trim().toLowerCase())) return window.alert("Service already exists.");
    setServices(old => [...old, { name: name.trim(), category: "Other", price: "Set price" }]);
  }
  function logout() { window.location.href = "/login"; }

  return <div className="admin-layout">
    {mobileMenu && <button className="admin-overlay" aria-label="Close menu" onClick={() => setMobileMenu(false)} />}
    <aside className={`admin-sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
      <a href="/" className="admin-brand"><span className="admin-brand-icon"><MapPin size={23}/></span><span>local<strong>Ease</strong><small>ADMIN CONSOLE</small></span></a>
      <div className="sidebar-label">WORKSPACE</div>
      <nav className="admin-nav">{navItems.map(({label, icon: Icon}) => <button key={label} className={`admin-nav-item ${active === label ? "active" : ""}`} onClick={() => {setActive(label);setSearch("");setMobileMenu(false);}}><Icon size={19}/><span>{label}</span>{label === "Bookings" && pending > 0 && <span className="nav-count">{pending}</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="admin-profile"><div className="profile-avatar">A</div><div><strong>Admin User</strong><span>Administrator</span></div></div><button className="admin-logout" onClick={logout}><LogOut size={18}/> Logout</button></div>
    </aside>
    <main className="admin-main">
      <header className="admin-topbar"><button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X/> : <Menu/>}</button><div className="topbar-heading"><span>LocalEase / Admin</span><h1>{active}</h1></div><div className="topbar-actions"><label className="admin-search"><Search size={18}/><input placeholder="Search this section..." value={search} onChange={e => setSearch(e.target.value)}/></label><button className="notification-button" aria-label="Notifications" onClick={() => window.alert(`${pending} bookings are pending.`)}><Bell size={19}/>{pending > 0 && <i/>}</button><div className="topbar-avatar">A</div></div></header>
      <div className="admin-content">
        {active === "Dashboard" && <>
          <div className="welcome-row"><div><h2>Welcome back, Admin 👋</h2><p>Here’s what’s happening with your local services today.</p></div><span className="date-chip"><Clock3 size={16}/> 22 October 2026</span></div>
          <div className="admin-stat-grid">
            <Stat icon={<Users/>} tone="teal" label="Total Users" value={users.length} note="Sample accounts"/>
            <Stat icon={<UserRoundCheck/>} tone="blue" label="Service Providers" value={providers.length} note={`${providers.filter(x=>x.status === "Approved").length} approved`}/>
            <Stat icon={<CalendarCheck/>} tone="orange" label="Total Bookings" value={bookings.length} note={`${pending} pending`}/>
            <Stat icon={<IndianRupee/>} tone="purple" label="Completed Revenue" value={`₹${revenue.toLocaleString("en-IN")}`} note="Demo calculation"/>
          </div>
          <Panel title="Recent Bookings" subtitle="Review and update service requests." action={<button className="text-action" onClick={() => setActive("Bookings")}>View all <ArrowUpRight size={16}/></button>}><BookingTable items={bookings.slice(0,4)} onUpdate={updateBooking}/></Panel>
          <Panel title="Provider Approvals" subtitle="Review providers waiting for approval." action={<button className="text-action" onClick={() => setActive("Providers")}>Manage providers <ArrowUpRight size={16}/></button>}><ProviderTable items={providers.filter(x=>x.status === "Pending")} onUpdate={updateProvider}/>{providers.every(x=>x.status !== "Pending") && <p className="empty-state">All providers have been reviewed.</p>}</Panel>
        </>}
        {active === "Bookings" && <Panel title="All Bookings" subtitle="Search bookings and update their status." action={<span className="result-count">{filteredBookings.length} results</span>}><BookingTable items={filteredBookings} onUpdate={updateBooking}/></Panel>}
        {active === "Providers" && <Panel title="Service Providers" subtitle="Approve or reject provider profiles." action={<span className="result-count">{filteredProviders.length} providers</span>}><ProviderTable items={filteredProviders} onUpdate={updateProvider}/></Panel>}
        {active === "Users" && <Panel title="Registered Users" subtitle="Sample customer and provider accounts." action={<span className="result-count">{filteredUsers.length} users</span>}><div className="table-scroll"><table className="admin-table"><thead><tr><th>USER</th><th>EMAIL</th><th>ROLE</th></tr></thead><tbody>{filteredUsers.map(u=><tr key={u.email}><td><strong>{u.name}</strong></td><td>{u.email}</td><td><span className="role-chip">{u.role}</span></td></tr>)}</tbody></table>{!filteredUsers.length && <p className="empty-state">No users found.</p>}</div></Panel>}
        {active === "Services" && <Panel title="Manage Services" subtitle="Add or remove services from this demo dashboard." action={<button className="admin-primary-button" onClick={addService}>+ Add service</button>}><div className="service-admin-grid">{filteredServices.map(s=><article className="service-admin-card" key={s.name}><div className="service-admin-icon"><Wrench size={20}/></div><h4>{s.name}</h4><p>{s.category}</p><div className="service-admin-bottom"><strong>{s.price}</strong><button onClick={() => { if(window.confirm(`Remove ${s.name}?`)) setServices(old=>old.filter(x=>x.name!==s.name)); }}>Remove</button></div></article>)}</div>{!filteredServices.length && <p className="empty-state">No services found.</p>}</Panel>}
        <footer className="admin-footer"><span>© 2026 LocalEase Admin</span><span>Hackathon demo dashboard</span></footer>
      </div>
    </main>
  </div>;
}
function Stat({icon,tone,label,value,note}) { return <div className="admin-stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><span>{label}</span><strong>{value}</strong><small><TrendingUp size={14}/> {note}</small></div>; }
function Panel({title,subtitle,action,children}) { return <section className="admin-panel"><div className="panel-heading"><div><h3>{title}</h3><p>{subtitle}</p></div>{action}</div>{children}</section>; }
function BookingTable({items,onUpdate}) { return <div className="table-scroll"><table className="admin-table"><thead><tr><th>BOOKING</th><th>CUSTOMER</th><th>SERVICE / PROVIDER</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{items.map(x=><tr key={x.id}><td><strong className="booking-id">{x.id}</strong></td><td>{x.customer}</td><td><strong>{x.service}</strong><small className="table-subtext">{x.provider}</small></td><td>{x.date}</td><td><strong>₹{x.amount.toLocaleString("en-IN")}</strong></td><td><Status value={x.status}/></td><td><select aria-label={`Change status ${x.id}`} value={x.status} onChange={e=>onUpdate(x.id,e.target.value)}><option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></select></td></tr>)}</tbody></table>{!items.length && <p className="empty-state">No bookings found.</p>}</div>; }
function ProviderTable({items,onUpdate}) { return <div className="table-scroll"><table className="admin-table"><thead><tr><th>PROVIDER</th><th>SERVICE</th><th>LOCATION</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{items.map(x=><tr key={x.name}><td><strong>{x.name}</strong></td><td>{x.service}</td><td>{x.location}</td><td><Status value={x.status}/></td><td>{x.status === "Pending" ? <div className="provider-actions"><button onClick={()=>onUpdate(x.name,"Approved")}>Approve</button><button onClick={()=>onUpdate(x.name,"Rejected")}>Reject</button></div> : <select aria-label={`Change ${x.name} status`} value={x.status} onChange={e=>onUpdate(x.name,e.target.value)}><option>Approved</option><option>Pending</option><option>Rejected</option></select>}</td></tr>)}</tbody></table>{!items.length && <p className="empty-state">No providers found.</p>}</div>; }
