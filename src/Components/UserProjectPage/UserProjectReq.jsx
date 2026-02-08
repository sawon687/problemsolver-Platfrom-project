'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const UserProjectReq = () => {
  const [reqProject, setProject] = useState([]);

  useEffect(() => {
    const handleRequest = async () => {
      const res = await fetch('/api/Project/user-Requsts', {
        method: 'GET',
        cache: 'no-cache',
      });
      const result = await res.json();
      console.log('results',result)
      setProject(result?.result || []);
    };
    handleRequest();
  }, []);

  console.log(reqProject)
  return (
  
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 pt-10 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-green-600">
            My Project Requests
          </h1>
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Total: {reqProject.length}
          </span>
          </div>
        
   <div className="grid lg:grid-cols-2 gap-8 py-20 px-10">
  {reqProject?.map((project) => {
    const req = project.requests?.[0]; // 🔥 request data

    return (
      <div
        key={project._id}
        className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition duration-300"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-2xl">
          <h2 className="text-lg font-semibold">
            {project.ProjectTitle}
          </h2>
          <p className="text-sm opacity-90">
            Deadline: {project.ProjectDeadline}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">

          {/* Project Description */}
          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">
                Project Description:
              </span>{' '}
              {project.ProjectDescription}
            </p>
          </div>

          {/* Project Meta */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-4 rounded-xl border">
              <p className="font-semibold text-gray-600">Budget</p>
              <p className="text-gray-900">${project.ProjectBudget}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border">
              <p className="font-semibold text-gray-600">Category</p>
              <p className="text-gray-900">{project.ProjectCategory}</p>
            </div>
          </div>

          {/* Request Message */}
          {req && (
            <>
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">
                    Request Message:
                  </span>{' '}
                  {req.message}
                </p>
              </div>

              {/* Request Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="font-semibold text-gray-600">
                    Expected Timeline
                  </p>
                  <p className="text-gray-900">{req.expectedTimeline}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="font-semibold text-gray-600">Request Status</p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        req.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700':req.status==='in-progress'?'bg-green-200 text-green-500'
                          : 'bg-green-100 text-green-700'
                      }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Action Button (Project Assigned) */}
          {req.status === 'in-progress' && (
            <div className="pt-4 flex justify-end">
              <Link
                href={`/Dashboard/My-Requsts/${project._id}/UploadedProject`}
              >
                <button className="px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:bg-green-700 hover:scale-105 transition">
                  Submit Project 🚀
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  })}
</div>
{
  reqProject < 0 && <div>
    <h1 className='text-center text-2xl text-blue-200'>Not found</h1>
  </div>
}
</div>

  );
};

export default UserProjectReq;
