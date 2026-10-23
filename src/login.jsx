import React from "react";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  MapPin,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import "./login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");



function handleSubmit(e) {
  e.preventDefault();

  const adminEmail = "admin@localease.com";
  const adminPassword = "Admin@123";

  const customerEmail = "customer@localease.com";
  const customerPassword = "Customer@123";

  const enteredEmail = email.trim().toLowerCase();

  if (role === "admin") {
    if (
      enteredEmail === adminEmail &&
      password === adminPassword
    ) {
      window.location.href = "/admin";
    } else {
      alert("Invalid admin email or password!");
    }
  } else {
    if (
      enteredEmail === customerEmail &&
      password === customerPassword
    ) {
      window.location.href = "/home";
    } else {
      alert("Invalid customer email or password!");
    }
  }
}
7


  return (
    <div className="login-page">
      <header className="login-navbar">
        <a href="/" className="login-brand">
          <span className="login-logo">
            <MapPin size={23} />
          </span>
          <span>
            local<span className="brand-highlight">Ease</span>
          </span>
        </a>

        <p>
          New here? <a href="/signup">Create account</a>
        </p>
      </header>

      <main className="login-main">
        <section className="login-visual">
          <div className="visual-content">
            <span className="visual-badge">
              YOUR NEIGHBORHOOD, CONNECTED
            </span>

            <h1>
              Local help.
              <br />
              <span>Made simple.</span>
            </h1>

            <p>
              Discover trusted local professionals and find
              the right help for your everyday needs.
            </p>

            <div className="visual-stats">
              <div>
                <strong>Local</strong>
                <span>Service discovery</span>
              </div>
              <div>
                <strong>Trusted</strong>
                <span>Provider profiles</span>
              </div>
              <div>
                <strong>Simple</strong>
                <span>Easy booking</span>
              </div>
            </div>
          </div>
        </section>

        <section className="login-form-section">
          <div className="login-card">
            <div className="mobile-login-logo">
              <MapPin size={25} />
            </div>

            <span className="form-eyebrow">WELCOME BACK</span>
            <div className="login-role-selector">
  <button
    type="button"
    className={role === "customer" ? "active" : ""}
    onClick={() => setRole("customer")}
  >
    Login as Customer
  </button>

  <button
    type="button"
    className={role === "admin" ? "active" : ""}
    onClick={() => setRole("admin")}
  >
    Login as Admin
  </button>
</div>
            <h2>Sign in to LocalEase</h2>

            <p className="form-subtitle">
              Enter your details to access your account.
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="login-email">Email address</label>

              <div className="login-input-wrap">
                <Mail size={19} />
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="password-label-row">
                <label htmlFor="login-password">Password</label>
                <a href="/forgot-password">Forgot password?</a>
              </div>

              <div className="login-input-wrap">
                <Lock size={19} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              <label className="remember-row">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button type="submit" className="login-submit">
                Sign in <ArrowRight size={19} />
              </button>
            </form>

            <div className="login-divider">
              <span>OR CONTINUE WITH</span>
            </div>

            <button
              type="button"
              className="google-login"
              onClick={() =>
                alert("Google login is not connected yet.")
              }
            >
              <span className="google-g">G</span>
              Continue with Google
            </button>

            <p className="login-bottom-text">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>

            <p className="login-terms">
              By continuing, you agree to our Terms of Service
              and Privacy Policy.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
