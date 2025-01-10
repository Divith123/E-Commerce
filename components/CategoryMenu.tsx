import React from "react";
import Link from "next/link";
import Image from "next/image";
import Heading from "./Heading";

// Mocked category menu data
const categoryMenuList = [
  {
    id: 1,
    title: "Personalized Photo Mug",
    category: "Mugs",
    href: "/shop/mug",
    src: "/photo-mug.png", // Relative path inside the `public` folder
  },
  {
    id: 2,
    title: "T-shirt",
    category: "Apparel",
    href: "/shop/tshirt",
    src: "/tshirt.png", // Relative path inside the `public` folder
  },
  {
    id: 3,
    title: "Photo Frame",
    category: "Frames",
    href: "/shop/photo_frame",
    src: "/photo_frame.png", // Relative path inside the `public` folder
  },
];

const CategoryMenu = () => {
  return (
    <div className="py-16 bg-white">
      {/* Heading Component */}
      <Heading title="Categories" />

      {/* Grid Container for Categories */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {categoryMenuList.map((item) => (
          <Link 
            href={item.href} 
            key={item.id} 
            className="bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            <Image 
              src={item.src} 
              alt={item.title} 
              width={400} 
              height={300} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-orange-500 text-sm font-semibold">
                {item.category}
              </span>
              <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
              <p className="text-orange-500 mt-4 inline-block hover:underline">
                Explore
              </p>
            </div>
          </Link>
        ))}
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
              <img src="/photos/pngegg.png" alt="Fast Delivery" className="mx-auto w-32 h-32 object-contain mb-4" />
              <h3 className="text-2xl font-bold">Fast Delivery</h3>
              <p className="mt-4 text-lg">Get your personalized gifts and prints delivered quickly and reliably.</p>
            </div>
            <div className="text-center">
              <img src="/photos/pngegg (1).png" alt="Direct Mailing" className="mx-auto w-32 h-32 object-contain mb-4" />
              <h3 className="text-2xl font-bold">Direct Mailing</h3>
              <p className="mt-4 text-lg">Seamless direct mailing options for sending your gifts directly to your recipients.</p>
            </div>
            <div className="text-center">
              <img src="/photos/pngegg (2).png" alt="Top Quality Print" className="mx-auto w-32 h-32 object-contain mb-4" />
              <h3 className="text-2xl font-bold">Top Quality Print</h3>
              <p className="mt-4 text-lg">Our prints are of the highest quality, ensuring vibrant and durable results for your gifts and products.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Easy Steps Section */}
      <div className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">3 Easy Steps to Get Your Personalized Gifts and Prints</h2>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <img src="/photos/select.png" alt="Select Files" className="mx-auto w-32 h-32 object-contain mb-4" />
              <p>Select Your Product</p>
            </div>
            <div className="text-center">
              <img src="/photos/pngwing.com.png" alt="Arrow" className="mx-auto w-16 mb-4" />
            </div>
            <div className="text-center">
              <img src="/photos/online-payment.png" alt="Make Payment" className="mx-auto w-32 h-32 object-contain mb-4" />
              <p>Make a Payment</p>
            </div>
            <div className="text-center">
              <img src="/photos/pngwing.com.png" alt="Arrow" className="mx-auto w-16 mb-4" />
            </div>
            <div className="text-center">
              <img src="/photos/receive.png" alt="Receive Products" className="mx-auto w-32 h-32 object-contain mb-4" />
              <p>Receive Your Products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
