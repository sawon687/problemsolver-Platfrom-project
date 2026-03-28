'use client'
import React, { useEffect, useState } from 'react';
import ListCard from '../ProjectlistCard/ListCard';
import { useSession } from 'next-auth/react';

const ByuerProjectList = () => {
  const { data: sesstion } = useSession();
  const [project, setProject] = useState([]);
console.log('project',project)
  useEffect(() => {
    const getProjectlist = async () => {
      const id = sesstion?._id;
      if (!id) return;

      const res = await fetch(`/api/Project/${id}`, {
        method: 'GET',
        cache: 'no-cache',
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      setProject(result?.data || []);
    };

    getProjectlist();
  }, [sesstion]);

  return (
    <div className="bg-white rounded-xl   shadow max-w-7xl w-full mx-auto border border-green-300 overflow-hidden">
          <div className='flex items-center py-4 bg-gradient-to-r  from-green-500 to-emerald-600'>
            <h1 className='text-2xl text-gray-50 font-bold pl-5'>Manage Buyer Project</h1>
          </div>
      <table className="min-w-full text-sm">

        {/* HEADER */}
        <thead className="  bg-green-200  text-green-700">
          <tr>
            <th className="px-6 py-4 text-left font-medium">#</th>
            <th className="px-6 py-4 text-left font-medium">Project Title</th>
            <th className="px-6 py-4 text-left font-medium">Deadline</th>
            <th className="px-6 py-4 text-left font-medium">Budget</th>
            <th className="px-6 py-4 text-left font-medium">Status</th>
            <th className="px-6 py-4 text-center font-medium">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y">

          {
            project?.map((item, index) =>
              <ListCard key={item._id} item={item} index={index} />
            )
          }

        </tbody>

      </table>

    </div>
  );
};

export default ByuerProjectList;
