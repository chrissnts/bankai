import type { HttpContext } from '@adonisjs/core/http'
import AddressPolicy from '#policies/address_policy'
import Address from '#models/address'
import { createAddress, updateAddress } from '#validators/address'

export default class AddressesController {
  /**
   * Display a list of resource
   */
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(AddressPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar endereços' })
      }

      const addresses = await Address.query()

      return response.status(200).json({
        message: 'OK',
        data: addresses,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao listar endereços',
      })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth, bouncer }: HttpContext) {
    try {
      const user = await userInfo.getUserOrFail()

      if (await bouncer.with(AddressPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar endereço' })
      }

      const body = request.body()
      const payload = await createAddress.validate(body)

      const address = await Address.create({
        ...payload,
      })

      return response.status(200).json({
        message: 'OK',
        data: address,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
        data: 'Erro ao criar o endereço',
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(AddressPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver este endereço' })
      }

      const address = await Address.query().where('id', params.id)

      return response.status(200).json({
        message: 'OK',
        data: address,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao buscar endereço',
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(AddressPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar este endereço' })
      }

      const body = request.body()
      const payload = await updateAddress.validate(body)

      const address = await Address.findOrFail(params.id)
      await address.merge(payload).save()

      return response.status(200).json({
        message: 'Endereço atualizada com sucesso.',
        data: address,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao atualizar endereço',
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(AddressPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover este endereço' })
      }

      const address = await Address.findOrFail(params.id)
      await address.delete()

      return response.status(200).json({
        message: 'Endereço removida com sucesso',
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao remover conta',
      })
    }
  }
}
