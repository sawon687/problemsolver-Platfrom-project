'use client'
import JSZip from 'jszip';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ProjectUpoladed = ({ id }) => {
  const [zipFile, setZipFile] = useState(null);
  const [zipName, setZipName] = useState('');
  const [zipReady, setZipReady] = useState(false);
  const [zipTree, setZipTree] = useState(null);
  const [progress, setProgress] = useState(0);

  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

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
    if (!zipReady || !zipFile) return;

    const flattenFiles = (node, path = '') => {
      return Object.entries(node).flatMap(([key, value]) => {
        const currentPath = path ? `${path}/${key}` : key;
        return value === null ? [currentPath] : flattenFiles(value, currentPath);
      });
    };

    const fileList = zipTree ? flattenFiles(zipTree) : [];

    const submitData = {
      projectId: id,
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
      zipFile,
    };

    const res=await fetch(`/api/user-project/${id}`)
    const result=await res.json()

    console.log('rsulst',result)

    console.log("✅ FINAL SUBMIT DATA:", submitData);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Submit Your Project</h2>

      <form onSubmit={handleSubmit(handleProjectUploaded)} className="space-y-4">
        {/* GitHub */}
        <div>
          <label className="block text-sm font-medium mb-1">GitHub Repository Link</label>
          <input type="text" placeholder="https://github.com/username/project"
            className="w-full border focus:border-0 focus:ring-2  focus:ring-primary outline-none rounded-lg px-4 py-2"
            {...register("gitRepositoryLink")}
          />
        </div>

        {/* Live URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Live Project URL</label>
          <input type="text" placeholder="https://your-project.vercel.app"
            className="w-full border focus:border-0 focus:ring-2  focus:ring-primary outline-none rounded-lg px-4 py-2"
            {...register("LiveProUrl")}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Additional Notes</label>
          <textarea rows="4" placeholder="Any instruction or note for the buyer..."
            className="w-full border focus:border-0 focus:ring-2  focus:ring-primary outline-none rounded-lg px-4 py-2"
            {...register("notes")}
          />
        </div>

        {/* ZIP Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Project ZIP File</label>
          <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 block text-center cursor-pointer">
            {zipReady ? (
              <div className="text-green-600 font-semibold">
                ✅ {zipName}
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-2">Upload ZIP Folder</p>
                <p className="text-xs text-gray-400 mb-3">Only .zip file supported</p>
                <span className="px-4 py-2 bg-gray-200 rounded-lg text-sm inline-block">Browse ZIP</span>
              </>
            )}
            <input type="file" accept=".zip" className="hidden"
              {...register("projectZip", { required: "ZIP file is required", onChange: handleZipChange })}
            />
          </label>
          {errors.projectZip && <p className="text-red-500 mt-2">{errors.projectZip.message}</p>}

          {/* Progress bar with percentage */}
          {zipFile && !zipReady && (
            <div className="mt-2 w-full bg-gray-200 h-4 rounded relative">
              <div
                className="h-4 bg-green-500 rounded"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white">
                {progress}%
              </span>
            </div>
          )}

          {/* Nested ZIP preview */}
          {zipReady && zipTree && (
            <div className="mt-4 border rounded-lg p-3 bg-gray-50 max-h-64 overflow-y-auto">
              <h3 className="font-semibold mb-2">📦 ZIP Folder Preview</h3>
              {renderTree(zipTree)}
            </div>
          )}
        </div>

        {/* Submit */}
        <button type="submit"
          className="mt-4 bg-primary text-white px-6 py-2 rounded disabled:opacity-50">
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default ProjectUpoladed;
