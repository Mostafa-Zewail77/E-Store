import { Typography, Button, Divider } from "@mui/material";
import { Elements,CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";


function PaymentForm({shippingData , checkoutToken, backStep ,onCapturecheckout, nextStep,timeout}) {
  
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY,
    process.env.REACT_APP_STRIPE_SECRET_API_KEY
    )

  const hundleSubmit = async (event, elements, stripe)=>{
    event.preventDefault();
    
   
    if(!elements || !stripe) return;
    const cardElement = elements.getElement(CardElement);

    const {error , paymentMethod } = await stripe.createPaymentMethod({
      type:'card' ,
      card: cardElement
    })

    if(error){
      console.log('Payment error:', error);
    }else{

      const orderData = {
        line_items: checkoutToken.list_items,
        customer: {
          firstname: shippingData.firstName, 
          lastname: shippingData.lastName , 
          email: shippingData.email
        },
        shipping: {
          name: 'primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          country:shippingData.shippingCountry, 
          postal_zip_code: shippingData.zip
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment:{
          gateway: 'stripe',
          stripe:{
            payment_method_id: paymentMethod.id
          }

        }
      }
      onCapturecheckout(checkoutToken.id, orderData);
      nextStep()
    }
  }

  return (
    <>
      <Review checkoutToken={checkoutToken}/>
      <Divider />
      <Typography variant="h6" gutterBottom m="20px 0">Payment Method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          { (elements,stripe)=>(
            <form onSubmit= {(e)=> hundleSubmit(e,elements,stripe)}>
              <CardElement />
              <br /> <br /> 
              <div style={{display:"flex" ,justifyContent:"space-between"}}>
                <Button variant="outlined" onClick={backStep}>Back</Button>

                <Button type="submit" variant="contained" color="primary" onClick={()=>{nextStep(); timeout()}}>
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          ) }
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm