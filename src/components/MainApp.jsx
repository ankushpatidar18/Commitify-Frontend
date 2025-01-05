import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './Body';
import AppLayout from './AppLayout';
import Dashboard from './Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './Auth';
import Commitment from './Commitment';
import PrivateRoute from './PrivateRoute';
import Leaderboard from './Leaderboard';
import CommitmentList from './CommitmentList';
import Challenge from './Challenge';
import ChallengesList from './ChallengesList';

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
                path: "/commitment",
                element: (
                  <PrivateRoute>
                <Commitment />
                <CommitmentList/>
                </PrivateRoute>
                )
              },
              {
                path: "/leaderboard",
                element: (
                  <PrivateRoute>
                <Leaderboard />
                </PrivateRoute>
                )
              },
              {
                path: "/challenges",
                element: (
                  <PrivateRoute>
                <Challenge />
                <ChallengesList/>
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
