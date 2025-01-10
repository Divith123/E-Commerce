import React from 'react';

const About = () => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">About Vellgro Ads</h1>
          <p className="mt-2 text-gray-600 max-w-lg mx-auto">
            Your one-stop destination for professional printing and personalized gifts.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 hover:shadow-lg transition-shadow duration-300">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-gray-700">
              At Vellgro Ads, we offer reliable solutions for all your printing needs and gift ideas. From business essentials
              like stationery and marketing materials to special keepsakes, our goal is to deliver exceptional results every time.
            </p>

            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Visiting Cards & Stationery</li>
              <li>Marketing Materials</li>
              <li>Custom Photo Frames & Books</li>
              <li>Gift Articles for All Occasions</li>
            </ul>

            {/* Quality Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Quality Promise</h2>
              <p className="text-gray-700">
                We carefully review each order before it is shipped to maintain high standards. If for any reason you’re not
                completely satisfied, we’ll make it right.
              </p>
            </div>

            {/* Sustainability Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Sustainability</h2>
              <p className="text-gray-700">
                We strive to minimize waste and use eco-friendly materials wherever possible, helping to protect the environment 
                for future generations.
              </p>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex items-center justify-center">
            <img
              src="photos/vellgroads.png"
              alt="Vellgro Ads"
              className="w-full max-w-sm rounded-md shadow-sm transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;