import { sleep } from './sleep'

interface ICallRetryParams {
    /**
     * 需要重试的函数
     */
    fn: (...args: any[]) => any
    /**
     * 重试次数，默认为 3
     */
    times?: number
    /**
     * 重试间隔时间，默认为 1000 毫秒
     */
    delay?: number | ((count: number) => number)

    /**
     * 重试结束后的回调函数
     */
    onend?: () => void

    /**
     * 是否需要重试
     * @param count 当前重试次数
     */
    needRetry?: (count: number) => boolean

    /**
     * 每次执行 fn 后的回调函数
     */
    onfnend?: (...args: any[]) => void

    /**
     * 每次执行 fn 的错误回调函数
     */
    onfnerror?: (error: any) => void
}

/**
 * 重试函数
 */
export function callRetry({ fn, times = 3, delay = 1000, onend, needRetry, onfnend, onfnerror }: ICallRetryParams) {
    let count = 0
    return new Promise<void>((resolve) => {
        const retry = async () => {
            let result: any
            let isError = false
            try {
                result = await fn()
            } catch (error) {
                isError = true
                if (typeof onfnerror === 'function') {
                    onfnerror(error)
                }
            } finally {
                count++
                if (!isError && typeof onfnend === 'function') {
                    onfnend(result)
                }
            }

            const isRetry = typeof needRetry === 'function' ? needRetry(count) : count < times
            if (isRetry) {
                await sleep(typeof delay === 'function' ? delay(count) : delay)
                retry()
            } else {
                if (typeof onend === 'function') {
                    onend()
                }
                resolve()
            }
        }
        retry()
    })
}
