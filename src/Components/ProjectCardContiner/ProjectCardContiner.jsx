'use client'
import React, { useEffect, useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectCardContiner = ({project}) => {
  

    console.log(project)
    return (                               
         <div className=' my-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            { project?.map( project=>   <ProjectCard key={project._id} project={project}></ProjectCard>
            )}
            </div>
    );
};

export default ProjectCardContiner;