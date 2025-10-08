import vine from '@vinejs/vine'


export const createAccount = vine.compile (
    vine.object({
        agency: vine.string().trim().minLength(4),
        user_id: vine.number().positive().withoutDecimals(),
        balance: vine.number().positive(),
        account_number: vine.number().positive(),

    })
)

export const updateAccount = vine.compile (
    vine.object({
        agency: vine.string().trim().minLength(4).optional(),
        user_id: vine.number().positive().withoutDecimals().optional(),
        balance: vine.number().positive().optional(),
        account_number: vine.number().positive().optional(),

    })
)