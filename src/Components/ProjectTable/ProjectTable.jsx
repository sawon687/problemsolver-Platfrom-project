'use client'
import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
    //  const fetechData=async()=>{
    //           const res=await fetch('/api/Project',{
    //          method:'GET',
    //           cache: "no-cache",
    //     })  

    //     const result=await res.json()
             
    //       return await result.result;
    //     }
  
const ProjectTable = () => {
//    const  project=  await fetechData() 
 const [project,setProject]=useState([])

     useEffect(()=>{
        const fetechData=async()=>{
              const res=await fetch('/api/Project',{
             method:'GET',
              cache: "no-cache",
        })  

        const result=await res.json()
        console.log('data',result.result)
        setProject(result?.result)
        }
        fetechData()
     },[])
 
console.log('project',project)
    return (
        
        <div className="p-6">
            <div className="bg-white shadow-lg border-3 border-green-500 rounded-2xl overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4">
                    <h2 className="text-xl font-bold">Project Overview</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">

                        <thead className="bg-green-500 text-white">
                            <tr>
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Budget</th>
                                <th className="px-6 py-3">Deadline</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Requests</th>
                                <th className="px-6 py-3">Task</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">

                          {
                            project.map((project,i)=> <ProjectCard index={i} project={project} key={project?._id}></ProjectCard>)
                          }

                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    )
}

export default ProjectTable
