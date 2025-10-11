import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createClient, updateClient } from '#validators/client'
import ClientPolicy from '#policies/client_policy'


// PROBLEMA COM BOUNCER AQUI, VERIFICAR DEPOIS. É POR ISSO QUE NAO TA LISTANDO OS CLIENTES NO FRONTEND

export default class ClientsController {
  /**
   * Listar todos os clientes
   */
  async index({ auth, bouncer, response }: HttpContext) {
  try {
    const user = await auth.getUserOrFail()

    if (await bouncer.with(ClientPolicy).denies('list')) {
      return response.forbidden({ message: 'Você não tem permissão para listar clientes' })
    }

    const clients = await User.all()

    return response.status(200).json({
      message: 'OK',
      data: clients,
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({
      message: 'Erro ao listar clientes',
      error: error.message,
    })
  }
}

  /**
   * Criar um novo cliente
   */
  async store({ auth, bouncer, request, response }: HttpContext) {
    const payload = await request.validateUsing(createClient)

    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(ClientPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar clientes' })
      }

      const client = await User.create(payload)

      return response.status(201).json({
        message: 'Cliente criado com sucesso',
        data: client,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao criar cliente',
        error: error.message,
      })
    }
  }

  /**
   * Mostrar um cliente específico
   */
  async show({ auth, bouncer, params, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(ClientPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para visualizar clientes' })
      }

      const client = await User.findOrFail(params.id)

      return response.status(200).json({
        message: 'OK',
        data: client,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao buscar cliente',
        error: error.message,
      })
    }
  }

  /**
   * Atualizar dados de um cliente
   */
  async update({ auth, bouncer, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateClient)

    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(ClientPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para editar clientes' })
      }

      const client = await User.findOrFail(params.id)
      await client.merge(payload).save()

      return response.status(200).json({
        message: 'Cliente atualizado com sucesso',
        data: client,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao atualizar cliente',
        error: error.message,
      })
    }
  }

  /**
   * Remover um cliente
   */
  async destroy({ auth, bouncer, params, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(ClientPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para deletar clientes' })
      }

      const client = await User.findOrFail(params.id)
      await client.delete()

      return response.status(200).json({
        message: 'Cliente removido com sucesso',
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao remover cliente',
        error: error.message,
      })
    }
  }
}
