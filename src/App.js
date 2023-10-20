import { useState, useEffect, useReducer } from "react";
import { darkContext } from "./darkContext";
import { dataContext, getFromStorage } from "./dataContext";
import { dataReducer } from "./dataReducer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// global css Files
import "./styles/global.css";
import "./styles/dark-mode.css";

// import components
import Nav from "./nav";
import Statusbar from "./status-bar";
import AddForm from "./addForm";
import InvoicesList from "./items";
import Invoice from "./invoice";
import NotFound from "./not-found";

// Get saved color theme
const darkStorage = JSON.parse(localStorage.getItem("mode")) || false;
if(!darkStorage) {
  localStorage.setItem("mode", false);
}

function App() {
  // light and dark mood
  const [darkM, setDarkM] = useState(darkStorage);
  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("mode"));
    if(saved) {
      document.body.classList.add("dark-body");
    }else {
      document.body.classList.remove("dark-body");
    }
  }, [darkM]);

  // Data Reducer
  const [data, dispatch] = useReducer(dataReducer ,getFromStorage());
  const [old, setOld] = useState(null);

  // open add Form
  const [openForm, setOpenForm] = useState(false);

  return (
    <Router>
    <darkContext.Provider value={darkM}>

      <dataContext.Provider value={{data: data, dispatch: dispatch}}>
      <Nav setMood={setDarkM}/>
      {/* On edit old invoice */}
      {
        old &&
        <AddForm
          open={openForm}
          setOpenForm={setOpenForm}
          oldData={old}
        />
      }
      {/* when adding new invoice */}
      {
        window.location.pathname === "/" &&
        <AddForm
          open={openForm}
          setOpenForm={setOpenForm}
        />
      }
      <main>
        <div>
        <Routes>
        {/* Only show Control Bar and Invoices List on home page */}
        <Route path="/" exact element={
          <>
            <Statusbar
              openForm={openForm}
              setOpenForm={setOpenForm}
              />
            <InvoicesList />
          </>
        }/>
        {/* Page For single invoice based on id */}
        <Route path="/invoice/:id" 
          element={
          <Invoice 
            setOpenForm={setOpenForm} 
            setOld={setOld} 
          />
          }
          />
        {/* Not Found Page */}
        <Route path="*" element={<NotFound/>}/>
        </Routes>
        </div>
      </main>
      </dataContext.Provider>
      </darkContext.Provider>
    </Router>
  );
}

export default App;
