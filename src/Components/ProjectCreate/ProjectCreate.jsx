'use client'
import React from 'react';
import { useForm } from 'react-hook-form';

const ProjectCreate = () => {
   
       const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
   const handleCreate=(data)=>{
         console.log('data',data)
   }
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create Project
      </h2>

      <form onSubmit={handleSubmit(handleCreate)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Project Title
          </label>
          <input
            type="text"
            name="title"
          
            placeholder="Enter project title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary  transition"
             {...register('Project-Title')}
          />
        </div>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
         {/* Budget */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Budget ($)
          </label>
          <input
            type="number"
            name="budget"
            
            placeholder="Enter project budget"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
            {...register('Project-Budget')}
          />
        </div>
        {/* Category */}
       <div>
  <label className="block text-gray-700 mb-2 font-medium">
    Category
  </label>

  <select
    name="category"
      
    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary transition"
      {...register('Project-Category')}
  >
    <option value="">Select project category</option>
    <option value="web-development">Web Development</option>
    <option value="app-development">App Development</option>
    <option value="ui-ux-design">UI / UX Design</option>
    <option value="backend-development">Backend Development</option>
    <option value="frontend-development">Frontend Development</option>
    <option value="fullstack-development">Full Stack Development</option>
  </select>
</div>
       </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Description
          </label>
          <textarea
            name="description"
            
            placeholder="Enter project description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary  transition resize-none"
            rows={4}
              {...register('Project-Description')}
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
        
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary  transition"
              {...register('Project-Deadline')}
          />
        </div>

       
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-cyan-600 transition-colors font-medium"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};



export default ProjectCreate;