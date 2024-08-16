import React, { useState } from 'react'
import './Jobs.css'
import { JobBox } from './JobBox'
import jobs from '../../Asserts/jobs'
import maps from './maps.png'
import { Link } from 'react-router-dom'
export const Jobs = () => {
  const [qualify,setQualify]=useState('');
  const [check,setCheck]=useState(false);
  
  const[filter,setFilter]=useState({
    eligibility:'10th',
    jobType:'Work from Home',
    role:'Admin/Office',
    Salary:'10000-20000',
    experience:'0-1 year',
   
  });
  // setFormData({ ...formData, [e.target.name]: e.target.value });
  const handle=(e)=>{
    setFilter({...filter,[e.target.name]:e.target.value});
  }
  function handleSubmit()
  {  
    setCheck(true);
  }
  return (
    <div className='jobs'>
        <div className="job-left">
      <div><h1>Filter jobs</h1>
            <div><p>Qualification</p>
            <select  name='eligibility' value={filter.eligibility} onChange={(e)=>handle(e)}>
<option value={"10th"}>10th</option>
<option value={"12th"}>12th</option>
<option value={"Graduate"}>Graduate</option>
<option value={"Post Graduate"}>Post Graduate</option>
</select>
</div>
            <div>
              <p>Job Category</p>
              
            <select name='role' value={filter.role} onChange={(e)=>handle(e)} >
            {jobs.map((job,i)=>{
              return <option key={i} value={job.name}>{job.name}</option>
            })}
            </select>
              </div>
            <div><p> Job Type</p>
            <select name='jobType' value={filter.jobType} onChange={(e)=>handle(e)}>
      <option value={"Work from Home"}>Work from Home</option>
      <option value={"Office"}>Office</option>
      <option value={"Part time"}>Part time</option>
      <option value={"Full time"}>Full time</option>
      <option value={"Intenship"}>Intenship</option>   
    </select>
             </div>
           
            <div>
              <p>Salary</p>
            <select name='Salary' value={filter.Salary} onChange={(e)=>handle(e)}> 
      <option value={"10000-20000"}>10000-20000</option>
      <option value={"20000-30000"}>20000-30000</option>
      <option value={"30000-40000"}>30000-40000</option>
      <option value={"40000-50000"}>40000-50000</option>
      <option value={"50000+"}>50000+</option>
 
            </select>
              </div>
            <div>
              <p>Experience</p>
            <select name='experience' value={filter.experience} onChange={(e)=>handle(e)} >
      <option value={"0-1 year"}>0-1 year</option>
      <option value={"2-3 years"}>2-3 years</option>
      <option value={"3-4 years"}>3-4 years</option>
      <option value={"5 years +"}>5 years +</option>
    
    </select>
              </div>
              <button className='filter' onClick={()=>handleSubmit()}>Filter</button>
            </div>
        </div>
        <div className="job-right">
          <div className="mapicon">

            <h1>List of Jobs</h1>
            <Link to='/map'>
            <img className='map-icon' src={maps}></img>
            </Link>
          </div>
            <div className='jobdata'>
                <JobBox filter={filter} check={check}/>
            </div>
        </div>
    </div>
  )
}
