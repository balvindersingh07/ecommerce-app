// src/components/FAQ.jsx
function Q({ q, a }) {
  return (
    <details className="p-4 border rounded-lg bg-white shadow-sm">
      <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
        <span>{q}</span>
        <span className="text-gray-500 text-sm ml-2">+</span>
      </summary>
      <p className="text-gray-700 mt-2">{a}</p>
    </details>
  );
}

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>

      <Q
        q="Delivery kithe-kithe?"
        a="India bhar major PIN codes cover. Remote locations te 2–5 din extra."
      />
      <Q
        q="Return window kina?"
        a="Delivery to 7–10 din. Product unused, tags intact hone chahidee."
      />
      <Q
        q="Refund kiven?"
        a="Prepaid → source back; COD → bank/UPI details te 2–5 business din."
      />
      <Q
        q="Size help?"
        a="Har product page te size chart & fit notes milange."
      />
    </div>
  );
}
