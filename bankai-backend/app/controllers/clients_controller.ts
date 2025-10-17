import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createClient, updateClient } from '#validators/client'
import ClientPolicy from '#policies/client_policy'

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

      // para nao listar o admin, so os clientes e pra carregar a conta do cliente ja (pai eh o rei de resolve problema)
      const clients = await User.query().whereNot('paper_id', '1').preload('account')

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
  try {
    const payload = await request.validateUsing(createClient);
    console.log(payload);  
    const user = await auth.getUserOrFail();

    if (await bouncer.with(ClientPolicy).denies('create')) {
      return response.forbidden({ message: 'Você não tem permissão para criar clientes' });
    }

    
    const client = await User.create({
      fullName: payload.full_name,
      email: payload.email,
      password: payload.password,
      cpf: payload.cpf,
      paper_id: 2, 
    });

    
    await client.related('address').create({
      city: payload.city,
      state: payload.state,
      street: payload.street,
      houseNumber: payload.house_number,
    });

    
    await client.related('account').create({
      agency: '0001', 
    });


    await client.load('address');
    await client.load('account');

    return response.status(201).json({
      message: 'Cliente criado com sucesso',
      data: client,
    });

  } catch (error) {
    console.error(error);

   
    if (error?.messages) {
      
      return response.status(400).json({
        message: 'Erro de validação',
        errors: error.messages,
      });
    }

    
    return response.status(500).json({
      message: 'Erro ao criar cliente',
      error: error.message,
    });
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

      const client = await User.query().where('id', params.id).preload('account').firstOrFail()

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
