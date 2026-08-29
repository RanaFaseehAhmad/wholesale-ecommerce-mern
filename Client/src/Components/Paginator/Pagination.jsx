import style from "./Pagination.module.css"
import { Paginator } from 'primereact/paginator';
import { useState } from "react";


function Pagination({ limit, page }) {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    return (

        <div className={style.card}>
            
            <button></button>
        </div>

    )
}

export default Pagination
