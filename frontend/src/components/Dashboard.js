import {useEffect,useState}from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import Spinner from './Spinner';
import {FcSettings} from 'react-icons/fc'
import ChapterDetail from './ChapterDetail';
import DataChart from './charts/DataChart';
import DashboardNav from './dashboardComponent/DashboardNav';
import FactorwiseCount from './dashboardComponent/FactorwiseCount';
import { FaBars,FaTimes,FaSortDown,FaSortUp } from 'react-icons/fa';
import IncompleteData from './pwhData/IncompleteData';


const Dashboard = () => {
  const {user} = useSelector((state)=>state.auth)
  const {data,isLoading,isError,isSuccess,isDataFetched} = useSelector((state)=>state.data)
  // const {userDetail} = useSelector((state) => state.fetchUser)

  const [isSideBarOpen,setSideBar] = useState(false)
  const [isIncompleteDataOpen,setIncopleteDataOpen] = useState(false)
  const [isChapterDetailOpen, setChapterDetailOpen] =useState(true)

  const navigate = useNavigate()
  const dispatch = useDispatch()

const duplicate = data.filter((data) => data.tag === 'Duplicate').length
const sidebarHandler = () =>{
  setSideBar((state)=> state = !state)
  console.log(isSideBarOpen)
}


const incompleteDataHandler = () =>{
 
  setIncopleteDataOpen(!isIncompleteDataOpen)
  setChapterDetailOpen(false)

}
const chapterDetailHandler = () =>{
  setChapterDetailOpen(!isChapterDetailOpen)
  setIncopleteDataOpen(false)

}
useEffect(() =>{


 
 
},[user,isSuccess,navigate])

if (isLoading) {
  return <Spinner />
}
  return (
    <>
    <div className="burger-menu">
      {isSideBarOpen? <FaTimes onClick={sidebarHandler}/>:<FaBars  onClick={sidebarHandler}/>}
      
      </div>
    <div className="action-container">
    <aside className={` action-div ${isSideBarOpen? 'active':''}`}>
      <div className="action-div-top">
        <p>Dashboard</p>
      </div>
        <DashboardNav />
      
      <div className="action-div-bottom">
      <FcSettings/><Link to="/change_password"><p> Change Password</p></Link>
      </div>
    </aside>
    <section className="dashboard-container">
    <div className="dashboard-top">
    <div className="info-row">
      <div className="welcome-div">
        <h5>Hii</h5>
        <h4>Welcome back Mr/Mrs keyperson</h4>
      </div>
      <div className="notification-div">
      <p>You have {duplicate} duplicate entr{`${duplicate > 1? "ies" : "y"}`} <Link to="">View</Link></p>
    
      </div>
    
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
        <div className="other-detail">
          <div class="other-detail-tabs">
        <div onClick={incompleteDataHandler} className={isIncompleteDataOpen? "active":""}><p>Incomplete Data {isIncompleteDataOpen? <FaSortUp/>:<FaSortDown/>}</p></div>
        <div onClick={chapterDetailHandler} className={isChapterDetailOpen? "active":""}><p>Chapter Detail {isChapterDetailOpen? <FaSortUp/>:<FaSortDown/>}</p></div>
        </div>
          
          {isIncompleteDataOpen && <IncompleteData />}
          {isChapterDetailOpen && <ChapterDetail /> }
        </div>
      </div>
    
    </section>
    </div>
    </>
  )
}

export default Dashboard