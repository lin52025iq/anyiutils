import { expect, test } from 'vitest'
import { accMinus } from '@/accMinus'

test('minus: 3 - 2 === 1', () => {
    expect(accMinus(3, 2)).toBe(1)
})

test('minus: 0.3 - 0.1 === 0.2', () => {
    expect(accMinus(0.3, 0.1)).toBe(0.2)
})
