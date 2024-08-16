import React from 'react'
import Profile from './Profile'
import Experience from './Experience'
import Education from './Education'
import Skills from './Skills'
import Projects from './Projects'
import Achievements from './Achievements'
import Contact from './Contact'
import ResumePreview from './ResumePreview'
import { Box, Button, Container, Grid } from '@mui/material'
import { useResume } from '../context/ResumeContext'

export const Home = () => {
  const{setLoader}=useResume();
  return (
    <div className='home'>
 <Container>
        <Box py={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Profile />
            
              <Experience />
              <Education/>
              <Skills/>
              <Projects />
              <Achievements />
              <Contact />
            </Grid>
            <Grid item xs={12} md={6}>
              <ResumePreview />
              <Button variant="contained" disableElevation style={{marginTop:'20px'}} onClick={()=>setLoader(true)}>PREVIEW</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}
