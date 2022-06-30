import React from 'react'
import AdNav from '../../../components/admincpn/adnav/AdNav'
import DataTable from '../../../components/admincpn/datatable/DataTable'
import SideBar from '../../../components/admincpn/sidebar/SideBar'
import "./adhome.scss"

const AdHome: React.FC = () => {
  return (
    <div className='adhome'>    
        <SideBar />
        <div className="homeContainer">
          <AdNav />
          <div className="homeContent">
            <DataTable />
          </div>
        </div>
    </div>
  )
}

export default AdHome