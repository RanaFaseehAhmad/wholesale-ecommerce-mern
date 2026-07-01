import style from "./Itemsummary.module.css"
import { useParams, useNavigate } from "react-router-dom"
import Itemimagecard from "../../Components/Itemsummary/Itemimagecard"
import Itempricequantity from "../../Components/Itemsummary/Itempricequantity"
import Itemtotalcard from "../../Components/Itemsummary/Itemtotalcard"
import ItemRecommended from "../../Components/Itemsummary/ItemRecommended"
import Itemdescription from "../../Components/Itemsummary/Itemdescription";

import { useContext } from "react"
import { ProductContext } from "../../Api/ProductsApi";
import { BreadCrumb } from 'primereact/breadcrumb';


function Itemsummary() {
    const { products } = useContext(ProductContext)
    const { id } = useParams();
    const navigate = useNavigate();

    const itemId = Number(id);
    const productItems = products.flatMap((arr) => arr.items)
    const item = productItems.find((item) => item?.id === itemId)
    const categoryData = products.find((product) => product.items.includes(item))

    const recommendeditem = productItems.filter((product) => product.subCategory === item.subCategory &&
        product.id !== item.id).sort(() => Math.random() - 0.5)
    // for breadcrumb
    const items = [
        { label: `${categoryData?.category}`, command: () => navigate(`/Categorypage/?query=${categoryData?.category}`) },
        { label: `${item?.subCategory}`, command: () => navigate(`/Subcategorypage/?query=${item?.subCategory}`) },
        { label: `${item?.name}`, command: () => navigate('#') },
    ];

    const home = {
        icon: 'pi pi-home',
        command: () => navigate('/')
    };
    // for breadcrumb

    return (
        <div className={style.container}>
            <BreadCrumb className={style.breadcrumb} model={items} home={home} />
            <div className={style.contentMain}>
                <Itemimagecard item={item} />
                <Itempricequantity item={item} />
                <Itemtotalcard item={item} />   
            </div>
            <ItemRecommended recommendeditem={recommendeditem} />
            {/* <!-- block description  --> */}
            <div className={style.main2}>

                <Itemdescription item={item} id={id} />



            </div>


        </div>

    )
}

export default Itemsummary
