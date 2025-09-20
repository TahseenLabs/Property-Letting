import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/lib/db';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const [rows] = await db.query(
          "SELECT * FROM users WHERE username = ? AND password = ?",
          [credentials.username, credentials.password]
        );
        if (rows.length > 0) {
          const user = rows[0];
          // Returning user with id and role
          return { id: user.user_id, name: user.username, role: user.role };
        }
        return null; // Returning null if user isn't there
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;  
        token.role = user.role;
      }
      return token;
    }
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  }
});
