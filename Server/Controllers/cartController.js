import Cart from "../Models/cartSchema.js";
import Product from "../Models/productSchema.js";
import User from "../Models/userSchema.js";

export async function addToCart(req, res) {
    try {
        const { productId, quantity } = req.body
        //  console.log("productId from frontend:", productId)
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId })
        if (!cart) {
            const result = await Cart.create({
                user: userId,
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
        console.log(result)
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
export async function guestCartItems(req, res) {
    try {
        const { productIds } = req.body
        // console.log(productIds)
        const result = await Product.find({
            _id: {
                $in: productIds
            }
        })
        return res.status(200).json({
            message: "found guest products",
            result
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function mergeGuestCart(req, res) {
    const { guestCart } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: guestCart.map(item => ({
                    product: item.productId,
                    quantity: item.quantity
                }))
            });
            return res.status(200).json({
                message: "cart merged"
            });
        }

        for (const item of guestCart) {
            const existingItem = cart.items.find(
                cartItem => cartItem.product.toString() === item.productId
            );
            if (existingItem) {
                existingItem.quantity += item.quantity
            }
            else {
                cart.items.push({
                    product: item.productId,
                    quantity: item.quantity,
                });
            }

        }
        await cart.save();
        return res.status(200).json({
            message: "cart merged"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        });
    }
}