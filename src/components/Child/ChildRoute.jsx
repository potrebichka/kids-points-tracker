import React from 'react';
import {useParams} from 'react-router-dom';
import ChildControl from './ChildControl';

const ChildRoute = (props) => {
    let {id} = useParams() 
    return <ChildControl {...props} id={id}/>
}

export default ChildRoute;