import "./styles/invoice.css";
import { useParams } from "react-router-dom";
import { dataContext } from "./dataContext";
import { useContext, useState, useEffect, useRef } from "react";
import { delet } from "./submitFuncs";

// Confirm deletion component of the invoice
function Confirm({id, setConfirm}) {
    const elem = useRef(null);
    useEffect(() => {
        elem.current.scrollIntoView();
    }, []);

    return (
    <>
    <span className="bg-full"></span>
        <section className="deletion-confirm" ref={elem}>
            <h3>Confirm Deletion</h3>
            <p className="text-gray">Are you sure you want to delete invoice #{id}? This action cannot be undone.</p>
            <div>
                <button 
                    onClick={()=> setConfirm(false)}
                    className="normal-btn"
                >Cancel</button>
                <button 
                    className="red-btn"
                    onClick={() => delet(id)}
                >Delete</button>
            </div>
        </section>
    </>
    )
}

function Info({data}) {
    const {
        id,
        billFrom,
        billTo,
        itemsList,
        date,
        paymentTerms,
        description,
        totalPrice
        } = data;
    const paymentDay = parseInt(paymentTerms.replace(/[a-z]/gi, ""));

    // Bill From
    const {address} = billFrom;

    // Bill From
    const {name, address:address2, email} = billTo;

    // Pamyent Due foramt
    const d = new Date(date);
    d.setDate(d.getDate() + paymentDay);
    const paymentDue = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

    // List of items
    const List = itemsList.map((obj, index) => (
        <div key={index} className="price-info">
            <p>{obj.name}</p>
            <p>{obj.qty}</p>
            <p>{obj.price}</p>
            <p>{obj.total}</p>
        </div>
    )); 


    return (
        <section className="invoice-content">
            <div>
                <div className="fact">
                    <strong>{id}</strong>
                    <p className="text-gray">{description}</p>
                </div>
                <div>
                    <p className="text-gray">{address}</p>
                </div>
            </div>
            <div>
                <div>
                    <div className="fact">
                        <p className="text-gray">Invoice Date</p>
                        <strong>{date}</strong>
                    </div>
                    <div className="fact">
                        <p className="text-gray">Payment Due</p>
                        <strong>{paymentDue}</strong>
                    </div>
                </div>
                <div className="fact">
                    <p className="text-gray">Bill To</p>
                    <strong>{name}</strong>
                    <p className="text-gray">{address2}</p>
                </div>
                <div className="fact span-2">
                    <p className="text-gray">Sent To</p>
                    <strong>{email}</strong>
                </div>
            </div>
            <div className="invoice-footer">
                <div>
                    <div className="price-info">
                        <p className="text-gray">Item Name</p>
                        <p className="text-gray">QTY.</p>
                        <p className="text-gray">Price</p>
                        <p className="text-gray">Total</p>
                    </div>
                    {List}
                </div>
                <div>
                    <p>Amount Due</p>
                    <p>£{totalPrice}</p>
                </div>
            </div>
        </section>
    );
}

export default function Invoice({setOpenForm, setOld}) {
    const [confirm, setConfirm] = useState(false);
    const dataReducer = useContext(dataContext);
    const {id} = useParams();

    // Get data from storage
    const [data] = dataReducer.data.filter(obj => obj.id.toString() === id.toString());

    // update function
    function update() {
        setOld(data);
        setOpenForm(true);
    }

    // mark as paid
    function markAsPaid(id) {
        dataReducer.dispatch({
            type: "mark-as-paid",
            id: id
        });
    }
    
    if(data) {
        // If the data was found
        return (
            <div>
            {confirm && <Confirm id={id} setConfirm={setConfirm}/>}
            <button 
                onClick={() => window.history.go(-1)} 
                className="go-back"
                >Go back</button>
            <div className="options">
                <div className="span-2">
                    <p>Status</p>
                    <p className={`status-${data.status}`}>{data.status}</p>
                </div>
                <span className="hide-mobile"></span>
                <div>
                    <button 
                        onClick={update}
                        className="normal-btn"
                        >Edit</button>
                    <button 
                        onClick={() => setConfirm(true)}
                        className="red-btn"
                        >Delete</button>
                    <button
                        className="main-btn"
                        onClick={() => markAsPaid(id)}
                        disabled={data.status === "paid"}
                        >Mark As Paid</button>
                </div>
            </div>
            {/* Content */}
            <Info data={data}/>
        </div>
    );
    }else {
        // If the data not found go to home page
        window.location.pathname = "/";
    }
}