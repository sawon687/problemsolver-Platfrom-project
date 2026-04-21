import { getServerSession } from 'next-auth';
import connect from '../../../../lib/dbconnect';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: 'Please login', success: false }), { status: 401 });
    }

    const email = session.user.email;
    const assignedSolverId = session.user._id;

    const requestColl = await connect('RequestColl');
    const projectColl = await connect('projectColl');
    const taskColl = await connect("taskColl");

 
    const [
      totalReqCount,
      inProgressCount,
      submittedCount,
      completedCount,
      recentRequests,
      activeTasks
    ] = await Promise.all([
      requestColl.countDocuments({ contactEmail: email }), 
      requestColl.countDocuments({ contactEmail: email, status: 'in-progress' }), 
      taskColl.countDocuments({ assignedSolverId, status: 'submitted' }),
      projectColl.countDocuments({ assignedSolverId, status: 'Completed' }), 
      requestColl.find({ contactEmail: email }).sort({ _id: -1 }).limit(5).toArray(), 
      requestColl.find({contactEmail:email, status: 'in-progress' }).toArray() 
    ]);

    return new Response(JSON.stringify({
      success: true,
      result: {
        totalRequests: totalReqCount,
        assignedTasks: inProgressCount,
        totalSubmissions: submittedCount,
        completedTasks: completedCount,
        recentRequests,
        activeAssignments: activeTasks
      }
    }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "Server Error" }), { status: 500 });
  }
}