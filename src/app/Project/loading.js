import FilterSkeleton from "../../Components/LoadinSKelation/FilterSkeleton";
import ProjectSkeleton from '../../Components/LoadinSKelation/ProjectSkeleton';


export default function Loading() {
  return (
    <div className="min-h-screen max-w-[1600px] mx-auto py-5">
      
      {/* FILTER SKELETON */}
      <FilterSkeleton />

      {/* GRID SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 lg:px-10 gap-8 mt-10">
        {[...Array(9)].map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>

    </div>
  );
}