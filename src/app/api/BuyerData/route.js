import connect from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const projectColl = connect("projectColl");

export const GET = async (req) => {
  try {
    const session = await getServerSession(authOptions);
      console.log('session',session)
    if (!session || session.role !== "Buyer") {
      return new Response(
        JSON.stringify({ message: "Unauthorized access" }),
        { status: 401 }
      );
    }

    const Projects = await projectColl
      .find({ buyerId: session._id })
      .toArray();
console.log('project server',Projects)
    const completedProject = Projects.filter(
      (project) => project.status === "Completed"
    );

    const assignedProject = Projects.filter(
      (project) => project.status === "assigned"
    ).length;

    const totalProposals = Projects.reduce((total, project) => {
      return total + (project.requests?.length || 0);
    }, 0);

    const data = {
      Projects,
      TotalProjects:Projects.length,
      completeProject: completedProject.length,
      assignedProject,
      totalProposals,
      HiredFree: totalProposals,
    };

    return new Response(
      JSON.stringify({
        result: data,
        success: true,
        message: "Data fetched successfully",
      })
    );
  } catch (error) {
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


