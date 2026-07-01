import style from "./Pagination.module.css"
import { Paginator } from 'primereact/paginator';
import { useState } from "react";


function Pagination() {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    return (

        <div className={style.card}>
            <Paginator
                first={first}
                rows={rows}
                totalRecords={120}
                rowsPerPageOptions={[10, 20, 50]}
                onPageChange={onPageChange}
            />
        </div>

    )
}

export default Pagination
