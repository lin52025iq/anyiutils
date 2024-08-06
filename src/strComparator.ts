/** 字符串排序 */
export function strComparator(a: string, b: string) {
    a = a.toString()
    b = b.toString()
    const reg = /(\d+)|(\D+)/g // 匹配数字或非数字的部分
    const lista = a.match(reg)
    const listb = b.match(reg)

    if (!lista || !listb) {
        return a.localeCompare(b)
    }

    const minLen = Math.min(lista.length, listb.length)
    // 逐一比较分段
    for (let i = 0; i < minLen; i++) {
        const partA = lista[i]
        const partB = listb[i]

        // 如果都是数字部分，则比较数值大小
        if (/\d+/.test(partA) && /\d+/.test(partB)) {
            const numA = parseInt(partA)
            const numB = parseInt(partB)
            if (numA !== numB) {
                return numA - numB
            }
            // 如果数字部分相等但长度不等，比较前导零的数量，前导零多的更小
            if (partA.length !== partB.length) {
                return partA.length - partB.length
            }
        } else {
            // 如果非数字部分，直接使用localeCompare比较
            if (partA !== partB) {
                return partA.localeCompare(partB)
            }
        }
    }

    // 如果其中一个字符串有更多的部分，视其为更大
    return lista.length - listb.length
}
