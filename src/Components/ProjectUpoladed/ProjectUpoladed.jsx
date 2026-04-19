'use client'
import JSZip from 'jszip';
import { CheckCircle, Github, Globe, Loader2, MessageSquare, Upload } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdFolderZip } from 'react-icons/md';
import MessageModal from '../AllModal/MessageModal';

const ProjectUpoladed = ({ id }) => {
  const [zipFile, setZipFile] = useState(null);
  const [zipName, setZipName] = useState('');
  const [zipReady, setZipReady] = useState(false);
  const [zipTree, setZipTree] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading,setLoading]=useState(false)
   const [modal, setModal] = useState({ 
    open: false, 
    type: 'success', 
    title: '', 
    msg: '' 
  });

  const {data:session}=useSession()
  console.log('sesstion',session)
  const solverId=session?._id;
    console.log('id',id)
  const { register, handleSubmit,reset, setError, clearErrors, formState: { errors } } = useForm();

  const handleZipChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/zip', 'application/x-zip-compressed', 'application/octet-stream'];
    if (!allowedTypes.includes(file.type)) {
      setError("projectZip", { message: "Only ZIP files are allowed" });
      setZipFile(null);
      setZipReady(false);
      setZipName('');
      setZipTree(null);
      setProgress(0);
      return;
    }

    clearErrors("projectZip");
    setZipFile(file);
    setZipName(file.name);
    setProgress(0);
    setZipReady(false);

    // Simulate progress for small ZIPs
    let simulated = 0;
    const interval = setInterval(() => {
      simulated += 5;
      if (simulated > 95) simulated = 95; // stop before 100%
      setProgress(simulated);
    }, 50);

    try {
      const zip = await JSZip.loadAsync(file, {
        onUpdate: (metadata) => {
          setProgress(Math.floor(metadata.percent)); // update if JSZip provides real progress
        }
      });

      clearInterval(interval); // stop simulated progress
      setProgress(100);

      const files = Object.keys(zip.files).filter(name => name !== '');

      // Convert flat list into nested tree
      const createTree = (files) => {
        const tree = {};
        files.forEach(name => {
          const parts = name.split('/');
          let current = tree;
          parts.forEach((part, i) => {
            if (!current[part]) current[part] = (i === parts.length - 1 ? null : {});
            if (current[part] !== null) current = current[part];
          });
        });
        return tree;
      };

      setZipTree(createTree(files));
      setZipReady(true);

    } catch (err) {
      clearInterval(interval);
      setError("projectZip", { message: "Invalid ZIP file" });
      setZipFile(null);
      setZipReady(false);
      setZipName('');
      setZipTree(null);
      setProgress(0);
    }
  };

  // Recursive tree render
  const renderTree = (node, level = 0) => {
    return Object.entries(node).map(([key, value]) => (
      <div key={key} style={{ paddingLeft: level * 16 }} className="text-gray-700">
        {value === null ? '📄 ' : '📁 '}
        {key}
        {value && renderTree(value, level + 1)}
      </div>
    ));
  };

  // Submit
  const handleProjectUploaded = async(data) => {
    try {
      console.log('id sawon',id)
      if (!zipReady || !zipFile) return;
      setLoading(true);

      const flattenFiles = (node, path = '') => {
        return Object.entries(node).flatMap(([key, value]) => {
          const currentPath = path ? `${path}/${key}` : key;
          return value === null ? [currentPath] : flattenFiles(value, currentPath);
        });
      };

      const fileList = zipTree ? flattenFiles(zipTree) : [];

      const submitData = {
    
        solverId,
        solverEmail:session?.email,
        status:"submited",
        gitRepositoryLink: data.gitRepositoryLink || '',
        liveProjectUrl: data.LiveProUrl || '',
        notes: data.notes || '',
        zipMeta: {
          name: zipFile.name,
          size: zipFile.size,
          type: zipFile.type,
          totalFiles: fileList.length,
          files: fileList,
        },
      
      };
      console.log('submited data',submitData)

      const res = await fetch(`/api/user-project/${id}`,{
        method:'POST',
         headers: { "Content-Type": "application/json" },
        body:JSON.stringify(submitData)
      });
      const result = await res.json();
   
      console.log('rsulst', result);
      if (result.success|| result.ok) {
     
           setModal({ 
          open: true, 
          type: 'success', 
          title: 'Project Request successfully!', 
          msg: Response.message || 'Your project has been successfully posted.', 
        });
        setLoading(false);
           reset()
      }

      console.log("✅ FINAL SUBMIT DATA:", submitData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
 <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-1 bg-indigo-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-slate-800">Submit Your Project</h2>
      </div>

      <form onSubmit={handleSubmit(handleProjectUploaded)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GitHub */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Github size={16} /> GitHub Repository
            </label>
            <input
              type="text"
              placeholder="https://github.com/username/project"
              className="w-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none rounded-2xl px-5 py-3 transition-all"
              {...register("gitRepositoryLink")}
            />
          </div>

          {/* Live URL */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Globe size={16} /> Live Project URL
            </label>
            <input
              type="text"
              placeholder="https://your-app.vercel.app"
              className="w-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none rounded-2xl px-5 py-3 transition-all"
              {...register("LiveProUrl")}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <MessageSquare size={16} /> Additional Notes
          </label>
          <textarea
            rows="4"
            placeholder="Write any specific instructions for the buyer..."
            className="w-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none rounded-2xl px-5 py-4 transition-all"
            {...register("notes")}
          />
        </div>

        {/* ZIP Upload Box */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 block">Project Source (ZIP)</label>
          <div className={`relative group border-2 border-dashed rounded-3xl p-10 transition-all ${zipReady ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-300'}`}>
            <input
              type="file"
              accept=".zip"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              {...register("projectZip", { required: "ZIP file is required", onChange: handleZipChange })}
            />
            <div className="flex flex-col items-center justify-center text-center">
              {zipReady ? (
                <div className="space-y-2">
                  <div className="bg-emerald-100 p-4 rounded-full inline-block text-emerald-600">
                    <CheckCircle size={32} />
                  </div>
                  <p className="text-emerald-700 font-bold block">{zipName}</p>
                  <p className="text-emerald-500 text-xs uppercase tracking-widest font-bold">Successfully Scanned</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-2xl shadow-sm inline-block text-indigo-600 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <div>
                    <p className="text-slate-700 font-bold">Drop your project ZIP folder here</p>
                    <p className="text-slate-400 text-xs mt-1 italic">Max size: 50MB (Only .zip supported)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {errors.projectZip && <p className="text-red-500 text-xs font-bold pl-2">{errors.projectZip.message}</p>}

          {/* Progress Bar */}
          {zipFile && !zipReady && (
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* Folder Tree Preview */}
          {zipReady && zipTree && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white overflow-hidden">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center gap-2">
                <MdFolderZip size={16} className="text-slate-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">File Explorer Preview</span>
              </div>
              <div className="p-6 max-h-72 overflow-y-auto custom-scrollbar bg-slate-50/50">
                {renderTree(zipTree)}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !zipReady}
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Submitting...
            </>
          ) : (
            "Submit Project Now"
          )}
        </button>
      </form>
          <MessageModal
        isOpen={modal.open} 
        type={modal.type} 
        title={modal.title} 
        message={modal.msg} 
        onClose={() => setModal({ ...modal, open: false })}
      />
    </div>
  );
};

export default ProjectUpoladed;
