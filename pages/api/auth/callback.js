// pages/api/auth/callback.js

import shopify from "@/utils/shopify"; // Import your Shopify config


export default async function handler(req, res) {

  if (req.method === "GET") {
    try {
      // Handle Shopify's auth callback
      const { session } = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });
      console.log(session);

    //   const { id, shop, state, scope, accessToken } = session;

      // Check if session exists in the database
    //   const existingSession = await Session.findOne({ shop });
    //   if (!existingSession) {
    //     // Create a new session if it doesn't exist
    //     const newSession = new Session({
    //       id,
    //       shop,
    //       state,
    //       scope,
    //       accessToken,
    //     });

    //     await newSession.save();
    //   }

      // Redirect to a home page with the necessary query parameters
      
      res.redirect(`/home?host=${req.body.host}&shop=${session.shop}`);
    } catch (error) {
      console.error("Error in auth callback:", error);
      res.status(500).send("Error during authentication");
    }
  } else {
    // If method is not POST, return 405 Method Not Allowed
    return res.status(405).send("Method Not Allowed");
  }
}
