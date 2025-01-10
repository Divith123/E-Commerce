"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBell, FaRegUser } from "react-icons/fa6";
import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";

const Header = () => {
  const { data: session }: any = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  // Fetch wishlist items by user ID
  const getWishlistByUserId = async (id: string) => {
    const response = await fetch(`${apiUrl}/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const wishlist = await response.json();
    const productArray = wishlist.map((item: any) => ({
      id: item?.product?.id,
      title: item?.product?.title,
      price: item?.product?.price,
      image: item?.product?.mainImage,
      slug: item?.product?.slug,
      stockAvailabillity: item?.product?.inStock,
    }));

    setWishlist(productArray);
  };

  // Fetch user by email
  const getUserByEmail = async () => {
    if (session?.user?.email) {
      const response = await fetch(`${apiUrl}/api/users/email/${session.user.email}`, {
        cache: "no-store",
      });
      const data = await response.json();
      getWishlistByUserId(data?.id);
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);

  // Function to check if the link is the current page
  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white text-black">
      {pathname.startsWith("/admin") ? (
        <div className="flex justify-between h-20 bg-white items-center px-10 max-[1320px]:px-8 max-w-screen-2xl mx-auto max-[400px]:px-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" width={80} height={80} alt="Company logo" className="w-20 h-auto" />
              <Image src="/logoname.png" width={160} height={56} alt="Company name" className="text-xl font-semibold" />
            </div>
          </Link>
          <div className="flex gap-x-4 items-center">
            <FaBell className="text-lg" />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="w-8">
                <Image
                  src="/randomuser.jpg"
                  alt="random profile photo"
                  width={24}
                  height={24}
                  className="w-full h-full rounded-full"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
              >
                <li>
                  <Link href="/admin">Dashboard</Link>
                </li>
                <li>
                  <a>Profile</a>
                </li>
                <li onClick={handleLogout}>
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-20 bg-white flex items-center justify-between px-10 max-[1320px]:px-8 max-md:px-4 max-lg:flex-col max-lg:gap-y-5 max-lg:justify-center max-lg:h-40 max-w-screen-2xl mx-auto">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" width={80} height={80} alt="Company logo" className="w-20 h-auto" />
              <Image src="/logoname.png" width={160} height={56} alt="Company name" className="text-xl font-semibold" />
            </div>
          </Link>
          <nav className="flex gap-x-8">
            <Link href="/" className={`text-lg font-normal ${isActive('/') ? 'text-orange-500' : 'text-black hover:text-orange-500'}`}>Home</Link>
            <Link href="/shop" className={`text-lg font-normal ${isActive('/shop') ? 'text-orange-500' : 'text-black hover:text-orange-500'}`}>Shop</Link>
            <Link href="/about" className={`text-lg font-normal ${isActive('/about') ? 'text-orange-500' : 'text-black hover:text-orange-500'}`}>About Us</Link>
            <Link href="/contact" className={`text-lg font-normal ${isActive('/contact') ? 'text-orange-500' : 'text-black hover:text-orange-500'}`}>Contact</Link>
          </nav>
          <div className="flex items-center gap-x-6">
            <HeartElement wishQuantity={wishQuantity} />
            <CartElement />
            <ul className="flex items-center gap-x-4 h-full max-[370px]:text-sm max-[370px]:gap-x-2 font-semibold text-black">
              {!session ? (
                <>
                  <li className="flex items-center">
                    <Link href="/login" className="flex items-center gap-x-1 font-normal text-black hover:text-orange-500">
                      <FaRegUser className="text-black" />
                      <span>Login</span>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link href="/register" className="flex items-center gap-x-1 font-normal text-black hover:text-orange-500">
                      <FaRegUser className="text-black" />
                      <span>Register</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <span className="ml-5 text-base text-black">{session.user?.email}</span>
                  <li className="flex items-center">
                    <button onClick={handleLogout} className="flex items-center gap-x-1 font-normal text-black hover:text-orange-500">
                      <FaRegUser className="text-black" />
                      <span>Log out</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;