import React from 'react'
import { FormContext } from './context'

class Field extends React.Component {
    static contextType = FormContext

    componentDidMount() {
        const { registerEntities, setFieldValue } = this.context.form
        const { name } = this.props
        const initialValues = this.context.initialValues
        const initialValue = initialValues[name]
        if (initialValue) {
            setFieldValue(name, initialValue)
        }

        this.unregister = registerEntities(this)
    }

    componentWillUnmount() {
        this.unregister()
    }

    onStoreChange() {
        this.forceUpdate()
    }
    handleControlled() {
        const { getFieldValue, setFieldValue, validate } = this.context.form
        const { name } = this.props;
        let value = getFieldValue(name)
        return {
            value,
            onChange: (e) => {
                setFieldValue(name, e.target.value)
            },
            validate: () => validate(value)
        }
    }

    render() {
        const { children } = this.props
        return React.cloneElement(children, this.handleControlled())
    }
}

export default Field
