/** 精确加 */
export function accAdd(arg1: number, arg2: number): number {
    arg1 = arg1 || 0
    arg2 = arg2 || 0

    const r1 = (arg1.toString().split('.')[1] || '').length
    const r2 = (arg2.toString().split('.')[1] || '').length

    // 找出需要放大的倍数
    const m = Math.pow(10, Math.max(r1, r2))

    // 将两个数放大为整数后再相加，然后缩小
    return (Math.round(arg1 * m) + Math.round(arg2 * m)) / m
}
