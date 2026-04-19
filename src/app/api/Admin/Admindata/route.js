import connect from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// collections
const projectColl = connect("projectColl");
const userColl = connect("userColl");

export const GET = async (req) => {
  try {
    //  session check
    const session = await getServerSession(authOptions);

    if (!session || session?.role !== "Admin") {
      return new Response(
        JSON.stringify({ message: "Unauthorized access" }),
        { status: 401 }
      );
    }

    //  parallel queries (optimized)
    const [
      buyers,
      users,
      projects,
      totalUser,
      totalProjects,
      newUser,
      newProjectsCount,
      newCompleted,
      totalBuyer,
      completeProject,
      assignedProject,
      totalRejectProject
    ] = await Promise.all([
      userColl.find({ role: "Buyer" }).toArray(),
      userColl.find().toArray(),
      projectColl.find().toArray(),

      userColl.countDocuments(),
      projectColl.countDocuments(),

      // last 24h new user
      userColl.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }),

      // last 24h new project
      projectColl.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }),

      // last 24h completed project
      projectColl.countDocuments({
        status: "completed",
        updatedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }),

      userColl.countDocuments({ role: "Buyer" }),

      projectColl.countDocuments({ status: "Completed" }),
      projectColl.countDocuments({ status: "assigned" }),
      projectColl.countDocuments({ status: "Rejected" }),
    ]);

    //  pending requests safe handling
    const pendingReq = projects
      .map((project) => project.requests || [])
      .flat()
      .filter((req) => req.status === "pending");

    //  final response data
    const data = {
      users,
      buyers,
      projects,

      totalUser,
      totalProjects,
      totalBuyer,

      completeProject,
      assignedProject,

      pendingCompleteReq: pendingReq,
    totalRejectProject,
      newUser,
      newProjectsCount,
      newCompleted,
    };

    console.log("admin dashboard data:", data);

    return new Response(
      JSON.stringify({
        result: data,
        success: true,
        message: "Data fetched successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin API Error:", error);

    return new Response(
      JSON.stringify({
        message: "Failed to fetch data",
        success: false,
        error: error.message, 
      }),
      { status: 500 }
    );
  }
};