import connect from "@/lib/dbconnect"
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../auth/[...nextauth]/route';


const requestColl = connect('RequestColl');
// Project requsts
export const GET=async(req)=>{
   try {
    const session=await getServerSession(authOptions)
    
          if(!session|| !session._id)
          {
             return new Response(JSON.stringify({
                 success:false,
                 message:'Unauthorized access'
             },{
                status:401
             }))

          }                    

          const solverId=session?._id

          const result=await requestColl.find({solverId}).toArray()
          
   
        console.log('prject',result)
        return new Response(JSON.stringify({data:result,success:true}))
   } catch (error) {
        console.error(error);
    
    return new Response(JSON.stringify({success:false,message:'internal server error'},{status:401}))
   }
       
       
}


