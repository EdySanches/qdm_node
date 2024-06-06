import http from 'http'
import App from './app'
import 'dotenv/config'

const PORT = 3000;
const server = http.createServer(App.express)

server.listen(PORT, () => {
  console.log(new Date(), `App -- Server running on port ${PORT}.`)
})

