import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './Body';
import AppLayout from './AppLayout';
import Dashboard from './Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './Auth';
import CreateCommitment from './CreateCommitment';
import PrivateRoute from './PrivateRoute';

const MainApp = () => {
    const appRouter = createBrowserRouter([
      {
          path: '/',
          element: <AppLayout />,
          children: [
              {
                  path: "/",
                  element: <Body />
              },
              {
                  path: "/auth",
                  element: <Auth />
              },
              {
                path: "/dashboard",
                element: (
                  <PrivateRoute>
                <Dashboard />
                </PrivateRoute>
                )
              },
              {
                path: "/createcommitment",
                element: (
                  <PrivateRoute>
                <CreateCommitment />
                </PrivateRoute>
                )
              }
              
          ]
      }
  ]);
    return (
      <div className='#F2EFEF'>
    <RouterProvider router={appRouter} />
    <ToastContainer />
      </div>
    )
  }
  
  export default MainApp
