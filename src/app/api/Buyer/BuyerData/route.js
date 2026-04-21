import connect from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from '../../auth/[...nextauth]/route';


export const GET = async (req) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session?.role !== "Buyer") {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const buyerId = session._id;
    const projectColl = await connect("projectColl");
    const requestColl = await connect('RequestColl');
    const taskColl = await connect('taskColl');

    
    const [
      projects,
      totalProjects,
      completedProject,
      assignedProject,
      pendingReq,
      inprogressReq,
      acceptReq,
      rejectReq,
      pendingTask,
      submittedTask,
      acceptTask,
      rejectTask
    ] = await Promise.all([
      projectColl.find({ buyerId }).sort({ _id: -1 }).limit(5).toArray(), 
      projectColl.countDocuments({ buyerId }),
      projectColl.countDocuments({ buyerId, status: "Completed" }),
      projectColl.countDocuments({ buyerId, status: "assigned" }),
      requestColl.countDocuments({ buyerId, status: 'pending' }),
      requestColl.countDocuments({ buyerId, status: 'in-progress' }),
      requestColl.countDocuments({ buyerId, status: 'Accept' }),
      requestColl.countDocuments({ buyerId, status: 'Reject' }),
      taskColl.countDocuments({ buyerId, status: 'pending' }),
      taskColl.countDocuments({ buyerId, status: 'submitted' }),
      taskColl.countDocuments({ buyerId, status: 'Accept' }),
      taskColl.countDocuments({ buyerId, status: 'Reject' })
    ]);

    const result = {
      projects,
      totalProjects,
      completedProject,
      assignedProject,
      pendingReq,
      inprogressReq,
      acceptReq,
      rejectReq,
      pendingTask,
      submittedTask,
      acceptTask,
      rejectTask
    };

    return new Response(JSON.stringify({ result, success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
};