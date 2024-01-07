 

import React, { useEffect } from 'react';
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
 import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
 
import NotFound from './components/Layout/NotFound/NotFound';
 
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import User from './components/Admin/DashBoard/User';
 
import { useDispatch, useSelector } from 'react-redux';
 import toast,{Toaster} from "react-hot-toast"
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layout/Loader/Loader';
  

function App() {
  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault();
  // });

  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
           

            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user={user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Register />
                </ProtectedRoute>
              }
            />
           

          

            <Route path="*" element={<NotFound />} />

           
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <User />
                </ProtectedRoute>
              }
              />
              
               
          </Routes>

          <Footer />
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;

 