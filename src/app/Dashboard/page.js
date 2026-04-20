'use client'
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react'
import AdminDashboard from '../../Components/DashoboardLayout/AdiminDashoboard';
import BuyerDashboard from '../../Components/DashoboardLayout/BuyerDashboard';
import SolverDashboard from '../../Components/DashoboardLayout/SolverDashboard';

const DashoBoardHome= () => {
  const{data:session}=useSession()
    const { data: apiData = {}, isLoading } = useQuery({
    queryKey: ['dashboard-data', session?.role],
    queryFn: async () => {
      const endpoint = session?.role === 'Admin' ? '/api/Admindata' : '/api/BuyerData';
      const res = await fetch(endpoint);
      const result = await res.json();
      return result.result;
    },
    enabled: !!session?.role
  });
  const role=session?.role
  return (

    <div>
       {
         role==='Admin' && (
          <AdminDashboard apiData={apiData}></AdminDashboard>
         )}

{role==='Buyer' && (
          <BuyerDashboard apiData={apiData}></BuyerDashboard>
         )
       }

       {
         role==='Worker' &&( <SolverDashboard></SolverDashboard>)
       }

    </div>
  )
}

export default DashoBoardHome