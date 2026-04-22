import ProjectCardContiner from "@/Components/ProjectCardContiner/ProjectCardContiner";
import Pagination from '../../Components/Pagination/Pagination';

const getProject = async (category, search,page) => {
  try {
    console.log("category", category, search);
    const searchParams = new URLSearchParams();

    if (search) {
      searchParams.append("search", search);
    }

    if (category && category !== "All") {
      searchParams.append("category", category);
    }

    if(page)
    {
       searchParams.append('page',page)
    }

  
    const res = await fetch(`/api/user-project?${searchParams.toString()}`,
      {
        next: { revalidate: 10 },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch");
    const result = await res.json();

    return result.result;
  } catch (error) {
    console.error("Fetch error:", error);
    return { result: [] };
  }
};


const page = async ({ searchParams }) => {
 
  const params = await searchParams;
  const category = params.category || "All";
  const search = params.search || "";
  const page=params.page||1


  const project = await getProject(category, search,page);
 const projectData=project.projects;
 console.log('project',projectData)
 const pageNumber=project.totalPage

  return (
    <div className="min-h-screen relative">
      {/* Loading state handle korar jonno ProjectCardContiner er bhitore check thaka bhalo */}
      <ProjectCardContiner project={projectData|| []} />
      <Pagination pageNumber={pageNumber}></Pagination>
    </div>
  );
};

export default page;
