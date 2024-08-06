import { accAdd } from './accAdd'

/** 精确减 */
export function accMinus(a: number, b: number): number {
    return accAdd(a, -b)
}
