import {useEffect,useState}from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import { useSelector} from 'react-redux';
import Spinner from './Spinner';
// import ChapterDetail from './ChapterDetail';
import DataChart from './charts/DataChart';
import DashboardNav from './dashboardComponent/DashboardNav';
import FactorwiseCount from './dashboardComponent/FactorwiseCount';
import { FaBars,FaTimes} from 'react-icons/fa';
// import IncompleteData from './pwhData/IncompleteData';
import DuplicatePwh from './pwhData/DuplicatePwh';
import {AiOutlineSetting} from "react-icons/ai"
import AgeBarchart from './charts/AgeBarchart';
import SearchDiv from './pwhData/search/SearchDiv';
// import PieChart from './charts/PieChart';

const Dashboard = () => {
  const {user} = useSelector((state)=>state.auth)
  const {data,isLoading,isSuccess} = useSelector((state)=>state.data)
  // const {userDetail} = useSelector((state) => state.fetchUser)
  const [duplicateModal,setDuplicateModal] = useState(false)

  const [isSideBarOpen,setSideBar] = useState(false)
  // const [isIncompleteDataOpen,setIncopleteDataOpen] = useState(false)
  // const [isChapterDetailOpen, setChapterDetailOpen] = useState(true)

  const navigate = useNavigate()

const duplicate = data.filter((data) => data.tag === 'Duplicate')
const sidebarHandler = () =>{
  setSideBar((state)=> state = !state)
}

const duplicateModalHandler = () =>{
    console.log("clicked")
    setDuplicateModal(true)
}
  // const incompleteDataHandler = () =>{
  
  //   setIncopleteDataOpen(!isIncompleteDataOpen)
  //   setChapterDetailOpen(false)

  // }
  // const chapterDetailHandler = () =>{
  //   setChapterDetailOpen(!isChapterDetailOpen)
  //   setIncopleteDataOpen(false)

  // }

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
    <div className="relative overflow-hidden flex gap-x-2 w-full min-h-[90vh]">

      <SearchDiv/>

    <div className="text-xl py-2 lg:hidden bg-white absolute left-1 top-0 w-full">
      {isSideBarOpen? null:<FaBars  onClick={sidebarHandler} className="ml-1 text-rose-500"/>}
      </div>


      {/* <---------------------Sidebar---------------------> */}

    <aside className={`${isSideBarOpen? 'translate-x-0':'-translate-x-[100%]'} w-[240px]  
        z-10 bg-gradient-to-b from-blue-600 to-blue-800  backdrop-blur-sm  md:backdrop-blur-none md:shadow-md absolute rounded-r-2xl top-0 bottom-0 lg:static lg:mt-1
    lg:translate-x-0  transition-all flex flex-col border border-gray-200 overflow-hidden`}>
      <div className="text-xl p-2 lg:hidden  flex text-white">
      {isSideBarOpen? <FaTimes onClick={sidebarHandler} className="self-end ml-auto"/>:<FaTimes className="self-end ml-auto"/>}
      
      </div>
        <DashboardNav />
      
      <div className="flex items-center gap-x-1  m-auto pb-2 text-white mb-2">

      <AiOutlineSetting /><Link to="/change_password" className="">
        <p className="text-gray-200 text-xs underline font-thin tracking-wide">Change Password</p></Link>
      </div>
    </aside>



    {/* main container------------------------------------------------------------> */}


    <section className="w-full grid grid-flow-row px-1 gap-y-2 min-h-[90vh] mt-8 lg:mt-1">

      <div className="flex flex-col sm:flex-row gap-y-2  gap-3 row-span-1">
      <div className="py-6 flex flex-col gap-y-2 [&>*]:pl-2 p-4  bg-white shadow-md rounded-md sm:w-2/3 w-full">
        <h4 className="text-base md:text-2xl font-semibold text-blue-700">Hello,</h4>
        <h5 className="text-base font-normal text-gray-800 md:ml-8">Welcome back Mr/Mrs keyperson</h5>
        {/* <small>{today.getDate()}/<span>{today.getMonth()}</span>/<span>{today.getFullYear()}</span></small> */}
      
    </div>
    <div className="w-full flex flex-col justify-center items-center bg-white shadow-md rounded-md min-h-[80px] text-gray-600">
      {/* <h4 className="self-start">Notification</h4> */}
      <p>You have {duplicate.length} duplicate entr{`${duplicate.length > 1? "ies" : "y"}`} <span onClick={duplicateModalHandler} className="cursor-pointer underline hover:text-blue-800">View</span></p>
      </div>
      {duplicateModal && <DuplicatePwh data={duplicate} setDuplicateModal={setDuplicateModal}/>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 row-span-1">
        
        <div className="w-full flex flex-col items-center bg-white md:col-span-1 shadow-md rounded-md p-1">
          <p className="text-xl md:text-2xl m-auto font-extrabold text-blue-900 tracking-wider p-2 uppercase ">Total PwH</p>
          <p className="text-2xl md:text-4xl font-extrabold text-rose-500  p-1">{data.filter((data) => data.tag !== 'Deceased').length}</p>
          <small className="self-end mt-auto text-gray-400 pr-2 italic tracking-wider text-xs font-thin">*Deceased not included</small>

        </div>
          <FactorwiseCount />
       
        
      </div>
      <div className="w-full  gap-3 row-span-4 grid md:grid-cols-5 grid-cols-1">
        <div className="w-full  flex col-span-3 justify-center bg-white shadow-md rounded-md items-center">
      <DataChart />
        </div>
        <div className="col-span-2 bg-white shadow-md rounded-md flex justify-center items-center">
        <AgeBarchart/>

          {/* <div className="hidden w-full justify-center items-center">
            <div onClick={incompleteDataHandler} className={`${isIncompleteDataOpen? "bg-blue-500 text-white":""} px-4 py-1 w-full rounded-sm cursor-pointer`}><p className="flex justify-center items-center gap-x-2">Incomplete Data {isIncompleteDataOpen? <FaSortUp/>:<FaSortDown/>}</p></div>
            <div onClick={chapterDetailHandler} className={`${isChapterDetailOpen? "bg-blue-500  text-white":""} px-8 py-1 w-full rounded-sm cursor-pointer`}><p className="flex justify-center items-center gap-x-2">Chapter Detail {isChapterDetailOpen? <FaSortUp/>:<FaSortDown/>}</p></div>
        </div> */}
          {/* {isIncompleteDataOpen && <IncompleteData />}
          {isChapterDetailOpen && <ChapterDetail /> } */}
        </div>
      </div>
    </section>
    </div>
    </>
  )
}

export default Dashboard