import { classof } from './classof'

/**
 * 判断值是否为原始类型的对象
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
    return classof(value) === 'object'
}

/** 判断值是否为数组 */
export function isArray(value: unknown): value is [] {
    return classof(value) === 'array'
}
