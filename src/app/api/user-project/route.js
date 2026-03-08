import connect from "@/lib/dbconnect";
import { getServerSession } from "next-auth";

const projectColl=connect('projectColl')

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url); // query params নেবে
    const category = searchParams.get('category') || 'All';
    const  search=searchParams.get('search')||''
    console.log('seaarch is sawon',search)
    const query = {};
    if (category && category !== 'All') {
      query.ProjectCategory = category;
    }
    if(search)
    {
       query.$or=[
         
         {ProjectTitle:{$regex:search,$options:'i'}},
         {ProjectDescription:{$regex:search,$options:'i'}},
         {ProjectBudge:{$regex:search,$options:'i'}}
       ]
       

       
    }

    const projects = await projectColl.find(query).toArray();

    return new Response(JSON.stringify({ result: projects, success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "Project not found" }), { status: 500 });
  }
};








