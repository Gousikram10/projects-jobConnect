import React from 'react'
import './Items.css'
export const Items = (props) => {
  return (
    <div className='items'>
          <img onClick={window.scrollTo(0,0)} src={props.image}/>
         <p>{props.name}</p>
   
   </div>
  )
}
{/* <div className='item'>
<Link to={`/product/${props.id}`}>
   <img onClick={window.scrollTo(0,0)} src={props.image}/>
</Link>
   <p>{props.name}</p>
   <div className="item-prices">
       <div className="item-price-now">
           ${props.new_price}
       </div>
       <div className="item-price-old">
           ${props.old_price}
       </div>
   </div>
</div> */}
