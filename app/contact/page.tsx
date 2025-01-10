import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Contact VELLGRO Ads
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Have questions or need assistance? We’re here to help.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Address</h2>
            <p className="text-gray-600">VELLGRO Ads</p>
            <p className="text-gray-600">23 Aadis street</p>
            <p className="text-gray-600">Near Nehru Stadium, Coimbatore - 641018</p>
            <p className="text-gray-600">Tamil Nadu, India</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Phone Number</h2>
            <p className="flex items-center justify-center gap-2 text-gray-600">
              <Phone size={20} />
              <a
                href="tel:+918220004488"
                className="hover:text-gray-800 transition-colors duration-200"
              >
                +91 73977 76898
              </a>
            </p>
            <p className="flex items-center justify-center gap-2 mt-2 text-gray-600">
              <Phone size={20} />
              <a
                href="tel:+914224374910"
                className="hover:text-gray-800 transition-colors duration-200"
              >
                +91 98943 35516
              </a>
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Email</h2>
            <p className="flex items-center justify-center gap-2 text-gray-600">
              <Mail size={20} />
              <a
                href="mailto:info@vellgroads.com"
                className="hover:text-gray-800 transition-colors duration-200"
              >
                info@vellgroads.com
              </a>
            </p>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1123684046085!2d76.95813731474925!3d11.016735892155644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2f3bb0b7f5f3aa0c!2sPrint%20Hub!5e0!3m2!1sen!2sin!4v1620898251881!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="VELLGRO Ads Location"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;