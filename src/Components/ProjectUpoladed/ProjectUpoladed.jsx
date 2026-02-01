import React from 'react';

const ProjectUpoladed = ({id}) => {
    console.log('id',id)
    return (
        <div>
            <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Project Details Card */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Project Details
          </h1>

          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Title:</span> MERN Full Stack Website
            </p>
            <p>
              <span className="font-semibold">Category:</span> Web Development
            </p>
            <p>
              <span className="font-semibold">Budget:</span> $500
            </p>
            <p>
              <span className="font-semibold">Deadline:</span> 20 Feb 2026
            </p>
            <p>
              <span className="font-semibold">Status:</span>
              <span className="ml-2 px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                Pending
              </span>
            </p>
          </div>

          <div className="mt-6">
            <p className="font-semibold mb-2">Description:</p>
            <p className="text-gray-600 leading-relaxed">
              Build a full-stack MERN application with authentication, dashboard,
              and responsive UI using Tailwind CSS and Next.js.
            </p>
          </div>
        </div>

        {/* Upload Project Card */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Submit Your Project
          </h2>

          {/* GitHub Link */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub Repository Link
            </label>
            <input
              type="text"
              placeholder="https://github.com/username/project"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Live Demo Link */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Live Project URL
            </label>
            <input
              type="text"
              placeholder="https://your-project.vercel.app"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* File Upload Design */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Project Files
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-2">
                Drag & drop your files here
              </p>
              <p className="text-xs text-gray-400 mb-4">ZIP / RAR allowed</p>

              <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm">
                Browse Files
              </button>
            </div>
          </div>

          {/* Note */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              rows="4"
              placeholder="Any instruction or note for the buyer..."
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              Submit Project
            </button>
          </div>
        </div>

      </div>
    </div>
        </div>
    );
};

export default ProjectUpoladed;