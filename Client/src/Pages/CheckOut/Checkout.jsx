import style from "./Checkout.module.css"
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { shippingAddressSchema } from "../../ReactFormSchema/schema.js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleOrder, loginUserCartItems, removeFromCart } from "../../Api/productApi.js";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import OrderSuccess from "../../Components/DialogBox/Success/OrderSuccess.jsx";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

function Checkout() {
  const toast = useRef(null);
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    mode: "onChange",
    resolver: yupResolver(shippingAddressSchema)
  });
  const selectedProducts = useSelector((state) => state.cart.selectedItems)

  const orderMutation = useMutation({
    mutationFn: handleOrder,
    onSuccess: (data) => {
      console.log("order created", data.result)
      setCreatedOrder(data.result);
      setOrderSuccess(true);
      removeCartItemMutation.mutate(selectedProducts)
    },
    onError: (error) => {
      console.log(error.response?.data)
    }
  })

  //getting the cartData
  const { data: cartData } = useQuery({
    queryFn: loginUserCartItems,
    queryKey: ["cart"],

  })
  const userCart = cartData?.result?.[0]?.items || []
  console.log("user Cart", userCart)

  // getting selected order Ids

  const cartItems = userCart.filter(item => {
    return selectedProducts.includes(item.product._id)
  })

  const orderData = cartItems.map(item => ({
    productId: item.product._id,
    unitPrice: item.product.price,
    quantity: item.quantity,
    totalPrice: item.quantity * item.product.price
  }))
  console.log("orderData", orderData)

  // to show subtotal in the summary we reduce this
  const checkOutSummary = orderData.reduce(
    (total, item) => total + item.totalPrice, 0)



  const onSubmit = (data) => {
    console.log(data);
    if (selectedProducts.length === 0) {
      toast.current.show({
        severity: "warn",
        summary: "Select Item",
        detail: "Please select at least one item first.",
        life: 3000
      });
      return
    }
    orderMutation.mutate({
      formData: data,
      orderData
    })
  }

  const removeCartItemMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      console.log("removed the ordered item from cart")
      queryClient.invalidateQueries({
        queryKey: ["cart"]
      });
    },
    onError: (error) => {
      console.log(error.response?.data)
    }

  })


  return (
    <div>
      <Toast className={style.toast} ref={toast} />
      <div className={style.header}>
        <div className={style.logo}>
          <img src="/" alt="site logo" />
        </div>
      </div>
      <div className={style.mainContainer}>
        <h1>Checkout</h1>
        <div className={style.container}>
          <div className={style.leftSection}>
            <div className={style.leftSectionTitle}>
              <i className="pi pi-map-marker"></i>
              <h2>Shipping address</h2>
            </div>
            <div className={style.formWrapper}>
              <div className={style.protectionTitle}>
                <i className="pi pi-lock"></i>
                <p>Your information is encrypted and secure</p>
              </div>
              <form className={style.addressForm} onSubmit={handleSubmit(onSubmit)}>
                <select className={errors.country ? style.errorBorder : ""} {...register("country")}
                >
                  <option value="pakistan ">pakistan </option>
                  <option value="india ">India </option>
                  <option value="uk ">Uk </option>
                  <option value="United states ">United </option>
                  <option value="brazil">Brazil </option>
                </select>

                <input className={errors.fullName ? style.errorBorder : ""} type="text" placeholder="First name and Last name" {...register("fullName")} />
                {errors.fullName && (<p className={style.errors}> {errors.fullName.message}</p>)}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      country="pk"
                      value={field.value}
                      onChange={(value, country) => {
                        field.onChange(value)
                        setValue("country", country.name)
                        setValue("dialCode", country.dialCode)
                        setValue("countryCode", country.countryCode)
                      }}
                      containerClass={style.phoneContainer}
                      inputClass={style.phoneInput}
                      buttonClass={style.countryButton}
                      dropdownClass={style.countryDropdown}


                    />
                  )}
                />
                {errors.phone && (<p className={style.errors}>{errors.phone.message}</p>)}

                <input className={errors.streetAddress ? style.errorBorder : ""} type="text" placeholder="Street address or P.O.box" {...register("streetAddress")} />
                {errors.streetAddress && (<p className={style.errors}>{errors.streetAddress.message}</p>)}
                <input type="text" placeholder="house No, Apartment, unit, suit, building    (Optional)" {...register("apartment")} />
                <input className={errors.state ? style.errorBorder : ""} type="text" placeholder="State / province" {...register("state")} />
                {errors.state && (<p className={style.errors}>{errors.state.message}</p>)}
                <input className={errors.city ? style.errorBorder : ""} type="text" placeholder="City" {...register("city")} />
                {errors.city && (<p className={style.errors}>{errors.city.message}</p>)}

                <input className={errors.postalCode ? style.errorBorder : ""} type="text" placeholder="Postal code" {...register("postalCode")} />
                {errors.postalCode && (<p className={style.errors}>{errors.postalCode.message}</p>)}

                <button type="submit" >Continue to payment</button>
              </form>
            </div>
          </div>
          <div className={style.rightSection}>
            <div className={style.rightSectionTitle}>
              <h2 >Order summary </h2>
            </div>

            <div className={style.orderSummaryWrapper}>
              <div className={style.itemTotal}>
                <div className={style.subtotalWrapper}>
                  <span>item subtotal</span>
                  <span>PKR {checkOutSummary}</span>
                </div>

                <div className={style.paymentProcessingWrapper}>
                  <div className={style.paymentProcessingBlock}>
                    <span>Payment processing fee</span>
                    <span>PKR subtotal</span>
                  </div>

                  <div className={style.paymentProcessingDetail}>
                    <div className={style.PaymentProcessingFee}>
                      <span>Payment processing fee</span>
                      <span>PKR processing fee</span>
                    </div>

                    <div className={style.paymentProcFeeDiscount}>
                      <span>Payment processing fee discount</span>
                      <span className={style.discountColor}>PKR -63</span>
                    </div>

                  </div>
                </div>

                <div className={style.totalAmountWrapper}>
                  <span>Pay in Pkr</span>
                  <div className={style.totalAmount}>
                    <p>Total Amount</p>
                    <p> Money save</p>
                    <p>PKR {checkOutSummary} </p>
                    <p>(1 PKR ≈ 0.003214 USD) </p>
                  </div>
                </div>


                <div className={style.orderProtectionDetailWrapper}>
                  <h2 className={style.orderProtectionTitle}>Alibaba.com order protection</h2>

                  <div className={style.securePaymentSection}>
                    <div className={style.iconHeadingWrapper}>
                      <i className="pi pi-shield"></i>
                      <h3>Secure payments </h3>
                    </div>
                    <div className={style.securePaymentDETAIL}>
                      <p>Every payment you make on CityStore.com is secured with strict SSL encryption and PCI DSS data protection protocols</p>
                    </div>
                  </div>

                  <div className={style.guaranteedDeliverySection}>
                    <div className={style.iconHeadingWrapper}>
                      <i className="pi pi-truck"></i>
                      <h3>Guaranteed delivery  </h3>
                    </div>
                    <div className={style.guaranteedDeliveryDetail}></div>
                    <p>Dispatched within 7 days of payment or receive a 5% delay compensation</p>
                  </div>

                  <div className={style.refundPolicySection}>
                    <div className={style.iconHeadingWrapper}>
                      <i className="pi pi-arrow-right-arrow-left"></i>
                      <h3>Refund Policy</h3>
                    </div>
                    <div className={style.refundPolicyDetail}></div>
                    <p>Claim a refund if your order doesn't ship, is missing, or arrives with product issues</p>
                  </div>

                </div>

              </div>
            </div>
          </div>
          <OrderSuccess
            visible={orderSuccess}
            onHide={() => setOrderSuccess(false)}
            orderId={createdOrder?._id}
          />
        </div>
      </div>

    </div >
  )
}

export default Checkout
