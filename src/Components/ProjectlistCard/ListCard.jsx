'use client';
import React, { useState } from 'react';
import AssignSolverModal from '../AssignSolverModal/AssignSolverModal';
import Link from 'next/link';
import { IoEyeOutline } from 'react-icons/io5';
import { MdAssignmentInd, MdOutlinePayments } from 'react-icons/md';
import PaymentModal from '../paymentMethods/PaymentModal';
import { useQuery } from '@tanstack/react-query'; // React Query Hook

const ListCard = ({ item, index }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);

  
  const { data: requestData, isLoading,refetch } = useQuery({
    queryKey: ['projectRequests', item._id],
    queryFn: async () => {
      const res = await fetch(`/api/Project/${item._id}/requests`); 
      const result = await res.json();
      return result?.data || [];
    },
    enabled: modalOpen, // Modal open hobar age fetch korbe na (Performance Optimization)
    staleTime: 1000 * 60 * 5, 
  });

  console.log('requstdata page',requestData)
  // const handleAssign = (solverId) => {
  //   setModalOpen(false);
  // };

  const statusStyle = {
    assigned: "bg-indigo-50 text-indigo-700 border-indigo-100",
    unAssigned: "bg-slate-50 text-slate-600 border-slate-100",
    "in-progress": "bg-blue-50 text-blue-700 border-blue-100",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    submitted: "bg-violet-50 text-violet-700 border-violet-100"
  };

  return (
    <>
      <tr className="group hover:bg-indigo-50/30 transition-colors duration-200">
        <td className="px-6 py-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
            {index + 1}
          </span>
        </td>

        <td className="px-6 py-4">
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800 text-base leading-tight">
              {item?.ProjectTitle}
            </span>
            <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">ID: {item?._id?.slice(-6)}</span>
          </div>
        </td>

        <td className="px-6 py-4">
          <span className="text-sm text-slate-600 font-medium">{item?.ProjectDeadline}</span>
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center font-bold text-indigo-600">
            <span className="text-xs mr-1">৳</span>
            <span className="text-lg tracking-tight">{item?.ProjectBudget?.toLocaleString()}</span>
          </div>
        </td>

        <td className="px-6 py-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle[item?.status] || statusStyle.unAssigned} capitalize`}>
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current animate-pulse"></span>
            {item?.status}
          </span>
        </td>

        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-2">
            {item?.status === 'unAssigned' && (
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
                onClick={() => setModalOpen(true)}
              > 
                <MdAssignmentInd size={16}/>
                <span>Assign</span>
              </button>
            )}

            {["assigned", "in-progress", 'pending', 'submitted'].includes(item.status) && (
              <Link href={`/Dashboard/Project-list/${item._id}/task-Submition`}>
                <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                  <IoEyeOutline size={16} />
                  <span>View Details</span>
                </button>
              </Link>
            )}

            {item?.status === "Completed" && (
              <button 
                onClick={() => setOpen(true)} 
                className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-emerald-100"
              >
                <MdOutlinePayments size={16}/>
                <span>Pay Now</span>
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* MODAL with useQuery data */}
      <AssignSolverModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        id={item._id}
        refetch={refetch}
        projectTitle={item.ProjectTitle}
        requests={requestData} // React Query theke asha data
        isLoading={isLoading} // Optional: Modal-e loading state dekhate parbe
      />
      
      <PaymentModal isOpen={isOpen} setOpen={setOpen} item={item} />
    </>
  );
};

export default ListCard;