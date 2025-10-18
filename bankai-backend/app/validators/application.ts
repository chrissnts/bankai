import vine from '@vinejs/vine'

export const createApplication = vine.compile(
  vine.object({
    type: vine.string().trim().minLength(1),
    account_id: vine.number().positive().withoutDecimals(),
    amount: vine.number().positive(),
  })
)

export const updateApplication = vine.compile(
  vine.object({
    type: vine.string().trim().minLength(1).optional(),
    account_id: vine.number().positive().withoutDecimals().optional(),
    amount: vine.number().positive().optional(),
  })
)
