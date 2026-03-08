import ProjectCardContiner from "@/Components/ProjectCardContiner/ProjectCardContiner";
export const dynamic = "force-dynamic";
const getProject = async (category,search) => {
  try {
     const searchParams=new URLSearchParams()

       if(search)
        { 
        searchParams.append('search',search)      
       }

       if(category && category!=='All')
       {
          searchParams.append('category',category)
       }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-project?${searchParams.toString()}`,
      { cache: 'no-store' } 
    );

  

    return await res.json(); // JSON response
  } catch (error) {
    console.log("Fetch error:", error);
    return { result: [] };
  }
};

const ProjectPage = async ({ searchParams }) => {
  const searchQuery= await searchParams
  const category=searchQuery.category||'All'
  const search=searchQuery.search || ''
   console.log('category',category)
   console.log('searach data',search)
  const project = await getProject(category,search);

  return (
    <div>
      <ProjectCardContiner project={project?.result} />
    </div>
  );
};

export default ProjectPage;
