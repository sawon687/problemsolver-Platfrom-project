'use client'
import React from "react";
import { FaDownload, FaCheck, FaTimes } from "react-icons/fa";

const SubmittedTaskView = ({task}) => {
 
  console.log('task projct id',task?.projectId)

  const handleAcceptsReject=async(action,solverId)=>{
        
             console.log('action',action,solverId)
    const res=await fetch(`/api/Project/${task?.projectId}`,{
       method:'POST',
           headers: { "Content-Type": "application/json" },
        body:JSON.stringify({action,solverId})
    })
      const result=res.json()

      if(result.success)
      {
         alert('update success fully')
      }
  }
 

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            📂 Submitted Task Details
          </h2>
          <span className={`px-3 py-1 text-sm rounded-full font-medium ${
            task?.status === "submited" ? "bg-yellow-100 text-yellow-700" :
           task?.status === "Accept" ? "bg-green-100 text-green-700" :
            "bg-red-100 text-red-700"
          }`}>
            {task?.status}
          </span>
        </div>

        {/* Project ID */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">Project ID</p>
          <p className="font-mono text-gray-800 bg-gray-100 px-3 py-2 rounded-lg">
            {task?.projectId}
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-sm text-gray-500 mb-1">GitHub Repository</p>
            <a
              href={task?.gitRepositoryLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {task?.gitRepositoryLink}
            </a>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Live Project URL</p>
            <a
              href={task?.liveProjectUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {task?.liveProjectUrl}
            </a>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-5">
          <p className="text-sm text-gray-500 mb-1">Notes</p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-700">
            {task?.notes}
          </div>
        </div>

        {/* ZIP Info */}
        <div className="border border-blue-200 bg-blue-50 rounded-xl p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-blue-700">📦 ZIP File Information</h4>
            <a
              href="/react-js-converted.zip"
              download
              className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white text-sm font-medium px-4 py-3 rounded-md transition"
            >
              <FaDownload /> <span>Download ZIP</span>
            </a>
          </div>

          <div className="bg-white rounded-lg border border-blue-100 p-4 flex items-center gap-4">
            <div className="text-4xl">🗂️</div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{task?.zipMeta.name}</p>
              <p className="text-sm text-gray-600">{task?.zipMeta.type}</p>
              <p className="text-sm text-gray-500">
                Size: {task?.zipMeta.size/task?.zipMeta.totalFiles}MB • Files: {task?.zipMeta.totalFiles}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            ⚠️ ZIP files cannot be previewed in browser. Please download to view contents.
          </p>
        </div>

        {/* Accept/Reject Buttons */}
        <div className="flex gap-4">
          <button
            onClick={()=>handleAcceptsReject('Accept',task.solverId)}
            className="flex items-center gap-2 bg-primary hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition"
          >
            <FaCheck /> Accept
          </button>
          <button
            onClick={()=>handleAcceptsReject('Reject',task.solverId)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-medium transition"
          >
            <FaTimes /> Reject
          </button>
        </div>

      </div>
    </div>
  );
};

export default SubmittedTaskView;
