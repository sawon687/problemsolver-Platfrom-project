import UserTable from "@/Components/UserMange/UserTable";
import React, { Suspense } from "react";
import UserSkeleton from '../../../Components/LoadinSKelation/UserSkeleton';

// Data fetching function-ti thakbe
const getuser = async () => {
  const res = await fetch(`/api/Admin/userInfo`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await res.json();
  return result.data;
};


const UserList = async () => {
  const user = await getuser();
  return (
    <>
      {user?.map((u) => (
        <UserTable key={u._id} user={u} />
      ))}
    </>
  );
};

const Page = () => {
  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white tracking-tight">
            User Management Panel
          </h2>
          {/* Note: Total count ekhane 0 thakbe loading-er somoy */}
          <span className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            Manage Users
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
              {/* Suspense ekhon trigger hobe karon UserList ekti async component */}
              <Suspense fallback={<UserSkeleton />}>
                <UserList />
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;