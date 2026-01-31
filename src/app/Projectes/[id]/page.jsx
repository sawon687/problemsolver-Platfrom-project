import ProjectDetails from '@/Components/ProjectDetails/ProjectDetails';
import React from 'react';
const getProject=async(id)=>{
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-project/${id}`,    { cache: "no-store" })

    const data= await res.json()
    console.log('data sawon',data)
    return data.result
}
const page = async({params}) => {
    const {id}=await params
    const project=await getProject(id)
    console.log('project',project)
    console.log(id)
    return (
        <div>
            <ProjectDetails key={project?._id} project={project}></ProjectDetails>
        </div>
    );
};

export default page;