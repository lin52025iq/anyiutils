/**
 * 睡眠函数
 * @param ms 睡眠时间，单位为毫秒
 * @returns 一个 Promise，在指定时间后 resolve
 */
export function sleep(ms: number) {
    return new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
            resolve()
            clearTimeout(timer)
        }, ms)
    })
}
