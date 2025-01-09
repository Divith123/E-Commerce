"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { DashboardSidebar } from "@/components";
import { isValidEmailAddressFormat, isValidNameOrLastname } from "@/lib/utils";
import * as XLSX from "xlsx";

interface Product {
  id: string;
  slug: string;
  title: string;
  mainImage: string;
  price: number;
  rating: number;
  description: string;
  manufacturer: string;
  inStock: number;
  categoryId: string;
}

interface OrderProduct {
  id: string;
  customerOrderId: string;
  productId: string;
  quantity: number;
  product: Product;
}

type OrderStatus = "processing" | "delivered" | "canceled";

interface Order {
  id: string;
  adress: string;
  apartment: string;
  company: string;
  dateTime: string;
  email: string;
  lastname: string;
  name: string;
  phone: string;
  postalCode: string;
  city: string;
  country: string;
  orderNotice: string;
  status: OrderStatus;
  total: number;
}

const AdminSingleOrder = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const params = useParams<{ id: string }>();
  const router = useRouter();

  // Fetch detailed information about the order
  const fetchOrderData = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${orderId}`);
      if (!response.ok) {
        throw new Error("Error fetching order details.");
      }
      const data: Order = await response.json();
      setOrder(data);
    } catch (error) {
      toast.error("There was a problem fetching the order details.");
    }
  };

  // Fetch the products associated with the order
  const fetchOrderProducts = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/order-product/${orderId}`);
      if (!response.ok) {
        throw new Error("Error fetching order products.");
      }
      const data: OrderProduct[] = await response.json();
      setOrderProducts(data);
    } catch (error) {
      toast.error("There was a problem fetching the order products.");
    }
  };

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders`);
      if (!response.ok) {
        throw new Error("Error fetching all orders.");
      }
      const data: Order[] = await response.json();
      setAllOrders(data);
    } catch (error) {
      toast.error("There was a problem fetching all orders.");
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchOrderData(params.id);
      fetchOrderProducts(params.id);
    }
    fetchAllOrders();
  }, [params?.id]);

  const updateOrder = async () => {
    if (!order) {
      toast.error("No order found.");
      return;
    }

    const {
      id,
      name,
      lastname,
      phone,
      email,
      company,
      adress,
      apartment,
      city,
      country,
      postalCode,
    } = order;

    // Basic form validation
    if (
      !name ||
      !lastname ||
      !phone ||
      !email ||
      !company ||
      !adress ||
      !apartment ||
      !city ||
      !country ||
      !postalCode
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!isValidNameOrLastname(name)) {
      toast.error("Invalid name format.");
      return;
    }

    if (!isValidNameOrLastname(lastname)) {
      toast.error("Invalid last name format.");
      return;
    }

    if (!isValidEmailAddressFormat(email)) {
      toast.error("Invalid email address format.");
      return;
    }

    // Send the updated information to the server
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Order update failed.");
      }

      toast.success("Order updated successfully.");
    } catch (error) {
      toast.error("An error occurred while updating the order.");
    }
  };

  const deleteOrder = async () => {
    if (!order) {
      toast.error("No order found.");
      return;
    }

    try {
      // Remove items from the order-product table first
      const productResponse = await fetch(
        `http://localhost:3001/api/order-product/${order.id}`,
        { method: "DELETE" }
      );
      if (!productResponse.ok) {
        throw new Error("Error deleting order products.");
      }

      // Remove the order itself
      const orderResponse = await fetch(
        `http://localhost:3001/api/orders/${order.id}`,
        { method: "DELETE" }
      );
      if (!orderResponse.ok) {
        throw new Error("Error deleting the order.");
      }

      toast.success("Order deleted successfully.");
      router.push("/admin/orders");
    } catch (error) {
      toast.error("There was an error deleting the order.");
    }
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet([
      {
        ...order,
        products: orderProducts.map(op => ({
          productId: op.product.id,
          title: op.product.title,
          quantity: op.quantity,
          price: op.product.price,
        })),
      },
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "OrderDetails");
    XLSX.writeFile(wb, "order_details.xlsx");
  };

  const downloadAllOrdersExcel = () => {
    const ws = XLSX.utils.json_to_sheet(allOrders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AllOrders");
    XLSX.writeFile(wb, "all_orders.xlsx");
  };

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <DashboardSidebar />
        <p className="mt-6 text-lg text-gray-600">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="flex max-w-screen-2xl mx-auto bg-gray-50 min-h-screen">
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="w-full p-6 md:p-10 bg-white shadow-lg">
        {/* Title Section */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">
            Order Details
          </h1>
          <div className="flex gap-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition-colors"
              onClick={downloadExcel}
            >
              Download XLS
            </button>
  
          </div>
        </div>

        {/* Order Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Order ID:
            </label>
            <div className="bg-gray-100 rounded p-2 text-gray-800">
              {order.id}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={order.name}
              onChange={(e) => setOrder({ ...order, name: e.target.value })}
            />
          </div>

          {/* Lastname */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Last Name:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={order.lastname}
              onChange={(e) =>
                setOrder({ ...order, lastname: e.target.value })
              }
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={order.phone}
              onChange={(e) => setOrder({ ...order, phone: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address:
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={order.email}
              onChange={(e) => setOrder({ ...order, email: e.target.value })}
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Company (optional):
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={order.company}
              onChange={(e) => setOrder({ ...order, company: e.target.value })}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Address:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={order.adress}
              onChange={(e) => setOrder({ ...order, adress: e.target.value })}
            />
          </div>

          {/* Apartment */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Apartment, Suite, etc.:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={order.apartment}
              onChange={(e) =>
                setOrder({ ...order, apartment: e.target.value })
              }
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              City:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={order.city}
              onChange={(e) => setOrder({ ...order, city: e.target.value })}
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Country:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={order.country}
              onChange={(e) =>
                setOrder({ ...order, country: e.target.value })
              }
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Postal Code:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={order.postalCode}
              onChange={(e) =>
                setOrder({ ...order, postalCode: e.target.value })
              }
            />
          </div>

          {/* Order Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Order Status:
            </label>
            <select
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              value={order.status}
              onChange={(e) =>
                setOrder({ ...order, status: e.target.value as OrderStatus })
              }
            >
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          {/* Order Notice */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Order Notice:
            </label>
            <textarea
              className="w-full border border-gray-300 focus:ring focus:ring-blue-200 rounded p-2"
              rows={4}
              value={order.orderNotice || ""}
              onChange={(e) =>
                setOrder({ ...order, orderNotice: e.target.value })
              }
            />
          </div>
        </div>

        {/* Order Products Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Ordered Products
          </h2>
          {orderProducts.map((ordered) => (
            <div
              key={ordered.id}
              className="flex items-center gap-4 border-b py-4"
            >
              <Image
                src={
                  ordered.product.mainImage
                    ? `/${ordered.product.mainImage}`
                    : "/product_placeholder.jpg"
                }
                alt={ordered.product.title}
                width={70}
                height={70}
                className="rounded object-cover"
              />
              <div>
                <Link
                  href={`/product/${ordered.product.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {ordered.product.title}
                </Link>
                <p className="text-gray-600">
                  ${ordered.product.price} &times; {ordered.quantity}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Order Summary Section */}
        <section className="mt-8 p-4 rounded bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Order Summary
          </h2>
          <p className="text-gray-700 mb-1">
            Subtotal: <span className="font-medium">${order.total}</span>
          </p>
          <p className="text-gray-700 mb-1">
            Tax (20%):{" "}
            <span className="font-medium">
              ${(order.total / 5).toFixed(2)}
            </span>
          </p>
          <p className="text-gray-700 mb-1">
            Shipping: <span className="font-medium">$5.00</span>
          </p>
          <p className="text-lg font-bold text-gray-800 mt-2">
            Total:{" "}
            <span className="font-bold">
              ${(order.total + order.total / 5 + 5).toFixed(2)}
            </span>
          </p>
        </section>

        {/* Actions: Update or Delete */}
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors"
            onClick={updateOrder}
          >
            Update Order
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold transition-colors"
            onClick={deleteOrder}
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleOrder;
