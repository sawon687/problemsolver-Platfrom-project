import connect from "@/lib/dbconnect"
import { ObjectId } from "mongodb"
const BuyerInfo=connect('BuyerInfo')
export const POST=async(req)=>{
    try { 
      
         const buyerData=await req.json()
         console.log('data byuer',buyerData)
         
            if(!buyerData.BuyerId)
            {
                 return new Response({success:false,message:'unauthrize your id'})
            }
        

             const query={
                 _id: new ObjectId(buyerData.BuyerId)
              }
          

         const update={
            $set:{
            ByuerStatus:buyerData.BuyerStatus}
         } 
     
     const result=await BuyerInfo.updateOne(query,update)

     return new Response(JSON.stringify({
        success:true,
        message:'Byuer application  successfully',
        modifiedCount:result.modifiedCount
    }))
     
    } catch (error) {
        console.log('Byuer application not inserted',error)
         return Response.json({
        success:false,
        message:'Byuer application not created something wrong',
      
     })
    }
}