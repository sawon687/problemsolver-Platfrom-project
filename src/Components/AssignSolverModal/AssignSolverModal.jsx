'use client';
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

 const AssignSolverModal=({ isOpen, onClose, id, requests })=> {
  if (!isOpen) return null;
console.log('requsts',requests)
const onAssign=async(solverId)=>{
       console.log('solverID',solverId)
    const assignInfo={
       solverId
    }
    console.log('solve id',solverId,assignInfo)
    const res=await fetch(`/api/Byuer-project/${id}`,{
        method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
     body: JSON.stringify(assignInfo),
    })
    const result=await res.json()
    console.log('results',result)
    if(result.success)
    {
       alert(result.message)
    }else{
       alert(result.message)
    }
}

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] p-6 flex flex-col"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <h2 className="text-2xl font-extrabold mb-4 text-center">Assign Problem Solver</h2>

          {requests?.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No requests yet.</p>
          ) : (
            <ul className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-w-4 hover:scrollbar-thumb-gray-700">
              {requests?.map((solver) => (
                <li
                  key={solver.solverId}
                  className="grid grid-cols-4 gap-4 items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                >
                  <span className="font-medium text-gray-900">{solver.name || "No Name"}</span>
                  <span className="font-medium text-gray-900">{solver.message || "-"}</span>
                  <span className="font-medium text-gray-900">{solver?.expectedTimeline||'-'}</span>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => onAssign(solver.solverId)}
                  >
                    Assign
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex justify-end">
            <button
              className="text-gray-700 font-medium hover:text-gray-900"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

 
export default AssignSolverModal;