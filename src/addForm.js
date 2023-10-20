import { useRef, useState, Fragment, useContext, useEffect } from "react";
import { valid, emailValid } from "./formValidation";
import { dataContext, formData, formUpdater } from "./dataContext";
import { addNew, Edit } from "./submitFuncs";

import "./styles/addForm.css";

// Bill To section
function BillTo() {
  const data = useContext(formData);
  const set = useContext(formUpdater);
    
    // handle Change BillFrom Section
    function handleChange(e) {
        set({
            ...data,
            billFrom: {
                ...data.billFrom,
                [e.target.name]: e.target.value 
            }
        });
    }

    return (
    <>
    <section className="bill-to">
        <strong>Bill From</strong>
        <div className="full">
            <label htmlFor="bill-to-address">Street Address</label>
            <input
                type="address"
                name="address"
                id="bill-to-address"
                value={data.billFrom.address}
                onChange={handleChange}  
                autoComplete="on"
            />
        </div>
        <div>
            <label
                htmlFor="bill-to-city">City</label>
            <input
                name="city"
                id="bill-to-city"
                type="text"
                value={data.billFrom.city}
                onChange={handleChange}  
                autoComplete="on"
            />
        </div>
        <div>
            <label htmlFor="bill-to-post-code">Post Code</label>
            <input
                name="postCode"
                id="bill-to-post-code"
                type="number"
                value={data.billFrom.postCode}
                onChange={handleChange} 
                autoComplete="on"
                min="0"
            />
        </div>
        <div>
            <label htmlFor="bill-to-country">Country</label>
            <input
                name="country"
                id="bill-to-country"
                type="text"
                value={data.billFrom.country}        
                onChange={handleChange} 
                autoComplete="on"       
            />
        </div>
    </section>
    </>
    );
}

// Payment Terms List
function PaymentTerms() {
  const data = useContext(formData);
  const set = useContext(formUpdater);

    const arrow = useRef(null);
    const list = useRef(null);

    function handleOpen() {
        arrow.current.classList.toggle("arrow-up");
        list.current.classList.toggle("d-none");
    }
    // Change input value onclick on list
    function add(e) {
        set({
            ...data,
            paymentTerms: e.target.textContent
        });     
        let input = document.getElementById("payment-terms");
        input.value = e.target.textContent;
    }

    return (
        <div className="full payment-terms">
            <label htmlFor="payment-terms">Payment Terms</label>
            <input
                type="text"
                id="payment-terms"
                readOnly
                onClick={handleOpen}
                value={data.paymentTerms}
                autoComplete="on"
            />
            {/* Arrow up and down */}
            <span
                className="arrow"
                ref={arrow}
                onClick={handleOpen}
            ></span>
            {/* List */}
            <ul className="d-none" ref={list}>
                <li onClick={e => add(e)}>Next 1 Day</li>
                <li onClick={e => add(e)}>Next 7 Days</li>
                <li onClick={e => add(e)}>Next 14 Days</li>
                <li onClick={e => add(e)}>Next 30 Days</li>
            </ul>
        </div>
    );
}
// Bill From section
function BillFrom() {
  const data = useContext(formData);
  const set = useContext(formUpdater);
    
    // handle Change BillTo Section
    function handleChange(e) {
        set({
            ...data,
            billTo: {
                ...data.billTo,
                [e.target.name]: e.target.value 
            }
        });
    }

    // handle change invoice date and description
    function handleChangeDateD(e) {
        set({
            ...data,
            [e.target.name]: e.target.value
        });        
    }
    
    return (
    <>
        <section className="bill-from">
            <strong>Bill To</strong>
            <div className="full">
                <label htmlFor="client-name">Client’s Name</label>
                <input
                    type="text"
                    name="name"
                    id="client-name"
                    value={data.billTo.name}
                    onChange={handleChange}  
                    autoComplete="on"
                />
            </div>
            <div className="full">
                <label htmlFor="client-email">Client’s Email</label>
                <input
                    type="email"
                    name="email"
                    value={data.billTo.email}
                    onChange={handleChange}
                    id="client-email"
                    onInput={emailValid}
                    autoComplete="on"
                    placeholder="e.g. email@example.com"
                />
            </div>
            <div className="full">
                <label htmlFor="client-address">Street Address</label>
                <input
                    type="address"
                    name="address"
                    onChange={handleChange}
                    value={data.billTo.address}
                    id="client-address"
                    autoComplete="on"
                />
            </div>
            <div>
                <label
                    htmlFor="bill-from-city">City</label>
                <input
                    name="city"
                    id="bill-from-city"
                    type="text"
                    onChange={handleChange}
                    value={data.billTo.city}
                    autoComplete="on"
                />
            </div>
            <div>
                <label htmlFor="bill-from-post-code">Post Code</label>
                <input
                    name="postCode"
                    id="bill-from-post-code"
                    type="number"
                    onChange={handleChange}
                    value={data.billTo.postCode}
                    autoComplete="on"
                    min="0"
                />
            </div>
            <div>
                <label htmlFor="bill-from-country">Country</label>
                <input
                    name="country"
                    id="bill-from-country"
                    type="text"
                    onChange={handleChange}
                    value={data.billTo.country}
                    autoComplete="on"
                />
            </div>
            <div className="full">
                <label htmlFor="date">Invoice Date</label>
                <input
                    name="date"
                    id="date"
                    type="date"
                    value={data.date}
                    onChange={handleChangeDateD}
                    autoComplete="on"
                />
                </div>
            <PaymentTerms/>
            <div className="full">
                <label htmlFor="description">Project Description</label>
                <input
                    name="description"
                    id="description"
                    type="text"
                    onChange={handleChangeDateD}
                    value={data.description}
                    placeholder="e.g. Graphic Design Service"
                    autoComplete="on"
                />
            </div>
            </section>
        </>
    )
}

// List Items ------------------
// Item component
function Item({index}) {
  const data = useContext(formData);
  const set = useContext(formUpdater);

    // construct Single Item data
    const {name, qty, price, total} = data.itemsList[index];

    function handleChange(e) {
        // take copy from array and edit with specific index
        const listCopy = data.itemsList;
        listCopy[index][e.target.name] = e.target.value;
        listCopy[index].total = listCopy[index].qty * listCopy[index].price;

        set({
            ...data,
            itemsList: listCopy
        });
    }

    // delete this item
    function del() {
        const listCopy = data.itemsList;
        set({
            ...data,
            itemsList: [...listCopy.slice(0, index), ...listCopy.slice(index+1)]
        });
    }

    return (
        <div className="item">
            <input 
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                autoComplete="on"
            />
            <input 
                type="number"
                name="qty"
                value={qty}
                onChange={handleChange}
                autoComplete="on"
                min="0"
            />
            <input 
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
                autoComplete="on"
                min="0"
            />
            <input 
                type="number"
                name="total"
                value={total}
                readOnly
            />
            <button 
                className="del" 
                aria-label="delete"
                onClick={del}
                type="button"
            ></button>
        </div>
    );
}

// List of Items
function ListItems() {
  const data = useContext(formData);
  const set = useContext(formUpdater);

    function addItem() {
        set({
            ...data,
            itemsList: [
                ...data.itemsList,
                {
                    name: "",
                    qty: 0.0,
                    price: 0.0,
                    total: 0.0
                }
            ]
        });
    }

    const loopItems = data.itemsList.map((_, i) =>
        <Fragment key={`item-${i}`}>
            <Item index={i}/>
        </Fragment>
    );

    return (
        <section className="list-items">
            <h3>Item List</h3>
            <div className="info">
                <p>Item Name</p>
                <p>Qty.</p>
                <p>Price</p>
                <p>Total</p>
            </div>
            {/* Items goes here */}
            {loopItems}
            {/* --------------- */}
            <button type="button" onClick={addItem}>+ Add New Item</button>
        </section>
    );
}

// Default form data
const defaultData = {
    id: 0,
    billFrom: {
        address: "",
        city: "",
        postCode: "",
        country: ""
    },
    billTo: {
        name: "",
        email: "",
        address: "",
        city: "",
        postCode: "",
        country: ""
    },
    date: "",
    paymentTerms: "",
    description: "",
    itemsList: [],
    status: "",
    totalPrice: 0
};

// Buttons
function Options({setOpenForm}) {
  const data = useContext(formData);
  const set = useContext(formUpdater);

    // Discard => close form and clear data
    function discard() {
      setOpenForm(false);
      set(defaultData);
    }

    function draft() {
        set({
            ...data,
            status: "draft"
        });
    }
    function pending() {
        set({
            ...data,
            status: "pending"
        });
    }

    return (
        <section className="buttons">
            {/* Close the Form */}
            <button 
              type="button" 
              onClick={discard} 
              id="discard"
              className="normal-btn"
            >Discard</button>
            <span></span>
            <button 
                type="submit" 
                onClick={draft}
                className="dark-btn"
                disabled={!/\w+@{1}[a-z]+\.[a-z]+/gi.test(data.billTo.email) || !valid()}
            >Save as Draft</button>
            <button 
                type="submit" 
                onClick={pending} 
                className="main-btn"
                disabled={!/\w+@{1}[a-z]+\.[a-z]+/gi.test(data.billTo.email) || !valid()}
            >Save & Send</button>
        </section>
    )
}

function EditOptions({setOpenForm, old}) {
  const data = useContext(formData);
  const set = useContext(formUpdater);

  function cancel() {
    setOpenForm(false);
    set(old);
  }

    return (
        <section className="edit-options">
            <div>
                <button 
                    type="button"
                    id="cancel"
                    className="normal-btn"
                    onClick={cancel}
                    >Cancel</button>
                <button 
                    className="main-btn"
                    disabled={!/\w+@{1}[a-z]+\.[a-z]+/gi.test(data.billTo.email) || !valid()}
                    >Save</button>
            </div>
        </section>
    )
}

export default function AddForm({ open, setOpenForm, oldData}) {
    const dataC = useContext(dataContext);

    // disenable window scroll if the form open
    useEffect(() => {
        if(open) {
            window.scrollTo(0, 0);
            document.body.style.overflowY = "hidden";
        }else {
            document.body.style.overflowY = "auto";
        }
    }, [open]);

    // All form data
    const [data, setData] = useState(oldData || defaultData);

    function handleSubmit(e) {
        e.preventDefault();

        // If all inputs is not empty and email is valid
        if(oldData && valid()) {
            // Edit old invoice
            Edit(data.id, data, dataC);
            setData(data);
        }else if(valid()) {
            // add new Invoice
            addNew(data, dataC);
        }
    }

    if (open) {
        return (
        <formData.Provider value={data}>
          <formUpdater.Provider value={setData}>
            <form onSubmit={handleSubmit}>
                <BillTo/>
                <BillFrom/>
                <ListItems/>
                {
                  oldData ? 
                  <EditOptions 
                      setOpenForm={setOpenForm}
                      old={oldData}
                  />
                  :
                  <Options 
                      setOpenForm={setOpenForm}
                  />
                }
            </form>
            <span className="bg"></span>
          </formUpdater.Provider>
        </formData.Provider>
        )
    } else {
        return null;
    }
}