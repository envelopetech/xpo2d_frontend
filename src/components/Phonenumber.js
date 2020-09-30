import React, { forwardRef } from 'react'
import {TextField} from '@material-ui/core'



const Phonenumber = (props, ref) => {


  return (

    <TextField
      {...props}      
      inputRef={ref}      
      fullWidth      
      label='Phone Number'
      variant='outlined'
      name='phone'     
    />
  )
}
export default forwardRef(Phonenumber)