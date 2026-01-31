import UserRequst from '@/Components/UserRequest/UserRequst';
import React from 'react';

const page = async ({params}) => {
    const {id}=await params
    return (
        <div>
            <h1>this si requste</h1>
        <UserRequst id={id}></UserRequst>
        </div>
    );
};

export default page;