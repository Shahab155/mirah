import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <section className="min-h-screen bg-white py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-gray-800">
          <h1 className="text-4xl md:text-5xl font-heading text-center uppercase tracking-widest mb-12">
            Privacy Policy
          </h1>

          <div className="space-y-8 leading-relaxed text-gray-700">
            <p>
              At <strong>Mirah</strong>, your privacy and trust are extremely important to us. This
              Privacy Policy explains how we collect, use, and protect your personal information
              when you visit or make a purchase on <strong>www.themirah.com</strong>. By using our
              website, you agree to the terms described below, governed by the laws of the United
              Arab Emirates (UAE).
            </p>

            <p>
              All personal information collected is kept secure and confidential. We do not share,
              sell, or rent your details to third parties, except as required to fulfill your order
              or comply with legal obligations.
            </p>

            <p>
              When you make a purchase, we collect your name, contact number, email address, billing
              and delivery address, and payment information to process and deliver your order. We
              may also retain these details for record-keeping and customer service purposes.
            </p>

            <p>
              Occasionally, we may collect non-personal information about your use of our website to
              help us improve our services, personalize your experience, and enhance website
              performance.
            </p>

            <p>
              The information we gather helps us provide better customer service, process
              transactions efficiently, and notify you of updates, offers, or promotions that may be
              of interest.
            </p>

            <p>
              We implement strict security measures to protect your personal data against
              unauthorized access, alteration, disclosure, or destruction. Online transactions are
              secured using SSL encryption.
            </p>

            <p>
              By using our website, you consent to the collection and use of your information in
              accordance with this Privacy Policy. We may update or amend this policy from time to
              time, and all changes will be posted on this page.
            </p>

            <p>
              For any questions or concerns regarding our Privacy Policy, please contact our
              customer service team via email at{' '}
              <a
                href="mailto:info@themirah.com"
                className="text-[#c6b197] hover:underline"
              >
                info@themirah.com
              </a>{' '}
              or by phone at <strong>+971 58 822 0855</strong>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
