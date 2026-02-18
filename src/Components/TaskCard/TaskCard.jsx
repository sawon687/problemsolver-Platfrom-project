'use client'
import { motion } from "framer-motion";

const statusStyle = {
  "in-progress": "bg-blue-100 text-blue-700",
  "submitted": "bg-amber-100 text-amber-700",
  "accepted": "bg-green-100 text-green-700",
  "rejected": "bg-red-100 text-red-700"
};

const TaskCard = ({ task }) => {
  // Determine status dynamically
console.log('task',task)
  const status = task.submission
    ? task.status === "Accept" || task.status === "Reject"
      ? task.status
      : "submit"
    : "in-progress";

  return (
    <motion.div layout className="border rounded-lg p-5 hover:shadow transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{task.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[status]}`}>
          {status}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>Deadline: {task.deadline}</span>
        {status === "submitted" && (
          <span className="italic text-amber-600">Waiting for review</span>
        )}
      </div>

      {/* Accept / Reject buttons only if task has submission */}
      {status === "submitted" && (
        <div className="flex gap-3 mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Accept
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Reject
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
