import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
// import '../search/search.css'
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
  setSearchData({
    full_name:'',
    factor_def:'',
  })
  setFilteredData('')

}
const onSubmit = (e) =>{
    e.preventDefault();
  
  const filterData = data.filter((data) => {
    return data.first_name?.toLowerCase().includes(first_name) || data.last_name?.toLowerCase().includes(last_name)})
            .filter((data)=> data.pwh_medical?.factor_def === factor_def)
    setFilteredData(filterData)
    setLoading(true)
}

useEffect(() =>{
console.log(filteredData)
  if(!data){
  dispatch(fetchData())
  }
},[data,dispatch,filteredData])
  return (
    <div className='h-[80vh] flex flex-col'>
      <div className="">
      <button className="bg-gray-600 text-white py-1 px-2 rounded mt-2" onClick={() => navigate(-1)}>Back</button>
      </div>
     <form className="bg-white w-full md:w-2/3 flex flex-col justify-center items-center p-8 m-auto gap-y-4" onSubmit={onSubmit}>
       <div className="flex flex-col gap-y-1">
         <label htmlFor="">Name</label>
       <input type="search" name="full_name" className="border py-1 outline-none" required value={full_name} onChange={onChange}/>
       </div>
       <div className="flex flex-col gap-y-1">

       <label htmlFor="">Factor</label>
       <input type="search" name="factor_def" className="border py-1 outline-none" required value={factor_def} onChange={onChange}/>
       </div>
       <div className="flex gap-x-4">
         <button type='submit' className="border py-1 px-3 bg-blue-600 rounded text-white">Search</button>
         <button type='reset' onClick={onClear} className="border py-1 px-3 ">Clear</button>

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
        <tr key={index}><td>{index + 1}</td>
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