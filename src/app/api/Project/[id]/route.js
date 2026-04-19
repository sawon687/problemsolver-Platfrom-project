import connect from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

const requestColl = connect('RequestColl');
const notificationColl = connect('NotificationColl');
const projectColl=connect('projectColl')// Project collection
const userColl=connect('userColl')    // User collection
const taskColl = connect("taskColl");

export const POST = async (req, { params }) => {
  try {
    const { id } =await params;
    const body = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "User ID not found" }),
        { status: 400 }
      );
    }
     
    const {  solverEmail, buyerEmail, projectTitle ,solverId } = body;
 const projectId=id

 console.log('porjectid',id)
    let projectUpdate = {};
    let requestsUpdate = {};
    let taskUpdate = {};
    let notificationData = {};

    //  ASSIGNED
    if (body.action === "assigned") {
      projectUpdate = {
        $set: {
          assignedSolverId: solverId,
          status: "assigned",
        },
      };

      requestsUpdate = {
        $set: {
          status: "in-progress",
        },
      };

      notificationData = {
        recipient: solverEmail,
        sender: buyerEmail,
        type: "assigned",
        title: "Project Assigned",
        message: `You have been assigned to the project "${projectTitle}".`,
        projectId,
        status: "unread",
        createdAt: new Date(),
      };
    }

    //  ACCEPT
    if (body.action === "Accept") {
      projectUpdate = {
        $set: {
          status: "Completed",
          updatedAt: new Date(),
        },
      };

      requestsUpdate = {
        $set: {
          status: "Accept",
          updatedAt: new Date(),
        },
      };

      taskUpdate = {
        $set: {
          status: "Accept",
          updatedAt: new Date(),
        },
      };

      notificationData = {
        recipient: solverEmail,
        sender: buyerEmail,
        type: "accept",
        title: "Work Accepted",
        message: `Your work for "${projectTitle}" has been accepted.`,
        projectId,
        status: "unread",
        createdAt: new Date(),
      };
    }

    //  REJECT
    if (body.action === "Reject") {
      projectUpdate = {
        $set: {
          status: "assigned",
        },
      };

      requestsUpdate = {
        $set: {
          status: "Reject",
        },
      };

      taskUpdate = {
        $set: {
          status: "Reject",
        },
      };

      notificationData = {
        recipient: solverEmail,
        sender: buyerEmail,
        type: "reject",
        title: "Work Rejected",
        message: `Your work for "${projectTitle}" has been rejected.`,
        projectId,
        status: "unread",
        createdAt: new Date(),
      };
    }

    // 🔥 All DB operations
    const promises = [
      projectColl.updateOne(
        { _id: new ObjectId(projectId) },
        projectUpdate
      ),
      requestColl.updateOne({ projectId }, requestsUpdate),
      notificationColl.insertOne(notificationData), // 👈 notification insert
    ];

    // task update only for accept/reject
    if (body.action !== "assigned") {
      promises.push(taskColl.updateOne({ projectId }, taskUpdate));
    }

    await Promise.all(promises);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Action + Notification completed সফলভাবে",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
};


export const GET = async (req,{params}) => {
  try {
  
     const {id}=await params;
     
       if (!id){
            return new Response(JSON.stringify({message:'not fonded '}))
          }
    const query = {buyerId:id}
    
    const result = await projectColl.find(query).toArray();
    
    return new Response(
      JSON.stringify({ data: result, success: true,message:"buyer project" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Project not found" }),
      { status: 500 }
    );
  }
}