import ProjectUpoladed from '@/Components/ProjectUpoladed/ProjectUpoladed';
import React from 'react';
const getReqProject=async(id)=>{
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-project/${id}`)
    const project=await res.json()
    return project.result
}
const page = async({params}) => {
    const {id}=await params
    const reqProject=await getReqProject(id) || []
    console.log('reqProject',reqProject)
    return (
        <div  className='min-h-screen  py-10 px-4'>

          <div className="max-w-5xl mx-auto space-y-8">

        {/* Project Details Card */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Project Details
          </h1>

          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Title:</span> {reqProject.ProjectTitle}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {reqProject.ProjectCategory}
            </p>
            <p>
              <span className="font-semibold">Budget:</span> ${reqProject.ProjectBudget}
            </p>
            <p>
              <span className="font-semibold">Deadline:</span> {reqProject.ProjectDeadline}
            </p>
            <p>
              <span className="font-semibold">Status:</span>
              <span className="ml-2 px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
               
                
                    {reqProject.status}

                
              </span>
            </p>
          </div>

          <div className="mt-6">
            <p className="font-semibold mb-2">Description:</p>
            <p className="text-gray-600 leading-relaxed">
              {reqProject.Description}
            </p>
          </div>
        </div>
            <ProjectUpoladed id={id}  ></ProjectUpoladed>
          </div>
        </div>
    );
};

export default page;