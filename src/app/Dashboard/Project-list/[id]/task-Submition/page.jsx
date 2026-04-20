import ProjectDetailPage from '@/Components/ProjectDetailPage/ProjectDetailPage';
import React from 'react';

const page = async({params}) => {
    const {id}= await params
    console.log('id is sea',id)
    return (
        <div className='z-0'>
            this veiw detials page 
            <ProjectDetailPage id={id} ></ProjectDetailPage>
        </div>
    );
};

export default page;