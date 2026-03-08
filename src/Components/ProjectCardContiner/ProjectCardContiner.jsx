'use client'
import React, { useEffect, useRef, useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import { Dice1 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const categories = [
    { label: 'All', value: 'All' },
    { label: 'Web Development', value: 'web-development' },
    { label: 'App Development', value: 'app-development' },
    { label: 'UI/UX Design', value: 'ui/ux design' },
    { label: 'Backend Development', value: 'backend-development' },
    { label: 'Frontend Development', value: 'frontend-development' },
    { label: 'Full Stack Development', value: 'fullstack-development' }
];
const ProjectCardContiner = ({ project }) => {
    const [active, setActive] = useState('All')
    const router = useRouter()
    const timeRef = useRef()
    const handleCategory = (category, dilay) => {



        if (timeRef.current) {
            clearTimeout(timeRef.current)
        }

        timeRef.current = setTimeout(() => {

            const params = new URLSearchParams(window.location.search)
            if (category && category !== 'All') params.set('category', category)
            else params.delete('category')

            router.push(`?${params.toString()}`)

        }, dilay);


    }
    console.log('active', active)
    return (
        <div>
            {/* <h1 className='text-center text-5xl font-bold'>TOtal:{project.length}</h1>  */}
            <div className='flex fixed w-full top-20 justify-center bg-linear-to-r to-emerald-700 from-green-500 py-2 '>
                {
                    categories.map((cat, i) => <button onClick={() => {
                        setActive(cat.value)
                        handleCategory(cat.value, 3000)
                    }} className={`btn ${active === cat.value ? 'bg-green-500 text-white' : ' bg-white text-green-700'} mx-2 rounded-md gap-2  border-green-500 border`} key={i}>{cat.label}</button>)
                }
            </div>
            <div className=' my-20 px-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {project?.map(project => <ProjectCard key={project._id} project={project}></ProjectCard>
                )}
            </div>
        </div>
    );
};

export default ProjectCardContiner;