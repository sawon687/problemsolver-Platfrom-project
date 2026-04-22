import connect from '../../../../lib/dbconnect';

const taskColl = connect("taskColl");

export async function GET(req) {
    try {
       
        const { searchParams } = new URL(req.url);
        const projectId =  searchParams.get('projectId');

        if (!projectId) {
            return new Response(
                JSON.stringify({ 
                    message: 'Project ID is required', 
                    success: false 
                }), 
                { status: 400 }
            );
        }

        const result = await taskColl.findOne({ projectId });

        if (!result) {
            return new Response(
                JSON.stringify({ 
                    message: 'No task found for this project', 
                    success: false 
                }), 
                { status: 404 } // Not Found
            );
        }

        return new Response(
            JSON.stringify({ 
                message: 'Data found', 
                success: true, 
                data: result 
            }), 
            { status: 200 }
        );
    } catch (error) {
        console.error("Task API Error:", error);
        return new Response(
            JSON.stringify({ 
                message: 'Internal Server Error', 
                success: false 
            }), 
            { status: 500 }
        );
    }
}
  