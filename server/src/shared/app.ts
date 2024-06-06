import bodyParser from 'body-parser'
import express from 'express'
import router from './router'

/**
 * @description Default ExpressJS app class, configured to use middlewares and routes
 * @class
 */
class App {
    public express: express.Application
  
    constructor() {
      this.express = express()
      this.middlewares()
      this.routes()
    }
  
    private middlewares(): void {
      this.express.use(express.json())
      this.express.use(bodyParser.json({ limit: '50mb' })) // TODO rever 
    }
  
    private routes(): void {
      this.express.route('/').get((request, response) => {
        response.status(200).send({
          success: true,
          status: '200 Ok',
          version: '1.0.0',
        })
      })

      this.express.use(router)
    }
}

export default new App()
