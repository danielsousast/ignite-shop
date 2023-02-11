import Stripe from "stripe";
import { stripe } from "../lib/stripe"
import { formatMoney } from "../utils/formatMoney";

export type Product = {
    id: string;
    name: string;
    imageUrl: string;
    description: string | null;
    price: string;
    defaultPriceId: string;
}

export const listProductsUseCase = async (): Promise<Product[]> => {
    const response = await stripe.products.list({
        expand: ['data.default_price']
    });

    const products = response.data.map(product => {
        const price = product.default_price as Stripe.Price
        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            description: product.description,
            price: formatMoney(price.unit_amount as number /100),
            defaultPriceId: price.id
        }
    })

    return products;
}