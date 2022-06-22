import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
import React, { useRef,useState } from 'react'
import ListItem from '../listItem/ListItem'
import './list.scss'

const List: React.FC = () => {
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
        if(direction ==="right" && slideNumbers < 9) {
            setSlideNumbers(slideNumbers + 1)
                if(listRef.current !== null) {
                    distance = listRef.current.getBoundingClientRect().x - 50
                    listRef.current.style.transform = `translateX(${-230 + distance}px)`
                }
        }
        console.log(distance);
    }
    
    
  return (
    <div className='list'>
        <span className="listTitle">
            Continue to watch
        </span>
        <div className="wrapper" >
            <ArrowBackIosOutlined 
            className='sliderArrow left'
            onClick={()=> handleClick("left")} />
            <div className="container" ref={listRef}>
                <ListItem index={0} />
                <ListItem index={1}/>
                <ListItem index={2}/>
                <ListItem index={3} />
                <ListItem index={4}/>
                <ListItem index={5}/>
                <ListItem index={6}/>
                <ListItem index={7}/>
                <ListItem index={8}/>
                <ListItem index={9}/>
                <ListItem index={10}/>
                <ListItem index={11}/>
            </div>
            <ArrowForwardIosOutlined 
            className='sliderArrow right'
            onClick={()=> handleClick("right")} />
        </div>
    </div>
  )
}

export default List