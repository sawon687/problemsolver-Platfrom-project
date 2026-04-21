// ProjectSkeleton.jsx
import React from 'react';

const ProjectSkeleton = () => {
    return (
        <div className="bg-white border border-slate-200/60 rounded-[32px] p-6 flex flex-col justify-between h-full animate-pulse">
            <div>
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div className="h-6 w-24 bg-slate-200 rounded-xl"></div>
                    <div className="h-5 w-16 bg-slate-100 rounded-lg"></div>
                </div>

                {/* Project Title */}
                <div className="h-7 w-3/4 bg-slate-200 rounded-lg mb-3"></div>

                {/* Description */}
                <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-slate-100 rounded"></div>
                    <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="h-16 bg-slate-50 border border-slate-100 rounded-2xl"></div>
                    <div className="h-16 bg-slate-50 border border-slate-100 rounded-2xl"></div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <div className="flex-1 h-12 bg-slate-200 rounded-2xl"></div>
                <div className="flex-1 h-12 bg-slate-200 rounded-2xl"></div>
            </div>
        </div>
    );
};

export default ProjectSkeleton;