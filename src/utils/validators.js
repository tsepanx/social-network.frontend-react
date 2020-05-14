const baseValidator = (statement, errorMessage) => {
    if (statement) {
        return undefined
    } return errorMessage
}

export const fieldNotNull = value => baseValidator(value, 'Field is required')

export const fieldLengthLessThan = maxLength => value =>
    baseValidator(value.length < maxLength, `Field should be shorter than ${maxLength} symbols`)

export const fieldShouldContainOnlyLowercase = value =>
    baseValidator(value.toLowerCase() === value, 'Field should contain only lowercase')


const defaultInputValidators = [
    fieldNotNull,
    fieldLengthLessThan(10),
    fieldShouldContainOnlyLowercase
]

export default defaultInputValidators