import { Controller, useFormContext } from "react-hook-form"
import { TextField, Grid } from "@mui/material"


function FormInput({ name,label }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
    <Controller
      defaultValue=''
      name={name}
      control={control}

      render={({ field }) => (
        <TextField
          variant="standard"
          {...field}
          label={label}
          fullWidth
          required
          error={isError}
        />
      )}
      
    />
  </Grid>
  )
}

export default FormInput