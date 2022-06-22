import { InfoOutlined, PlayArrow } from '@mui/icons-material'
import React from 'react'
import './featured.scss'

interface Props {
    type: string
}

const Featured: React.FC<Props> = ({type}) => {
  return (
    <div className='featured'>
        {type && (
            <div className="category">
                <span>
                    {type ==="movie" ? "Movies" : "TV Shows"}
                </span>
                <select name='genre' id='genre'>
                    <option >Genre</option>
                    <option value="action">Action</option>
                    <option value="anime">Anime</option>
                    <option value="asian">Asian</option>
                    <option value="award-winning">Award-Winning</option>
                    <option value="celebrate pride">Celebrate Pride</option>
                    <option value="crime">Crime</option>
                    <option value="dramas">Dramas</option>
                    <option value="fantasy">Fantasy</option>
                </select>
            </div>
        )}
        <img 
      src="https://occ-0-325-395.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABeCv4U2tiZaIt93JYt0OcIjXNEAylrwAM41RZbP2F_Qm5kMmVg9O8r_1E6S3sB7HvHXr78hXSQReQ_m8lHQAGAOIWecvlfAhWilQ.webp?r=372" 
      alt="" />
        <div className="info">
            <img 
            src="https://occ-0-325-395.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABRelsrlVotKV0Tpra_4hNE36w6ed_JuMOGylb5O3ee9DU4OT6zgVWMvvYu_YFIKU0Endl99iqrUgUH_a3k4AwaRNcK-E9ATEKwm_Ov8lpH2e.webp?r=ed0" 
            alt="" />
            <span className='desc'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos est voluptates similique doloribus eum deserunt obcaecati exercitationem et, eos labore ipsum aperiam optio rerum fugit eveniet, repellendus eaque laboriosam?
            </span>
            <div className="buttons">
                <button className='play'>
                    <PlayArrow /> 
                    <span>Play</span>
                </button>
                <button className='moreInfo'>
                    <InfoOutlined />
                    <span>More Info</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Featured