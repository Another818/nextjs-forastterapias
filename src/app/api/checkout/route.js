import { NextResponse } from "next/server";
import Stripe from "stripe";
import uniqid from 'uniqid';
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.json();
  const registroId = uniqid();
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.DOMAIN_URL}/success`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: body.name,
            images: [body.image],
          },
          unit_amount: body.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
        registroId: registroId 
    },
    mode: "payment",
  });

  axios.post(`${process.env.DOMAIN_URL}/api/registros`, {
    id: registroId,
    productId: body.id,
    nombre_u: "",
    email: "",
    description: body.description,
    price: body.price,
    pagado: false
  })
  .catch(function (error) {
    console.log(error);
  });

  return NextResponse.json(session);
}
