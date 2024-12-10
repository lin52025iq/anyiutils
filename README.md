## anyiutils

1. accAdd: 精确加

2. accMinus: 精确减

3. accMul: 精确乘

4. accDiv: 精确除

5. strComparator: 字符串比较, 类似 macos 文件夹名称排序比较方式

6. classof: 获取任意值的类型

7. isPlainObject: 判断值是否为原始对象

8. isArray: 判断值是否为数组

9. deepClone: 深拷贝原始对象和数组

10. mergeObjects: 将多个原始类型的对象进行深度合并

11. sleep: 睡眠函数

12. callRetry: 重试函数

```ts
import { callRetry } from 'anyiutils'
let count = 0
callRetry({
    fn: async () => {
        await sleep(100)
        console.log('callRetry', count++)
        if (count === 2) {
            throw new Error('callRetry error')
        }
        return count
    },
    onfnend: () => {
        console.log('callRetry onfnend')
    },
    onfnerror: () => {
        console.log('callRetry onfnerror')
    },
    times: 3,
    delay: 1000,
    onend: () => {
        console.log('callRetry onend')
    }
})
```

13. createCircleBase64: 创建环形进度条 base64 编码

```ts
import { createCircleBase64 } from 'anyiutils'
const img = document.createElement('img')
img.src = createCircleBase64({ progress: 50 })
document.body.appendChild(img)
```

14. animateNumber: 数字动画

```ts
import { animateNumber } from 'anyiutils'

animateNumber({ start: 0, end: 5, callback: console.log })
// 1
// 2
// 3
// 4
// 5 true
```

15. NumberContorl 可控数字动画

```ts
import { NumberContorl } from 'anyiutils'
const nc = new NumberContorl(0)
nc.on('update', (val, isEnd) => {
    console.log(val, isEnd)

    if (val >= 5) {
        nc.seek(0)
    }
})
nc.seek(10)

// 1 undefined
// 2 undefined
// 3 undefined
// 4 undefined
// 5 undefined
// 4 undefined
// 3 undefined
// 2 undefined
// 1 undefined
// 0 true
```

```ts
// 结合 NumberContorl 和 createCircleBase64 实现可控制进度与动画的环形进度条
import { NumberContorl, createCircleBase64 } from 'anyiutils'
const img = document.createElement('img')
img.src = createCircleBase64({ progress: 0 })
document.body.appendChild(img)

const nc = new NumberContorl(0, { digits: 0 })
nc.on('update', (val) => {
    img.src = createCircleBase64({ progress: val })
})

// 设置进度
nc.seek(10)
nc.seek(100)
nc.seek(0)
```
