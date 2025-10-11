import vine from '@vinejs/vine'

export const createClient = vine.compile(
  vine.object({
    cpf: vine.string().trim().fixedLength(11),
    fullName: vine.string().trim().minLength(3),
    email: vine.string().trim().email(),
    password: vine.string().minLength(6),
    paper_id: vine.number().positive().withoutDecimals(),
  })
)

export const updateClient = vine.compile(
  vine.object({
    cpf: vine.string().trim().fixedLength(11).optional(),
    fullName: vine.string().trim().minLength(3).optional(),
    email: vine.string().trim().email().optional(),
    password: vine.string().minLength(6).optional(),
    paper_id: vine.number().positive().withoutDecimals().optional(),
  })
)
