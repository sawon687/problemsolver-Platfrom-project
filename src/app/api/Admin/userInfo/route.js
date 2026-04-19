import connect from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

const userColl=connect('userColl')
export const GET = async (res,req) => {
  try {
    
    const result = await userColl.find().toArray()
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

