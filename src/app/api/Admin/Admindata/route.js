
import { getServerSession } from "next-auth";
import connect from '../../../../lib/dbconnect';
import { authOptions } from '../../../../lib/auth';
// collections
const projectColl = connect("projectColl");
const userColl = connect("userColl");
const requestColl = connect('RequestColl');
export const GET = async () => {
  try {
 
    const session = await getServerSession(authOptions);

    if (!session || session?.role !== "Admin") {
      return new Response(
        JSON.stringify({ message: "Unauthorized access" }),
        { status: 401 }
      );
    }

 
   const [
      buyers,
      users,
      projects,
      totalUser,
      totalProjects,
      totalBuyer,
      completeProject,
      assignedProject,
      totalRejectProject,
       pendingReq,
    ] = await Promise.all([
      userColl.find({ role: "Buyer" }).toArray(),
      userColl.find().toArray(),
      projectColl.find().toArray(),
      userColl.countDocuments(),
      projectColl.countDocuments(),
      userColl.countDocuments({ role: "Buyer" }),
      projectColl.countDocuments({ status: "Completed" }),
      projectColl.countDocuments({ status: "assigned" }),
      projectColl.countDocuments({ status: "Rejected" }),
      requestColl.countDocuments({status:'pending'})
    ]);

   
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
      pendingReq,
      totalRejectProject,
   
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