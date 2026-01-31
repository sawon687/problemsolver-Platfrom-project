// ProjectCard.jsx
import Link from "next/link";
import React from "react";

const ProjectCard = ({ project }) => {
  console.log('project id',project._id)
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
      {/* Project Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{project.ProjectTitle}</h2>
      
        <p className="text-sm text-gray-500 mb-2">
          Budget: <span className="font-medium text-gray-700">${project.ProjectBudget}</span>
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Deadline: <span className="font-medium text-gray-700">{project.ProjectDeadline}</span>
        </p>
        <p className="text-gray-600 text-sm">{project.ProjectDescription}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-3">
        <button className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
          Request to Work
        </button>
        <Link href={`/Projectes/${project?._id}`} className="flex-1 btn text-center border border-primary hover:bg-primary  hover:text-white text-gray-700 py-2 px-4 rounded-lg  transition-colors">
          Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
