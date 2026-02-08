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
export const POST = async (req, { params }) => {
  try {
    const { id } =await params;
    const projectInfo = await req.json();

    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid ID" }),
        { status: 400 }
      );
    }

    const result = await projectColl.updateOne(
      { _id: new ObjectId(id) },
      { status:'pending',
        $push: { tasks: projectInfo} }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Task successfully submitted",
        data: result
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Task not submitted" }),
      { status: 500 }
    );
  }
};