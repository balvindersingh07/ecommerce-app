export default function HowToShop() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">How to shop on ShopSage</h1>
      <ol className="list-decimal pl-5 space-y-3 text-gray-700">
        <li>Browse categories ya search bar naal product labho.</li>
        <li>Size guide dekh ke size choose karo, “Add to Cart” click karo.</li>
        <li>Cart → address & payment fill karo. Coupon hove ta apply karo.</li>
        <li>Order place karke email/SMS tracking pa lo.</li>
        <li>Help chahidee? <a className="text-primary-700 underline" href="/contact">Contact Us</a>.</li>
      </ol>
    </div>
  );
}
