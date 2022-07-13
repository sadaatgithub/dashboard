import React,{useEffect,useState}from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import { fetchData , reset} from '../features/data/dataSlice';
import { fetchUser, reset as resetUser } from '../features/user/userSlice';
import Spinner from './Spinner';
import {FcSettings} from 'react-icons/fc'
import ChapterDetail from './ChapterDetail';
import { getPwhWithId , reset as resetUpdateId} from "../features/data/addNewPwhSlice";
import DataChart from './charts/DataChart';
import SearchDiv from './pwhData/search/SearchDiv';
import DashboardNav from './dashboardComponent/DashboardNav';
import FactorwiseCount from './dashboardComponent/FactorwiseCount';
// import {ImAddressBook} from 'react-icons/fa'

// const userDetail = localStorage.getItem('user_detail')

const Dashboard = () => {
  const {user} = useSelector((state)=>state.auth)
  const {data,isLoading,isError,isSuccess,isDataFetched} = useSelector((state)=>state.data)
  const {userDetail} = useSelector((state) => state.fetchUser)


  const navigate = useNavigate()
  const dispatch = useDispatch()

const duplicate = data.filter((data) => data.tag === 'Duplicate').length

useEffect(() =>{


 
 
},[user,isSuccess,navigate])

if (isLoading) {
  return <Spinner />
}
  return (
    <>
    <div className="action-container">
    <aside className="action-div">
      <div className="action-div-top">
        <p>Welcome {userDetail?.first_name + ' ' + userDetail?.last_name}</p>
      </div>
        <DashboardNav />
      
      <div className="action-div-bottom">
      <FcSettings/><Link to="/change_password"><p> Change Password</p></Link>
      </div>
    </aside>
    <section className="dashboard-container">
    <div className="dashboard-top">
    <div className="info-row">
      <p>You have {duplicate} duplicate entr{`${duplicate > 1? "ies" : "y"}`}</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  </div>
        
      
      <div className="dashboard-middle">
        
        <div className="total-pwh">
          <p className='total-pwh-heading'>Total PwH</p>
          <p className='total-pwh-count'>{data.filter((data) => data.tag !== 'Deceased').length}</p>
          <small className='desclaimer'>* Deceased not included</small>
        </div>
          <FactorwiseCount />
       
        
      </div>
      <div className="dashboard-bottom ">
        <div className="pie-chart">
          <DataChart />
        </div>
        <div className="chapter-details">
          <ChapterDetail />
        </div>
      </div>
    
    </section>
    </div>
    </>
  )
}

export default Dashboard