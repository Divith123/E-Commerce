import React from "react";
import Link from "next/link";

interface CategoryItemProps {
  title: string;
  href: string;
  category: string;
  children: React.ReactNode;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ title, href, category, children }) => {
  return (
    <Link 
      href={href} 
      className="bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
    >
      {children}
      <div className="p-4">
        <span className="text-orange-500 text-sm font-semibold">{category}</span>
        <h3 className="text-xl font-semibold mt-2">{title}</h3>
        <p className="text-orange-500 mt-4 inline-block hover:underline">
          Explore
        </p>
      </div>
    </Link>
  );
};

export default CategoryItem;
