"use client";
import { CustomButton, DashboardSidebar, SectionTitle } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  convertCategoryNameToURLFriendly as convertSlugToURLFriendly,
  formatCategoryName,
} from "../../../../../utils/categoryFormating";
import { nanoid } from "nanoid";

interface DashboardProductDetailsProps {
  params: { id: number };
}

const DashboardProductDetails = ({
  params: { id },
}: DashboardProductDetailsProps) => {
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>();
  const [otherImages, setOtherImages] = useState<OtherImages[]>([]);
  const router = useRouter();

  const deleteProduct = async () => {
    const requestOptions = { method: "DELETE" };
    fetch(`http://localhost:3001/api/products/${id}`, requestOptions)
      .then((response) => {
        if (response.status !== 204) {
          if (response.status === 400) {
            toast.error("Cannot delete the product due to foreign key constraint");
          } else {
            throw Error("There was an error while deleting product");
          }
        } else {
          toast.success("Product deleted successfully");
          router.push("/admin/products");
        }
      })
      .catch((error) => {
        toast.error("There was an error while deleting product");
      });
  };

  const updateProduct = async () => {
    if (
      product?.title === "" ||
      product?.slug === "" ||
      product?.price.toString() === "" ||
      product?.manufacturer === "" ||
      product?.description === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetch(`http://localhost:3001/api/products/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error("There was an error while updating product");
        }
      })
      .then(() => toast.success("Product updated successfully"))
      .catch(() => toast.error("Error updating product"));
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch("http://localhost:3001/api/main-image", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        await response.json();
      } else {
        toast.error("File upload unsuccessful");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error during file upload");
    }
  };

  const fetchProductData = async () => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));

    const imagesData = await fetch(`http://localhost:3001/api/images/${id}`, {
      cache: "no-store",
    });
    const images = await imagesData.json();
    setOtherImages(images);
  };

  const fetchCategories = async () => {
    fetch(`http://localhost:3001/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    fetchCategories();
    fetchProductData();
  }, [id]);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 w-full max-xl:px-5">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Product Details</h1>

        {/* Product name input */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-700">Product Name:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs focus:ring-2 focus:ring-blue-500"
              value={product?.title}
              onChange={(e) => setProduct({ ...product!, title: e.target.value })}
            />
          </label>
        </div>

        {/* Product price input */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-700">Product Price:</span>
            </div>
            <input
              type="number"
              className="input input-bordered w-full max-w-xs focus:ring-2 focus:ring-blue-500"
              value={product?.price}
              onChange={(e) => setProduct({ ...product!, price: Number(e.target.value) })}
            />
          </label>
        </div>

        {/* Manufacturer input */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-700">Manufacturer:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs focus:ring-2 focus:ring-blue-500"
              value={product?.manufacturer}
              onChange={(e) => setProduct({ ...product!, manufacturer: e.target.value })}
            />
          </label>
        </div>

        {/* Slug input */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-700">Slug:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs focus:ring-2 focus:ring-blue-500"
              value={product?.slug && convertSlugToURLFriendly(product?.slug)}
              onChange={(e) =>
                setProduct({ ...product!, slug: convertSlugToURLFriendly(e.target.value) })
              }
            />
          </label>
        </div>

        {/* Category select */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-700">Category:</span>
            </div>
            <select
              className="select select-bordered focus:ring-2 focus:ring-blue-500"
              value={product?.categoryId}
              onChange={(e) => setProduct({ ...product!, categoryId: e.target.value })}
            >
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {formatCategoryName(category.name)}
                  </option>
                ))}
            </select>
          </label>
        </div>

        {/* Main image upload */}
        <div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-lg w-full max-w-sm focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                uploadFile(selectedFile);
                setProduct({ ...product!, mainImage: selectedFile.name });
              }
            }}
          />
          {product?.mainImage && (
            <div className="mt-3">
              <Image
                src={`/${product.mainImage}`}
                alt={product.title}
                width={200}
                height={200}
                className="rounded-md shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Other images display */}
        <div className="flex gap-2 mt-4">
          {otherImages.map((image) => (
            <Image
              src={`/${image.image}`}
              key={nanoid()}
              alt="product image"
              width={120}
              height={120}
              className="rounded-md shadow-md"
            />
          ))}
        </div>

        {/* Product description */}
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-gray-700">Product Description:</span>
            </div>
            <textarea
              className="textarea textarea-bordered w-full h-24 focus:ring-2 focus:ring-blue-500"
              value={product?.description}
              onChange={(e) => setProduct({ ...product!, description: e.target.value })}
            ></textarea>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-x-4 max-sm:flex-col mt-6">
          <button
            type="button"
            onClick={updateProduct}
            className="btn bg-blue-500 text-white px-8 py-3 rounded-md font-semibold shadow-md hover:bg-blue-600"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={deleteProduct}
            className="btn bg-red-600 text-white px-8 py-3 rounded-md font-semibold shadow-md hover:bg-red-700"
          >
            Delete Product
          </button>
        </div>

        {/* Delete warning */}
        <p className="text-lg text-red-500 mt-4">
          You must delete all associated records in orders before deleting the product.
        </p>
      </div>
    </div>
  );
};

export default DashboardProductDetails;
