import React, { useContext, useState } from 'react';
import { JobContext } from '../TotalContext.jsx/TotalContext';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SchoolSharpIcon from '@mui/icons-material/SchoolSharp';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import WorkSharpIcon from '@mui/icons-material/WorkSharp';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import { Link } from 'react-router-dom';
import './Admin.css';
import delete1 from './delete.png';
import axios from 'axios';

export const Admin = () => {
  const { data1 } = useContext(JobContext);
  
  const deleteitem = (id,name)=>{
      if(window.confirm(`Are you sure you want to delete ${name} details`))
      {
     fetch('http://localhost:4000/removejob',{
      method:'POST',
      headers:{
        Accept:'application/json',
        "Content-Type":'application/json',
      },
      body:JSON.stringify(
        {id:id}
      ),
     }).then((res)=>res.json()).then(()=>{
      alert("Deleted Successfully");  
     })
  }

  }
  const [jobs,setJobs]=useState([]);
  const updateJob = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:4000/updatejob/${id}`, updatedData);
      const updatedJobs = jobs.map(job => (job._id === id ? response.data : job));
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleUpdateClick = (id) => {
    const updatedData = {
      companyName: '',
      role: '',
      city: '',
      image: '',
      address: '',
      startDate: null,
      applyBy: null,
      Salary: '',
      experience: '',
      aboutjob: '',
      skills: [],
      eligibility: '',
      aboutCompany: '',
      vacancies: 0,
      jobType: '',
    };
    updateJob(id, updatedData);
  };

  return (
    <div className='admin'>
      <div className="admin-list">
        {data1.map((data, i) => (
          <div key={i} className='job-box'>
            <div className="job-img">
              <img src={data.image} alt={`${data.companyName} logo`} />
              <div className="company">
                <h2>{data.role}</h2>
                <p className="company-name">{data.companyName}</p>
                {/* <p className="about-company">{data.aboutCompany}</p> */}
              </div>
            </div>
            <div className='description'>
              <div>
                <CurrencyRupeeIcon className='icon' sx={{fontSize:'20px'}} /> {data.Salary}
              </div>
              <Link to={`/updatepage/${data.id}`} target='_blank'>
                <button className='apply-button'>UPDATE</button>
                </Link>
              
              <img className='delete1' onClick={()=>deleteitem(data.id,data.companyName)} src={delete1}/>
            </div>
            <div className="job-foot">
              <p><LocationOnSharpIcon className='icon' /> {data.city}</p>
              <p><WorkSharpIcon className='icon' /> {data.jobType}</p>
              <p><AccessTimeSharpIcon className='icon' /> {data.experience}</p>
              <p><SchoolSharpIcon className='icon' /> {data.eligibility}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
