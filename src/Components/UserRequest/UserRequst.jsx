"use client"; // Because form has useState

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const UserRequst = ({ id }) => {

 
    console.log('sawibgr',id)
    const {data:session}=useSession()
     console.log('sesstion',session)
      const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
   const solverId = session?._id;

  const handleRequset =async(data) => {
    setLoading(true);
        data.solverId=solverId
        data.contactEmail=session.user?.email
     // Example: get from session in real app
        console.log('data',data,id)
    const res = await fetch(`/api/user-project/${id}/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    setLoading(false);

    if (response.success) {
      alert("Request sent successfully!");
      router.push(`/project/${id}`); // redirect back to project details
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-center">Send Request</h2>

      <form onSubmit={handleSubmit(handleRequset)} className="space-y-4">
         <label className="block text-gray-700 mb-2 font-medium">
           Name
          </label>
            <input
          type="text"
          defaultValue={session?.username}
          placeholder="Enter your username"
          className="w-full p-2 border rounded"
          {...register('name')}
        />
       <label className="block text-gray-700 mb-2 font-medium">
              message
          </label>
        <textarea
          placeholder="Write a short note to the buyer (optional)"
          className="w-full p-2 border rounded  focus:ring-primary"
          {...register('message')}
        />
      <label className="block text-gray-700 mb-2 font-medium">
           Expected Timeline 
          </label>
        <input
          type="text"
        
          placeholder="Expected timeline (optional)"
          className="w-full p-2 border rounded"
          {...register('expectedTimeline')}
        />

          {/* Budget */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Budget ($)
          </label>
          <input
            type="number"
            name="budget"
            
            placeholder="Enter project budget"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
            {...register('userBitBudget')}
          />
        </div>
        

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Request"}
        </button>
      </form>
    </div>
  );
};

export default UserRequst;
