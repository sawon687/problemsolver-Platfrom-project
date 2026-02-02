'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const UserProjectReq = () => {
  const [reqProject, setProject] = useState([]);

  useEffect(() => {
    const handleRequest = async () => {
      const res = await fetch('/api/Project', {
        method: 'GET',
        cache: 'no-cache',
      });
      const result = await res.json();
      console.log('results',result)
      setProject(result.result || []);
    };
    handleRequest();
  }, []);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-600">
            My Project Requests
          </h1>
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Total: {reqProject.length}
          </span>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {reqProject.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {project.ProjectTitle}
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                {project.ProjectDescription?.slice(0, 100)}...
              </p>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Category:</span>{' '}
                  {project.ProjectCategory}
                </p>
                <p>
                  <span className="font-medium">Budget:</span> $
                  {project.ProjectBudget}
                </p>
                <p>
                  <span className="font-medium">Deadline:</span>{' '}
                  {project.ProjectDeadline}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`px-2 py-1 rounded text-xs ml-1
                      ${
                        project.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : project.status === 'assigned'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                  >
                    {project.status}
                  </span>
                </p>
              </div>

              {/* Action Button */}
                {
                     project.status==='assigned'&&(
                          <div className="mt-6 flex justify-end">
                <Link href={`/Dashboard/My-Requsts/${project._id}/UploadedProject`}>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition">
                     Submit Project
                  </button>
                </Link>
              </div>
                     )
                }
            </div>
          ))}
        </div>

        {/* Empty State */}
        {reqProject.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            No project requests found 🚀
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProjectReq;
