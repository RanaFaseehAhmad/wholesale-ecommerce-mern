import style from "./Itemsummary.module.css"
import api from "../../Api/Axios"
import { useParams, useNavigate } from "react-router-dom"
import Itemimagecard from "../../Components/Itemsummary/Itemimagecard"
import Itempricequantity from "../../Components/Itemsummary/Itempricequantity"
import Itemtotalcard from "../../Components/Itemsummary/Itemtotalcard"
import ItemRecommended from "../../Components/Itemsummary/ItemRecommended"
import Itemdescription from "../../Components/Itemsummary/Itemdescription";

import { useEffect, useState } from "react"
import { BreadCrumb } from 'primereact/breadcrumb';


function Itemsummary() {
    const { productId } = useParams();
    const [products, setProducts] = useState([])
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await api.get(`/products/itemsummary/${productId}`)
            setProducts(response.data.result)
            // console.log(response.data.result)
            console.log(products.subcategory?._id)

        } catch (error) {
            console.log(error.response?.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, [productId])

    const items = [
        { label: `${products?.category?.name}`, command: () => navigate(`/categorypage?categoryId=${products.category._id}`) },
        { label: `${products?.subcategory?.name}`, command: () => navigate(`/subcategorypage?subcategoryId=${products.subcategory._id}`) },
        { label: `${products?.productName}`, command: () => navigate('#') },
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
                <Itemimagecard products={products} />
                <Itempricequantity products={products} />
                <Itemtotalcard products={products} />
            </div>
            <ItemRecommended productSubcategoryId={products?.subcategory?._id} />
            {/* <!-- block description  --> */}
            <div className={style.main2}>

                <Itemdescription products={products} />



            </div>


        </div>

    )
}

export default Itemsummary
