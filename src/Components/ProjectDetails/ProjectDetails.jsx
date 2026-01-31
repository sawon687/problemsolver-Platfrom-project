'use client'

import Link from "next/link";

const ProjectDetails = ({ project = {} }) => {
  console.log(project)
  const handleRequset=()=>{
     
  }
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h1 className="text-2xl font-bold">{project?.ProjectTitle}</h1>

        <div className="flex gap-3 mt-2 items-center">
          <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
            {project?.status}
          </span>
          <span className="text-sm text-gray-500">
            {project?.ProjectCategory}
          </span>
        </div>
      </div>

      {/* Budget & Deadline */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          💰 <span className="font-semibold">Budget:</span> ${project?.ProjectBudget}
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          ⏰ <span className="font-semibold">Deadline:</span> {project?.ProjectDeadline}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Project Description</h2>
        <p className="text-gray-600">{project?.ProjectDescription}</p>
      </div>

      {/* Buyer Info */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Buyer Information</h2>
        <p className="text-sm text-gray-600">Buyer ID: {project?.buyerId}</p>
        <p className="text-sm text-gray-600">
          Created: {new Date(project?.createdAt).toDateString()}
        </p>
      </div>

      {/* Action */}
      <Link href={`/Projectes/${project?._id}/Request`}>
      <button 
        disabled={project?.status !== "unassigned"}
        className={`w-full py-3 rounded-md font-semibold transition
        ${
          project?.status === "unassigned"
            ? "bg-primary text-white hover:bg-primary/90"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Send Request
      </button>
      </Link>
    </div>
  );
};

export default ProjectDetails;
