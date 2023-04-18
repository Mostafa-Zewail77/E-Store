import { InputLabel , Grid ,Button, MenuItem,Select, Typography } from "@mui/material"
import{useForm,FormProvider} from 'react-hook-form';
import { Link } from "react-router-dom";
import FormInput from "./formInput";
import { useEffect, useState } from "react";
import { commerce } from "../../lib/commerce";

function AddressForm({ checkoutToken, onSubmit }) {
    const methods = useForm()
    
    const [shippingCountries, setshippingCountries] = useState([])
    const [shippingCountry, setshippingCountry] = useState('')
    const [shippingSubdivisions, setshippingSubdivisions] = useState([])
    const [shippingSubdivision, setshippingSubdivision] = useState('')
    const [shippingOptions, setshippingOptions] = useState([])
    const [shippingOption, setshippingOption] = useState('')

    const fetchShippingCountries = async(checkoutTokenId)=>{
      const {countries} = await(commerce.services.localeListShippingCountries(checkoutTokenId))
      setshippingCountries(countries)
      setshippingCountry(Object.keys(countries)[6])
      
    }

    const fetchshippingSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
      setshippingSubdivisions(subdivisions);
      setshippingSubdivision(Object.keys(subdivisions)[5]);
      
    }
    
    const fetchShippingOptions = async (checkoutTokenId,country,region = null) => {
      const  options  = await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region})
      setshippingOptions(options);
      setshippingOption(options[0].id);
      
    }
    

    useEffect(() => {
      fetchShippingCountries(checkoutToken.id)
      
    }, [])

    useEffect(() => {
      if(shippingCountry)  fetchshippingSubdivisions(shippingCountry)
      
      
    }, [shippingCountry])


    useEffect(() => {
      if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
      
    }, [shippingSubdivision])
    
  return (
    <>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>

            <form onSubmit={methods.handleSubmit( (data)=> onSubmit ({...data, shippingCountry ,shippingOption, shippingOption}))} > 
                <Grid container spacing={3}>
                  <FormInput  name='firstName' label='First Name' />
                  <FormInput  name='lastName' label='Last Name' />
                  <FormInput  name='address1' label='Address' />
                  <FormInput  name='email' label='Email' />
                  <FormInput  name='city' label='City' />
                  <FormInput  name='zip' label='Zip / Postal code' />

                  <Grid item sx={12} sm={6}>
                  <InputLabel>Shipping Country</InputLabel>
                  <Select fullWidth value={shippingCountry} onChange={(e)=>{setshippingCountry(e.target.value)}}>
                    {Object.entries(shippingCountries).map(([code,name])=> <MenuItem key={code} value={code}> {name} </MenuItem> ) }
                  </Select>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Subdivision</InputLabel>
                  <Select fullWidth value={shippingSubdivision} onChange={(e)=> setshippingSubdivision(e.target.value)} >
                    { Object.entries(shippingSubdivisions).map(([code,name])=> <MenuItem key={code} value={code}> {name} </MenuItem>)}
                  </Select>
                  </Grid>

                  <Grid item sx={12} sm={6}>
                  <InputLabel>Shipping Option</InputLabel>
                  <Select fullWidth value={shippingOption} onChange={(e)=> setshippingOption(e.target.value)} >
                    {
                      shippingOptions.map((option)=>({id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`})).map((item)=>(
                        <MenuItem key={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                  </Grid>

                </Grid>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                  <Button type="submit" variant="contained" color="primary">Next</Button>
                </div>

            </form>
        </FormProvider>
    
    </>
  )
}

export default AddressForm