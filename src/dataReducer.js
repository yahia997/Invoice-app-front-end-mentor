import { getFromStorage } from "./dataContext";

export function dataReducer(data, action) {
  switch(action.type) {
    case "all":
      return getFromStorage();

    // for filtering --------------------------------
    case "draft":
      return getFromStorage().filter(obj => obj.status === "draft");

    case "pending":
      return getFromStorage().filter(obj => obj.status === "pending");

    case "paid":
      return getFromStorage().filter(obj => obj.status === "paid");
    // ---------------------------------------------- 

    case "add":
    case "edit":
      return getFromStorage();

    case "mark-as-paid":
      let newObj = getFromStorage().map(obj => {
        if(obj.id.toString() === action.id.toString()) {
          obj.status = "paid";
        }
        return obj;
      });
      localStorage.setItem("invoices", JSON.stringify(newObj));
      return getFromStorage();

    default:
      return [];
  }
}