
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

const page = async () => {
  const user = await getuser();
     
  return (
    <div className="p-3 sm:p-6 bg-green-50 min-h-screen">
      <div className=" mx-auto bg-white shadow-2xl border-3 border-green-500 rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 sm:px-6 sm:py-4 text-lg sm:text-xl font-bold">
          User Management Table
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto">

          <table className="  is-drawer-open:w-2xl  text-left  border-collapse ">

            {/* Table Head */}
            <thead className="sticky top-0 z-10">
              <tr className="bg-green-100 text-green-800 uppercase text-xs sm:text-sm">
                <th className="p-3 sm:p-4 whitespace-nowrap">User</th>
                <th className="p-3 sm:p-4 whitespace-nowrap">Contact</th>
                <th className="p-3 sm:p-4 whitespace-nowrap">Skill</th>
                <th className="p-3 sm:p-4 whitespace-nowrap">Rate</th>
                <th className="p-3 sm:p-4 whitespace-nowrap">Role</th>
                <th className="p-3 sm:p-4 whitespace-nowrap">Joined</th>
                <th className="p-3 sm:p-4 text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-sm sm:text-base">
              {user?.map((user) => (
                <UserTable
                 key={user._id} user={user} />
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
};

export default page;
