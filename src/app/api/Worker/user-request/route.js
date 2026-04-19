import connect from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

const requestColl = connect('RequestColl');
const notificationColl = connect('NotificationColl');
const projectColl=connect('projectColl')// Project collection
const userColl=connect('userColl')    // User collection

export const POST = async (req) => {
  try {
    const body = await req.json();
    

    const { projectId,contactEmail} = body;
   

    // 1. Project ID diye Project Title khuje ber kora
    const project = await projectColl.findOne({ _id: new ObjectId(projectId) });
    
    if (!project) {
      return new Response(
        JSON.stringify({ success: false, message: "Project not found!" }),
        { status: 404 }
      );
    }
    // 2. Buyer ID diye Buyer-er Email khuje ber kora
    const buyer = await userColl.findOne({ _id: new ObjectId(project.buyerId) });

    if (!buyer || !buyer.userEmail) {
      return new Response(
        JSON.stringify({ success: false, message: "Buyer details not found!" }),
        { status: 404 }
      );
    }

    const projectTitle = project.ProjectTitle;
    const buyerEmail = buyer.userEmailemail;

    // 3. Request Data Prepare
    const requestData = {
      ...body,
      projectTitle,
      status: 'pending',
      createdAt: new Date()
    };

    // 4. Request Insert kora
    const result = await requestColl.insertOne(requestData);

    // 5. Notification create kora (Buyer-er jonno)
    if (result.insertedId) {
      const notificationData = {
        recipient: buyerEmail,
        sender:contactEmail,
        type: 'project_request',
        title: `New Request for ${projectTitle}`,
        message: `${contactEmail} has sent a request for your project "${projectTitle}".`,
        status: 'unread',
        createdAt: new Date(),
        
      };

      await notificationColl.insertOne(notificationData);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Request and notification sent successfully using Database info!' 
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Database Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
};


// export const PATCH= async (req) => {
//   try { 
//      const requestsInfo=await req.json()
//      const {id}= await params
//      console.log('idis',id)
     
    
     
//       requestsInfo.status='pending'
//       requestsInfo.createdAt=new Date()

//       const update={$push:{requests:requestsInfo}}
//         const query={_id:new ObjectId(id)}
//       const result = await projectColl.updateOne(query,update)
      
//        if (result.matchedCount === 0) {
//       return new Response(
//         JSON.stringify({ success: false, message: "Project not found" }),
//         { status: 404 }
//       );
//     }

//     return new Response(
//       JSON.stringify({ result:result, success: true,message:'requests project successfully' }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ success: false, message: "requst not found not found" }),
//       { status: 500 }
//     );
//   }
// };