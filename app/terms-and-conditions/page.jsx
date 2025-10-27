"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function TermsAndConditions() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 py-20 px-6 md:px-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading uppercase tracking-[0.25em] text-center mb-16">
            Terms
          </h1>

          {/* PAYMENTS */}
          <div
            className="border-t border-gray-200 py-6 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("payments")}
          >
            <h2 className="text-lg tracking-wide uppercase font-medium">
              Payments
            </h2>
            {openSection === "payments" ? (
              <Minus size={20} />
            ) : (
              <Plus size={20} />
            )}
          </div>
          {openSection === "payments" && (
            <div className="text-gray-700 leading-relaxed mb-6 pl-2 space-y-4">
              <p>We currently accept the following payment methods:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Credit Cards: Visa and MasterCard</li>
                <li>Debit Cards: Visa and MasterCard</li>
                <li>Bank Transfer</li>
                <li>Cash on Delivery</li>
              </ul>
              <p>
                All online payments are processed in AED (United Arab Emirates
                Dirham). Upon selecting a payment method, shoppers will be
                redirected to the corresponding secure payment page.
              </p>
              <p>
                For bank transfers, Mirah’s banking details will be provided upon
                selecting this option and included in the order confirmation.
                Proof of payment must be sent to{" "}
                <span className="font-medium">+971 58 822 0855</span> within 24
                hours.
              </p>
            </div>
          )}

          {/* DELIVERY POLICY */}
          <div
            className="border-t border-gray-200 py-6 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("delivery")}
          >
            <h2 className="text-lg tracking-wide uppercase font-medium">
              Delivery Policy
            </h2>
            {openSection === "delivery" ? (
              <Minus size={20} />
            ) : (
              <Plus size={20} />
            )}
          </div>
          {openSection === "delivery" && (
            <div className="text-gray-700 leading-relaxed mb-6 pl-2 space-y-4">
              <p>
                Orders within the UAE are typically delivered within 7 to 10
                working days. Delivery times for international orders vary
                depending on destination and customs.
              </p>
              <p>Delivery within the UAE is free of charge.</p>
              <p>
                International orders may be subject to import taxes, customs
                duties, and additional fees imposed by local authorities.
              </p>
              <p>
                Mirah is not responsible for undelivered orders due to incorrect
                shipping details or customer unavailability.
              </p>
            </div>
          )}

          {/* REFUND & RETURN POLICY */}
          <div
            className="border-t border-gray-200 py-6 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("refund")}
          >
            <h2 className="text-lg tracking-wide uppercase font-medium">
              Refund & Return Policy
            </h2>
            {openSection === "refund" ? (
              <Minus size={20} />
            ) : (
              <Plus size={20} />
            )}
          </div>
          {openSection === "refund" && (
            <div className="text-gray-700 leading-relaxed mb-6 pl-2 space-y-4">
              <p>
                Customers must notify Mirah of any defective or damaged item
                within 24 hours of receiving the shipment.
              </p>
              <p>
                Exchanges are accepted only for defective or incorrect items,
                returned within 3 days in their original condition.
              </p>
              <p>
                Returns are permitted only if an item is defective or not as
                described. Customers are responsible for two-way shipping costs.
              </p>
              <p>
                Refunds will be issued to the original payment method or via bank
                transfer after inspection of returned items.
              </p>
            </div>
          )}

          {/* FOOTNOTE */}
          <div className="border-t border-gray-200 pt-8 text-gray-700 text-sm mt-6">
            <p>
              For inquiries, contact{" "}
              <a
                href="mailto:info@mirah.com"
                className="text-[#c6b197] hover:underline"
              >
                info@mirah.com
              </a>{" "}
              or via WhatsApp at +971 58 822 0855.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
