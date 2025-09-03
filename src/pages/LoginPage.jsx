import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 demo auth: check saved users, else allow any email/pass for now
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (user && user.password === password) {
      localStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));
      localStorage.setItem("authToken", "demo-token");
      toast.success("Logged in!");
      navigate("/");
    } else if (users.length === 0) {
      // if no signup used yet, allow simple login for demo
      localStorage.setItem("currentUser", JSON.stringify({ name: "Guest", email }));
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full h-11 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 px-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-11 rounded-l-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 px-3 outline-none"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="px-3 h-11 rounded-r-lg border border-l-0 border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition"
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
