import React from 'react';
import { IoCloseOutline } from "react-icons/io5";

const RequstesModal = ({ isOpen, setOpen, reqData }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            {/* Modal Box */}
            <div className='bg-gradient-to-r to-green-500 from-emerald-600 pb-10  w-full max-w-2xl rounded-3xl shadow-2xl p-2 animate-[fadeIn_.3s_ease]'>
            <div className="relative w-full  bg-white/90 backdrop-blur-md border border-gray-200 p-6 rounded-3xl ">

                {/* Header */}
                <div className="flex items-center justify-between mb-6 border-b border-green-500 pb-3">

                    <h2 className="text-2xl font-semibold text-green-800">
                        Request Details
                    </h2>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-full hover:bg-red-100 transition"
                    >
                        <IoCloseOutline className="text-2xl text-gray-500 hover:text-red-500" />
                    </button>

                </div>

                {/* Requests List */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">

                    {reqData?.map((data) => (

                        <div
                            key={data.solverId}
                            className="bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                        >

                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {data.name}
                                </h3>

                                <span className={`px-3 py-1 text-xs rounded-full font-medium
                                    ${data.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                    }`}>
                                    {data.status}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-3">
                                {data.message}
                            </p>

                            <div className="flex justify-between text-sm text-gray-500">

                                <div>
                                    ⏳ {data.expectedTimeline}
                                </div>

                                <div className="text-xs text-gray-400">
                                    {new Date(data.createdAt).toLocaleDateString()}
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
            </div>
        </div>
    );
};

export default RequstesModal;
