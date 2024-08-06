/** 精确乘 */
export function accMul(arg1: number, arg2: number) {
    arg1 = arg1 || 0
    arg2 = arg2 || 0
    let m = 0
    const s1 = arg1.toString()
    const s2 = arg2.toString()
    try {
        m += s1.split('.')[1].length
    } catch (_e) {
        /* void 0; */
    }
    try {
        m += s2.split('.')[1].length
    } catch (_e) {
        /* void 0; */
    }
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}
