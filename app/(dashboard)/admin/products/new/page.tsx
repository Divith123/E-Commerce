"use client";
import { DashboardSidebar } from "@/components";
import { convertCategoryNameToURLFriendly as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
}

const AddNewProduct = () => {
  const [product, setProduct] = useState<{
    title: string;
    price: number;
    manufacturer: string;
    inStock: number;
    mainImage: string;
    description: string;
    slug: string;
    categoryId: string;
  }>({
    title: "",
    price: 0,
    manufacturer: "",
    inStock: 1,
    mainImage: "",
    description: "",
    slug: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories and set a default
  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/categories`);
      const data = await response.json();
      setCategories(data);
      setProduct((prev) => ({
        ...prev,
        categoryId: data[0]?.id || "",
      }));
    } catch (error) {
      toast.error("There was a problem fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle product submission
  const addProduct = async () => {
    if (
      product.title === "" ||
      product.manufacturer === "" ||
      product.description === "" ||
      product.slug === ""
    ) {
      toast.error("Please enter values in all required fields");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };

    try {
      const response = await fetch(`http://localhost:3001/api/products`, requestOptions);
      if (response.status === 201) {
        toast.success("Product added successfully");
        setProduct({
          title: "",
          price: 0,
          manufacturer: "",
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: categories[0]?.id || "",
        });
      } else {
        throw new Error("There was an error while creating the product");
      }
    } catch (error) {
      toast.error("Error while creating the product");
    }
  };

  // Handle file upload
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch("http://localhost:3001/api/main-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Optionally, handle the uploaded file info
        await response.json();
      } else {
        toast.error("File upload was unsuccessful");
      }
    } catch (error) {
      toast.error("Error occurred while uploading file");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5 p-5 transition-all duration-300">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 w-full xl:ml-5 max-xl:px-5">
        <h1 className="text-3xl font-bold text-gray-900 drop-shadow-sm mb-2">
          Add New Product
        </h1>
        <div className="flex flex-wrap gap-5">
          {/* Left Column */}
          <div className="flex flex-col gap-y-5">
            <label className="form-control w-full max-w-xs bg-gray-50 p-3 rounded-md shadow">
              <div className="label mb-1">
                <span className="label-text font-semibold text-gray-800">
                  Product name:
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />
            </label>

            <label className="form-control w-full max-w-xs bg-gray-50 p-3 rounded-md shadow">
              <div className="label mb-1">
                <span className="label-text font-semibold text-gray-800">
                  Product slug:
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={convertSlugToURLFriendly(product.slug)}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    slug: convertSlugToURLFriendly(e.target.value),
                  })
                }
              />
            </label>

            <label className="form-control w-full max-w-xs bg-gray-50 p-3 rounded-md shadow">
              <div className="label mb-1">
                <span className="label-text font-semibold text-gray-800">
                  Category:
                </span>
              </div>
              <select
                className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={product.categoryId}
                onChange={(e) =>
                  setProduct({ ...product, categoryId: e.target.value })
                }
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-control w-full max-w-xs bg-gray-50 p-3 rounded-md shadow">
              <div className="label mb-1">
                <span className="label-text font-semibold text-gray-800">
                  Product price:
                </span>
              </div>
              <input
                type="number"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
              />
            </label>

            <label className="form-control w-full max-w-xs bg-gray-50 p-3 rounded-md shadow">
              <div className="label mb-1">
                <span className="label-text font-semibold text-gray-800">
                  Manufacturer:
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={product.manufacturer}
                onChange={(e) =>
                  setProduct({ ...product, manufacturer: e.target.value })
                }
              />
            </label>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-y-5">
            <label className="form-control w-full max-w-xs bg-gray-50 p-3 rounded-md shadow">
              <div className="label mb-1">
                <span className="label-text font-semibold text-gray-800">
                  In stock?
                </span>
              </div>
              <select
                className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={product.inStock}
                onChange={(e) =>
                  setProduct({ ...product, inStock: Number(e.target.value) })
                }
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </label>

            <div className="bg-gray-50 p-3 rounded-md shadow w-full max-w-xs">
              <label className="form-control">
                <div className="label mb-1">
                  <span className="label-text font-semibold text-gray-800">
                    Upload main image:
                  </span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-lg w-full
                    max-w-xs focus:outline-none focus:ring-2 focus:ring-gray-600"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      uploadFile(e.target.files[0]);
                      setProduct({
                        ...product,
                        mainImage: e.target.files[0].name,
                      });
                    }
                  }}
                />
              </label>
              {product.mainImage && (
                <div className="mt-3">
                  <Image
                    src={`/${product.mainImage}`}
                    alt={product.title}
                    className="w-auto h-auto rounded-md border-2 border-gray-400"
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>

            <label className="form-control w-full bg-gray-50 p-3 rounded-md shadow">
              <div className="label mb-1">
                <span className="label-text font-semibold text-gray-800">
                  Product description:
                </span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full h-24 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              ></textarea>
            </label>
          </div>
        </div>

        <div className="flex gap-x-2 mt-5">
          <button
            onClick={addProduct}
            type="button"
            className="uppercase bg-gray-800 text-white px-10 py-4 text-lg border
              border-gray-800 font-bold shadow-md hover:bg-gray-900
              focus:outline-none focus:ring-2 focus:ring-gray-700
              transition-all transform hover:scale-105"
          >
            Add product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
