// src/pages/LoginPage.jsx
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const emailRegex =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const MIN_PASS_LEN = 6;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const errors = useMemo(() => {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(email)) e.email = "Enter a valid email address";

    if (!password.trim()) e.password = "Password is required";
    else if (password.length < MIN_PASS_LEN)
      e.password = `Must be at least ${MIN_PASS_LEN} characters`;
    return e;
  }, [email, password]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isValid) {
      toast.error("Please fix the errors and try again");
      return;
    }

    // 🔐 demo auth: check saved users, else allow any email/pass (demo)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (user && user.password === password) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name: user.name, email: user.email })
      );
      localStorage.setItem("authToken", "demo-token");
      toast.success("Logged in!");
      navigate("/");
    } else if (users.length === 0) {
      // demo fallback if signup not used
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name: "Guest", email })
      );
      localStorage.setItem("authToken", "demo-token");
      toast.info("Demo login");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border rounded-2xl shadow-sm p-8 md:p-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">Sign in</h1>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full h-11 rounded-lg border px-3 outline-none focus:ring-2
              ${touched.email && errors.email ? "border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-primary-500 focus:ring-primary-100"}`}
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={touched.email && errors.email ? "email-error" : undefined}
            />
            {touched.email && errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="flex">
              <input
                id="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`w-full h-11 rounded-l-lg border px-3 outline-none focus:ring-2
                ${touched.password && errors.password ? "border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-primary-500 focus:ring-primary-100"}`}
                aria-invalid={touched.password && !!errors.password}
                aria-describedby={touched.password && errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="px-3 h-11 rounded-r-lg border border-l-0 border-gray-300 text-gray-600 hover:bg-gray-50"
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
            {touched.password && errors.password && (
              <p id="password-error" className="mt-1 text-xs text-red-600">
                {errors.password}
              </p>
            )}
            <p className="mt-1 text-[11px] text-gray-500">
              Minimum {MIN_PASS_LEN} characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full h-11 rounded-lg text-white font-semibold transition
            ${isValid ? "bg-primary-600 hover:bg-primary-700" : "bg-gray-300 cursor-not-allowed"}`}
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 text-sm">
          <Link to="#" className="text-primary-700 hover:underline">
            Forgot password?
          </Link>
          <span className="text-gray-500">
            New here?{" "}
            <Link to="/signup" className="text-primary-700 hover:underline">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
