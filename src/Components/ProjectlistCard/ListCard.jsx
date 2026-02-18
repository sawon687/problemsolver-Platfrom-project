'use client'
import React, { useState } from 'react';
import AssignSolverModal from '../AssignSolverModal/AssignSolverModal';
import Link from 'next/link';

const ListCard = ({ item, index }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const handleAssign = (solverId) => {
    console.log("Assigned solver:", solverId);
    setModalOpen(false);
  };

  const statusStyle = {
    assigned: "bg-green-100 text-green-700",
    unAssigned: "bg-gray-100 text-gray-600",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-purple-100 text-purple-700",
    pending: "bg-yellow-100 text-yellow-700",
    submitted: "bg-amber-100 text-amber-700"
  };

  return (
    <tr className="hover:bg-gray-50 border border-green-300 transition">

      {/* INDEX */}
      <td className="px-6 py-4 text-green-500 ">
       <p className='bg-green-200 text-center py-2 rounded-xl '>   {index + 1}</p>
      </td>

      {/* PROJECT */}
      <td className="px-6 py-4 font-medium text-gray-800">
        {item?.ProjectTitle}
      </td>

      {/* DEADLINE */}
      <td className="px-6 py-4 text-gray-600">
        {item?.ProjectDeadline}
      </td>

      {/* BUDGET */}
      <td className="px-6 py-4 font-semibold text-green-600">
        ৳ {item?.ProjectBudget}
      </td>

      {/* STATUS */}
      <td className="px-6 py-4">
        <span className={`px-2 py-1 text-xs rounded ${statusStyle[item?.status]}`}>
          {item?.status}
        </span>
      </td>

      {/* ACTION */}
      <td className="px-6 py-4 text-center space-x-2">

        {item?.status === 'unAssigned' && (
          <>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded text-xs hover:bg-green-600"
              onClick={() => setModalOpen(true)}
            >
              Assign
            </button>

            <AssignSolverModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              requests={item.requests}
              id={item._id}
              onAssign={handleAssign}
            />
          </>
        )}

        {["assigned", "in-progress", "completed", 'pending'].includes(item.status) && (
          <Link href={`/Dashboard/Project-list/${item._id}/task-Submition`}>
            <button className="bg-gray-800 text-white px-4 py-2 rounded text-xs hover:bg-black">
              View
            </button>
          </Link>
        )}

        {item.status === "submitted" && (
          <>
            <button className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">
              Accept
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">
              Reject
            </button>
          </>
        )}

      </td>

    </tr>
  );
};

export default ListCard;
