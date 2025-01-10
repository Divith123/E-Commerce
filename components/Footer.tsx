// *********************
// Role of the component: Footer component
// Name of the component: Footer.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Footer />
// Input parameters: no input parameters
// Output: Footer component
// *********************
"use client";

import React, { useEffect } from "react";
import { navigation } from "@/lib/utils";
import Image from "next/image";
import Link from 'next/link';

const Footer = () => {

  useEffect(() => {
    const logVisitor = async () => {
      try {
        // Fetch IP address
        const ipResponse = await fetch("https://api64.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip || "Unknown IP";

        // Get User-Agent
        const userAgent = navigator.userAgent || "Unknown User-Agent";

        // Log visitor API call
        const response = await fetch("http://localhost:3001/api/visitor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ipAddress,
            userAgent,
          }),
        });

        if (!response.ok) {
          console.error("Failed to log visitor");
        }
      } catch (error) {
        console.error("Error logging visitor:", error);
      }
    };

    logVisitor();
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8" aria-labelledby="footer-heading">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center ml-[-10px]">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={40}
                height={40}
                className="h-auto w-auto"
              />
              <Image
                src="/logoname.png"
                alt="Company Name"
                width={130}
                height={40}
                className="h-auto w-auto ml-2"
              />
            </div>
            <p className="mt-4 text-sm">
              VELLGRO Ads, 23 Aadis street<br />
              Near Nehru Stadium, Coimbatore - 641018<br />
              Tamil Nadu, India.
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
              <li><Link href="/shop" className="hover:text-orange-400">Shop</Link></li>
              <li><Link href="/about" className="hover:text-orange-400">About us</Link></li>
              <li><Link href="/contact" className="hover:text-orange-400">Contact us</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="hover:text-orange-400">Visiting Card Printing</Link></li>
              <li><Link href="/shop" className="hover:text-orange-400">Stationery Printing</Link></li>
              <li><Link href="/shop" className="hover:text-orange-400">Marketing Products</Link></li>
              <li><Link href="/shop" className="hover:text-orange-400">Gift Articles</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact Info</h3>
            <ul className="space-y-2">
              <li>Phone: +91 73977 76898</li>
              <li>Office: +91 98943 35516</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm">Copyright © 2025 VELLGROAds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
