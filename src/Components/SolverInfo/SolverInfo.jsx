'use client'
import React, { useEffect, useState } from 'react';

const SolverInfo = ({solverId}) => {
      const [assignedSolver, setAssignedSolver] = useState({});
    useEffect(()=>{
  // solver info
         const getUser=async()=>{
             
          console.log('solver',solverId)
            if (solverId) {
              
      const solverRes = await fetch(`/api/userInfo/${solverId}`);
      const solverData = await solverRes.json();
      setAssignedSolver(solverData.data);
      console.log('solver data',solverData.result)
           }
         }
         getUser()
    },[solverId])
    console.log('solveredata',assignedSolver)

    return (
        <div>
                {/* ---------------- Assigned Solver Info ---------------- */}
      {assignedSolver && (
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Assigned Problem Solver</h2>
          <div className="flex items-center space-x-4">
            <img
              src={assignedSolver.userPhoto}
              alt={assignedSolver.username}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-medium text-lg">{assignedSolver.username}</p>
              <p className="text-gray-500 text-sm">hi md al jihad sawon</p>
              <p className="text-gray-400 text-xs">
                Skills: {assignedSolver.Skill}
              </p>
              {assignedSolver.contact && (
                <p className="text-gray-400 text-xs">Contact: {assignedSolver.contact}</p>
              )}
            </div>
          </div>
        </div>
      )}
        </div>
    );
};

export default SolverInfo;
