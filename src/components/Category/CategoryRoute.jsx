import React from 'react';
import Category from './Category';
import {useParams} from 'react-router-dom';

const CategoryRoute = (props) => {
    let {id} = useParams();
    console.log(props.location.state);
    return <Category {...props} id={id} name={props.location.state.name} items={props.location.state.items}/>
}

export default CategoryRoute;