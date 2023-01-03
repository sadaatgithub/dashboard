import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import '../search/search.css'
import { fetchData } from "../../../features/data/dataSlice";
import { useNavigate,Link } from "react-router-dom";
import { FaTimes,FaUser } from "react-icons/fa";
import { searchClose } from "../../../features/searchdiv/searchSlice";

const SearchDiv = () => {
  const [searchData, setSearchData] = useState({
    full_name: "",
    factor_def: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.data);
  const { isSearchDivOpen } = useSelector((state) => state.searchDiv);

  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { full_name, factor_def } = searchData;
  const [first_name, last_name] = searchData.full_name?.split(" ");

  const onChange = (e) => {
    setSearchData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onClear = () => {
    setSearchData({
      full_name: "",
      factor_def: "",
    });
    setFilteredData("");
    setLoading(false)
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const filterData = data
      .filter((data) => {
        return (
          data.first_name?.toLowerCase().includes(first_name) ||
          data.last_name?.toLowerCase().includes(last_name)
        );
      })
      .filter((data) => data.pwh_medical?.factor_def === factor_def);
    setFilteredData(filterData);
    setLoading(true);
  };
  const searchHandler = () => {
    dispatch(searchClose());
    onClear();
  };

  useEffect(() => {
    if (!data) {
      dispatch(fetchData());
    }
  }, [data, dispatch, filteredData]);
  return (
    <>
      {isSearchDivOpen ? (
        <div className="z-40 flex flex-col items-center  absolute inset-0 bg-black/50">
          <div className="self-end mr-2">
            <button
              className="bg-gray-600 text-white py-2 px-2 rounded mt-2"
              onClick={searchHandler}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex bg-white w-full md:w-3/4 h-3/4 m-auto rounded-lg justify-center items-center p-2 gap-4">
            <form
              className="flex flex-col justify-center items-center p-8 m-auto gap-y-4 w-1/2 h-full"
              onSubmit={onSubmit}
            >
              <div className="flex flex-col gap-y-1">
                <label htmlFor="">Name</label>
                <input
                  type="search"
                  name="full_name"
                  className="border py-1 outline-none"
                  required
                  value={full_name}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="">Factor</label>
                <input
                  type="search"
                  name="factor_def"
                  className="border py-1 outline-none"
                  required
                  value={factor_def}
                  onChange={onChange}
                />
              </div>
              <div className="flex gap-x-4">
                <button
                  type="submit"
                  className="border py-1 px-3 bg-blue-600 rounded text-white"
                >
                  Search
                </button>
                <button
                  type="reset"
                  onClick={onClear}
                  className="border py-1 px-3 "
                >
                  Clear
                </button>
              </div>
            </form>
            <div className="search-result  w-1/2 h-full p-4">
              <div className="grid grid-cols-2 grid-flow-row gap-4 place-items-center">
                {loading ? (
                  <>
                    {filteredData?.length > 0 ? (
                      <>
                        {filteredData.map((data) => {
                          return (
                            <>
                            <Link to={"/edit/" + data.id}>
                              <div key={data.id} className="flex flex-col border shadow-md text-sm gap-y-2 p-2 w-full">
                              {data.pwh_images[0]?.image? (<><img src={`http://127.0.0.1:8000${data.pwh_images[0]?.image}`} alt="img" className="m-auto object-cover" /></>)
                              :(<> <FaUser size={100} className="m-auto"/></>)}

                                <h4>Name: {data.first_name + " " + data.last_name}</h4>
                                <p>Factor Deff: {data.pwh_medical.factor_def}</p>
                              </div>
                              </Link>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <h1>No Record Found</h1>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SearchDiv;
