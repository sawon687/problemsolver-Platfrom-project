import { getServerSession } from 'next-auth';
import connect from '../../../../lib/dbconnect';
import { ObjectId } from 'mongodb';
import { authOptions } from '../../auth/[...nextauth]/route';

const notificationColl = connect('NotificationColl');

export async function PATCH(req, { params }) {
  try {
    const { id } =await params;
    const body = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized. Please login.', success: false }),
        { status: 401 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: 'Invalid ID' }), { status: 400 });
    }

    const result = await notificationColl.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: body.status } } 
    );

    return new Response(
      JSON.stringify({
        message: 'Updated successfully',
        success: true,
        data: result,
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Notification API Error:", error);
    return new Response(
      JSON.stringify({
        message: 'Internal Server Error',
        success: false,
      }),
      { status: 500 }
    );
  }
}