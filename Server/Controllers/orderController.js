import Order from "../Models/orderSchema.js";
import Product from "../Models/productSchema.js";
import User from "../Models/userSchema.js"
import { sendEmail } from "../Utils/nodemailer.js";


export async function createOrder(req, res) {
    try {
        const { formData, orderData } = req.body
        // console.log(formData)
        // console.log(orderData)
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(401).json({
                message: "user not found"
            })
        }
        // console.log("user", user)
        const orderItems = await Promise.all(
            orderData.map(async (item) => {

                const product = await Product.findById(item.productId);

                if (!product) {
                    throw new Error(`Product not found: ${item.productId}`);
                }

                return {
                    product: product._id,
                    quantity: item.quantity,
                    unitPrice: product.price,
                    totalPrice: item.quantity * product.price
                };
            })
        );

        const result = await Order.create({
            buyer: req.user._id,
            items: orderItems,
            shippingAddress: {
                country: formData.country,
                fullName: formData.fullName,
                phone: formData.phone,
                address: formData.streetAddress,
                houseNo: formData.apartment,
                state: formData.state,
                city: formData.city,
                postalCode: formData.postalCode
            },
        })
        await sendEmail(
            user.email,
            "Your Order is Created and Booked",
            `
              <h2>Order is Booked</h2>
              <p>Your Order ID:</p>
              <h3>${result._id}</h3>
              `
            //   <p>Total Price:</p>
            //   <h3>PKR ${result.items[0]?.totalPrice}</h3>
        );
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            result
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to create order"
        });
    }
}