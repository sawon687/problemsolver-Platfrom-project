import connect from "@/lib/dbconnect"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
const projectColl=connect('projectColl')
export const POST=async(req)=>{
    try {
         const projectIn=await req.json()
     const  projectInfo={
        ...projectIn,
       assignedSolverId: null, 
       status: "unassigned", 
        requests: [],                    // solver requests list
         tasks: [],   
          createdAt:new Date(),
           updatedAt: new Date()
     }
     const result=await projectColl.insertOne(projectInfo)

     return new Response(json.stringify({
        success:true,
        message:'project create successfully',
        insertedId:result.insertedId
    }))
     
    } catch (error) {
        console.log('poject data not inserted',error)
         return Response.json({
        success:false,
        message:'project not created something wrong',
      
     })
    }
}
// project get all


export const GET=async(req)=>{
   try {
    const session=await getServerSession(authOptions)
   

          if(!session)
          {
             return new Response(JSON.stringify({
                 success:false,
                 message:'Unauthorized access'
             },{
                status:401
             }))

          }
        

       const solverId=session._id
       const result=await projectColl.find({"requests.solverId":solverId}).toArray() 
    
    //    const projects=project.map(project=> project.requests).flat()
       
       console.log('project',result)
     
        return new Response(JSON.stringify({result,success:true}))
   } catch (error) {
        console.error(error);
    
    return new Response(JSON.stringify({success:false},{status:401}))
   }
       
       
}


