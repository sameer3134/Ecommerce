import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
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
          Welcome to Premium Brands Opco LLC! By accessing or using our website, products, or services, you agree to comply with and be bound by the following <strong>Terms of Use</strong>. Please read these terms carefully before using our platform.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {/* Section 1: Acceptance of Terms */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By using our website, you acknowledge that you have read, understood, and agree to these Terms of Use. If you do not agree with any part of these terms, you must not use our website or services.
            </p>
          </div>

          {/* Section 2: Use of the Website */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. Use of the Website
            </h2>
            <p className="text-gray-700">
              The content on this website is for general information and use only.
            </p>
            <p className="text-gray-700">
              Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
            </p>
            <p className="text-gray-700">
              You may not use our website for any illegal or unauthorized purpose.
            </p>
          </div>

          {/* Section 3: Intellectual Property */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Intellectual Property
            </h2>
            <p className="text-gray-700">
              All content, including text, graphics, logos, and images, is the property of Premium Brands Opco LLC and is protected by intellectual property laws. Unauthorized use of this content is strictly prohibited.
            </p>
          </div>

          {/* Section 4: Limitation of Liability */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              Premium Brands Opco LLC shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or its content.
            </p>
          </div>

          {/* Section 5: Changes to Terms */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. Changes to Terms
            </h2>
            <p className="text-gray-700">
              We reserve the right to update or modify these Terms of Use at any time without prior notice. Your continued use of the website constitutes acceptance of the revised terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;