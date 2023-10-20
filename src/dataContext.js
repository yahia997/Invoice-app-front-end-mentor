import { createContext } from "react";

// Get data from local storage
function getFromStorage() {
  let d = [];
  if(localStorage.getItem("invoices")) {
    d = JSON.parse(localStorage.getItem("invoices"));
  }
  return d;
}

// Data Context
const dataContext = createContext(getFromStorage());

// Form Context(the value of data of the form)
const formData = createContext(null);
const formUpdater = createContext(null);

export {getFromStorage, dataContext, formData, formUpdater};