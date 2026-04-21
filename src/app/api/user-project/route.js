import connect from "@/lib/dbconnect";


const projectColl=connect('projectColl')

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || 'All';
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page')) || 1; 

    const limit = 9;
    const skip = (page - 1) * limit;

    const query = {};
    if (category && category !== 'All') {
      query.ProjectCategory = category;
    }
    
    if (search) {
      query.$or = [
        { ProjectTitle: { $regex: search, $options: 'i' } },
        { ProjectDescription: { $regex: search, $options: 'i' } },
        
        { ProjectBudge: { $regex: search, $options: 'i' } } 
      ];
    }


    const projects = await projectColl.find(query)
      .skip(skip)
      .limit(limit) 
      .toArray();

  
    const totalProject = await projectColl.countDocuments(query);

  
    const totalPage = Math.ceil(totalProject / limit);

    return new Response(
      JSON.stringify({ 
        result: { projects, totalPage }, 
        success: true 
      }), 
      { status: 200 }
    );

  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }), 
      { status: 500 }
    );
  }
};








