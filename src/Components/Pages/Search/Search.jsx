
import './Search.css'
import city from '../../../Asserts/Cities'
// src/SearchBox.js
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputAdornment, TextField } from '@mui/material';
import { City } from '../../Items/City';
export const Search = () => {
  return (
    <div className='search'>
        <div className="search-box">
            <h1>Provide your location & find jobs near you</h1>
            <div className="box">
                
            <TextField
      type="text" 
      placeholder="Search..." 
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ padding: '5px' }} />
          </InputAdornment>
        ),
      }}
    />
   </div>
            
        </div>

        <div className="popular">
          <h1>Popular Cities</h1>
          {/* {data.map((item,i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image}  />
            })} */}
            {/* <div className='city-box'> */}
            <div className="city">
            {city.map((city,i)=>{
              return <City key={i} id={city.id} name={city.name} image={city.image} />
              
            }
            
            )}
            
            {/* </div> */}
            </div>
        </div>
    </div>
  )
}
