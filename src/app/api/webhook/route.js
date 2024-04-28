import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;

      // guardar en una base de datos
      console.log(
        "Consultado producto con id",
        checkoutSessionCompleted.metadata.registroId
      );

      // enviar un correo

      axios.put('http://localhost:3000/api/registros/'+ checkoutSessionCompleted.metadata.registroId, {
        nombre_u: checkoutSessionCompleted.customer_details.name,
        email: checkoutSessionCompleted.customer_details.email,
        pagado: true
      })
      .catch(function (error) {
        console.log(error);
      });

      break;
    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
