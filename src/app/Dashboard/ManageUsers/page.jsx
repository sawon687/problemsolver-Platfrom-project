import UserTable from "@/Components/UserMange/UserTable";
import React from "react";

const getuser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userInfo`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await res.json();
  return result.data;
};

const Page = async () => {
  const user = await getuser();

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white tracking-tight">
            User Management Panel
          </h2>
          <span className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            {user?.length || 0} Total Users
          </span>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Profile & Expertise</th>
                <th className="px-6 py-4">Rate</th>
                <th className="px-6 py-4">Current Status</th>
                <th className="px-6 py-4">Joined On</th>
                <th className="px-6 py-4 text-center">Change Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {user?.map((u) => (
                <UserTable key={u._id} user={u} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;