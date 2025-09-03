export default function AccountOrders() {
  // demo: load orders from localStorage; structure: [{id,date,status,total,items}]
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Your Orders</h2>

      <div className="overflow-auto">
        <table className="w-full text-left border-separate" style={{ borderSpacing: 0 }}>
          <thead>
            <tr className="text-sm text-gray-600 bg-gray-50">
              <Th>Order</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Total</Th>
              <Th>Items</Th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-b">
                  <Td>#{o.id}</Td>
                  <Td>{o.date}</Td>
                  <Td>
                    <span className="px-2 py-1 rounded-full text-xs bg-primary-50 text-primary-700">
                      {o.status}
                    </span>
                  </Td>
                  <Td>₹{o.total}</Td>
                  <Td>{o.items?.length || 0}</Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }) {
  return <th className="p-3 first:rounded-l-lg last:rounded-r-lg">{children}</th>;
}
function Td({ children }) {
  return <td className="p-3 align-top">{children}</td>;
}
