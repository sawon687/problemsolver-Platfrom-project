'use client'
const ConfrimMessageModal = ({ handleDelete, onclose, isOpen, isDeleting, id }) => {

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {id ? "Delete Notification?" : "Clear All Notifications?"}
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              {id 
                ? "Are you sure you want to delete this message?" 
                : "This will remove all your notifications permanently."}
            </p>

            <div className="flex gap-3">
              <button onClick={onclose} className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(id)} // ID null hole All Delete hobe
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfrimMessageModal