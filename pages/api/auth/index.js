import { URLSearchParams } from 'url';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { shop } = req.body; // Retrieve the shop name from the body of the POST request

    if (!shop) {
      return res.status(400).send("Missing shop parameter.");
    }

    try {
  
      // Step 1: Redirect user to Shopify OAuth URL
      const params = new URLSearchParams({
        client_id: process.env.SHOPIFY_API_KEY,
        scope: "read_products,write_orders", // Adjust the scope based on your app's needs
        redirect_uri: `/api/auth/callback`, // The callback URL
        state: Math.random().toString(36).substring(7), // A unique state value
      });

      const authUrl = `https://${shop}/admin/oauth/authorize?${params.toString()}`;

      // Redirect to Shopify OAuth page
     res.status(200).json({data:authUrl,isSuccess:true})
    } catch (error) {
      console.error("Error redirecting to Shopify OAuth:", error);
      return res.status(500).send("Internal Server Error");
    }
  } else {
    // If method is not POST, return 405 Method Not Allowed
    return res.status(405).send("Method Not Allowed");
  }
}
