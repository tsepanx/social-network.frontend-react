export const fieldNotNull = (value) => value ? undefined : 'Field is required'

// export const maxLengthValidatorCreator = (maxLength) => fieldLengthLessThan(maxLength)

export const fieldLengthLessThan = (maxLength) => (value) => {
    if (value.length < maxLength) { return undefined }
    return `Field should be shorter than ${maxLength} symbols`
}