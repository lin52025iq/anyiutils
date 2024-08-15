import { deepClone } from './deepClone'
import { isPlainObject } from './isPlainObject'

/**
 * 将多个原始类型的对象进行深度合并 会将 targetObjs 中的对象的属性合并到 sourceObj 中
 * - 当属性名相同时, 如果值都是原始对象时, 会继续合并该属性的值对象; 否则会以 targetObjs 中的值为准, 越往后权重越高
 * @param sourceObj 用于合并的最终对象
 * @param targetObjs 被合并的对象
 * @return 返回 sourceObj
 */
export function mergeObjects(sourceObj: Record<string, any>, ...targetObjs: Record<string, any>[]) {
    const plainObjs = targetObjs.filter((item) => isPlainObject(item))

    plainObjs.forEach((targetObj) => {
        for (const key in targetObj) {
            if (Object.prototype.hasOwnProperty.call(targetObj, key)) {
                const element = targetObj[key]

                if (isPlainObject(element) && isPlainObject(sourceObj[key])) {
                    mergeObjects(sourceObj[key], deepClone(element))
                } else {
                    sourceObj[key] = element
                }
            }
        }
    })

    return sourceObj
}
