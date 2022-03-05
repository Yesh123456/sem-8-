import React from 'react'
import { Button } from '@material-ui/core'
import { useFormikContext } from 'formik'

const CustomSubmit = ({
    child,
    ...otherProps
}) => {
    const { submitForm } = useFormikContext();
    const handleSubmit = () => {
        submitForm();
    }

    const configButton = {
        ...otherProps,
        variant: 'contained',
        color: "primary",
        onClick: handleSubmit
    }

    return (
        <Button {...configButton} >
            {child}
        </Button>
    )
};

export default CustomSubmit
