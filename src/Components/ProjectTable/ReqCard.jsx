import React from 'react';

const ReqCard = ({data}) => {
    return (
        <>
                {/* Content */}
                <div className="space-y-4">

                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{data.name}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Message</p>
                        <p className="text-gray-700">{data.message}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <p className="text-sm text-gray-500">Expected Timeline</p>
                            <p className="font-medium">{data.expectedTimeline}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                ${data.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                                }`}>
                                {data.status}
                            </span>
                        </div>

                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Solver ID</p>
                        <p className="text-gray-700 text-sm break-all">{data.solverId}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Created At</p>
                        <p className="text-gray-700">
                            {new Date(data.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                </div>
        </>
    );
};

export default ReqCard;