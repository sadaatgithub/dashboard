import {useEffect,useState}from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import { useSelector} from 'react-redux';
import Spinner from './Spinner';
import {FcSettings} from 'react-icons/fc'
import ChapterDetail from './ChapterDetail';
import DataChart from './charts/DataChart';
import DashboardNav from './dashboardComponent/DashboardNav';
import FactorwiseCount from './dashboardComponent/FactorwiseCount';
import { FaBars,FaTimes,FaSortDown,FaSortUp } from 'react-icons/fa';
import IncompleteData from './pwhData/IncompleteData';
import DuplicatePwh from './pwhData/DuplicatePwh';
import {AiOutlineSetting} from "react-icons/ai"
// import PieChart from './charts/PieChart';

const Dashboard = () => {
  const {user} = useSelector((state)=>state.auth)
  const {data,isLoading,isSuccess} = useSelector((state)=>state.data)
  // const {userDetail} = useSelector((state) => state.fetchUser)
  const [duplicateModal,setDuplicateModal] = useState(false)

  const [isSideBarOpen,setSideBar] = useState(false)
  const [isIncompleteDataOpen,setIncopleteDataOpen] = useState(false)
  const [isChapterDetailOpen, setChapterDetailOpen] = useState(true)

  const navigate = useNavigate()

const duplicate = data.filter((data) => data.tag === 'Duplicate')
const sidebarHandler = () =>{
  setSideBar((state)=> state = !state)
}

const duplicateModalHandler = () =>{
    console.log("clicked")
    setDuplicateModal(true)
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

if(!user){
  navigate('/login')
}
 
},[user,isSuccess,navigate])

if (isLoading) {
  return <Spinner />
}
  return (
    <>
    <div className="text-xl p-1 lg:hidden">
      {isSideBarOpen? <FaTimes onClick={sidebarHandler}/>:<FaBars  onClick={sidebarHandler}/>}
      
      </div>




    <div className="relative overflow-hidden flex gap-x-2 mt-2 w-full min-h-[90vh]">
    <aside className={`${isSideBarOpen? 'translate-x-0':'-translate-x-[100%]'} w-[320px]  
        z-10 bg-blue-600 backdrop-blur-sm md:bg-blue-600 md:backdrop-blur-none md:shadow-md absolute rounded-md top-0 bottom-0 lg:static 
    lg:translate-x-0  transition-all flex flex-col border border-gray-200`}>
      <div className="text-center font-bold text-white mt-2">
        <p>Dashboard</p>
      </div>
        <DashboardNav />
      
      <div className="flex items-center gap-x-1 pl-4 ml-4 pb-2 text-white mb-2">
      <AiOutlineSetting /><Link to="/change_password"><p className="text-gray-200 text-sm underline font-extralight">Change Password</p></Link>
      </div>
    </aside>
    <section className="flex flex-col w-full min-h-[90vh] justify-between px-2 gap-y-2">
      <div className="flex flex-col sm:flex-row gap-y-2  gap-3">
      <div className="py-6 flex flex-col gap-y-3 [&>*]:pl-2 p-4  bg-white shadow-md rounded-md sm:w-2/3 w-full">
        <h4 className="text-3xl font-semibold text-blue-700">Hii,</h4>
        <h5 className="text-base font-normal text-gray-800 ml-8">Welcome back Mr/Mrs keyperson</h5>
      
    </div>
    <div className="w-full flex flex-col justify-center items-center bg-white shadow-md rounded-md min-h-[80px]">
      {/* <h4 className="self-start">Notification</h4> */}
      <p>You have {duplicate.length} duplicate entr{`${duplicate.length > 1? "ies" : "y"}`} <span onClick={duplicateModalHandler} className="cursor-pointer underline hover:text-blue-800">View</span></p>
      </div>
      {duplicateModal && <DuplicatePwh data={duplicate} setDuplicateModal={setDuplicateModal}/>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ">
        
        <div className="w-full flex flex-col items-center bg-white md:col-span-1 shadow-md rounded-md p-1">
          <p className="text-2xl md:text-3xl m-auto font-extrabold text-blue-900 tracking-wider p-2 uppercase drop-shadow-md">Total PwH</p>
          <p className="text-2xl md:text-4xl font-extrabold text-rose-500 drop-shadow-md p-3">{data.filter((data) => data.tag !== 'Deceased').length}</p>
          <small className="self-end mt-auto text-gray-400 pr-2 italic tracking-wide">*Deceased not included</small>
        </div>
          <FactorwiseCount />
       
        
      </div>
      <div className="flex flex-col md:flex-row w-full  gap-3">
        <div className="md:w-3/5 flex justify-center bg-white shadow-md rounded-md items-center">
      <DataChart />
        </div>
        <div className="md:w-2/5 bg-white shadow-md rounded-md">
          <div className="flex w-full justify-center items-center">
            <div onClick={incompleteDataHandler} className={`${isIncompleteDataOpen? "bg-blue-500 text-white":""} px-4 py-1 w-full rounded-sm cursor-pointer`}><p className="flex justify-center items-center gap-x-2">Incomplete Data {isIncompleteDataOpen? <FaSortUp/>:<FaSortDown/>}</p></div>
            <div onClick={chapterDetailHandler} className={`${isChapterDetailOpen? "bg-blue-500  text-white":""} px-8 py-1 w-full rounded-sm cursor-pointer`}><p className="flex justify-center items-center gap-x-2">Chapter Detail {isChapterDetailOpen? <FaSortUp/>:<FaSortDown/>}</p></div>
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