export default function PaymentMethods() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Payment Methods</h1>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>UPI (GPay, PhonePe, Paytm)</li>
        <li>Debit/Credit Cards (Visa, Mastercard, RuPay)</li>
        <li>Net Banking</li>
        <li>Cash on Delivery (COD) — nominal fee ho sakdi</li>
      </ul>
    </div>
  );
}
