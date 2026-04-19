'use client'
import React from 'react';
import { IoCloseOutline, IoTimeOutline, IoCalendarOutline, IoMailOutline, IoWalletOutline } from "react-icons/io5";
import { HiOutlineUserCircle, HiCheckBadge } from "react-icons/hi2";
import { BiFingerprint } from "react-icons/bi";

const RequstesModal = ({ isOpen, setOpen, reqData }) => {
    if (!isOpen) return null;
console.log('reqdata',reqData)
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-[8px] flex items-center justify-center z-[100] px-4 py-6 overflow-hidden">
            
            {/* Modal Box */}
            <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-slate-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.15)] flex flex-col max-h-[90vh] animate-[fadeInScale_0.3s_ease-out]">
                
                {/* Header Section */}
                <div className="flex items-center justify-between px-10 py-8 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-transparent rounded-t-[2.5rem]">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                            Proposal <span className="text-indigo-500">Insights</span>
                        </h2>
                        <p className="text-slate-400 text-sm mt-1 font-medium">
                            Manage {reqData?.length || 0} active solver proposals
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-2xl bg-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 transition-all duration-300 shadow-inner"
                    >
                        <IoCloseOutline size={30} />
                    </button>
                </div>

                {/* Requests List */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                    {reqData && reqData.length > 0 ? (
                        reqData.map((data) => (
                            <div
                                key={data.solverId}
                                className="group relative bg-[#121212] border border-slate-800 rounded-[2rem] p-6 hover:border-indigo-500/50 transition-all duration-500 shadow-lg"
                            >
                                {/* Top: Identity & Status */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                            <HiOutlineUserCircle size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                                                {data.name} 
                                                <HiCheckBadge className="text-indigo-500 text-lg" />
                                            </h3>
                                            <div className="flex items-center gap-2 text-slate-500 text-xs mt-0.5">
                                                <IoMailOutline /> {data.contactEmail}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${
                                        data.status === "Accept" 
                                        ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20":data.status==='in-progress'?'bg-blue-400/10 text-blue-500 border-blue-600/20' 
                                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                    }`}>
                                        {data.status}
                                    </div>
                                </div>

                                {/* Message Box */}
                                <div className="bg-black/40 rounded-2xl p-5 border border-slate-800/50 mb-6">
                                    <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                        <span className="text-indigo-500 text-2xl font-serif leading-none mr-1">“</span>
                                        {data.message}
                                    </p>
                                </div>

                                {/* Grid Details: Budget, Timeline, SolverID */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                                        <IoWalletOutline className="text-indigo-500 text-lg" />
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Budget Bid</p>
                                            <p className="text-white font-bold text-sm">${data.userBitBudget}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                                        <IoTimeOutline className="text-indigo-500 text-lg" />
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Timeline</p>
                                            <p className="text-white font-bold text-sm">{data.expectedTimeline}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 flex items-center gap-3 col-span-2 md:col-span-1">
                                        <BiFingerprint className="text-indigo-500 text-lg" />
                                        <div className="overflow-hidden">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Solver ID</p>
                                            <p className="text-slate-400 font-mono text-[10px] truncate">{data.solverId}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Timestamp */}
                                <div className="mt-6 flex justify-end items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                    <IoCalendarOutline />
                                    <span>Applied on {new Date(data.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-slate-900/20 rounded-[2rem] border border-dashed border-slate-800">
                            <p className="text-slate-500 font-bold uppercase tracking-widest">Empty Submissions</p>
                        </div>
                    )}
                </div>

                {/* Bottom Bar */}
                <div className="px-10 py-6 bg-slate-900/50 border-t border-slate-800 rounded-b-[2.5rem] flex justify-center items-center">
                    <button 
                        onClick={() => setOpen(false)}
                        className="text-[10px] font-black text-slate-500 hover:text-indigo-500 uppercase tracking-[0.3em] transition-all"
                    >
                        [ Close Session ]
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInScale {
                    from { opacity: 0; transform: translateY(20px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #0a0a0a;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1e1e1e;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #4f46e5;
                }
            `}</style>
        </div>
    );
};

export default RequstesModal;