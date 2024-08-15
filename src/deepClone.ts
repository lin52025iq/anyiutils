import { isArray, isPlainObject } from './isPlainObject'

/**
 * 深拷贝原始对象和数组
 */
export function deepClone<T = Record<string, any> | []>(source: T): T {
    if (!isPlainObject(source) && !isArray(source)) {
        return source
    }
    const target = (isArray(source) ? [] : {}) as T

    Object.keys(source).forEach((key) => {
        const value = source[key]
        if (isPlainObject(value) || isArray(value)) {
            target[key] = deepClone(value)
        } else {
            target[key] = source[key]
        }
    })

    return target
}
