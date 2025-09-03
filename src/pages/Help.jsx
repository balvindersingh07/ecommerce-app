import { Link } from "react-router-dom";
export default function Help() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-3xl font-bold">Help Center</h1>
      <p className="text-gray-700">Quick links:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li><Link className="text-primary-700 underline" to="/faq">FAQ</Link></li>
        <li><Link className="text-primary-700 underline" to="/returns">Returns</Link></li>
        <li><Link className="text-primary-700 underline" to="/shipping">Shipping</Link></li>
        <li><Link className="text-primary-700 underline" to="/contact">Contact Us</Link></li>
      </ul>
    </div>
  );
}
