const baseValidator = (statement, errorMessage) => {
    if (statement) {
        return undefined
    }
    return errorMessage
}

const fieldIsNotNull = value => baseValidator(
    value && value.trim() !== '',
    'Field is required'
)

const fieldIsShorterEqualThan = maxLength => value => baseValidator(
    value.length <= maxLength,
    `Max length is ${maxLength}`
)

const fieldIsLongerEqualThan = minLength => value => baseValidator(
    value.length >= minLength,
    `Min length is ${minLength}`
)

const fieldShouldContainOnlyLowercase = value => baseValidator(
    value.toLowerCase() === value,
    `Cannot contain uppercase`
)

export const defaultInputValidators = [
    fieldIsNotNull,
    fieldIsShorterEqualThan(10),
    fieldShouldContainOnlyLowercase,
]

export const defaultPasswordValidators = [
    fieldIsNotNull,
    fieldIsLongerEqualThan(4)
]