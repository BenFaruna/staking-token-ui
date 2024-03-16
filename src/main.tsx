import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <ToastContainer theme="dark" />
      <App />
    </Theme>
  </React.StrictMode>,
)
