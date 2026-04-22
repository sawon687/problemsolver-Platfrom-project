import { getServerSession } from 'next-auth';
import connect from '../../../lib/dbconnect';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { authOptions } from '../../../lib/auth';
   const notificationColl =  connect('NotificationColl'); 
export async function GET(req) {
    try {
       
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response(
                JSON.stringify({ message: 'Unauthorized. Please login.', success: false }),
                { status: 401 }
            );
        }

 
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        const status=searchParams.get('status')
        const query={ recipient: email }
        if(status)
        {
            query.status=status
        }
       
        if (session.email !== email) {
            return new Response(
                JSON.stringify({ message: 'Forbidden access', success: false }),
                { status: 403 }
            );
        }
       
        const result = await notificationColl.find(query).sort({ createdAt: -1 }).toArray();

        return new Response(
            JSON.stringify({ 
                message: 'Data found', 
                success: true, 
                data: result 
            }), 
            { status: 200 }
        );

    } catch (error) {
        console.error("Notification API Error:", error);
        return new Response(
            JSON.stringify({ 
                message: 'Internal Server Error', 
                success: false 
            }), 
            { status: 500 }
        );
    }
}





export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    let result;

    if (id) {
      // --- SINGLE DELETE LOGIC ---
      if (!ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: "Invalid Notification ID" },
          { status: 400 }
        );
      }
    
      result = await notificationColl.deleteOne({ 
        _id: new ObjectId(id), 
        recipient: email 
      });
    } else {
    
      result = await notificationColl.deleteMany({ recipient: email });
    }

    return NextResponse.json({
      success: true,
      message: id ? "Notification deleted" : "All notifications cleared",
      deletedCount: result.deletedCount,
    });

  } catch (error) {
    console.error("Delete API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}