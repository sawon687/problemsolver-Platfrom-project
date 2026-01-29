
import connect from "@/lib/dbconnect";
import bcrypt from "bcryptjs";
const userColl=connect('userColl')


export async function POST(req) {
   try {
     const userInfo=await req.json();
    console.log('results',userInfo)
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    userInfo.password=hashedPassword
    userInfo.role='problem_solver'
    userInfo.date=new Date()
       
    const result=await userColl.insertOne(userInfo)
    
    return Response.json({
        success:true,
        message:'User Register success fully',
        insertedId:result.insertedId,
        userEmail:userInfo.userEmail,
        
    })
   } catch (error) {
       console.error('database not connect',error)
        return Response.json({
        success:false,
        message:'User not Register ',
        
    })
   }


    
}