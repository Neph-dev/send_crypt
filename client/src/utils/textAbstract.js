export const TextAbstract = (text, length) => {
    if (text == null) return ''

    if (text.length <= length) return text

    text = text.substring(0, length)
    return text + '...'
}