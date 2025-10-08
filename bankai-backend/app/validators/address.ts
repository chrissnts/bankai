import vine from '@vinejs/vine'


export const createAddress = vine.compile (
    vine.object({
        street: vine.string().trim().minLength(1),
        city: vine.string().trim().minLength(3),
        house_number: vine.string().trim().minLength(1),
        state: vine.string().trim().minLength(3),
        user_id: vine.number().positive().withoutDecimals(),




    })
)

export const updateAddress = vine.compile (
    vine.object({
        street: vine.string().trim().minLength(1).optional(),
        city: vine.string().trim().minLength(3).optional(),
        house_number: vine.string().trim().minLength(1).optional(),
        state: vine.string().trim().minLength(3).optional(),
        user_id: vine.number().positive().withoutDecimals().optional(),

    })
)