'use client'
import React, { useEffect, useState } from 'react';
import ListCard from '../ProjectlistCard/ListCard';
import { useSession } from 'next-auth/react';

const ByuerProjectList =() => {
const {data:sesstion}=useSession()
const [project,setProject]=useState([])

    useEffect(()=>{  
       const getProjectlist=async()=>{
        const id=sesstion?._id
        
        if(!id)return
    const res=await fetch(`/api/Project/${id}`,{
        cache:'no-cache',
           credentials: "include", 
         headers: {
        "Content-Type": "application/json",
      },
    })

    const result= await res.json()
   
    setProject(result?.data|| [])
}
getProjectlist()
    },[sesstion])
 
    return (
        <div>
             
            <div className="overflow-x-auto">
  <table className="table table-md">
    <thead>
      <tr>
        <th></th>
        <th>Project Title</th>
        <th>Deadline</th>
        <th>Budget</th>
        <th>Status badge</th>
        <th>action</th>
   
      </tr>
    </thead>
    <tbody>
   
        {
            project?.map(item=><ListCard key={item._id} item={item}></ListCard>)
        }
      
      
    
     
    </tbody>
   
  </table>
</div>
        </div>
       
    );
};

export default ByuerProjectList;