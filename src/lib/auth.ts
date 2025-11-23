import {betterAuth} from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from "@/lib/prisma/db";
import {checkout, polar,portal} from "@polar-sh/better-auth";
import {polarClient} from "@/lib/polar";


export const auth = betterAuth({
   
   database: prismaAdapter(prisma, {
      provider: "postgresql"
   }),
   emailAndPassword: {
      enabled: true,
      autoSignIn: true,
   },
   plugins: [
      // add plugins here
      polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                  products: [
                     {
                        productId: "c3ecd5d6-eb7d-491f-8083-7afcba1126c2",
                        slug: "pro"
                     }
                  ],
                  successUrl: process.env.POLAR_SUCCESS_URL!,
                  authenticatedUsersOnly: true,
                }),
                portal(),
            ],
        })
   ],
});

