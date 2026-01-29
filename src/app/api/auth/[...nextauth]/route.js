import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
  import bcrypt from 'bcryptjs';
import connect from "@/lib/dbconnect";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
      CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
    async authorize(credentials) {
  try {
    const userColl = await connect('userColl');
    const user = await userColl.findOne({ userEmail: credentials.email });
     console.log('user',user)
    if (!user) return null;

    const isMatch = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isMatch) return null;

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

    }),
    
  ],


  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    return true
  },
  async redirect({ url, baseUrl }) {
    return baseUrl
  },
  async session({ session, token }) {
        if(token)
        {

         session.user = {
              _id: token._id,
                 name: token.name,
              email: token.email,
            userPhoto: token.userPhoto,
              role: token.role,
          };
        }
    return session;
  },
  async jwt({ token, user }) {
     if (user) {
      token._id=user._id.toString()
    token.name = user.name;
    token.email = user.email;
    token.userPhoto = user.userPhoto;
    token.role=user.role
  }
    return token
  },
},
  pages:{
    signIn:'/Login',
    signOut: '/auth/signout',
  }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };