import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-lightIvory to-darkIvory py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 pt-10">
          Contact <span className="text-stone-600">Kashika – The Shining One</span>
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 lg:p-16">
          <div className="space-y-8">
            {/* Email Section */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Email Us</h2>
              <a
                href="mailto:kashikatheshiningone@gmail.com"
                className="text-stone-600 hover:text-stone-800 text-lg font-medium transition duration-300"
              >
                kashikatheshiningone@gmail.com
              </a>
            </div>

            {/* Call / WhatsApp Section */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Call </h2>
              <a
              href="https://wa.me/919619852390"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-stone-800 text-lg font-medium transition duration-300"
              >
                +1 703-925-3351
              </a>
            </div>

            {/* Additional Message */}
            <p className="text-gray-600 text-lg">
              We’re here to assist you! Whether you have a question about our collections or need help with an order, feel free to reach out via email or WhatsApp. Our team will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;