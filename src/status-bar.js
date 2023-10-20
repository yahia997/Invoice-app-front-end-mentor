import { useState, useContext } from "react";
import { dataContext } from "./dataContext";
import "./styles/status-bar.css";

export default function Statusbar({openForm, setOpenForm}) {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(null);
    const {data, dispatch} = useContext(dataContext);

    function change(word, rank) {
        dispatch({
            type: rank === checked ? "all" : word
        });
        setChecked(n => n === rank ? null : rank);
    }

    return (
        <div className="stauts-bar">
            <div>
                <h1>Invoices</h1>
                <small>
                    There are 
                    {" "}
                    {data.length}
                    {" "} 
                    total invoices
                </small>
            </div>
            <div className="center">
                <div className="filter">
                    <p onClick={() => setOpen(!open)}>Filter by status</p>
                    <div className="filter-list"
                        isopen={open.toString()}
                    >
                        <div className="center">
                            <span
                                onClick={() => change("draft", 0)}
                                className={`${checked === 0 ? "checked" : ""}`}
                            ></span>
                            <p>Draft</p>
                        </div>
                        <div className="center">
                            <span
                                onClick={() => change("pending", 1)}
                                className={`${checked === 1 ? "checked" : ""}`}
                            ></span>
                            <p>Pending</p>
                        </div>
                        <div className="center">
                            <span
                                onClick={() => change("paid", 2)}
                                className={`${checked === 2 ? "checked" : ""}`}
                            ></span>
                            <p>Paid</p>
                        </div>
                    </div>
                </div>
                <button
                    className="center main-btn"
                    onClick={() => setOpenForm(!openForm)}
                >New Invoice</button>
            </div>
        </div>
    );
}