import connect from "@/lib/dbconnect";
const BuyerInfo=connect('BuyerInfo')
const userColl=connect('userColl')
export const POST=async(req)=>{
    try {
         const byuerData=await req.json()
         console.log('data byuer',byuerData)
      byuerData.applyCretedAt=new Date()
      byuerData.ByuerStatus='pending'
     const result=await BuyerInfo.insertOne(byuerData)

     return new Response(JSON.stringify({
        success:true,
        message:'Byuer application  successfully',
        insertedId:result.insertedId
    }))
     
    } catch (error) {
        console.log('Byuer application not inserted',error)
         return Response.json({
        success:false,
        message:'Byuer application not created something wrong',
      
     })
    }
}




export const GET = async (req) => {
  try {


 
 const [users,buyers]=await Promise.all([userColl.find().toArray(),BuyerInfo.find().toArray()])
    const result=buyers.map(buyer=>
    {
         const user=users.find(user=> buyer.user_id.toString()===user._id.toString() )

         return{
            ...user,
            buyersdata:buyer
         }
    }
    )

    return new Response(JSON.stringify({
      success: true,
      result: result
    }))

  } catch (error) {

    console.log('Buyer application not GET', error)

    return Response.json({
      success: false,
      message: 'Something went wrong'
    })

  }
}