'use client';
import React, { useEffect, useState } from 'react';
import SolverInfo from '../SolverInfo/SolverInfo';


const ProjectDetailPage = ({ id }) => {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
 console.log('DIS SAON',project)
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // setLoading(true);

        // Fetch project data
        const res = await fetch(`/api/user-project/${id}`);
        const data = await res.json();
        console.log('data is',data.result)
        setProject(data.result);
        console.log('solverid',project.assignedSolverId)

      
       
    } catch (err) {

        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [id]);

  // if (loading) return <p className="text-center mt-10">Loading...</p>;
 

 

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* ---------------- Project Info ----------------*/}
      <div className="bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold">{project?.ProjectTitle}</h1>
        <p className="text-gray-600 mt-2">{project.ProjectBudget}</p>
        <p className="text-gray-600 mt-2">{project.assignedSolverId}</p>
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>Deadline: {project.ProjectDeadline}</span>
          <span>Budget: ${project.ProjectBudget}</span>
          <span>Status: <strong>{project.status}</strong></span>
        </div>
      </div> 

      {/* ---------------- Assigned Solver Info ---------------- */}
     <SolverInfo  solverId ={ project.assignedSolverId}></SolverInfo>

    
    </div>
  );
};

export default ProjectDetailPage;
