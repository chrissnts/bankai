import { HttpContext } from '@adonisjs/core/http'

import Application from '#models/application'
import InvestmentPolicy from '#policies/investment_policy'
import { createApplication } from '#validators/application'

export default class ApplicationController {
  async index({ auth, bouncer, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(InvestmentPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para listar aplicações' })
      }

      const applications = await Application.query().preload('account', (AccountQuery) =>
        AccountQuery.select('id', 'account_number')
      )

      return response.status(201).json({
        message: 'OK',
        data: applications,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao listar aplicações',
      })
    }
  }

  /**
   * Display form to create a new record
   */

  /**
   * Handle form submission for the create action
   */
  async store({ request, bouncer, auth, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(InvestmentPolicy).denies('makeInvestment')) {
        return response.forbidden({ message: 'Você não tem permissão para fazer aplicações' })
      }

      const body = request.body()
      const payload = await createApplication.validate(body)

      const application = await Application.create({
        ...payload,
      })

      return response.status(201).json({
        message: 'Aplicação feita com sucesso',
        data: application,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro na aplicação',
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, auth, response, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(InvestmentPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver esta aplicação' })
      }

      const application = await Application.query().where('id', params.id)

      return response.status(201).json({
        message: 'OK',
        data: application,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Error',
      })
    }
  }

  /**
   * Edit individual record
   */

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
