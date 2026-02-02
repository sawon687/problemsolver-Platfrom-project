import connect from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

const projectColl=connect('projectColl')
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

    const result = await projectColl.findOne({_id:new ObjectId(id)});
    
    return new Response(
      JSON.stringify({ result:result, success: true }),
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

//  project uploed user
export const POST = async (req,{params}) => {
  try {
  
     const {id}=await params;
     const projectInfo=await req.josn();
     
       if (!ObjectId.isValid(id)){
            return new Response(JSON.stringify({message:'not valid id'}))
          }
    const query = {_id:new ObjectId(id)}
     const update={$push:{tasks:projectInfo}}
    const result = await projectColl.insertOne(query,update)
    
    return new Response(
      JSON.stringify({ data: result, success: true,message:'Task succesfully submited' },{
        status:201
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Task not submited" },{
       
      }),
      { status: 401 }
    );
  }
};
