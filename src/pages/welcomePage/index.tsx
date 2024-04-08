import React from 'react'
import { useParams } from 'react-router-dom';

const Welcome = () => {
  let {username} = useParams()

    return <h1>WELCOME,{username}</h1>;
  };
  
  export default Welcome;