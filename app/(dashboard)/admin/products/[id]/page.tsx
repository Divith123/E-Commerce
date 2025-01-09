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

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  manufacturer: string;
  description: string;
  mainImage: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

interface OtherImages {
  id: string;
  image: string;
}

interface DashboardProductDetailsProps {
  params: { id: number };
}

const DashboardProductDetails = ({
  params: { id },
}: DashboardProductDetailsProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [otherImages, setOtherImages] = useState<OtherImages[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const deleteProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "DELETE",
      });
      if (response.status === 400) {
        toast.error("Cannot delete the product due to foreign key constraint");
      } else if (response.status === 204) {
        toast.success("Product deleted successfully");
        router.push("/admin/products");
      } else {
        throw new Error("There was an error while deleting the product");
      }
    } catch (error) {
      toast.error("There was an error while deleting the product");
    }
  };

  const updateProduct = async () => {
    if (
      !product?.title ||
      !product?.slug ||
      !product?.price ||
      !product?.manufacturer ||
      !product?.description
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (response.status === 200) {
        toast.success("Product updated successfully");
      } else {
        throw new Error("There was an error while updating the product");
      }
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch("http://localhost:3001/api/main-image", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        toast.error("File upload unsuccessful");
      }
    } catch (error) {
      toast.error("Error during file upload");
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`);
      const data = await response.json();
      setProduct(data);

      const imagesResponse = await fetch(`http://localhost:3001/api/images/${id}`, {
        cache: "no-store",
      });
      const images = await imagesResponse.json();
      setOtherImages(images);
    } catch (error) {
      toast.error("There was a problem fetching product details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error("There was a problem fetching categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 w-full max-xl:px-5">
        <SectionTitle title="Product Details" />

        {/* Product name input */}
        <div className="form-group">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            className="form-input"
            value={product?.title || ""}
            onChange={(e) => setProduct({ ...product!, title: e.target.value })}
          />
        </div>

        {/* Product price input */}
        <div className="form-group">
          <label className="form-label">Product Price:</label>
          <input
            type="number"
            className="form-input"
            value={product?.price || ""}
            onChange={(e) => setProduct({ ...product!, price: Number(e.target.value) })}
          />
        </div>

        {/* Manufacturer input */}
        <div className="form-group">
          <label className="form-label">Manufacturer:</label>
          <input
            type="text"
            className="form-input"
            value={product?.manufacturer || ""}
            onChange={(e) => setProduct({ ...product!, manufacturer: e.target.value })}
          />
        </div>

        {/* Slug input */}
        <div className="form-group">
          <label className="form-label">Slug:</label>
          <input
            type="text"
            className="form-input"
            value={product?.slug && convertSlugToURLFriendly(product?.slug)}
            onChange={(e) =>
              setProduct({ ...product!, slug: convertSlugToURLFriendly(e.target.value) })
            }
          />
        </div>

        {/* Category select */}
        <div className="form-group">
          <label className="form-label">Category:</label>
          <select
            className="form-select"
            value={product?.categoryId || ""}
            onChange={(e) => setProduct({ ...product!, categoryId: e.target.value })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {formatCategoryName(category.name)}
              </option>
            ))}
          </select>
        </div>

        {/* Main image upload */}
        <div className="form-group">
          <label className="form-label">Main Image:</label>
          <input
            type="file"
            className="form-file-input"
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
        <div className="form-group">
          <label className="form-label">Other Images:</label>
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
        </div>

        {/* Product description */}
        <div className="form-group">
          <label className="form-label">Product Description:</label>
          <textarea
            className="form-textarea"
            value={product?.description || ""}
            onChange={(e) => setProduct({ ...product!, description: e.target.value })}
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <CustomButton
            type="button"
            onClick={updateProduct}
            className="btn btn-primary"
          >
            Update Product
          </CustomButton>
          <CustomButton
            type="button"
            onClick={deleteProduct}
            className="btn btn-danger"
          >
            Delete Product
          </CustomButton>
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
