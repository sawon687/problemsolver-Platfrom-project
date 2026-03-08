 'use client'
 import { useQuery } from '@tanstack/react-query';
import React from 'react';
 
 const BuyerApply = () => {
      const { data,refetch } = useQuery({
    queryKey: ['repoData'],
    queryFn: async() =>
    {
      const req= await(await fetch('/api/BuyerInfo')).json()
      console.log('result',req)
      return req.result;

    }
  })

 const approveRequest = async ({ ...rest }) => {
  console.log("res", rest);

  const { id, role, BuyerStatus, BuyerId } = rest;

  try {

    const [userResponse, buyerResponse] = await Promise.all([
      fetch(`/api/userInfo/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      }),

      fetch(`/api/BuyerInfo/${BuyerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ BuyerStatus }),
      }),
    ]);

    const userRes = await userResponse.json();
    const BuyerRes = await buyerResponse.json();

    console.log("response", userRes, BuyerRes);

    if (userRes.success && BuyerRes.success) {
      refetch();
    }

  } catch (error) {
    console.log("error", error);
  }
};
    return (
        <>
                     {/* user byuer  application  */}
       <div className="w-full lg:w-4xl bg-white  dark:bg-gray-900 rounded-3xl shadow-lg p-6">
  <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
    Buyer Applications
  </h3>

  <div className="overflow-x-auto max-h-[400px]">
    <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
      <thead className="bg-gradient-to-r from-green-500 to-green-700 dark:bg-gray-800 sticky top-0 z-10 shadow-sm">
        <tr className="border-b text-white dark:text-gray-300">
          <th className="p-3 text-sm font-medium">Name</th>
          <th className="p-3 text-sm font-medium">Email</th>
          <th className="p-3 text-sm font-medium">Company</th>
          <th className="p-3 text-sm font-medium">Address</th>
          <th className="p-3 text-sm font-medium">Reg No</th>
          <th className="p-3 text-sm font-medium">Status</th>
          <th className="p-3 text-sm font-medium text-center">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {data?.map((req) => (
          <tr
            key={req.id}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <td className="p-3">{req.username}</td>
            <td className="p-3">{req.userEmail|| "example@mail.com"}</td>
            <td className="p-3">{req.buyersdata.compnayName || "TechSoft Ltd"}</td>
            <td className="p-3">{req.buyersdata.businessAddress || "Dhaka"}</td>
            <td className="p-3">{req.buyersdata.RegistrationorTaxId || "REG-23423"}</td>
        
            <td className="p-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  req.buyersdata.ByuerStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {req.buyersdata.ByuerStatus}
              </span>
            </td>
            <td className="p-3 flex gap-2 justify-center">
              {req.buyersdata.ByuerStatus === "pending" ? (
                <>
                  <button
                    onClick={() => approveRequest({id:req?._id,BuyerId:req.buyersdata._id,role:'Buyer',BuyerStatus:"Accept"})}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      setRequests((prev) => prev.filter((r) => r.id !== req.id))
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span className="text-green-600 font-medium">Approved</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
        </>
    );
 };
 
 export default BuyerApply;