import { Step,Stepper,StepLabel,Button, Divider,Paper ,CircularProgress,Typography } from "@mui/material"
import { useEffect, useState } from "react"
import AddressForm from "../AddressForm"
import PaymentForm from "../PaymentForm"
import { commerce } from "../../../lib/commerce"
import { Link, useNavigate } from "react-router-dom"


const steps = ['Shopping adress', 'Payment details']

function Checkout({ cart ,onCapturecheckout, order, error, refreshCart } ) {
    const [activeStep,setActiveStep] = useState(0)
    const [checkoutToken,setCheckoutToken] = useState(null)
    const [shippingData,setShippingData] = useState({})
    const [isFinished,setIsFinished]=useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (cart.id) {
        const generateToken = async ()=>{
            try{
                const token = await commerce.checkout.generateToken(cart.id , {type:'cart'})
            
                setCheckoutToken(token)
                
            }catch (error){
                if (activeStep !== steps.length) navigate('/');
            }
        }
        generateToken()
        }
    }, [cart]) 
    
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const onSubmit = (data) => {
        setShippingData(data)
        nextStep()
       
      }


    const timeout = ()=>{
        setTimeout(()=>{
            setIsFinished(true)
            refreshCart()
        },3000)
    }  
    let Confirmation = ()=> order.customer ? (
       <>
        <div >
            <Typography variant="h5" sx={{textAlign:'center'}}>Thank you for your purchase,{order.customer.firstname} {order.customer.lastname} </Typography>    
            <Divider/>
            <Typography variant="subtitle2">Order ref: { order.customer_reference}</Typography>
            <br /> <br />
            <div style={{textAlign:'center'}}> 
                <Button component= {Link} to="/" variant="outlined" type="button" >back to store</Button>
            </div>        
        </div>
       </>
    ) : isFinished ? (
        <>
        <div >
            <Typography variant="h5" sx={{textAlign:'center'}}>Thank you for your purchase,{shippingData.firstName} {shippingData.lastName} </Typography>    
            <Divider />
            <br />
            <Typography variant="subtitle2" sx={{fontSize:'14px' ,textAlign:'center' ,color:'grey'}}>
                 A full receipt has been emailed to {shippingData.email} Your order reference is{<br />} #STR-269838.
            </Typography>
            <br /> <br />
            <div style={{textAlign:'center'}}> 
                <Button component= {Link} to="/" variant="outlined" type="button" >back to store</Button>
            </div>
        </div>
       </>
    ):(
        <div style={{display:'flex', alignItems:'center' ,justifyContent:'center'}}>
            <CircularProgress />
        </div>
    )

    if (error){ 
        Confirmation = ()=> (

        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component= {Link} to="/" variant="outline" type="button">back to store</Button>
        </>
    )
    }
    const Form = ()=> activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} onSubmit={onSubmit}/>
    : <PaymentForm 
        shippingData={shippingData} 
        checkoutToken={checkoutToken} 
        backStep={backStep} 
        onCapturecheckout={onCapturecheckout}
        nextStep ={nextStep}
        timeout ={timeout}
     />
  return (
    <>  
        
        <div style={{display:'flex', alignItems:'center' ,justifyContent:'center'}}>
            <main style={{marginTop:'5%',width:'600px' }}  >
            <Paper sx={{ my:4, padding:2 }} >
                <Typography variant = 'h4' align="center" >Checkout</Typography>
                <Stepper activeStep={activeStep} sx={{py:3}}>
                    {
                        steps.map((step)=>(
                            <Step key= {step}>    
                                <StepLabel> {step}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
                { activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>   }
                
            </Paper>
        </main>
        </div>

    </>
    
  )
}

export default Checkout