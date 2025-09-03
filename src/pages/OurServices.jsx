import { FiTruck, FiRefreshCw, FiLock, FiHeadphones, FiGift } from "react-icons/fi";

function Item({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-3">
      <div className="shrink-0 p-2 rounded bg-primary-50 text-primary-700"><Icon /></div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm">{text}</p>
      </div>
    </div>
  );
}

export default function OurServices() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Our Services</h1>
      <div className="grid sm:grid-cols-2 gap-6">
        <Item icon={FiTruck} title="Fast & Free Delivery"
              text="₹999+ orders te free, baaki cities ch reliable partners." />
        <Item icon={FiRefreshCw} title="Easy Returns & Exchange"
              text="7–10 din vich hassle-free pickup & instant exchange/refund." />
        <Item icon={FiLock} title="100% Secure Payments"
              text="UPI, Cards, Net-banking — PCI-DSS compliant gateway." />
        <Item icon={FiHeadphones} title="24/7 Support"
              text="WhatsApp/Email te jaldi resolution. Satisfaction first." />
        <Item icon={FiGift} title="Exclusive Deals"
              text="App/website only drops, festival & clearance offers." />
      </div>
    </div>
  );
}
