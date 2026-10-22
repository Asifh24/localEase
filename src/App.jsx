import { useMemo, useState } from "react";

import React from "react";

import Login from "./login";

import Admin from "./admin";

import {

  ArrowRight, MapPin, Search, ShieldCheck, Star, Clock3, CheckCircle2,

  Menu, X, Wrench, Sparkles, Zap, Paintbrush, Snowflake, Droplets,

  WashingMachine, Flower2, CalendarDays, ChevronRight, BadgeCheck, HeartHandshake

} from "lucide-react";



const services = [

  { name: "Home Cleaning", icon: Sparkles, color: "mint", count: "24 providers", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=85" },

  { name: "Plumbing", icon: Droplets, color: "blue", count: "18 providers", image: "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },

  { name: "Electrical", icon: Zap, color: "yellow", count: "16 providers", image: "https://plus.unsplash.com/premium_photo-1661908782924-de673a5c6988?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },

  { name: "AC Service", icon: Snowflake, color: "purple", count: "12 providers", image: "https://plus.unsplash.com/premium_photo-1682126009570-3fe2399162f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },

  { name: "Painting", icon: Paintbrush, color: "pink", count: "9 providers", image: "https://images.unsplash.com/photo-1511822148790-e7b58ba14c72?q=80&w=1127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },

  { name: "Carpentry", icon: Wrench, color: "orange", count: "14 providers", image: "https://images.unsplash.com/photo-1544164560-adac3045edb2?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },

  { name: "Laundry", icon: WashingMachine, color: "blue", count: "8 providers", image: "https://images.unsplash.com/photo-1604335398980-ededcadcc37d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },

  { name: "Gardening", icon: Flower2, color: "mint", count: "7 providers", image: "https://images.unsplash.com/photo-1611843467160-25afb8df1074?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },

];



const providers = [

  { id: 1, name: "Aarav Home Care", service: "Home Cleaning", rating: 4.9, reviews: 128, price: 499, distance: "1.2 km away", time: "Available today", initials: "AC", color: "avatar-blue", about: "Home cleaning, kitchen and bathroom deep cleaning with a friendly local team." },

  { id: 2, name: "Ravi Plumbing Works", service: "Plumbing", rating: 4.8, reviews: 96, price: 299, distance: "1.8 km away", time: "Available in 45 min", initials: "RP", color: "avatar-orange", about: "Repairs for leaking taps, blocked drains, pipes and bathroom fittings." },

  { id: 3, name: "BrightSpark Electricians", service: "Electrical", rating: 4.9, reviews: 84, price: 349, distance: "2.1 km away", time: "Available today", initials: "BE", color: "avatar-purple", about: "Home electrical repairs, switches, fans, lights and installations." },

  { id: 4, name: "CoolNest AC Care", service: "AC Service", rating: 4.7, reviews: 71, price: 599, distance: "2.6 km away", time: "Tomorrow, 10 AM", initials: "CN", color: "avatar-mint", about: "AC cleaning, servicing and seasonal maintenance." },

  { id: 5, name: "ColorCraft Painters", service: "Painting", rating: 4.8, reviews: 63, price: 799, distance: "3.0 km away", time: "Available today", initials: "CC", color: "avatar-pink", about: "Interior painting and touch-ups with careful preparation." },

  { id: 6, name: "FixRight Carpentry", service: "Carpentry", rating: 4.8, reviews: 58, price: 399, distance: "3.4 km away", time: "Available in 2 hours", initials: "FR", color: "avatar-yellow", about: "Furniture assembly, shelves, hinges and small carpentry repairs." },

];



const steps = [

  { n: "01", title: "Tell us what you need", text: "Choose a service and enter your area to find local experts.", icon: Search },

  { n: "02", title: "Compare local experts", text: "Check ratings, starting prices and availability before choosing.", icon: ShieldCheck },

  { n: "03", title: "Request a booking", text: "Send a request and coordinate with the provider.", icon: CalendarDays },

];



export default function App() {

  const [query, setQuery] = useState("");

  const [location, setLocation] = useState("");

  const [activeService, setActiveService] = useState("All services");

  const [notice, setNotice] = useState("");

  const [selected, setSelected] = useState(null);

  const [booking, setBooking] = useState(null);

  const [bookingDone, setBookingDone] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [sort, setSort] = useState("Recommended");
const filtered = useMemo(() => {

    const q = query.trim().toLowerCase();

    let list = providers.filter(p =>

      (activeService === "All services" || p.service === activeService) &&

      (!q || `${p.name} ${p.service} ${p.about}`.toLowerCase().includes(q))

    );

    if (sort === "Lowest price") list = [...list].sort((a, b) => a.price - b.price);

    if (sort === "Top rated") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;

  }, [activeService, query, sort]);



  function searchServices(e) {

    e.preventDefault();

    const q = query.trim().toLowerCase();

    const match = services.find(s => s.name.toLowerCase().includes(q) || (q === "cleaning" && s.name === "Home Cleaning") || (q === "electrician" && s.name === "Electrical"));

    setActiveService(q && match ? match.name : "All services");

    setNotice(`Showing service options${location.trim() ? ` for ${location.trim()}` : ""}. Select a profile to see details.`);

    document.getElementById("providers")?.scrollIntoView({ behavior: "smooth" });

  }



  function pickService(name) {

    setActiveService(name);

    setQuery(name === "All services" ? "" : name);

    setNotice(`${name} providers are shown below.`);

    document.getElementById("providers")?.scrollIntoView({ behavior: "smooth" });

  }



  function submitBooking(e) {

    e.preventDefault();

    setBookingDone(true);

  }



  function closeBooking() {

    setBooking(null);

    setBookingDone(false);

  }

  // Route to the admin dashboard or login page when requested.
  if (window.location.pathname === "/admin") {
    return <Admin />;
  }

 if (window.location.pathname === "/login") {
  return <Login />;
}

return (

    <div className="app">

      <header className="navbar">

        <a className="brand" href="#home"><span className="brand-icon"><Sparkles size={18} fill="currentColor" /></span><span>local<span className="brand-blue">Ease</span></span></a>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>

          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#how" onClick={() => setMenuOpen(false)}>How it works</a><a href="#providers" onClick={() => setMenuOpen(false)}>Find experts</a><a href="#why" onClick={() => setMenuOpen(false)}>Why LocalEase</a>

        </nav>

        <a className="button button-primary nav-cta" href="#search">Find a service <ArrowRight size={15} /></a>

      </header>



      <main>



<section className="hero" id="home">

  <div className="hero-copy">

    <div className="eyebrow light">

      <span className="eyebrow-dot"></span>

      LOCAL SERVICES, MADE SIMPLE

    </div>



    <h1>

      Find the right help,

      <br />

      <span>right around you.</span>

    </h1>



    <p>

      Discover trusted local professionals for everyday

      services, compare your options and find the right

      person for the job.

    </p>



    <form className="search-panel" id="search" onSubmit={searchServices}>

      <label className="search-input">

        <Search size={18} />

        <input

          value={query}

          onChange={(e) => setQuery(e.target.value)}

          placeholder="What service do you need?"

          aria-label="Service needed"

        />

      </label>



      <label className="search-input">

        <MapPin size={18} />

        <input

          value={location}

          onChange={(e) => setLocation(e.target.value)}

          placeholder="Enter your area or pincode"

          aria-label="Your location"

        />

      </label>



      <button className="button button-dark" type="submit">

        Find services <ArrowRight size={16} />

      </button>

    </form>



    <div className="popular">

      <span>Popular services:</span>

      <button type="button" onClick={() => pickService("Home Cleaning")}>

        Cleaning

      </button>

      <button type="button" onClick={() => pickService("Plumbing")}>

        Plumbing

      </button>

      <button type="button" onClick={() => pickService("Electrical")}>

        Electrical

      </button>

    </div>

  </div>



  <div className="hero-visual">

    <div className="hero-photo">

      <img

        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85"

        alt="Home cleaning professional at work"

      />

    </div>



    <div className="float-card float-rating">

      <span className="float-icon star-bg">

        <Star size={17} fill="currentColor" />

      </span>

      <div>

        <strong>Trusted local experts</strong>

        <p>Compare before you choose</p>

      </div>

    </div>



    <div className="float-card float-booking">

      <span className="float-icon cal-bg">

        <CalendarDays size={17} />

      </span>

      <div>

        <strong>Simple booking</strong>

        <p>Find help for your home</p>

      </div>

    </div>

  </div>

</section>





        <section className="trust-strip"><div><ShieldCheck /><span><strong>Trusted profiles</strong><small>Clear provider details</small></span></div><div><Star /><span><strong>Compare ratings</strong><small>Choose with confidence</small></span></div><div><Clock3 /><span><strong>Flexible timing</strong><small>Find a convenient slot</small></span></div><div><HeartHandshake /><span><strong>Local support</strong><small>People in your area</small></span></div></section>



        <section className="section" id="services">

          <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> WHAT DO YOU NEED?</div><h2>One place for <span>everyday fixes.</span></h2></div><button className="text-link" onClick={() => pickService("All services")}>Explore all services <ArrowRight size={16} /></button></div>

          <p className="section-subtitle">From a dripping tap to a weekend deep clean, find the right person for the job.</p>

          <div className="service-grid">{services.map(({ name, icon: Icon, color, count, image }) => <button className={`service-card ${activeService === name ? "chosen" : ""}`} key={name} onClick={() => pickService(name)}><div className="service-image"><img src={image} alt={name} loading="lazy" /><span className={`service-icon ${color}`}><Icon size={19} /></span><span className="service-arrow"><ArrowRight size={16} /></span></div><div className="service-info"><strong>{name}</strong><span>{count}</span></div></button>)}</div>

        </section>



        <section className="how-section" id="how"><div className="how-copy"><div className="eyebrow"><span className="eyebrow-dot" /> SIMPLE BY DESIGN</div><h2>Book in <span>three easy steps.</span></h2><p>No endless searching. No guesswork. Just a simpler way to get things done.</p><a className="button button-primary" href="#providers">Find your local expert <ArrowRight size={16} /></a></div><div className="steps">{steps.map(({ n, title, text, icon: Icon }) => <div className="step-card" key={n}><span className="step-number">{n}</span><span className="step-icon"><Icon size={20} /></span><div><h3>{title}</h3><p>{text}</p></div><ChevronRight className="step-chevron" size={18} /></div>)}</div><div className="how-decoration"><CheckCircle2 size={36} /><strong>Less stress.<br />More living.</strong></div></section>



        <section className="section providers-section" id="providers">

          <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> PEOPLE IN YOUR CORNER</div><h2>Meet local <span>experts.</span></h2></div><label className="sort-control">Sort by <select value={sort} onChange={e => setSort(e.target.value)}><option>Recommended</option><option>Top rated</option><option>Lowest price</option></select></label></div>

          <div className="filter-chips">{["All services", ...services.map(s => s.name)].map(name => <button key={name} className={activeService === name ? "filter-chip active" : "filter-chip"} onClick={() => pickService(name)}>{name}</button>)}</div>

          {notice && <div className="notice"><CheckCircle2 size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={15} /></button></div>}

          <div className="provider-grid">{filtered.map(p => <article className="provider-card" key={p.id}><div className="provider-top"><div className={`provider-avatar ${p.color}`}>{p.initials}</div><button className="circle-arrow" onClick={() => setSelected(p)} aria-label={`View ${p.name}`}><ArrowRight size={17} /></button></div><div className="provider-title"><h3>{p.name}</h3><BadgeCheck size={17} /></div><span className="provider-service">{p.service}</span><div className="provider-meta"><span className="rating"><Star size={14} fill="currentColor" /> {p.rating} <small>({p.reviews})</small></span><span><MapPin size={13} />{p.distance}</span></div><div className="provider-bottom"><div><small>Starting from</small><strong>₹{p.price}</strong></div><button className="button button-outline" onClick={() => setSelected(p)}>View profile</button></div><div className="availability"><span />{p.time}</div></article>)}{filtered.length === 0 && <div className="empty-state"><Search size={28} /><h3>No exact match yet</h3><p>Try another service or view all providers.</p><button className="button button-primary" onClick={() => { setActiveService("All services"); setQuery(""); }}>Show all providers</button></div>}</div>

          <p className="demo-note">Hackathon demo: provider profiles, prices, ratings and availability are sample data.</p>

        </section>



        <section className="why-section" id="why"><div className="why-copy"><div className="eyebrow"><span className="eyebrow-dot" /> A BETTER WAY TO GET HELP</div><h2>Good service starts with <span>feeling sure.</span></h2><p>LocalEase helps you make a more informed choice by putting the details that matter in one simple place.</p><div className="why-points"><div><CheckCircle2 /><span><strong>Clear information</strong><small>Know the service and starting price before you reach out.</small></span></div><div><CheckCircle2 /><span><strong>Compare your options</strong><small>Review ratings and choose a provider that suits your needs.</small></span></div><div><CheckCircle2 /><span><strong>Made for local communities</strong><small>Discover independent professionals working near your area.</small></span></div></div></div><div className="why-visual"><img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85" alt="Home service professionals at work" loading="lazy" /><div className="why-note"><ShieldCheck size={23} /><div><strong>Your home. Your choice.</strong><small>Compare first. Choose confidently.</small></div></div><div className="why-mini"><span>★★★★★</span><strong>Community first</strong><small>Helping local skills get discovered</small></div></div></section>



        <section className="cta-section"><div className="cta-spark"><Sparkles size={23} /></div><div><div className="eyebrow light">YOUR NEXT FIX STARTS HERE</div><h2>Make room for what matters.</h2><p>Let LocalEase help you find the right hands for the job.</p></div><a className="button button-white" href="#search">Find a service <ArrowRight size={17} /></a><span className="cta-orb orb-one" /><span className="cta-orb orb-two" /></section>

      </main>



      <footer className="footer"><a className="brand" href="#home"><span className="brand-icon"><Sparkles size={18} fill="currentColor" /></span><span>local<span className="brand-blue">Ease</span></span></a><p>Good help, right around you.</p><div className="footer-links"><a href="#services">Services</a><a href="#how">How it works</a><a href="#providers">Find experts</a><a href="mailto:hello@localease.demo">Contact</a></div><span className="copyright">© 2026 LocalEase · Built for the hackathon</span></footer>



      {selected && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null); }}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="profile-title"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><X /></button><div className={`provider-avatar modal-avatar ${selected.color}`}>{selected.initials}</div><div className="modal-kicker"><BadgeCheck size={15} /> LocalEase provider profile</div><h2 id="profile-title">{selected.name}</h2><p className="modal-subtitle">{selected.service} · {selected.distance}</p><div className="modal-stats"><span><Star size={15} fill="currentColor" /> {selected.rating} <small>({selected.reviews} reviews)</small></span><span><MapPin size={15} />{selected.distance}</span></div><p className="modal-about">{selected.about}</p><div className="modal-price"><span>Starting price</span><strong>₹{selected.price}</strong></div><div className="modal-availability"><Clock3 size={16} /> {selected.time}</div><button className="button button-primary modal-main-button" onClick={() => { setBooking(selected); setSelected(null); }}>Request a booking <ArrowRight size={17} /></button><p className="modal-footnote">Demo booking only — no payment will be taken.</p></section></div>}



      {booking && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) closeBooking(); }}><section className="modal-card booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" onClick={closeBooking} aria-label="Close"><X /></button>{bookingDone ? <div className="success-state"><div className="success-icon"><CheckCircle2 size={34} /></div><h2>Request prepared!</h2><p>Your demo booking request for <strong>{booking.name}</strong> has been recorded on this page.</p><p className="modal-footnote">This prototype does not contact a real provider.</p><button className="button button-primary modal-main-button" onClick={closeBooking}>Done</button></div> : <><div className="modal-kicker"><CalendarDays size={15} /> BOOK A LOCAL SERVICE</div><h2 id="booking-title">Request a booking</h2><p className="modal-subtitle">With {booking.name} · {booking.service}</p><form className="booking-form" onSubmit={submitBooking}><label>Your name<input required placeholder="Enter your name" /></label><label>Phone number<input required type="tel" minLength="10" placeholder="10-digit mobile number" /></label><label>Service address<input required placeholder="House / street / area" defaultValue={location} /></label><div className="form-row"><label>Preferred date<input required type="date" min={new Date().toISOString().slice(0, 10)} /></label><label>Preferred time<select defaultValue="Flexible"><option>Flexible</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label></div><label>Work details<textarea rows="3" placeholder="Describe the work (optional)" /></label><div className="modal-price"><span>Estimated starting price</span><strong>₹{booking.price}</strong></div><button className="button button-primary modal-main-button" type="submit">Confirm demo request <ArrowRight size={17} /></button><p className="modal-footnote">Prototype only. No real booking or payment is made.</p></form></>}</section></div>}

    </div>

  );

}
