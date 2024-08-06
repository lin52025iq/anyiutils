import { accMul } from './accMul'
/** 精确除 */
export function accDiv(arg1: number, arg2: number) {
    arg1 = arg1 || 0
    arg2 = arg2 || 0

    let t1: number, t2: number
    try {
        t1 = arg1.toString().split('.')[1].length
    } catch (_e) {
        t1 = 0
    }
    try {
        t2 = arg2.toString().split('.')[1].length
    } catch (_e) {
        t2 = 0
    }
    const r1 = Number(arg1.toString().replace('.', ''))
    const r2 = Number(arg2.toString().replace('.', ''))
    return accMul(r1 / r2, Math.pow(10, t2 - t1))
}
