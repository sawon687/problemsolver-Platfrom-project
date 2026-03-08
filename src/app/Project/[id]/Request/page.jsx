import UserRequst from '@/Components/UserRequest/UserRequst';
import React from 'react';

const page = async ({params}) => {
       const {id}=await params;
       console.log('id si real',id)
    return (
        <div className='bg-gray-100 min-h-screen'>
            <h1>this si requste</h1>
        <UserRequst id={id} ></UserRequst>
        </div>
    );
};

export default page;