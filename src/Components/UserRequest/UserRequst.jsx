"use client"; // Because form has useState

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const UserRequst = ({ id }) => {
    console.log('sawibgr',id)
    const {data:session}=useSession()
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
            <input
          type="text"
          defaultValue={session?.username}
          placeholder="Enter your username"
          className="w-full p-2 border rounded"
          {...register('name')}
        />
        <textarea
          placeholder="Write a short note to the buyer (optional)"
          className="w-full p-2 border rounded  focus:ring-primary"
          {...register('message')}
        />

        <input
          type="text"
        
          placeholder="Expected timeline (optional)"
          className="w-full p-2 border rounded"
          {...register('expectedTimeline')}
        />
        

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
