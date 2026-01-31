import connect from "@/lib/dbconnect"
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


