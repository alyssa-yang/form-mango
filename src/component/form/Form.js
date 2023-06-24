import React from "react";
import { FormContext } from "./context";
import useForm from "./useForm";

export default function Form({ children, form, onSubmit, initialValues }, ref) {
    const [formInstance] = useForm(form)

    React.useImperativeHandle(ref, () => formInstance)

    formInstance.setCallbacks({
        onSubmit,
    })
    return <form onSubmit={(e) => {
        e.preventDefault()
        formInstance.submit()
    }}>
        <FormContext.Provider value={{ form: formInstance, initialValues }}>
            {children}
        </FormContext.Provider>
    </form>
}