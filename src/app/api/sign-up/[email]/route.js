import connect from "@/lib/dbconnect";

const userColl=connect('userColl')
export const GET = async (req,{params}) => {
  try {
      const  {email}=  await params
      console.log('email',email)
    const result = await userColl.findOne({ userEmail: email })
    return new Response(
      JSON.stringify({ data: result, success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "not found" }),
      { status: 500 }
    );
  }
};

export const POST = async (req,{params}) => {
  try {
      const  {email}= await params
      const update={$set:{...await req.json()}}
    const result = await userColl.updateOne({ userEmail: email }, update);
    return new Response(
      JSON.stringify({ data: result, success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "not found" }),
      { status: 500 }
    );
  }
};