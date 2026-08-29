import Cart from "../Models/cartSchema.js";
import Product from "../Models/productSchema.js";

export async function addToCart(req, res) {
    const { productId, quantity } = req.body
    // console.log(productId)
    try {
        const cart = await Cart.findOne()
    //  console.log("productId from frontend:", productId)
// console.log("cart items:", cart.items)
        if (!cart) {
            const result = await Cart.create({
                items: [{
                    product: productId,
                    quantity
                }]
            })
            return res.status(201).json({
                message: "New cart created",
                result
            })
        };
        const cartItems = cart.items.find(
            item => item.product.toString() === productId
        )
        if (cartItems) {
            cartItems.quantity += quantity
        }
        else {
            cart.items.push({
                product: productId,
                quantity

            })
        }
        await cart.save()
        return res.status(200).json({
            message: "cartItem added",
            result: cart
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
export async function getCartItems(req, res) {
    try {
        const result = await Cart.find().populate("items.product")
        if (result.length < 1) {
            return res.status(404).json({
                message: "cart is empty"
            })
        }
        // console.log(result)
        return res.status(200).json({
            message: "get item cart successfully",
            result
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
export async function increaseQty(req, res) {
    const { productId } = req.body
    // console.log(productId)
    try {
        const cart = await Cart.findOne()
        if (!cart) {
            return res.status(404).json({
                message: "cart not found"
            })
        };
        const cartItem = cart.items.find(
            item => item.product.toString() === productId
        )
        // console.log(cartItem)
        if (!cartItem) {
            return res.status(404).json({
                mesasge: "cartItem not found"
            });
        }
        cartItem.quantity += 1;
        await cart.save();
        return res.status(200).json({
            message: "quantity increased",
            cartItem
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }

}
export async function decreaseQty(req, res) {
    const { productId } = req.body
    // console.log(productId)
    try {
        const cart = await Cart.findOne()
        if (!cart) {
            return res.status(404).json({
                message: "cart not found"
            })
        }
        const cartItems = cart.items.find(
            item => item.product.toString() === productId
        )
        if (!cartItems) {
            return res.status(404).json({
                message: "cartItem not found"
            })
        }
        if (cartItems.quantity === 1) {
            return res.status(422).json({
                message: "minimum cart will be one"
            })
        }
        cartItems.quantity -= 1
        await cart.save()
        return res.status(200).json({
            message: "decreased the quantity",
            cartItems
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
export async function removeAllcartItems(req, res) {
    try {
        const result = await Cart.deleteMany({})
        return res.status(200).json({
            message: "deleted all cartItems"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function removeItem(req, res) {
    const { productId } = req.body
    // console.log(productId)
    try {
        const cart = await Cart.findOne()

        const cartItem = cart.items.find(
            item => item.product.toString() === productId
        )
        if (!cartItem) {
            return res.status(404).json({
                message: "cartItemn not found",
            })
        }
        cart.items = cart.items.filter(
            item => item.product._id.toString() !== productId
        )
        await cart.save()
        return res.status(200).json({
            message: "delete item successfuly",
            cart
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}
