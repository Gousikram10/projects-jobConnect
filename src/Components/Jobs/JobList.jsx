import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Container,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const JobList = () => {
  const [Det, setJob] = useState([]);
  const { jobid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/jobs/${jobid}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    fetchJob();
  }, [jobid]);

  const Skills = Det.skills || [];
  const [isVisible, setIsVisible] = useState(false);

  const handleCheckKnowledge = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className='joblist' style={{background:'#F0F4F8',height:'100%',width:'100%'}}>

   
    <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: 'black', fontWeight: 'bold',paddingBottom:'20px',fontFamily:'-moz-initial' }}>
        {Det.companyName}
      </Typography>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} md={8} lg={8}>
          <Card sx={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.06)',
            },
          }}>
            <CardContent sx={{ padding: '44px', backgroundColor: 'white' }}>
              <Box textAlign="center" mb={3}>
                <img src={Det.image} alt="Company Logo" style={{ height: '200px', width: '250px', borderRadius: '10px' }} />
              </Box>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.8rem', color: 'black',fontFamily:'-moz-initial' }}>
                {Det.role}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem', mb: 1 }}>
                Location: {Det.city}, {Det.address}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem', mb: 1 }}>
                Start Date: {new Date(Det.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem', mb: 1 }}>
                Apply By: {new Date(Det.applyBy).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem', mb: 1 }}>
                Salary: {Det.Salary}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem', mb: 1 }}>
                Experience Required: {Det.experience}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem', mb: 2 }}>
                Job Type: {Det.jobType}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Skills:
              </Typography>
              <Box sx={{ mb: 2 }}>
                {Skills.map((skill, skillIndex) => (
                  <Chip key={skillIndex} label={skill} sx={{
                    mr: 1, mb: 1, fontSize: '1.1rem', padding: '0 10px', height: '28px',
                    backgroundColor: 'red', color: 'white'
                  }} />
                ))}
              </Box>
              <Typography variant="body1" gutterBottom sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Qualification:
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontSize: '1.2rem' }}>
                {Det.eligibility}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                About the Job:
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontSize: '1.2rem' }}>
                {Det.aboutjob}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                About the Company:
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontSize: '1.2rem' }}>
                {Det.aboutCompany}
              </Typography>
              <Button
                variant="outlined"
                href={`/mcq/${Det.id}`}
                onClick={handleCheckKnowledge}
                sx={{ mt: 2, fontSize: '1.1rem', padding: '10px 20px', borderColor: '#1976d2', color: '#1976d2' }}
              >
                Check Required Knowledge
              </Button>
              {isVisible && (
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, ml: 2, fontSize: '1.1rem', padding: '10px 20px' }}
                >
                  Apply Now
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default JobList;
