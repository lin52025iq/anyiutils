interface ProgressProps {
    /** 进度百分比（0-100） @default 10 */
    progress: number
    /** 进度条颜色，传入对象格式可以定义渐变色 @default '#00cf87' */
    color: string | { [key: number]: string }
    /** 进度条占直径比例 @default 0.1 */
    strokeScale: number
    /** 轨道颜色 @default #e0e0e0 */
    layerColor: string
    /** 填充颜色 @default 'none' */
    fill: string
    /** 进度条端点样式 @default 'round' */
    strokeLinecap: 'butt' | 'round' | 'square'
    /** 动画速度（也可以认为是进度条完结时间）
     * 注意：这个属性不支持动态修改 progress @default 0 */
    defaultDurTime: number
}

/**
 * 创建进度条 svg 字符串
 */
export function createSvgStr(props?: Partial<Omit<ProgressProps, 'progress' | 'size'>>) {
    const { layerColor, fill, color, strokeLinecap, defaultDurTime, strokeScale } = {
        defaultDurTime: 0,
        strokeScale: 0.1,
        layerColor: '#e0e0e0',
        fill: 'none',
        strokeLinecap: 'round',
        color: '#00cf87',
        ...props
    } as ProgressProps

    const size = 200
    const strokeWidth = size * strokeScale

    return (progress: ProgressProps['progress'] = 0) => {
        progress = Math.min(Math.max(progress, 0), 100)

        const totalArcLength = size * Math.PI
        let progressOffset = totalArcLength * (1 - progress / 100)

        if (strokeLinecap !== 'butt' && progress !== 100 && progress > 95) {
            progressOffset = progressOffset + strokeWidth / 2
        }

        const viewBoxWidth = size + strokeWidth

        return `<svg
    width="${viewBoxWidth}"
    height="${viewBoxWidth}"
    viewBox="0 0 ${viewBoxWidth} ${viewBoxWidth}"
    xmlns="http://www.w3.org/2000/svg"
    style="transform: rotate(-90deg); transform-origin: center;"
    >
    ${
        typeof color === 'object'
            ? `
          <defs>
              <linearGradient id="progressGradient" x1="1" y1="0" x2="0" y2="0">
                  ${Object.entries(color)
                      .map(([key, value]) => {
                          return `<stop offset="${key}%" stop-color="${value}" />`
                      })
                      .join('')}
              </linearGradient>
          </defs>
      `
            : ''
    }
    <circle cx="50%" cy="50%" r="${
        size / 2
    }" style="stroke: ${layerColor}; stroke-width: ${strokeWidth}; fill: none;"></circle>
  
    <circle cx="50%" cy="50%" r="${size / 2}"
      style="
      stroke: ${typeof color === 'object' ? 'url(#progressGradient)' : color};
      stroke-width: ${strokeWidth};
      stroke-linecap: ${strokeLinecap};
      fill: ${fill};
      stroke-dasharray: ${totalArcLength};
      stroke-dashoffset: ${progressOffset};
    ">
    ${
        defaultDurTime > 0
            ? `<animate
              attributeName="stroke-dashoffset"
              dur="${defaultDurTime}ms"
              fill="freeze"
              from="${totalArcLength}"
              to="${progressOffset}"
          ></animate>
          `
            : ''
    }
    </circle>
    </svg>`
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
    }
}

/**
 * base64 编码
 */
function base64Encode(input: string) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    let output = ''

    for (
        let block = 0, charCode, i = 0, map = chars;
        input.charAt(i | 0) || ((map = '='), i % 1);
        output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
        if (charCode > 0xff) {
            throw new Error(
                "'base64Encode' failed: The string to be encoded contains characters outside of the Latin1 range."
            )
        }
        charCode = input.charCodeAt((i += 3 / 4))
        block = (block << 8) | charCode
    }

    return output
}

/**
 * 获取 svg 字符串的 base64 编码
 */
export function createBase64Svg(str: string) {
    const base64Svg = base64Encode(unescape(encodeURIComponent(str)))
    return `data:image/svg+xml;base64,${base64Svg}`
}

/**
 * 创建环形进度条 base64 编码
 *
 * @example html
 * ```ts
 * const img = document.createElement('img')
 * img.src = createCircleBase64({ progress: 50 })
 * document.body.appendChild(img)
 * ```
 * @example vue
 * ```html
 * <template>
 *   <img :src="createCircleBase64({ progress: 50 })" />
 * </template>
 * ```
 * @example 小程序
 * ```
 * <image src="{{createCircleBase64({ progress: 50 })}}" svg style="width: 100px; height: 100px;"></image>
 * ```
 */
export function createCircleBase64(props?: Partial<ProgressProps>) {
    return createBase64Svg(createSvgStr(props)(props?.progress ?? 10))
}
