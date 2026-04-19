import { ObjectId } from 'mongodb';
import connect from '../../../../../lib/dbconnect';

const requestColl = connect('RequestColl');
export async function DELETE(req,{params}) {
 try {
    const {id}=await params
 const result =await requestColl.deleteOne({_id:new ObjectId(id)})
if (result.deletedCount === 0) {
       return new Response(JSON.stringify({ 
         message: 'No request found with this ID', 
         success: false 
       }), { status: 404 });
    }
  return new Response(JSON.stringify({message:'Delete a succssfully',success:true ,data:result}))

 } catch (error) {
    console.log('internal server error',error)
    return new Response(JSON.stringify({message:error,success:false }))
 }

}