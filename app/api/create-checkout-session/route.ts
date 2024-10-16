import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
});
export const POST = async (request: NextRequest) => {
  const { key, name, totalAmount } = await request.json();
  console.log(key);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          unit_amount_decimal: `${totalAmount * 100}`,
          product_data: {
            name,
            images: key,
          },
        },
      },
    ],
    mode: "payment",
    success_url: `${process.env.BASE_URL}?success=true`,
    cancel_url: `${process.env.BASE_URL}?success=true`,
  });
  console.log(session);
  return NextResponse.json(session);
};
