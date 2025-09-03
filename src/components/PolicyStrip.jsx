// src/components/PolicyStrip.jsx
import { FiTruck, FiRefreshCcw, FiHeadphones } from "react-icons/fi";

const Item = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-3 bg-white border rounded-xl px-4 py-3">
    <span className="p-2 rounded-full bg-primary-50 text-primary-700">
      <Icon />
    </span>
    <div>
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  </div>
);

export default function PolicyStrip() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Item icon={FiTruck} title="Free Shipping" subtitle="On orders over ₹999" />
        <Item icon={FiRefreshCcw} title="Free Returns" subtitle="30-day return policy" />
        <Item icon={FiHeadphones} title="24/7 Support" subtitle="We’re here to help" />
      </div>
    </section>
  );
}
