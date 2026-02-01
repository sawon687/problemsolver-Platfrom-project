import connect from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

const projectColl=connect('projectColl')
export const POST= async (req,{params}) => {
  try { 
     const requestsInfo=await req.json()
     const {id}= await params
     console.log('idis',id)
     
     if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ success: false, message: "Invalid ID" }), { status: 400 });
    }
     
      requestsInfo.status='pending'
      requestsInfo.createdAt=new Date()

      const update={$push:{requests:requestsInfo}}
        const query={_id:new ObjectId(id)}
      const result = await projectColl.updateOne(query,update)
      
       if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Project not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ result:result, success: true,message:'requests project successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "requst not found not found" }),
      { status: 500 }
    );
  }
};



export const GET= async (req,{params}) => {
  try { 
     const requestsInfo=await req.json()
     const {id}= await params
     console.log('idis',id)
     
    
     
      requestsInfo.status='pending'
      requestsInfo.createdAt=new Date()

      const update={$push:{requests:requestsInfo}}
        const query={_id:new ObjectId(id)}
      const result = await projectColl.updateOne(query,update)
      
       if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Project not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ result:result, success: true,message:'requests project successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "requst not found not found" }),
      { status: 500 }
    );
  }
};