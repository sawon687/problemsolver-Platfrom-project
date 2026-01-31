import connect from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
const projectColl=connect('projectColl')
export const GET = async (req,{params}) => {
  try {
  
     const {id}=await params
       if (!id){
            return new Response(JSON.stringify({message:'not fonded '}))
          }
    const query = {buyerId:id}
    
    const result = await projectColl.find(query).toArray();
    
    return new Response(
      JSON.stringify({ data: result, success: true }),
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


export const  POST = async (req,{params}) => {
  try {
  
     const {id}=await params
     const assignInfo=await req.json()
       if (!id){
            return new Response(JSON.stringify({message:'not fonded '}))
          }
    const query = {_id:new ObjectId(id)}
    const update = {
      $set: {
        assignedSolverId: assignInfo.solverId,
        status: "assigned",
      },
    };

    const result = await projectColl.updateOne(query,update)
    
 return new Response(
      JSON.stringify({
        success: true,
        message: "Assigned successfully",
        data: result,
      }),
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