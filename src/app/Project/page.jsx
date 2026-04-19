import ProjectCardContiner from "@/Components/ProjectCardContiner/ProjectCardContiner";

const getProject = async (category, search) => {
  try {
    console.log("category", category, search);
    const searchParams = new URLSearchParams();

    if (search) {
      searchParams.append("search", search);
    }

    if (category && category !== "All") {
      searchParams.append("category", category);
    }

    // BASE_URL check koren .env e thik moto ache kina
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-project?${searchParams.toString()}`,
      {
        // 'no-store' er bodole ekhane revalidate use kora bhalo jate page fast load hoy
        next: { revalidate: 10 },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch");
    const result = await res.json();
    console.log("result data", result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    return { result: [] };
  }
};

// Page component
const page = async ({ searchParams }) => {
  // Direct destructure na kore await kora thik ache
  const params = await searchParams;
  const category = params.category || "All";
  const search = params.search || "";
  console.log("category", category, "search", search);

  const projectData = await getProject(category, search);
  console.log("projectData", projectData);

  return (
    <div className="min-h-screen relative">
      {/* Loading state handle korar jonno ProjectCardContiner er bhitore check thaka bhalo */}
      <ProjectCardContiner project={projectData?.result || []} />
    </div>
  );
};

export default page;
