'use client'
import React from 'react';
import { FaRegUser, FaUserCog } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { RiAdminLine } from "react-icons/ri";
const UserTable = ({user={}}) => {

    const handleChangeRole=async(id,role)=>{
            console.log(id,role)
            
        const res=await fetch(`/api/userInfo/${id}`,{
            method:'POST',
              headers:{
        "Content-Type":"application/json"
    },
            body: JSON.stringify({role})
        })

        const result=await res.json()

        if(result.data.success)
        {
             alert(result.data.message)
        }

         alert(result.data.message)
    }
    return (
        <>
          <tr className="hover:bg-green-50 transition">

              {/* User */}
              <td className="p-4 flex items-center gap-3">
                <img
                  src={user.photo}
                  alt="user"
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.userEmail}</p>
                </div>
              </td>

              {/* Contact */}
              <td className="p-4 text-gray-600">{user.phoneno}</td>

              {/* Skill */}
              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {user.Skill}
                </span>
              </td>

              {/* Rate */}
              <td className="p-4 font-semibold text-green-600">
                ${user.HourlyRate}/hr
              </td>

              {/* Role */}
              <td className="p-4">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                  {user.role}
                </span>
              </td>

              {/* Date */}
              <td className="p-4 text-gray-500">{new Date(user.date).toDateString()}</td>

              {/* Actions */}
              <td className="p-4 flex gap-2 justify-center">

                {/* Role Change */}
                    <div className='flex gap-2'>

                        {
                            (user.role==='problem_solver'|| user?.role==='Buyer')&&(
                                    <button onClick={()=>handleChangeRole(user._id,'Admin')}
                  
                  className="bg-green-700 hover:bg-green-600 text-white flex items-center gap-1 px-3 py-1 rounded-md text-sm shadow"
                > <RiAdminLine />
              <span> Admin</span>
                </button>
                            )
                        }
                              {/* changer role user */}
                        {
                            
                            (user.role==='Admin'|| user.role==='Buyer')&&(

                    <button
                     onClick={()=>handleChangeRole(user._id,'problem_solver')}
                     className="bg-green-600 hover:bg-green-600 text-white px-3 py-1 flex items-center gap-1 rounded-md text-sm shadow"
                     > <FaRegUser />

                  <span> Solver</span>
                </button>
                            )
                        }
                    
                       {/* changer role buyer */}
                {   
                    (user.role==='problem_solver'|| user.role==='Admin')&&(
                          <button
                  onClick={()=>handleChangeRole(user._id,'Buyer')}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 flex items-center gap-1 py-1 rounded-md text-sm shadow"
                > <FaUserCog />
                     <span>Buyer</span>
                </button>
                        
                    )
                }
                  
                    </div>

                {/* Remove */}
                <button
                  
                  className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1 px-3 py-1 rounded-md text-sm shadow"
                > <IoTrashOutline/>
                  <span>Remove</span>
                </button>

              </td>

            </tr>   
        </>
    );
};

export default UserTable;