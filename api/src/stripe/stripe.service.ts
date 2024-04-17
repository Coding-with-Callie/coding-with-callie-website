import { Injectable } from '@nestjs/common';
// import Stripe from 'stripe';

@Injectable()
export class StripeService {
  // private stripe: Stripe;

  constructor() {
    // this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  // async createCheckoutSession(lineItems: any[], userId: number) {
  //   // this.logger.log('Creating checkout session for user:', userId);
  //   const session = await this.stripe.checkout.sessions.create({
  //     ui_mode: 'embedded',
  //     line_items: lineItems,
  //     mode: 'payment',
  //     return_url:
  //       process.env.ENVIRONMENT === 'local'
  //         ? `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`
  //         : `https://www.coding-with-callie.com/return?session_id={CHECKOUT_SESSION_ID}`,
  //     automatic_tax: { enabled: true },
  //     allow_promotion_codes: true,
  //     metadata: {
  //       user: userId,
  //     },
  //   });

  //   return { clientSecret: session.client_secret };
  // }

  // async getSessionStatus(session_id) {
  //   const session = await this.stripe.checkout.sessions.retrieve(session_id);

  //   if (session.status === 'complete') {
  //     const lineItems = (
  //       await this.stripe.checkout.sessions.listLineItems(session.id)
  //     ).data;

  //     return { lineItems, status: session.status };
  //   } else {
  //     return {
  //       status: session.status,
  //     };
  //   }
  // }
}
