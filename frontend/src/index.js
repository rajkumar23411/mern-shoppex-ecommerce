import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from './redux/store';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <Provider store={store}>
     <SnackbarProvider
         dense  
         autoHideDuration={1000}
         maxSnack={2}
         anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
      <App />
     </SnackbarProvider>
   </Provider>
);
