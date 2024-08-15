/**
 * 获取 value 的值类型, 返回为小写
 */
export function classof(value: any): string {
    if (value === null) return 'null'
    if (typeof value !== 'object') return typeof value
    else return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()
}
