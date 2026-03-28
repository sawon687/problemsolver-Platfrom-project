import connect from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
const projectColl=connect('projectColl')
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
};

export const POST = async (req, { params }) => {
  try {
    const { id } = await params;
    const body = await req.json();
    console.log('body',body)
    if (!id) {
      return new Response(JSON.stringify({ message: 'not found' }), { status: 400 });
    }
   
    let update = {};
    let options = {}; // Array filters eikhane thakbe

    if (body.action === 'assigned') {
      update = {
        $set: {
          assignedSolverId: body.solverId,
          status: body.action,
          "requests.$[req].status": body.reqstatus,
        }
      };
      options = {
        arrayFilters: [{ 'req.solverId': body.solverId }]
      };
    }

    if (body.action === 'Accept') {
      update = {
        $set: {
          status: 'Completed',
          'requests.$[req].status': 'Accept',
          'tasks.$[task].status': 'Accept',
          updatedAt:new Date()
        }
      };
      options = {
        arrayFilters: [
          { 'req.solverId': body.solverId },
          { 'task.solverId': body.solverId }
        ]
      };
    }

    if (body.action === 'Reject') {
      update = {
        $set: {
          status: 'assigned',
          'requests.$[req].status': 'Reject',
          'tasks.$[task].status': 'Reject',
           updatedAt:new Date()
        }
      };
      options = {
        arrayFilters: [
          { 'req.solverId': body.solverId },
          { 'task.solverId': body.solverId }
        ]
      };
    }

    const query = { _id: new ObjectId(id) };

    // Result e update r options dutoi pass korte hobe
    const result = await projectColl.updateOne(query, update, options);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Action processed successfully",
        data: result,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};