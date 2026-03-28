import connect from "@/lib/dbconnect"
import { ObjectId } from "mongodb"
const BuyerInfo=connect('BuyerInfo')
export const POST=async(req,{params})=>{
    try { 
      
         const {id}=await params
         console.log('id buyer',id)
         const buyerData=await req.json()
         console.log('data byuer',buyerData)
         
            if(!id && !buyerData)
            {
                 return new Response.json({success:false,message:'unauthrize your id'})
            }
        

             const query={
                 _id: new ObjectId(id)
              }
          

         const update={
            $set:{
            ByuerStatus:buyerData.BuyerStatus}
         } 
     
     const result=await BuyerInfo.updateOne(query,update)

   return Response.json({
      success: true,
      result: result,
      message: 'Buyer application successfully',
      modifiedCount: result.modifiedCount
    })
     
    } catch (error) {
        console.log('Byuer application not inserted',error)
    return new Response(
  JSON.stringify({
    success:false,
    message:'unauthrize your id'
  }),
  {
    headers:{
      "Content-Type":"application/json"
    }
  }
)
    }
}