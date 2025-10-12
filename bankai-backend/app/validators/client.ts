import vine from '@vinejs/vine'

export const createClient = vine.compile(
  vine.object({
    full_name: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6),
    cpf: vine.string().trim().minLength(11).maxLength(11),
    city: vine.string().trim(),
    state: vine.string().trim(),
    street: vine.string().trim(),
    house_number: vine.string().trim(),
  })
)

export const updateClient = vine.compile(
  vine.object({
    cpf: vine.string().trim().fixedLength(11).optional(),
    full_name: vine.string().trim().minLength(3).optional(),
    email: vine.string().trim().email().optional(),
    password: vine.string().minLength(6).optional(),
    paper_id: vine.number().positive().withoutDecimals().optional(),
    city: vine.string().trim().optional(),
    state: vine.string().trim().optional(),
    street: vine.string().trim().optional(),
    house_number: vine.string().trim().optional(),
  })
)
