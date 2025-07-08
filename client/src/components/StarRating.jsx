import React from 'react'
import { assets } from '../assets/assets'
function StarRating({rating=4}) {
  return (
   <>
     {
     Array(5).fill('').map((index, i) => (<img src={rating > i ? assets.starIconFilled : assets.starIconOutlined} alt="star" key={i} />))
     }
   </>
  )
}

export default StarRating
