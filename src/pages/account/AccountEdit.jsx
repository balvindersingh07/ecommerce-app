import { useOutletContext } from "react-router-dom";
import { useState } from "react";

export default function AccountEdit() {
  const { user, setUser } = useOutletContext();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    const curr = { ...(user || {}), ...form };
    localStorage.setItem("currentUser", JSON.stringify(curr));
    setUser(curr);
    alert("Profile updated");
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Account Details</h2>
      <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
        <Input label="Name" name="name" value={form.name} onChange={onChange} />
        <Input label="Email Address" name="email" value={form.email} onChange={onChange} />
        <Input label="Phone" name="phone" value={form.phone} onChange={onChange} />
        <Input label="Address" name="address" value={form.address} onChange={onChange} className="sm:col-span-2" />
        <Input label="City" name="city" value={form.city} onChange={onChange} />
        <Input label="State" name="state" value={form.state} onChange={onChange} />
        <Input label="Pincode" name="pincode" value={form.pincode} onChange={onChange} />
        <div className="sm:col-span-2">
          <button className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm mb-1">{label}</span>
      <input
        {...props}
        className="w-full h-11 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 px-3 outline-none"
      />
    </label>
  );
}
