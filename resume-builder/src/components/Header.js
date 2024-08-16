import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Header() {
  const buttonStyles = {
    backgroundColor: '#4CAF50', // Green background
    border: 'none', // Remove borders
    color: 'white', // White text
    padding: '15px 32px', // Some padding
    textAlign: 'center', // Centered text
    textDecoration: 'none', // Remove underline
    display: 'inline-block', // Make the buttons appear next to each other
    fontSize: '16px', // Increase font size
    margin: '4px 2px', // Add some margin
    cursor: 'pointer', // Pointer/hand icon
    borderRadius: '12px', // Rounded corners
    transition: 'background-color 0.3s ease', // Smooth transition
  };
  return (
    <AppBar position="static">
      <Toolbar sx={{display:'flex',justifyContent:'space-around'}}>
        <Typography variant="h6">
          Resume Builder
        </Typography>
        <Typography variant="h6">
          <Link to='/a'>
          <button style={buttonStyles}>

          Resume Analyser
          </button>
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
