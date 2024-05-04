interface Page {
  emoji: string
  path: string
  name: string
}

const pages: Page[] = [
  {
    emoji: '🏠',
    path: '/',
    name: 'Home'
  },
  {
    emoji: '📝',
    path: '/signin/',
    name: 'SignIn'
  },
  {
    emoji: '📝',
    path: '/signup/',
    name: 'SignUp'
  },
  {
    emoji: '🔒',
    path: '/ffmpeg/',
    name: 'FFmpeg'
  },
  {
    emoji: '🔒',
    path: '/log/',
    name: 'Log'
  }
]

export default pages
