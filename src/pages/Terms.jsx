import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Terms() {
  useEffect(() => {
    document.title = "Terms & Conditions • ShopSage";
  }, []);

  const Section = ({ title, children }) => (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
      <div className="prose prose-sm max-w-none text-gray-700">{children}</div>
    </section>
  );

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-700">Home</Link>
          <span className="mx-2">›</span>
          <span>Pages</span>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">Terms & Conditions</span>
        </div>
      </div>

      {/* Title strip */}
      <div className="bg-primary-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Terms and Conditions</h1>
          <p className="text-gray-600 text-sm mt-1">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="md:w-10/12">
          <p className="text-sm text-gray-600 mb-6">
            By accessing or using this website (“Site”), you agree to be bound by these Terms.
            If you do not agree, please do not use the Site.
          </p>

          <Section title="Use of the Website">
            <ul>
              <li>You must be at least 18 years old to use this Site.</li>
              <li>Use the Site only for lawful purposes and in compliance with all regulations.</li>
              <li>Do not infringe intellectual-property rights or upload harmful/unauthorized content (spam, malware, etc.).</li>
              <li>Do not attempt to gain unauthorized access to the Site or its systems.</li>
            </ul>
          </Section>

          <Section title="Product Purchases">
            <ul>
              <li>All prices/offers are subject to change without notice.</li>
              <li>Orders may be limited/declined where fraud or errors are suspected.</li>
              <li>Returns & cancellations follow our posted policies on the Site.</li>
            </ul>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content on the Site—including text, images, graphics, logos, and code—is the
              property of ShopSage or its licensors and protected by applicable IP laws. You may
              not copy, reproduce, modify, or distribute content without prior written consent.
            </p>
          </Section>

          <Section title="Privacy">
            <p>
              Your use of the Site is also governed by our{" "}
              <Link to="/privacy" className="text-primary-700 hover:underline">Privacy Policy</Link>.
              By using the Site, you consent to the collection and use of information as described there.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by law, ShopSage shall not be liable for any indirect,
              incidental, special, or consequential damages resulting from your use of the Site or
              products purchased through it.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India,
              without regard to conflict-of-law principles. Courts at Sri Ganganagar (RJ) shall have
              exclusive jurisdiction.
            </p>
          </Section>

          <Section title="Changes to Terms">
            <p>
              We may update these Terms at any time. Continued use of the Site after changes are
              posted constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              Questions about these Terms? Write to us at{" "}
              <a href="mailto:support@shopsage.example" className="text-primary-700 hover:underline">
                support@shopsage.example
              </a>{" "}
              or call +91 94604-03092.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
