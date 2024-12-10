interface AnimateNumberProps {
    /** 开始数字 @default 0 */
    start?: number
    /** 结束数字 @default 0 */
    end: number
    /** 动画时间 @default 1000 */
    duration?: number
    /** 每次变化的最小值 @default 1 */
    minStep?: number
    /** 回调函数触发频率 @default 16.6 */
    timeout?: number
    /** 回调函数，每次数字改变时调用 */
    callback?: (value: number, isEnd?: boolean) => void
    /** 是否禁用变化 */
    disabled?: boolean
    /** 小数位数 @default 2 */
    digits?: number
}

/** 数字动画 */
export function animateNumber(props: AnimateNumberProps) {
    const { start = 0, end = 0, duration = 1000, timeout = 16.67, callback = () => { }, minStep = 1, disabled = false, digits = 2 } = props
    const times = Math.round(duration / timeout)
    const distance = Math.abs(end - start)
    const step = Math.max(minStep, distance / times)
    const dir = start > end ? -1 : 1

    if (times <= 1 || distance <= step || disabled) {
        return callback(end, true)
    }

    let current = start
    const timer = setInterval(() => {
        current = parseFloat((current + dir * step).toFixed(digits))

        if (dir === -1 ? current <= end : current >= end) {
            callback(end, true)
            clearInterval(timer)
        } else {
            callback(current)
        }
    }, timeout)
}


interface Events {
    /** 每次更新时触发 */
    update: (val: number, isEnd?: boolean) => void
    /** 结束时触发 */
    end: () => void
}

type Options = Pick<AnimateNumberProps, 'duration' | 'digits' | 'minStep' | 'timeout' | 'disabled'>

/** 可控的数字动画 */
export class NumberContorl {
    #current = 0
    #target = 0

    constructor(value: number, option?: Options) {
        this.#current = value
        this.setOption(option)
    }

    #options: Required<Options> = {
        digits: 2,
        duration: 1000,
        timeout: 16.67,
        minStep: 1,
        disabled: false
    }

    /** 设置配置 */
    setOption(option?: Options) {
        this.#options = Object.assign(this.#options, option || {})
    }

    #timer: ReturnType<typeof setTimeout> | null = null

    /** 停止动画 */
    stop() {
        if (this.#timer) {
            clearInterval(this.#timer)
            this.#timer = null
        }
    }

    /** 跳转到指定的数字 */
    seek(target: number) {
        // 避免重复创建
        if (this.#target === target) return
        this.#target = target

        this.stop()
        const { digits, disabled, duration, minStep, timeout } = this.#options || {}

        const times = Math.round(duration / timeout)
        const distance = Math.abs(target - this.#current)
        const dir = target > this.#current ? 1 : -1
        const step = Math.max(minStep, distance / times)
        if (disabled || [times, distance, step].some(isNaN) || times <= 1 || distance <= step) {
            this.#onUpdate(target, true)
            this.#onEnd()
            return
        }

        this.#timer = setInterval(() => {
            const current = parseFloat((this.#current + dir * step).toFixed(digits))

            // 如果更新后的 current = #current, 步长没有更新到 current, 直接终止 timer
            if (current === this.#current || (dir === -1 ? current <= target : current >= target)) {
                this.#onUpdate(target, true)
                this.#onEnd()
                this.stop()
            } else {
                this.#current = current
                this.#onUpdate(this.#current)
            }
        }, timeout)
    }

    #onUpdate: Events['update'] = () => { }
    #onEnd: Events['end'] = () => { }
    on<K extends keyof Events>(event: K, callback: Events[K]) {
        if (event === 'update') {
            this.#onUpdate = callback as Events['update']
        } else if (event === 'end') {
            this.#onEnd = callback as Events['end']
        }
    }
}
