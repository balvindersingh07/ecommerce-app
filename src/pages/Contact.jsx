export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-2">Phone: +91 94604 03092</p>
      <p className="text-gray-700 mb-6">Email: support@shopsage.com</p>

      <form className="grid gap-4 max-w-xl">
        <input className="border rounded px-3 py-2" placeholder="Your name" />
        <input className="border rounded px-3 py-2" placeholder="Email" />
        <textarea rows={4} className="border rounded px-3 py-2" placeholder="Message" />
        <button className="btn btn-primary w-fit">Send</button>
      </form>
    </div>
  );
}
