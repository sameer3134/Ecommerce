import React from 'react';

const TermCondition = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-lightIvory">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4 pt-10">
        Premium Brands Opco LLC
      </h1>
      <p className="text-sm text-gray-600 text-center mb-8">
        Last Updated: May 2021
      </p>

      {/* Introduction */}
      <p className="text-lg text-gray-700 mb-8">
        These <strong>Terms & Conditions</strong> govern your use of Premium Brands Opco LLC’s products, services, and website. By accessing or using our services, you agree to these terms.
      </p>

      {/* Sections */}
      <div className="space-y-6">
        {/* Section 1: Eligibility */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Eligibility
          </h2>
          <p className="text-gray-700">
            You must be at least 18 years old or the legal age of majority in your jurisdiction to use our services.
          </p>
        </div>

        {/* Section 2: Orders and Payments */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Orders and Payments
          </h2>
          <p className="text-gray-700">
            All orders are subject to availability and acceptance by Premium Brands Opco LLC.
          </p>
          <p className="text-gray-700">
            Payment must be made in full at the time of purchase. We accept [list accepted payment methods].
          </p>
        </div>

        {/* Section 3: Shipping and Returns */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Shipping and Returns
          </h2>
          <p className="text-gray-700">
            Shipping costs and delivery times are outlined on our website.
          </p>
          <p className="text-gray-700">
            Returns and refunds are subject to our <a href="/return-policy" className="text-blue-600 hover:underline">Return Policy</a>.
          </p>
        </div>

        {/* Section 4: Privacy */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Privacy
          </h2>
          <p className="text-gray-700">
            Your use of our website and services is also governed by our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>

        {/* Section 5: Governing Law */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Governing Law
          </h2>
          <p className="text-gray-700">
            These Terms & Conditions are governed by the laws of the State of California, without regard to its conflict of law principles.
          </p>
        </div>

        {/* Section 6: Dispute Resolution */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Dispute Resolution
          </h2>
          <p className="text-gray-700">
            Any disputes arising from these terms will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
          </p>
        </div>

        {/* Section 7: Contact Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Contact Information
          </h2>
          <p className="text-gray-700">
            For questions or concerns regarding these Terms & Conditions, please contact us at <a href="mailto:support@premiumbrands.com" className="text-blue-600 hover:underline">support@premiumbrands.com</a>.
          </p>
        </div>
      </div>
    </div></div>
  );
};

export default TermCondition;