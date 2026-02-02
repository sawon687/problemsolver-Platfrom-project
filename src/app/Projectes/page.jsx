import ProjectCardContiner from '@/Components/ProjectCardContiner/ProjectCardContiner';
const getProject=async()=>{
     try {
         const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-project`,{
            method:'GET',
            cache:'no-cache'
         })
          return   await res.json()
     } catch (error) {
        console.log(error)
        return []
     }
 
}
const page = async() => {
    const project=await getProject()
    console.log('prjects server',project)
    return (
        <div>
            
            <ProjectCardContiner project={project.result}></ProjectCardContiner>


        </div>
    );
};

export default page;