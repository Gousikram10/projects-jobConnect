import React from 'react'
import './Home.css'
import data from '../../Asserts/jobs'
import post from '../../Asserts/post.jpg'
import get from '../../Asserts/get.jpg'
import { Items } from '../Items/Items'
import { Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Navbar } from '../Navbar/Navbar'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom'
import HelpAssistant from '../../HelpAssistant'
export const Home = () => {
    const navigate=useNavigate('/post');
  return (<>
  
      <div className='home'>
        <div className='start'>
            <h1>Connecting Talent with Opportunity</h1>
            <p>Bridging the Gap Between Employers and Job Seekers</p>
        </div>
        <div className="middle">
            <div className='post'>
            <img className='mid-img' src={post}></img>
            <h1>Want to hire?</h1>
            <p>Submit your first job Ad post.</p>
            
            <Button variant="contained"  onClick={()=>navigate('/post')} sx={{backgroundColor:"#f7bc99"}} endIcon={<KeyboardDoubleArrowRightIcon />}>Post Job</Button>
            </div>
            <div className='post'>
            <img className='mid-img' src={get}></img>
            <h1>Want a job?</h1>
            <p>Apply to latest job openings.</p>
            <Button variant="contained" onClick={()=>navigate('/jobsdetails')} sx={{backgroundColor:"#f7bc99"}} endIcon={<KeyboardDoubleArrowRightIcon />}>Search Job</Button>
            </div>
        </div>
        <div className="content">
            <h1>Indeed the perfect place for your naukri needs!</h1>
            <div className='home-box'>
                <p>250+ districts</p>
                <p>25 Lakh+
                candidate</p>
                <p>50+ job categories</p>
                <p>300+
                job roles</p>
            </div>
            <div className="multiplejobs">
                <h1>Hire from multiple job categories</h1>
                <div className='box-images'>
                <div className='popular-item'>
            {data.map((item,i)=>{
                return(
                    <Link style={{textDecoration:'none',color:'black'}} key={i} to={`/jobs/${item.id}`}>
                 <Items key={i} id={item.id} name={item.name} image={item.image}  />
                    </Link>
                );
            })}
        </div>
        <div>
            <Footer/>
            <HelpAssistant/>
        </div>
                </div>
                
            </div>
        </div>
    </div>
    </>
  )
}
