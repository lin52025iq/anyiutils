import { classof } from './classof'

/**
 * 判断值是否为原始类型的对象
 */
export function isPlainObject(value: any): value is Record<string, any> {
    return classof(value) === 'object'
}

/** 判断值是否为数组 */
export function isArray(value: any): value is [] {
    return classof(value) === 'array'
}
