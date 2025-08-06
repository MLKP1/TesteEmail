import { customAlphabet } from 'nanoid'

const alfabeto = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alphabet = '0123456789'
const nanoid = customAlphabet(alphabet, 6)

console.log(nanoid())

/* TODO: use this to alphanumeric id
import { init } from '@paralleldrive/cuid2'

const id = init({
  length: 6,
})

console.log(id()) */