import "./index.css";
import { Suspense, lazy } from "react";
import Signin from "./components/account/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyPwh from "./components/pwhData/MyPwh";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";

const DownLoadData = lazy(() => import("./components/pwhData/DownLoadData"));
const SearchDiv = lazy(() => import("./components/pwhData/search/SearchDiv"));
const AddNewPwh = lazy(() => import("./components/pwhData/AddNewPwh"));
const NotFound = lazy(() => import("./components/NotFound"));
const ChangePassword = lazy(() =>
  import("./components/account/ChangePassword")
);

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        <Suspense fallback={<Spinner />}>
          <div className="container mx-auto min-h-[100vh] flex flex-col overflow-hidden bg-gray-50 font-poppins">
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute user={user}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Signin />} />
              <Route
                path="/pwh-data"
                element={
                  <ProtectedRoute user={user}>
                    <MyPwh />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoute user={user}>
                    <AddNewPwh />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoute user={user}>
                    <AddNewPwh />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/change_password"
                element={
                  <ProtectedRoute user={user}>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute user={user}>
                    <SearchDiv />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/download-data"
                element={
                  <ProtectedRoute user={user}>
                    <DownLoadData />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
      <ToastContainer position="bottom-center"/>
    </>
  );
}

export default App;
