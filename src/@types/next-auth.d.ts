import { User } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user'];
  }

  interface User {
    id: string
    name: string
    email: string
    username: string
    avatar_url: string
  }
}
