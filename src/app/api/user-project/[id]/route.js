import connect from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

const projectColl=connect('projectColl')
const taskColl = connect("taskColl");
const userColl=connect('userColl')
const notificationColl = connect('NotificationColl');
const requestColl = connect('RequestColl');
// project details
export const GET = async (req,{params}) => {
  try {
          const {id}=await params

           if(!ObjectId.isValid(id))
           {
              return new Response(
                 JSON.stringify({ success: false, message: "invalid id" }),
                
                );
           }

       
     const [project,request]=await Promise.all([
         projectColl.findOne({_id:new ObjectId(id)}),
    requestColl.find({projectId:id}).sort({createdAt:-1}).toArray()
     ])
 
   
    return new Response(
      JSON.stringify({ result:{project,request}, success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Project not found" }),
      { status: 500 }
    );
  }
};



export const POST = async (req, { params }) => {
  try {
    const { id } = await params;
    
  
    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid Project ID" }),
        { status: 400 }
      );
    }

    const projectInfo = await req.json();


    const exitProject = await projectColl.findOne({ _id: new ObjectId(id) });
    console.log('exitProject',exitProject)
    if (!exitProject) {
      return new Response(
        JSON.stringify({ message: 'Project not found', success: false }),
        { status: 404 }
      );
    }
const buyerId=exitProject.buyerId

console.log('bueyr id',buyerId)
    const buyer = await userColl.findOne({ _id: new ObjectId(exitProject.buyerId) });
    console.log('buyer',buyer)
    
    if (!buyer) {
      return new Response(
        JSON.stringify({ message: 'Buyer not found', success: false }),
        { status: 404 }
      );
    }

    projectInfo.createdAt = new Date();
    projectInfo.projectId = id;
    const result = await taskColl.insertOne(projectInfo);


    if (result.insertedId) {
      const notificationData = {
        recipient: buyer.userEmail,  
        sender: projectInfo.solverEmail,
        type: "submission",
        title: "Work Submitted",
        message: `Worker has submitted the final task for "${exitProject.ProjectTitle || projectInfo.projectTitle}". Please review it.`,
        projectId: id,
        taskId: result.insertedId,
        status: "unread",
        createdAt: new Date(),
      };

      await notificationColl.insertOne(notificationData);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Task submitted and notification sent to buyer",
        data: result
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Submission Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
};