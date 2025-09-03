import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch(); // in case you show user in header with ui/login

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email";
    if (password.length < 6) e.password = "Password must be at least 6 characters";
    if (password !== confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setErrors({ email: "Account already exists. Try signing in." });
      return;
    }

    const newUser = { name: name.trim(), email: email.trim(), password }; // demo only
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("currentUser", JSON.stringify({ name: newUser.name, email: newUser.email }));
    localStorage.setItem("authToken", "demo-token");

    dispatch({ type: "ui/login" }); // optional
    toast.success("Account created!");
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="bg-white border rounded-2xl shadow-sm p-8 md:p-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">Create Account</h1>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 px-3 outline-none"
              placeholder="Your name"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 px-3 outline-none"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex">
              <input
                type={show1 ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded-l-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 px-3 outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShow1((s) => !s)}
                className="px-3 h-11 rounded-r-lg border border-l-0 border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                {show1 ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <div className="flex">
              <input
                type={show2 ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full h-11 rounded-l-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 px-3 outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShow2((s) => !s)}
                className="px-3 h-11 rounded-r-lg border border-l-0 border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                {show2 ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirm && <p className="text-sm text-red-600 mt-1">{errors.confirm}</p>}
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
