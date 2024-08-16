import React from 'react'
import './City.css'
export const City = (props) => {
  return (
    
    <div className='citys'>
        <div>
        <img src={props.image} className='img1'></img>
        </div>
        <div><h1>{props.name}</h1></div>
    </div>
    
  )
}
