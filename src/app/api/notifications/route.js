import { getServerSession } from 'next-auth';
import connect from '../../../lib/dbconnect';
import { authOptions } from '../auth/[...nextauth]/route';

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

       
        if (session.user.email !== email) {
            return new Response(
                JSON.stringify({ message: 'Forbidden access', success: false }),
                { status: 403 }
            );
        }

       
        const notificationColl = await connect('NotificationColl'); 
        
       
        const result = await notificationColl
            .find({ recipient: email })
            .sort({ createdAt: -1 }) 
            .toArray();

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