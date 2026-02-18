
import React from 'react';

const statusStyle = {
  "unAssigned": "bg-blue-100 text-blue-700",
  "assigned": "bg-amber-100 text-amber-700",
  "Completed": "bg-green-100 text-green-700",
  "reject": "bg-red-100 text-red-700"
};
const ProjectCard = ({project,index}) => {

   
    return (
        <>
             <tr className="hover:bg-gray-50">
                                   
                                <td className=" font-semibold px-4">
                                   <p className='bg-green-100 text-center px-2 py-2 rounded-xl text-green-700'>{index+1}</p>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-700">
                                    {project.ProjectTitle}
                                </td>

                                <td className="px-6 py-4">
                                    {project.ProjectCategory}
                                </td>

                                <td className="px-6 py-4 text-green-600 font-semibold">
                                    ${project.ProjectBudget}
                                </td>

                                <td className="px-6 py-4">
                                    {project.ProjectDeadline}
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`${statusStyle[project.status]} text-green-700 px-3 py-1 rounded-full text-xs`}>
                                        {project.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                     <button className='px-2 py-2 bg-primary text-white'>view</button>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
                                      {project.tasks?.[0]?.status}
                                    </span>
                                </td>

                            </tr> 
        </>
    );
};

export default ProjectCard;