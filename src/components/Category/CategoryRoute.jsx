import React from 'react';
import Category from './Category';
import {useParams} from 'react-router-dom';

const CategoryRoute = (props) => {
    let {id} = useParams() 
    return <Category {...props} id={id}/>
}

export default CategoryRoute;