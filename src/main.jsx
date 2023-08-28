import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import  
  Root, 
  { 
    loader as rootLoader,
    action as rootAction, 
} from "./routes/root";
import ErrorPage from "./error-page";
import 
  Creator, 
  { loader as creatorLoader }  
from "./routes/creator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "creators/:creatorId",
        element: <Creator />,
        loader: creatorLoader
      },
    ],
  },
  {
    path: "creators/:creatorId",
    element: <Creator />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
