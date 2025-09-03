import { useOutletContext } from "react-router-dom";

export default function AccountHome() {
  const { user } = useOutletContext(); // {name,email}

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Hello {user?.name || "User"}!</h2>

      <div className="grid sm:grid-cols-2 gap-6">
        <Card title="Account">
          <p><b>Name:</b> {user?.name || "-"}</p>
          <p><b>Email:</b> {user?.email || "-"}</p>
          <p><b>Phone:</b> {user?.phone || "—"}</p>
        </Card>

        <Card title="Address">
          <p>Default Billing Address</p>
          <p>{user?.address || "India"}</p>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="text-gray-700 space-y-1">{children}</div>
    </div>
  );
}
