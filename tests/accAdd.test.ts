import { expect, test } from 'vitest'
import { accAdd } from '@/accAdd'

test('add: 1 + 2 === 3', () => {
    expect(accAdd(1, 2)).toBe(3)
})

test('add: 0.1 + 0.2 === 0.3', () => {
    expect(accAdd(0.1, 0.2)).toBe(0.3)
})
