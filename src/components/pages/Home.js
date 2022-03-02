import Tables from '../features/Tables';
import React from "react";
import {useEffect, useState} from "react";

  const Home = () => {
  
    const [loading, setLoading] = useState(true);
      
    useEffect(() => {

      const loadData = async () => {
  
        await new Promise((r) => setTimeout(r, 2000));
  
        setLoading((loading) => !loading);
      };
        
      loadData();
    }, [])
      
    if (loading) {
        return <div><center>LOADING... PLEASE WAIT</center></div>
    }
      
    else {
        return (<Tables />)
    }
}

export default Home;