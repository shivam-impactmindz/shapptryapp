'use Client'
import { useState } from "react";
import { Button, Card, Page, Layout, BlockStack, Text, InlineStack, TextField, Spinner } from "@shopify/polaris";
import axios from "axios";
const YourComponent = () => {
  const [shopName, setShopName] = useState('');
  const [submittedShop, setSubmittedShop] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!shopName) {
      // Ensure shopName is not empty
      alert("Please enter a valid Shopify shop name.");
      return;
    }
    try{
         let res = await axios.post('/api/auth',{shop:shopName});
         if(res.data.isSuccess){
          window.location.href = res.data.data; 
         }
    }catch(err){
      console.log(err)
    }

    
    // Simulating an API call (you can replace this with actual logic)
    
  };

  return (
    <Page title="Home">
      <Layout>
        {/* Form Section for Shopify Shop Name */}
        <Layout.Section variant="oneHalf">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Shopify Shop Name
              </Text>
              <Text variant="bodyMd" color="subdued">
                Please enter your Shopify store name to continue.
              </Text>
              
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Shopify Store Name"
                  value={shopName}
                  onChange={(value) => setShopName(value)}
                  autoComplete="off"
                  placeholder="e.g. my-shop-name.myshopify.com"
                  helpText="Your store name on Shopify (e.g., 'my-store.myshopify.com')"
                  required
                />
                <InlineStack wrap={false} align="end" gap="200">
                  <Button 
                    variant="primary" 
                    submit 
                    loading={isSubmitting} // Show loading spinner when submitting
                    disabled={isSubmitting || !shopName} // Disable if submitting or input is empty
                  >
                    {isSubmitting ? <Spinner size="small" /> : "Submit"}
                  </Button>
                </InlineStack>
              </form>

              {submittedShop && (
                <Text as="p" variant="bodyMd" color="success">
                  <strong>Shop Name Submitted:</strong> {submittedShop}
                </Text>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default YourComponent;
