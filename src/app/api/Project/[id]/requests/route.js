import connect from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
const requestColl = connect('RequestColl');
export const GET = async (req,{params}) => {
  try {
  
     const {id}=await params;
     
       if (!id){
            return new Response(JSON.stringify({message:'not fonded '}))
          }
    const query = {projectId:id}
    
    const result = await requestColl.find(query).toArray();
    
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