'use client'
import React from 'react';

const ListCard = ({item}) => {
  
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
                    <button className="bg-blue-500 btn text-white px-3 
                     rounded hover:bg-blue-600">
                        Assign Solver</button>
                   )
             }


             {
                ["assigned", "in-progress", "completed"].includes(item.status)&&(
                     <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                    View Details
                  </button>
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
