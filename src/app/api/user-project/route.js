import connect from "@/lib/dbconnect";

const projectColl=connect('projectColl')
export const GET = async (req) => {
  try {
  


    const result = await projectColl.find().toArray();
    
    return new Response(
      JSON.stringify({ result, success: true }),
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