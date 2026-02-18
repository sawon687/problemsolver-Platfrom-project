import connect from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

const userColl=connect('userColl')
export const GET = async (req,{params}) => {
  try {
  
     const {id}=await params
       if (!ObjectId.isValid(id)){
            return new Response(JSON.stringify({message:'not valid id'}))
          }
    const query = {_id:new ObjectId(id)}
    
    const result = await userColl.findOne(query)
    
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



export const POST= async (req,{params}) => {
  try {
  
     const {id}=await params
     const body=await req.json()
     console.log(body,id)
       if (!ObjectId.isValid(id)){
            return new Response(JSON.stringify({message:'not valid id'}))
          }
    const query = {_id:new ObjectId(id)}
    const update ={ $set:{
       role:body.role
    }}
    const result = await userColl.updateOne(query,update)
    
    return new Response(
      JSON.stringify({ data: result, success: true, message:'update Role successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "role not update " }),
      { status: 500 }
    );
  }
};
