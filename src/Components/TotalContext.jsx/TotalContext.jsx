import React, { createContext, useContext, useEffect, useState } from 'react'
import JobList from '../Jobs/JobList';
export const JobContext=createContext(undefined);
export const TotalContext = ({children}) => {
  // console.log("ok");
  // const data1=props.data;
  // console.log(data1);
  const [data1,setData]=useState([]);
  const fetchInfo=async()=>{

    await fetch("http://localhost:4000/getalljobs").then((res)=>res.json())
    .then((data)=>{setData(data)})
  }
  useEffect(()=>{
    fetchInfo();
 
  },[])
  return (
    <div>
        <JobContext.Provider value={{data1}}>
          {children}
        </JobContext.Provider>
    </div>
  );
}
// export default JobContext;