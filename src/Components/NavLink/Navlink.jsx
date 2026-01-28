import Link from 'next/link';
import React from 'react';

const Navlink = ({name,to}) => {
    return (
        <li>
           <Link href={to} className=''>{name}</Link> 
           
        </li>
    );
};

export default Navlink;