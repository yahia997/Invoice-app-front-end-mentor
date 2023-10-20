import { useContext } from "react";
import { dataContext } from "./dataContext";
import "./styles/items.css";

function Invoice({data}) {
    const {id ,date, billTo: {name}, status, totalPrice} = data;

    function redirect() {
        window.location.pathname = `/invoice/${id}`;
    }

    return (
        <div className="invoice" onClick={redirect}>
            <div>
                <p className="id">{id}</p>
                <p className="date text-gray">{date}</p>
                <p className="name text-gray">{name}</p>
            </div>
            <div>
                <p className="price">{totalPrice}</p>
                <p className={`status-${status}`}>{status}</p>
                <span className="arrow-right"></span>
            </div>
        </div>
    );
}

export default function InvoicesList() {
    const {data} = useContext(dataContext);
    return (
        <section className="invoices">
            {
                data.map((obj, i) => <Invoice data={obj} key={i}/>)
            }
        </section>
    )
}
