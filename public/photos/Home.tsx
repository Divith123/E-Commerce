import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const products = [
    {
      id: 1,
      title: 'Personalized Photo Mug',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'PRODUCTS'
    },
    {
      id: 2,
      title: 'T-shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'PRODUCTS'
    },
    {
      id: 3,
      title: 'Quotes Mug',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      category: 'PRODUCTS'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Disclaimer Banner */}
      <div className="bg-gray-800 text-white py-2 flex items-center justify-center">
        <div className="text-center whitespace-nowrap animate-marquee">
          <span>This site is under renovation. For placing orders or any details, contact us at +91 98943 35516</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-orange-500 text-white py-16 flex items-center justify-between">
        <div className="max-w-7xl mx-auto px-4 text-center flex-1">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome to VELLGRO Ads
          </h1>
          <p className="text-2xl mb-8 font-semibold">
            Your One-Stop Solution for All Printing Needs
          </p>
          <Link to="/shop" className="bg-white text-orange-500 px-12 py-4 rounded-full font-semibold text-xl hover:bg-gray-100">
            Shop Now
          </Link>
        </div>
        <div className="flex-1 hidden md:block">
          <img src="photos/home.png" alt="Home" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(product => (
            <Link 
              to="/shop" 
              key={product.id} 
              className="bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black overflow-hidden"
            >
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <span className="text-orange-500 text-sm font-semibold">{product.category}</span>
                <h3 className="text-xl font-semibold mt-2">{product.title}</h3>
                <p className="text-orange-500 mt-4 inline-block hover:underline">Go to Shop</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Our Categories Section */}
      <div className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Our Categories</h2>
          <p className="text-lg mb-16 px-4">
            At VELLGRO Ads, we specialize in delivering high-quality personalized gifts and products. Whether you need custom prints, personalized items, or exclusive gift options, our services are designed to meet your every need.
          </p>
          <p className="text-lg mb-16 px-4">
            We use only the finest materials and state-of-the-art printing techniques to bring your creative ideas to life. From stunning prints to one-of-a-kind gifts, we ensure that each product exceeds your expectations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <img src="public/photos/pngegg.png" alt="Fast Delivery" className="mx-auto w-32 h-32 object-contain mb-4" />
              <h3 className="text-2xl font-bold">Fast Delivery</h3>
              <p className="mt-4 text-lg">Get your personalized gifts and prints delivered quickly and reliably.</p>
            </div>
            <div className="text-center">
              <img src="public/photos/pngegg (1).png" alt="Direct Mailing" className="mx-auto w-32 h-32 object-contain mb-4" />
              <h3 className="text-2xl font-bold">Direct Mailing</h3>
              <p className="mt-4 text-lg">Seamless direct mailing options for sending your gifts directly to your recipients.</p>
            </div>
            <div className="text-center">
              <img src="public/photos/pngegg (2).png" alt="Top Quality Print" className="mx-auto w-32 h-32 object-contain mb-4" />
              <h3 className="text-2xl font-bold">Top Quality Print</h3>
              <p className="mt-4 text-lg">Our prints are of the highest quality, ensuring vibrant and durable results for your gifts and products.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Easy Steps Section */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">3 Easy Steps to Get Your Personalized Gifts and Prints</h2>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <img src="public/photos/select.png" alt="Select Files" className="mx-auto w-32 h-32 object-contain mb-4" />
              <p>Select Your Product</p>
            </div>
            <div className="text-center">
              <img src="public/photos/pngwing.com.png" alt="Arrow" className="mx-auto w-16 mb-4" />
            </div>
            <div className="text-center">
              <img src="public/photos/online-payment.png" alt="Make Payment" className="mx-auto w-32 h-32 object-contain mb-4" />
              <p>Make a Payment</p>
            </div>
            <div className="text-center">
              <img src="public/photos/pngwing.com.png" alt="Arrow" className="mx-auto w-16 mb-4" />
            </div>
            <div className="text-center">
              <img src="public/photos/receive.png" alt="Receive Products" className="mx-auto w-32 h-32 object-contain mb-4" />
              <p>Receive Your Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS for the Moving Disclaimer */}
      <style>
        {
          `
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-marquee {
            animation: marquee 10s linear infinite;
          }
          `
        }
      </style>
    </div>
  );
};

export default Home;
