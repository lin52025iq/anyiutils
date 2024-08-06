import { expect, test } from 'vitest'
import { strComparator } from '@/strComparator'

test('compare: a1 < a2', () => {
    expect(strComparator('a1', 'a2')).toBeLessThan(0)
})

test('compare: a-10 > a2', () => {
    expect(strComparator('a10', 'a2')).toBeGreaterThan(0)
})

test("compare: '' < a2", () => {
    expect(strComparator('', 'a2')).toBeLessThan(0)
})
