// Submit new invoice
function addNew(data, dataC) {
  // Calculate total price
  let total = 0;
  for(let i = 0; i < data.itemsList.length; i++) {
      total += data.itemsList[i].total;
  }
  data.totalPrice = total;
  
  
  // add data to localStorage with key of "invoices"
  if(localStorage.getItem("invoices")) {
      // Found
      let oldData = JSON.parse(localStorage.getItem("invoices"));
      data.id = Math.floor(Math.random() * 1000000);
      oldData.push(data);
      localStorage.setItem("invoices", JSON.stringify(oldData));
  }else {
      //  Not Found
      data.id = Math.floor(Math.random() * 1000000);
      localStorage.setItem("invoices", JSON.stringify([data]));
  }
  
  
  // update page conent after adding new invoice
  dataC.dispatch({type: "add"});

  // Close and clear form after submit by clicking discard button
  document.getElementById("discard").click();
} 


// Edit old invoice
function Edit(id, data, dataC) {
  // Calculate total price
  let total = 0;
  for(let i = 0; i < data.itemsList.length; i++) {
      total += data.itemsList[i].total;
  }
  data.totalPrice = total;  

  // Edit this invoice with specific ID
  if(localStorage.getItem("invoices")) {
    // Found
    let oldData = JSON.parse(localStorage.getItem("invoices")).map(obj => {
      if(obj.id.toString() === id.toString()) {
        return data;
      }
      return obj;
    });
    localStorage.setItem("invoices", JSON.stringify(oldData));
  }else {
      //  Not Found
      localStorage.setItem("invoices", JSON.stringify([data]));
  }

  // update page conent after adding new invoice
  dataC.dispatch({type: "edit"});

  // Close the form
  document.getElementById("cancel").click();
}

// delete invoice
function delet(id) {
  let oldData = JSON.parse(localStorage.getItem("invoices"));
  let newData = oldData.filter(obj => obj.id.toString() !== id.toString());
  localStorage.setItem("invoices", JSON.stringify(newData));

  // Redirect to home page
  window.location.pathname = "/";
}


export {addNew, Edit, delet};