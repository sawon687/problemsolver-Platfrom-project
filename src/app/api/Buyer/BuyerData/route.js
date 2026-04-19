import connect from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const projectColl = connect("projectColl");
const requestColl=connect('RequestColl')
const tasKColl=connect('taskCOll')
export const GET = async (req) => {
  try {
    const body=await req.json()
    const session = await getServerSession(authOptions);
    console.log("session", session);

    if (!session || session.role !== "Buyer") {
      return new Response(
        JSON.stringify({ message: "Unauthorized access" }),
        { status: 401 }
      );
    }

    const buyerId = session._id;
    const projectId=body.projectId;
    const [
      projects,
      totalProjects,
      completedProject,
      assignedProject,
      pendingReq,
      inprogressReq,
      acceptReq,
      RejectReq,
      pendignTask,
      submitedTask,
      acceptTask,
      rejectTask
   

    ] = await Promise.all([
      projectColl.find({ buyerId }).toArray(),
      projectColl.countDocuments({ buyerId }),
      projectColl.countDocuments({ buyerId, status: "Completed" }),
      projectColl.countDocuments({ buyerId, status: "assigned" }),
      requestColl.countDocuments({buyerId,status:'pending'}),
      requestColl.countDocuments({buyerId,status:'in-progress'}),
      requestColl.countDocuments({projectId,status:'Accept'}),
      requestColl.countDocuments({projectId,status:'Reject'}),
      tasKColl.countDocuments({projectId,status:'pending'}),
       tasKColl.countDocuments({projectId,status:'submited'}),
        tasKColl.countDocuments({projectId,status:'Accept'}),
         tasKColl.countDocuments({projectId,status:'Reject'})


    ]);

    // total proposals
    const totalProposals = projects.reduce((total, project) => {
      return total + (project.requests?.length || 0);
    }, 0);

    // pending requests
   

    const data = {
       projects,
      totalProjects,
      completedProject,
      assignedProject,
      pendingReq,
      inprogressReq,
      acceptReq,
      RejectReq,
      pendignTask,
      submitedTask,
      acceptTask,
      rejectTask
    };

    return new Response(
      JSON.stringify({
        result: data,
        success: true,
        message: "Data fetched successfully",
      })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch data",
        success: false,
      }),
      {
        status: 500,
      }
    );
  }
};