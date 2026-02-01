import ProjectUpoladed from '@/Components/ProjectUpoladed/ProjectUpoladed';
import React from 'react';

const page = async({params}) => {
    const id=await params
    return (
        <div>
            <ProjectUpoladed id={id}></ProjectUpoladed>
        </div>
    );
};

export default page;