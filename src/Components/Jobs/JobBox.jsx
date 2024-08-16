import React, { useContext, useEffect, useState } from 'react';
import './JobBox.css';
import SchoolSharpIcon from '@mui/icons-material/SchoolSharp';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import WorkSharpIcon from '@mui/icons-material/WorkSharp';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import job_images from '../../Asserts/jobs';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { JobContext } from '../TotalContext.jsx/TotalContext';

export const JobBox = (props) => {
  const { role } = useParams();
  const filter = props.filter;
  const { data1 } = useContext(JobContext);
  const navigate = useNavigate();

  return (
    <div>
      {data1.map((data, i) => {
        if (role) {
          if (job_images[role - 1].name === data.role) {
            return (
              <div key={i} className='jobbox' style={{ marginLeft: '230px', marginTop: '70px' }}>
                <div className='jobbox-img'>
                  <img src={data.image} alt={`${data.role} image`} />
                  <div>
                    <div className='jobbox-company'>
                      <h2>{data.role}</h2>
                      <p style={{ marginTop: '-12px' }}>{data.companyName}</p>
                      <p style={{ fontSize: '19px', fontWeight: '400', fontFamily: 'initial', marginTop: '-10px' }}>{data.aboutCompany}</p>
                    </div>
                  </div>
                </div>
                <div className='jobbox-description'>
                  <div>
                    <h2>
                      <span className='rup'><CurrencyRupeeIcon style={{ fontSize: '20px' }} /></span> {data.Salary}
                    </h2>
                  </div>
                  <div>
                    <Link to={`/list/${data.id}`} target='_blank'>
                      <button>APPLY</button>
                    </Link>
                  </div>
                </div>
                <div className='jobbox-jobfoot'>
                  <p><LocationOnSharpIcon style={{ fontSize: '18px' }} /> {data.city}</p>
                  <p><WorkSharpIcon style={{ fontSize: '18px' }} /> {data.jobType}</p>
                  <p><AccessTimeSharpIcon style={{ fontSize: '17px' }} /> {data.experience}</p>
                  <p><SchoolSharpIcon style={{ fontSize: '19px' }} /> {data.eligibility}</p>
                </div>
              </div>
            );
          }
        } else {
          if (props.check) {
            if (data.experience === filter.experience && data.Salary === filter.Salary && data.role === filter.role && data.eligibility === filter.eligibility && data.jobType === filter.jobType) {
              return (
                <div key={i} className='jobbox'>
                  <div className='jobbox-img'>
                    <img src={data.image} alt={`${data.role} image`} />
                    <div>
                      <div className='jobbox-company'>
                        <h2>{data.role}</h2>
                        <p style={{ marginTop: '-12px' }}>{data.companyName}</p>
                        <p style={{ fontSize: '19px', fontWeight: '400', fontFamily: 'initial', marginTop: '-10px' }}>{data.aboutCompany}</p>
                      </div>
                    </div>
                  </div>
                  <div className='jobbox-description'>
                    <div>
                      <h2>
                        <span className='rup'><CurrencyRupeeIcon style={{ fontSize: '20px' }} /></span> {data.Salary}
                      </h2>
                    </div>
                    <div>
                      <Link to={`/list/${data.id}`} target='_blank'>
                        <button>APPLY</button>
                      </Link>
                    </div>
                  </div>
                  <div className='jobbox-jobfoot'>
                    <p><LocationOnSharpIcon style={{ fontSize: '18px' }} /> {data.city}</p>
                    <p><WorkSharpIcon style={{ fontSize: '18px' }} /> {data.jobType}</p>
                    <p><AccessTimeSharpIcon style={{ fontSize: '17px' }} /> {data.experience}</p>
                    <p><SchoolSharpIcon style={{ fontSize: '19px' }} /> {data.eligibility}</p>
                  </div>
                </div>
              );
            }
          } else {
            return (
              <div key={i} className='jobbox'>
                <div className='jobbox-img'>
                  <img src={data.image} alt={`${data.role} image`} />
                  <div>
                    <div className='jobbox-company'>
                      <h2>{data.role}</h2>
                      <p style={{ marginTop: '-12px' }}>{data.companyName}</p>
                      <p style={{ fontSize: '19px', fontWeight: '400', fontFamily: 'initial', marginTop: '-10px' }}>{data.aboutCompany}</p>
                    </div>
                  </div>
                </div>
                <div className='jobbox-description'>
                  <div>
                    <h2>
                      <span className='rup'><CurrencyRupeeIcon style={{ fontSize: '20px' }} /></span> {data.Salary}
                    </h2>
                  </div>
                  <div>
                    <Link to={`/list/${data.id}`} target='_blank'>
                      <button>APPLY</button>
                    </Link>
                  </div>
                </div>
                <div className='jobbox-jobfoot'>
                  <p><LocationOnSharpIcon style={{ fontSize: '18px' }} /> {data.city}</p>
                  <p><WorkSharpIcon style={{ fontSize: '18px' }} /> {data.jobType}</p>
                  <p><AccessTimeSharpIcon style={{ fontSize: '17px' }} /> {data.experience}</p>
                  <p><SchoolSharpIcon style={{ fontSize: '19px' }} /> {data.eligibility}</p>
                </div>
              </div>
            );
          }
        }
      })}
    </div>
  );
};
