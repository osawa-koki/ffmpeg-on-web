import Env from './next.config.js'
const isProd = process.env.NODE_ENV === 'production'

export default {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:3000',
  title: '🦟 FFmpeg on Web 🦟',
  description: 'FFmpeg on Web 🦟🦟🦟',
  keywords: []
}
