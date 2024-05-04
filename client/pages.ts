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
  }
]

export default pages
