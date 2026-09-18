import { Dialog } from "primereact/dialog";
import style from "./OrderSuccess.module.css";
import { useNavigate } from "react-router-dom";

function OrderSuccess({ visible, onHide, orderId }) {
    const navigate= useNavigate()
    return (
        <Dialog
            header="Order Confirmed"
            visible={visible}
            onHide={onHide}
            modal
            className={style.orderDialog}
        >
            <div className={style.successContent}>

                <div className={style.icon}>
                    <i className="pi pi-check"></i>
                </div>

                <h2>Order placed successfully!</h2>

                <p>
                    Thank you for your order. Your order has been placed
                    successfully.
                </p>

                <div className={style.orderId}>
                    <span>Order ID</span>
                    <strong>{orderId}</strong>
                </div>

                <button
                    className={style.continueBtn}
                    onClick={() => navigate("/")}
                >
                    Continue Shopping
                </button>

            </div>
        </Dialog>
    );
}

export default OrderSuccess;