"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";

// Define the type for product
interface Product {
  id: string;
  title: string;
  manufacturer: string;
  mainImage: string;
  inStock: boolean;
  price: number;
}

const DashboardProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products?mode=admin", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("There was an error fetching the products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // If loading or error, show corresponding message
  if (loading) {
    return <div className="text-center text-xl">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold text-center mb-5">All Products</h1>
      <div className="flex justify-end mb-5">
        <Link href="/admin/products/new">
          <CustomButton
            buttonType="button"
            customWidth="110px"
            paddingX={10}
            paddingY={5}
            textSize="base"
            text="Add New Product"
          />
        </Link>
      </div>

      <div className="xl:ml-5 w-full max-xl:mt-5 overflow-auto h-[80vh]">
        <table className="table table-md table-pin-cols w-full">
          {/* Table head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" aria-label="Select All Products" />
                </label>
              </th>
              <th>Product</th>
              <th>Stock Availability</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" aria-label={`Select ${product.title}`} />
                  </label>
                </td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          width={48}
                          height={48}
                          // Ensure the src starts with "/" for relative paths
                          src={product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg"}
                          alt={`${product.title} image`}
                          className="w-auto h-auto"
                          priority
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.title}</div>
                      <div className="text-sm opacity-50">{product.manufacturer}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    className={`badge badge-sm ${
                      product.inStock ? "badge-success" : "badge-error"
                    } text-white`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>

                <td>${product.price}</td>

                <td>
                  <Link href={`/admin/products/${product.id}`} className="btn btn-ghost btn-xs">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Table foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Stock Availability</th>
              <th>Price</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default DashboardProductTable;
