import { BUSINESS_CONFIG } from "@/lib/config";

export const metadata = {
  title: "Terms of Service | WE Ice Cream Truck",
  description: "Terms and conditions for booking WE Ice Cream Truck.",
};

export default function TermsOfServicePage() {
  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 md:p-16 shadow-xl shadow-navy/5 border border-gray-100">
          <h1 className="font-display font-black text-4xl md:text-5xl text-navy mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-500 font-medium mb-10">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <div className="prose prose-lg prose-navy max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing our website and booking our services, you agree to
                be bound by these Terms of Service. If you disagree with any
                part of the terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">2. Bookings & Approvals</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                All bookings are subject to availability. A booking is not fully confirmed until you receive an official confirmation. 
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li><strong>Short Notice:</strong> Bookings requested within 48 hours of the event are subject to review and require manual approval.</li>
                <li><strong>Automatic Rejection:</strong> We cannot accommodate events requested within 24 hours of the event time. These will be automatically rejected.</li>
                <li><strong>Distance & Minimums:</strong> Events that have a total quoted price of $500 or less AND are located more than 30 miles away require manual approval.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to cancel or refuse any booking for any reason.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">
                3. Distance Fees and Surcharges
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Travel fees are calculated at $2.00 per mile based on the actual
                driving distance from our Boston dispatch location (ZIP 02108)
                to your event location. There are no free miles — the travel fee
                applies from the first mile. Weekend surcharges and minimum
                order requirements may apply based on your event date and
                location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">
                4. Payments
              </h2>
              <p className="text-gray-600 leading-relaxed">
                <strong>We do not process online payments.</strong> No credit card information or deposits are required to be paid through our website. All payments are handled directly with our team prior to or on the day of the event depending on the agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">
                5. Cancellations and Refunds
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Cancellations must be made at least 48 hours in advance of the
                scheduled event time. Since payments are handled offline, failure to cancel in a timely manner may affect your ability to book future events with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">
                5. Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                While we strive to provide excellent service, we are not liable
                for delays caused by severe weather, traffic conditions, or
                mechanical issues beyond our control. In the rare event we
                cannot fulfill a booking, we will notify you as soon as
                possible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">
                6. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms, please contact us
                at:
                <br />
                <br />
                <strong>{BUSINESS_CONFIG.legalName}</strong>
                <br />
                {BUSINESS_CONFIG.address.street}
                <br />
                {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.state}{" "}
                {BUSINESS_CONFIG.address.zip}
                <br />
                Email: {BUSINESS_CONFIG.contact.email}
                <br />
                Phone: {BUSINESS_CONFIG.contact.phone1}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
