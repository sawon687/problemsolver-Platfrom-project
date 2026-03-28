import connect from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


const projectColl = connect('projectColl');
const BuyerInfo=connect('BuyerInfo')
const userColl=connect('userColl')
export const GET=async(req)=>{
try {

      const session=await getServerSession(authOptions)

      if(!session && !session.role==='Admin')
      {
         return new Response(JSON.stringify({message:'unAthurize access'})) }
      console.log('sesstion',session)
       const [user ,Buyer,Projects,newUser,newCompleted,newProjectsCount]=await Promise.all([
        userColl.find().toArray(),
        BuyerInfo.find().toArray(),
        projectColl.find().toArray(),
        await userColl.countDocuments({ createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) } }), // last 24h
    await projectColl.countDocuments({ createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) } }),
        await projectColl.countDocuments({ status: "completed", updatedAt: { $gte: new Date(Date.now() - 24*60*60*1000) } })

    ])

const Buyers=user.filter(user=> user.role==='Buyer')
const completedProject=Projects.filter(project=> project.status==='Completed')
const pendingReq=Projects.map(project=> project.requests).flat().filter(req=> req.status==='pending')
const assignedProject=Projects.filter(project=> project.status==='assigned').length
const data={user,Buyer,Projects,   
    TotalProjects:Projects.length,
    TotalBuyer:Buyers.length,
    completeProject:completedProject.length,
    pendingCompleteReq:pendingReq,
    assignedProject:assignedProject,
    TotalUser:user.length,
newUser,
newCompleted,
newProjectsCount


}
console.log('data server admin',data)
    return new Response(JSON.stringify({
        result:data,
        success:true,
        message: "Data fetched successfully",
    }))

      
   } catch (error) {
         return new Response(JSON.stringify({
      message: "Failed to fetch data",
        success:false,
        
    }),{
        status:500
    })
   }


}



