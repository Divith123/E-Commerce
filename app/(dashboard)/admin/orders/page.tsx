"use client";
import { AdminOrders, DashboardSidebar } from "@/components";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

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
  status: string;
  total: number;
}

const DashboardOrdersPage = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);

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
    fetchAllOrders();
  }, []);

  const downloadAllOrdersExcel = () => {
    const ws = XLSX.utils.json_to_sheet(allOrders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AllOrders");
    XLSX.writeFile(wb, "all_orders.xlsx");
  };

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-full max-xl:flex-col max-xl:h-fit">
      <DashboardSidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Orders</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition-colors"
            onClick={downloadAllOrdersExcel}
          >
            Download All Orders XLS
          </button>
        </div>
        <AdminOrders />
      </div>
    </div>
  );
};

export default DashboardOrdersPage;
