import Stripe from "stripe";
import { stripe } from "../lib/stripe"
import { formatMoney } from "../utils/formatMoney";

export const getProductUseCase = async (productId: string) => {
    const productResponse = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = productResponse.default_price as Stripe.Price

    const product = {
        id: productResponse.id,
        name: productResponse.name,
        imageUrl: productResponse.images[0],
        description: productResponse.description,
        price: formatMoney(price.unit_amount as number /100),
        defaultPriceId: price.id
    }

    return product;
}