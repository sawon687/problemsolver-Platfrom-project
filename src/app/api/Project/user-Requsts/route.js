import connect from "@/lib/dbconnect"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
const projectColl=connect('projectColl')

// Project requsts
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
       const project=await projectColl.find({"requests.solverId":solverId}).toArray() 
       const projects=project.map(project=> ({
         ...project,
         requests:project.requests.filter(req=> req.solverId===solverId)
       }))
      // console.log('reqproject',projects)
        console.log('prject',projects)
        return new Response(JSON.stringify({result:projects,success:true}))
   } catch (error) {
        console.error(error);
    
    return new Response(JSON.stringify({success:false},{status:401}))
   }
       
       
}


