import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import '../search/search.css'
import { fetchData } from '../../../features/data/dataSlice'
import { useNavigate } from 'react-router-dom'


const SearchDiv = () => {
const [searchData,setSearchData] = useState({
  full_name:'',
  factor_def:'',
})
const dispatch = useDispatch()
const navigate = useNavigate()
const {data} = useSelector((state) => state.data)

const [filteredData, setFilteredData] = useState(null)
const [loading, setLoading] =useState(false)
const {full_name,factor_def} = searchData
const [first_name, last_name] = searchData.full_name?.split(' ')

const onChange = (e) =>{
  setSearchData((prevState) =>({
    ...prevState,
    [e.target.name]: e.target.value,
  }))
}
const onClear = () =>{
  setSearchData({full_name:'',
  factor_def:'',})
}
const onSubmit = (e) =>{
    e.preventDefault();
  const filterData = data.filter((data) =>{
    return data.first_name.toLowerCase().includes(first_name) || data.last_name.toLowerCase().includes(last_name)})
    .filter((data)=>data.pwh_medical.factor_def === factor_def)
  setFilteredData(filterData)
setLoading(true)
}

useEffect(() =>{
  if(!data){
  dispatch(fetchData())
  }
},[data,dispatch])
  return (
    <div className='search-container'>
      <div className="close-div">
      <button className='search-close'  onClick={() => navigate(-1)}>Back</button>
      </div>
     <form className="search-div" onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="">Name</label>
       <input type="text" name="full_name" required value={full_name} onChange={onChange}/>
       </div>
       <div className="form-group">

       <label htmlFor="">Factor
       <input type="text" name="factor_def" required value={factor_def} onChange={onChange}/></label>
       </div>
       <div className="form-group">
         <button type='submit'>Search</button>
       </div>
       <div className="form-group">
         <div type='' onClick={onClear}>Clear</div>
       </div>

     </form>
     <div className="search-result">
       <div  className="flex">
        {loading? (<>
          {filteredData?.length > 0? (<>
          <table>
            <thead>
              <tr>
                <td>S.No</td>
                <td>Full Name</td>
                <td>Father Name</td>
                <td>Factor def</td>
                </tr>
            </thead>
            <tbody>
      {filteredData?.map((data,index) =>{
        return (
        <tr key={index}><td></td>
              <td>{data.first_name + data.last_name}</td>
              <td>{data.guardian_father_name}</td>
              <td>{data.pwh_medical.factor_def}</td>
              </tr>
)})}
      </tbody>
          </table>
          </>):(<><h1>No Record Found</h1></>)}</>):(<></>)}
         
     </div>

    
     </div>
      
      </div>
  )
}

export default SearchDiv