import React,{useState,useEffect, useRef, useMemo}from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import { fetchData, reset, sortingBy } from '../../features/data/dataSlice';
// import { getPwhWithId , reset as resetUpdateData} from "../../features/data/addNewPwhSlice";
import { FaAngleUp, FaAngleDown ,FaArrowDown, FaSortAlphaDown, FaSortAlphaUp, FaSort,FaSortDown,FaSortUp} from 'react-icons/fa';
// import { useDownloadExcel  } from 'react-export-table-to-excel';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Spinner from '../Spinner';
import EachPwh from './EachPwh';
import { fetchUser } from '../../features/user/userSlice';
// import Spinner from './Spinner';

const MyPwh = () => {
  const {data,isLoading,isSuccess,sortByName,sortByNammeDsc} = useSelector((state)=>state.data)
  const {user} = useSelector((state) => state.auth)
  const [search, setSearch] =  useState('')
  const [visible,setVisible] = useState(false)
  const [filterData ,setfilteredData] = useState()

  // const [currentItem ,setcurrentItem] = useState(slicedData)
  // const currentItem = useMemo(() => data.filter(({name}) => name.toLowerCase().includes(search), [search, data])
  const tableRef = useRef(null);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setIetmsPerPage] = useState(10)

  const [pageNumberLimit, setPageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0)
  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItem = useMemo(() => data.filter((item) => {
    return Object.keys(item).
    some(key =>{
      if(typeof item[key] === 'object'){
      // console.log('oc');
      // return Object.keys(item.key).some(val =>item.key[val].toString().toLowerCase().includes(search))
      }
      if (typeof item[key] === 'string'){
        return item[key].toString().toLowerCase().includes(search)
      }
    })}).slice(indexOfFirstItem, indexOfLastItem))



  // const currentItem = useMemo(() => data.filter((item) => {
  //   return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(search))}).slice(indexOfFirstItem, indexOfLastItem))
 
 
 
  // const currentItem = useMemo(() => data.filter(({first_name}) => first_name.toLowerCase().includes(search),[search, data]).slice(indexOfFirstItem, indexOfLastItem))

  // const currentItem = showData.slice(indexOfFirstItem, indexOfLastItem)

  const pages = [];
  for (let i=1; i<= Math.ceil(data.length / itemsPerPage); i++){
    pages.push(i);
  }
 let pageIncrBtn = null;
 if(pages.length > maxPageNumberLimit){
   pageIncrBtn = <li> &hellip;</li>
 }
 let pageDecrBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrBtn = <li> &hellip; </li>;
  }
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };


// const renderPagenumber = pages.map((number) =>{
//   if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
//     return (
//         <li key={number}
//         id={number}
//         className={currentPage == number ? "active" : null}
//       >
//         {number}</li>
//     );
//   } else{return null;}
// })
// const onChange = (e) =>{
//   setIetmsPerPage(e.target.value)

// }

const sortData = () =>{
  let nextSort;
  
 if(sortByName === 'down') nextSort = "up"
 else if (sortByName === "up") nextSort = "default"
 else if (sortByName === "default") nextSort = "down"
    dispatch(sortingBy(nextSort))
    // console.log(sortByName)


  }
const sortNameIcon = sortByName === "default"? <><FaSort  size={15}/></>
                    : sortByName === "down"? <FaSortDown size={15}/> 
                    : sortByName === "up"? <FaSortUp size={15}/> :''
  // console.log('sorted')

const viewMore = ((e) =>{
    const id = e.target.value;
    const filteredData = data.filter((data) => data.id == id)
    setfilteredData(filteredData)
    setVisible(true)
})
const onChange = (e) =>{
    setSearch(e.target.value)
}
const howMany = (e) =>{
  setIetmsPerPage(e.target.value)
}
const handleClick = (e) =>{
    setCurrentPage(Number(e.target.id))
}

  useEffect(() =>{
    if(data.length == 0){
      dispatch(fetchData())
    }

    if(!user){
      navigate('/login')
    }
<<<<<<< HEAD
    
=======
    // if(isSuccess){
    
    //   console.log(currentItem);

    // }
>>>>>>> myworkspace1
  },[user])

  if(isLoading){
    return <Spinner />
  }

if(!data){
  return (<><h1>No More data</h1> 
  <Link to="/add" className='btn btn-primary'>Add new Pwh</Link></>
  )
}
  return (
    <>
    <div className="close-div">
      <button className='search-close'  onClick={() => navigate(-1)}>Back</button>
      </div>
   <div className="action-div">
   
   </div>
    <div className="container-pwh">
  
    <div className="table-container">
    <div className="">
    <div className="flex table-search-div">
  
  <input type="text" onChange={onChange} placeholder="Search"/>

  <label htmlFor=""> <small>Entries to display </small>
  <select name="" id="" className="search-by-entries" onChange={howMany}> 
    <option value="10">10</option>
    <option value="50">50</option>
    <option value="100">100</option>
  </select></label>
  </div>
   
    <table className='table-pwh' id="table-to-xls">
      <thead>
        <tr>
          <td>S No</td>
          <td onClick={sortData} style={{cursor:'pointer'}}>First Name {sortNameIcon}</td>
          <td>Father Name</td>
          <td>Last Name</td>
          <td>Factor</td>
          <td>Assay</td>
          <td>Details</td>
        </tr>
      </thead>
      <tbody>
      {currentItem.map((item,index)=>{
        return(
        <tr key={index}>
        <>
          <td>{index + 1}</td>
          <td key="index">{item.first_name}</td>
          <td>{item.guardian_father_name}</td>
          <td>{item.last_name}</td>
          <td>{item.pwh_medical?.factor_def}</td>
          <td>{item.pwh_medical?.factor_level}</td>
          
      <td><button className='btn-more' value={item.id} onClick={viewMore}>View</button></td>
      
      </>
        </tr>
      )
    })}
    </tbody>
    </table>
    </div>
    <ul className='pagination-no-row'>
      <li><p><small>Showing 1 to 10 of {data.length} entries</small> </p></li>
      <li><button onClick={handlePrevbtn} disabled={currentPage == pages[0]? true:false}>Prev</button></li>
      {pageDecrBtn}
      
    {pages.map((number) =>{
      if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
        return(
          <li key={number} id={number} 
          onClick={handleClick}
          className= {currentPage == number ? "active" : null}>{number}</li>
          )
        }
      })}
      {pageIncrBtn}
      <li><button onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</button> </li>
      </ul>
</div>

      {visible? (<><div className="view-more">
        <button onClick={() =>{
          setVisible(false)
        }} >X</button>
      
    {filterData?.map((data, index) =><EachPwh key={index} data={data}/>)}
    </div></>) : ''}
</div>
{/* </>)} */}
      </>
  )
}

export default MyPwh