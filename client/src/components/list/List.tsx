import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
import React, { useRef,useState } from 'react'
import ListItem from '../listItem/ListItem'
import './list.scss'

interface Props {
    list: {
        title: string,
        content:[]
    }
    
}
const List: React.FC<Props> = ({list}) => {
    const listRef = useRef<HTMLDivElement | null>(null)
    const [slideNumbers,setSlideNumbers] = useState <number>(0)
    const handleClick = (direction: any) => {
        let distance
        if(direction ==="left" && slideNumbers > 0) {
            setSlideNumbers(slideNumbers - 1)
                if(listRef.current !== null) {
                    distance = listRef.current.getBoundingClientRect().x - 50
                    listRef.current.style.transform = `translateX(${230 + distance}px)`
                }
        }
        if(direction ==="right" && slideNumbers <4) {
            setSlideNumbers(slideNumbers + 1)
                if(listRef.current !== null) {
                    distance = listRef.current.getBoundingClientRect().x - 50
                    listRef.current.style.transform = `translateX(${-230 + distance}px)`
                }
        }
    }
    
  return (
    <div className='list'>
        <span className="listTitle" >
            {list.title}
        </span>
        <div className="wrapper" >
            <ArrowBackIosOutlined 
            className='sliderArrow left'
            onClick={()=> handleClick("left")} />
            <div className="container" ref={listRef}>
              {list.content.map((item,index) => (
                        <ListItem item ={item} index={index}/>
              ))}
            </div>
            <ArrowForwardIosOutlined 
            className='sliderArrow right'
            onClick={()=> handleClick("right")} />
        </div>
    </div>
  )
}

export default List