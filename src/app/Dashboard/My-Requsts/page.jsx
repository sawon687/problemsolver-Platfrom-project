import React from 'react';
import Link from 'next/link';
import { Clock, DollarSign, Send, LayoutDashboard, Briefcase, ExternalLink, Calendar } from 'lucide-react';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import DeleteRequestModal from '../../../Components/AllModal/DeleteRequestModal';

  

async function getRequests() {
  const cookieStore = cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Worker/my-requsts`, {
    headers: {
      Cookie: (await cookieStore).toString(),
    },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const result = await res.json();
  return result?.data || [];
}


async function deleteRequestAction(id) {
  'use server';
  const cookieStore = cookies();
  console.log('id',id)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Worker/delete-request/${id}`, {
      method: 'DELETE',
      headers: {
        Cookie: (await cookieStore).toString(),
      },
    });

    if (res.ok) {
      revalidatePath('/Dashboard/My-Requsts');
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false };
  }
}

const ProjectRequestsPage = async () => {
  const requests = await getRequests();

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6"> 
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              My <span className="text-indigo-600">Project Requests</span>
            </h1>
            <p className="text-slate-500 font-medium">Manage and track your active project applications.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
            <div className="bg-indigo-50 p-2.5 rounded-xl">
              <Briefcase className="text-indigo-600 w-5 h-5" />
            </div>
            <div className="pr-4 border-r border-slate-100">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Bids</p>
              <p className="text-slate-900 font-bold text-lg leading-tight">{requests.length}</p>
            </div>
          </div>
        </div>

        {requests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {requests.map((req) => (
              <div key={req._id} className="group bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 transition-all duration-300 overflow-hidden">
                <div className="p-6 md:p-8">
                  
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">
                      ID: {req._id?.slice(-6)}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        req.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {req.status}
                      </div>
                      
                     
                      <DeleteRequestModal
                        requestId={req._id} 
                        onDelete={deleteRequestAction} 
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {req.projectId?.ProjectTitle || "Untitled Project"}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-xl text-xs font-semibold">
                      <Clock size={16} className="text-indigo-500" /> {req.expectedTimeline || "N/A"}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-xl text-xs font-bold text-slate-900">
                      <DollarSign size={16} className="text-indigo-500" /> ${req.userBitBudget}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6 italic text-slate-600 text-sm">
                    "{req.message}"
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar size={14} />
                      <span className="text-[11px] font-medium">
                        {new Date(req.createdAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
    

                      {req.status === 'in-progress' && (
                        <Link href={`/Dashboard/My-Requsts/${req.projectId}/UploadedProject`}>
                          <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-indigo-100">
                            Submit <Send size={14} />
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-slate-200 rounded-[3rem]">
            <LayoutDashboard size={40} className="text-indigo-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">No applications found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRequestsPage;