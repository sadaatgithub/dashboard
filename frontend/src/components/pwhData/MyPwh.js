import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  dataSlice,
  fetchData,
  reset,
  sortingBy,
} from "../../features/data/dataSlice";
// import { getPwhWithId , reset as resetUpdateData} from "../../features/data/addNewPwhSlice";
import {
  FaPlusCircle,
  FaSort,
  FaSortDown,
  FaSortUp,
  FaArrowLeft,
  FaSearch,
} from "react-icons/fa";
// import { useDownloadExcel  } from 'react-export-table-to-excel';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Spinner from "../Spinner";
import EachPwh from "./EachPwh";
// import Spinner from './Spinner';

const MyPwh = () => {
  const { data, isLoading, sortByName } = useSelector((state) => state.data);
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [viewMore, setViewMore] = useState(false);
  const [filterPwh, setfilteredPwh] = useState();

  // const [currentItem ,setcurrentItem] = useState(slicedData)
  // const currentItem = useMemo(() => data.filter(({name}) => name.toLowerCase().includes(search), [search, data])
  // const tableRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setIetmsPerPage] = useState(10);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItem = data?.filter((item) => {
      return Object.keys(item).some((key) => {
        // if(typeof item[key] === 'object'){

        // }
        if (typeof item[key] === "string") {
          return item[key].toString().toLowerCase().includes(search);
        }
      });
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  // const currentItem = data.filter((item) => {
  //   return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(search))}).slice(indexOfFirstItem, indexOfLastItem)

  // const currentItem = useMemo(() => data.filter(({first_name}) => first_name.toLowerCase().includes(search),[search, data]).slice(indexOfFirstItem, indexOfLastItem))

  // const currentItem = showData.slice(indexOfFirstItem, indexOfLastItem)

  const pages = [];
  for (let i = 1; i <= Math.ceil([...data].length / itemsPerPage); i++) {
    pages.push(i);
  }
  // let pageIncrBtn = null;
  // if (pages.length > maxPageNumberLimit) {
  //   pageIncrBtn = <li> &hellip;</li>;
  // }
  // let pageDecrBtn = null;
  // if (minPageNumberLimit >= 1) {
  //   pageDecrBtn = <li> &hellip; </li>;
  // }
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

  const sortData = () => {
    let nextSort;

    if (sortByName === "down") nextSort = "up";
    else if (sortByName === "up") nextSort = "default";
    else if (sortByName === "default") nextSort = "down";
    dispatch(sortingBy(nextSort));
    // console.log(sortByName)
  };

  const sortNameIcon =
    sortByName === "default" ? (
      <>
        <FaSort size={15} />
      </>
    ) : sortByName === "down" ? (
      <FaSortDown size={15} />
    ) : sortByName === "up" ? (
      <FaSortUp size={15} />
    ) : (
      ""
    );
  // console.log('sorted')

  const viewMoreHandler = (e) => {
    const id = e.target.value;
    const filteredPwh = data.filter((data) => data.id === Number(id));
    setfilteredPwh(filteredPwh);
    setViewMore(true);
  };
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  const howManyHandler = (e) => {
    setIetmsPerPage(e.target.value);
  };
  const handleClickPage = (e) => {
    setCurrentPage(Number(e.target.id));
  };
 
  useEffect(() => {
    if (data.length == 0) {
      dispatch(fetchData());
    }

    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return (
      <>
        <h1>No More data</h1>
        <Link to="/add" className="btn btn-primary">
          Add new Pwh
        </Link>
      </>
    );
  }
  return (
    <>
      <div className="flex gap-4 bg-white py-2">
        <button
          className="bg-gray-600 text-white py-2 px-3 rounded flex items-center gap-x-2 text-sm"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Back
        </button>
        <Link to="/add">
          <button className="bg-blue-600 text-white py-2 px-3 rounded flex items-center gap-x-2 text-sm">
            <FaPlusCircle />
            Add New PwH
          </button>
        </Link>
      </div>

      <div className="rounded  w-full flex bg-white relative">
        <div className="flex flex-col rounded shadow-xl gap-4 h-[80vh] overflow-y-scroll w-full md:w-2/3 border">
          <div className="">

            {/* search and entry div*/}
            <div className="flex justify-end gap-2 items-center bg-neutral-600 p-1 flex-wrap">
              <div className="flex  bg-white items-center px-2 [&>svg]:text-gray-500 rounded-sm">
                <FaSearch />
                <input
                  type="search"
                  onChange={searchHandler}
                  placeholder="Search by Name"
                  className="outline-none p-2 text-sm"
                />
              </div>
              <label htmlFor="">
                <small className="text-white mr-2 ">Entries to display</small>
                <select
                  name=""
                  id=""
                  className="p-1 rounded-sm"
                  onChange={howManyHandler}
                >
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </label>
            </div>
            {/* search and entry div*/}

            <div className="overflow-auto mb-12">
              <table
                className="w-full bg-white text-sm overflow-scroll z-[-1]"
                id="table-to-xls"
              >
                <thead className="bg-neutral-500 text-white ">
                  <tr className="[&>*]:p-2 [&>*]:font-thin">
                    <td>S.No.</td>
                    <td
                      onClick={sortData}
                      className="cursor-pointer flex justify-start items-center gap-3"
                    >
                      First Name {sortNameIcon}
                    </td>
                    <td>Father Name</td>
                    <td>Last Name</td>
                    <td>Factor</td>
                    <td>Assay</td>
                    <td>Details</td>
                  </tr>
                </thead>
                <tbody>
                  {currentItem.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="[&>*]:p-2 [&:nth-child(even)]:bg-gray-100 text-sm text-gray-600"
                      >
                        <>
                          <td>{item.SrNo}</td>
                          <td>{item.first_name}</td>
                          <td>{item.guardian_father_name}</td>
                          <td>{item.last_name}</td>
                          <td>{item.pwh_medical?.factor_def}</td>
                          <td>{item.pwh_medical?.factor_level}</td>

                          <td>
                            <button
                              className="text-blue-700 font-semibold hover:underline"
                              value={item.id}
                              onClick={viewMoreHandler}
                            >
                              View
                            </button>
                          </td>
                        </>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white flex gap-x-8 items-center border-t-[1px]  p-1 absolute bottom-0 left-0 w-full md:w-2/3">
            <p className="p-1 w-1/3">
              <small className="text-gray-700">
                Showing {indexOfFirstItem + 1} to{" "}
                {indexOfLastItem > data.length ? data.length : indexOfLastItem}{" "}
                of {data.length} entries
              </small>{" "}
            </p>

            <ul className="flex flex-grow justify-between items-center">
              <li>
                <button
                  onClick={handlePrevbtn}
                  disabled={currentPage == pages[0] ? true : false}
                  className={`${
                    currentPage == pages[0]
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white"
                  } border border-blue-500 p-1 px-2 rounded-sm`}
                >
                  Prev
                </button>
              </li>

              {pages.map((number) => {
                if (
                  number < maxPageNumberLimit + 1 &&
                  number > minPageNumberLimit
                ) {
                  return (
                    <li
                      key={number}
                      id={number}
                      onClick={handleClickPage}
                      className={`${
                        currentPage == number ? "bg-blue-600 text-white" : null
                      } px-3 py-1 cursor-pointer rounded-sm `}
                    >
                      {number}
                    </li>
                  );
                }
              })}
              <li>
                <button
                  onClick={handleNextbtn}
                  disabled={
                    currentPage === pages[pages.length - 1] ? true : false
                  }
                  className={`${
                    currentPage === pages[pages.length - 1]
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed "
                      : "bg-blue-600 text-white"
                  } border border-blue-500 p-1 px-2 rounded-sm `}
                >
                  Next
                </button>{" "}
              </li>
            </ul>
          </div>
        </div>



{/* view more div------------ */}
        {viewMore ? (
          <>
            <div
              className={`${
                viewMore ? "translate-x-0" : "translate-x-[500px]"
              } transform border absolute inset-0 h-full bg-white  transition-all md:w-1/3 flex flex-col md:static`}
            >
              <button
                onClick={() => {
                  setViewMore(false);
                }}
                className="ml-auto bg-gray-600 text-white px-2 rounded-sm"
              >
                X
              </button>

              {filterPwh?.map((data, index) => (
                <EachPwh key={index} data={data} setViewMore={setViewMore} />
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MyPwh;
