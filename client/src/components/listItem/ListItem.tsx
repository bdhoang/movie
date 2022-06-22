import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import './listItem.scss'

interface Props {
  index: number
}

const ListItem: React.FC <Props>= ({index}) => {
  const [isHovered,setIsHovered] = useState<boolean>(false)
  return (
    <div className='listItem'
    style={{left: isHovered ? index * 225 - 50 + index * 2.5 : 0}}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
        <img 
        src="https://gaumeothuckhuya.com/wp-content/uploads/2021/06/thomas-shelby-la-ai-cillian-murphy.jpg" 
        alt="" />
        <div className="itemInfo">
          <div className="icons">
            <PlayArrow />
            <Add />
            <ThumbUpAltOutlined />
            <ThumbDownOutlined />
          </div>
          <div className="intemInfoTop">
            <span>1 hour 14 mins</span>
            <span className='limit'>+16</span>
            <span>1999</span>
          </div>
          <div className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quibusdam non officiis deserunt. In excepturi repellendus nesciunt quas reiciendis molestiae consectetur. Ipsa vero eius qui maiores nihil ex minima assumenda.
          </div>
          <div className="genre">Action</div>
        </div>
    </div>
  )
}

export default ListItem