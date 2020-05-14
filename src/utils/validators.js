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

export const fieldNotContainOnlySpaces = value =>
    baseValidator(value.trim() !== '', 'Field should not contain only spaces')

const defaultInputValidators = [
    fieldNotNull,
    fieldLengthLessThan(10),
    fieldShouldContainOnlyLowercase,
    fieldNotContainOnlySpaces
]

export default defaultInputValidators