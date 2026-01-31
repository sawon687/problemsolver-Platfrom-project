'use client'
import React, { useState } from 'react';
import AssignSolverModal from '../AssignSolverModal/AssignSolverModal';
import Link from 'next/link';

const ListCard = ({item}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleAssign = (solverId) => {
    console.log("Assigned solver id:", solverId);
    // API call to assign solver to project
    setModalOpen(false);
    console.log('sawon',item)
  };
    return (
      <tr>
        <th>1</th>
        <td>{item?.ProjectTitle}</td>
        <td>{item?.ProjectDeadline}</td>
        <td>{item?.ProjectBudget}</td>
        <td>{item?.status}</td>
        <td>

             {
                   item?.status==='unassigned'&&(
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                       onClick={() => setModalOpen(true)}
                   >
                      Assign Problem Solver
                      </button>

                      <AssignSolverModal
                           isOpen={modalOpen}
                           onClose={() => setModalOpen(false)}
                           requests={item.requests}
                            id={item._id}
                             onAssign={handleAssign}
                          />
                    </>
                   )
             }


             {
                ["assigned", "in-progress", "completed"].includes(item.status)&&(
                     <Link href={'/Dashboard/Project-list/AssignDetails'}>
                     <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                    View Details
                       </button>
                     </Link>
                )
             }

              {item.status === "submitted" && (
                  <>
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Accept
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Reject
                    </button>
                  </>
                )}

        </td>
       
      </tr>
    );
};

export default ListCard;
