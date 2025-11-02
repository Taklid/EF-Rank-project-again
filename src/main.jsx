
import { createRoot } from 'react-dom/client'
import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import "./index.css";
import React from 'react';
import { router } from './Routes/Router.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Provider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <HelmetProvider>
      <React.StrictMode>
        <div className='max-w-[1200px] mx-auto'>
          <RouterProvider router={router} />
        </div>
      </React.StrictMode>
    </HelmetProvider>
  </AuthProvider>
)
