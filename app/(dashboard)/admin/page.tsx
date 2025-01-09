"use client";
import { DashboardSidebar, StatsElement } from "@/components";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

type Visitor = {
  ipAddress: string;
  userAgent: string;
};

const AdminDashboardPage = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [visitorsToday, setVisitorsToday] = useState(0);
  const [visitorsYesterday, setVisitorsYesterday] = useState(0);
  const [visitorsByDate, setVisitorsByDate] = useState<Visitor[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  useEffect(() => {
    // Set today's date as the default selected date
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);

    // Fetch total visitors
    fetch("http://localhost:3001/api/visitor/count")
      .then((res) => res.json())
      .then((data) => setTotalVisitors(data.totalVisitors));

    // Fetch today's visitors (replace with actual today's date logic)
    fetch(`http://localhost:3001/api/visitor/count/date/${today}`)
      .then((res) => res.json())
      .then((data) => setVisitorsToday(data.visitorsOnDate));

    // Fetch yesterday's visitors
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Set to yesterday
    const formattedYesterday = yesterday.toISOString().split("T")[0];
    fetch(`http://localhost:3001/api/visitor/count/date/${formattedYesterday}`)
      .then((res) => res.json())
      .then((data) => setVisitorsYesterday(data.visitorsOnDate));

    // Fetch visitors by default today's date
    fetchVisitorsByDate();
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setPagination({ ...pagination, page: 1 }); // Reset pagination
  };

  const fetchVisitorsByDate = () => {
    fetch(`http://localhost:3001/api/visitor/date/${selectedDate}?page=${pagination.page}&limit=${pagination.limit}`)
      .then((res) => res.json())
      .then((data) => {
        setVisitorsByDate(data.visitors); // Use data.visitors instead of just data
        setPagination({ ...pagination, total: data.total }); // Set total pages
      });
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  useEffect(() => {
    if (selectedDate) fetchVisitorsByDate();
  }, [selectedDate, pagination.page, pagination.limit]);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-full max-xl:flex-col max-xl:h-fit max-xl:gap-y-4">
      <DashboardSidebar />
      <div className="w-full">
        <div className="flex flex-col items-center ml-5 gap-y-4 w-full max-xl:ml-0 max-xl:px-2 max-xl:mt-5 max-md:gap-y-1">
          <div className="flex justify-between w-full max-md:flex-col max-md:w-full max-md:gap-y-1">
            <StatsElement title="Total Visitors" value={totalVisitors} />
            <StatsElement title="Visitors Today" value={visitorsToday} />
            <StatsElement title="Visitors Yesterday" value={visitorsYesterday} />
          </div>
        </div>
        <div className="mt-5 xl:ml-5 w-full max-xl:mt-5 text-center">
          <h4 className="text-3xl text-center mb-5">
            Visitors by Date
          </h4>
          <input
            type="date"
            className="p-2 rounded-md text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <div className="mt-4 w-full">
            {visitorsByDate && visitorsByDate.length ? (
              <table className="table table-md table-pin-cols">
                {/* Head */}
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <th>IP Address</th>
                    <th>User Agent</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Rows */}
                  {visitorsByDate.map((visitor, index) => (
                    <tr key={index}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div>
                          <p className="font-bold">{visitor.ipAddress}</p>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p className="font-bold">{visitor.userAgent}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Foot */}
                <tfoot>
                  <tr>
                    <th></th>
                    <th>IP Address</th>
                    <th>User Agent</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p className="mt-4">No visitors for selected date</p>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4 w-full">
          {visitorsByDate && visitorsByDate.length ? (
            <>
              <button
                className="px-4 py-2 bg-gray-300 rounded-md shadow hover:bg-gray-400 disabled:opacity-50"
                disabled={pagination.page === 1}
                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              >
                Previous
              </button>
              <div>
                Page {pagination.page} of {totalPages}
              </div>
              <button
                className="px-4 py-2 bg-gray-300 rounded-md shadow hover:bg-gray-400 disabled:opacity-50"
                disabled={pagination.page === totalPages}
                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              >
                Next
              </button>
            </>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
