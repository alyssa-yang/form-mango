import React, { useContext, useLayoutEffect, useReducer } from 'react'
import { FormContext } from './context'

export default function Field(props) {
    const context = useContext(FormContext)
    const { getFieldValue, setFieldValue, validate, registerEntities, initialValues } = context.form
    const { name } = props;
    const value = getFieldValue(name)
    const [, forceUpdate] = useReducer(x => !x, true)

    useLayoutEffect(() => {
        const initialValue = initialValues[name]
        if (initialValue) {
            setFieldValue(name, initialValue)
        }
        const unregister = registerEntities({ props, onStoreChange: forceUpdate })
        return unregister;
    }, [])


    const handleControlled = () => {
        return {
            value,
            onChange: (e) => {
                setFieldValue(name, e.target.value)
            },
            validate: () => validate(value)
        }
    }
    return React.cloneElement(props.children, handleControlled())
}