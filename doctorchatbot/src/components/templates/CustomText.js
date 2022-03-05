import React from 'react'
import { TextField } from '@material-ui/core'
import { useField } from 'formik'

const CustomText = ({
    name,
    ...otherProps
}) => {
    const [field, meta] = useField(name);

    const ConfigTextField = {
        ...field,
        ...otherProps,
        variant: "outlined"
    };

    if( meta && meta.touched && meta.error ){
        ConfigTextField.error = true;
        ConfigTextField.helperText = meta.error;
    }

    return (
        <TextField {...ConfigTextField} />
    )
};

export default CustomText;