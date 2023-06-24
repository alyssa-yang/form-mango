import { useRef } from 'react'

class FormStore {
    constructor() {
        this.state = {}
        this.callBacks = {}
        this.fieldEntities = []
    }
    registerEntities = (entity) => {
        //entity是Field实例
        this.fieldEntities.push(entity)
        return () => {
            this.fieldEntities = this.fieldEntities.filter(i => i !== entity)
            delete this.state[entity.props.name]
        }
    }

    setCallbacks = (callBacks) => {
        this.callBacks = {
            ...this.callBacks,
            ...callBacks
        }
    }
    setFieldValue = (filed, value) => {
        this.state = {
            ...this.state,
            [filed]: value
        }
        console.log('this.state', this.state)
        for (let entity of this.fieldEntities) {
            if (filed === entity.props.name) {
                entity.onStoreChange()
            }
        }
        return this.state
    }
    setValues = (values) => {
        this.state = values
        this.fieldEntities.forEach(entity => {
            Object.keys(values).forEach(v => {
                if (entity.props.name === v) {
                    entity.onStoreChange()
                }
            })
        })
        return this.state
    }
    resetFields = () => {
        this.state = {}
        return this.state
    }
    getFieldValue = (field) => {
        return this.state[field]
    }
    getValues = () => {
        return this.state
    }
    isNullOrEmptyValue = (value) => value === null || value === undefined || value === ''

    validateValues = () => {
        let err = {}
        this.fieldEntities.forEach(entity => {
            const { name, required, validate } = entity.props
            const value = this.getFieldValue[name]
            if (required && name && !this.isNullOrEmptyValue(value)) {
                err[name] = `${name} 不能为空`
            }
            if (validate) {
                const errMsg = validate(value)
                if (errMsg) {
                    err[name] = errMsg || err[name]
                }
            }

        })
        return err
    }

    submit = () => {
        const err = this.validateValues()
        const { onSubmit } = this.callBacks
        if (Object.keys(err).length === 0) {
            onSubmit(this.getValues())
        } else {
            onSubmit(this.getValues(), err)
        }
    }
    getForm = () => {
        return {
            setFieldValue: this.setFieldValue,
            setValues: this.setValues,
            getFieldValue: this.getFieldValue,
            setCallbacks: this.setCallbacks,
            registerEntities: this.registerEntities,
            validateValues: this.validateValues,
            submit: this.submit
        }
    }
}


export default function useForm(form) {
    const ref = useRef()
    if (!ref.current) {
        if (form) {
            ref.current = form
        } else {
            const formStore = new FormStore()
            ref.current = formStore.getForm()
        }

    }
    return [ref.current]
}
