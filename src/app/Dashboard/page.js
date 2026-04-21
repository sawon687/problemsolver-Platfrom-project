'use client'
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react'
import AdminDashboard from '../../Components/DashoboardLayout/AdiminDashoboard';
import BuyerDashboard from '../../Components/DashoboardLayout/BuyerDashboard';
import SolverDashboard from '../../Components/DashoboardLayout/SolverDashboard';

const DashoBoardHome= () => {
  const{data:session}=useSession()

  const role=session?.role
  return (

    <div>
       {
         role==='Admin' && (
          <AdminDashboard ></AdminDashboard>
         )}

{role==='Buyer' && (
          <BuyerDashboard ></BuyerDashboard>
         )
       }

       {
         role==='Worker' &&( <SolverDashboard></SolverDashboard>)
       }

    </div>
  )
}

export default DashoBoardHome