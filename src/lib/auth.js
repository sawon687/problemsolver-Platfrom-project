import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
  import bcrypt from 'bcryptjs';
import connect from "@/lib/dbconnect";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET,
  providers: [
      CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
 
      
    async authorize(credentials) { try {
  const userColl=await connect('userColl')
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

        GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
  
    
  ],


  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
  try {
 
           if (!user?.email && !user?.userEmail) {
  
                   return false;
}
      
            const newUSer={
                username:user.name,
                userEmail:user.email,
                userPhoto:user.image,
                provider:account.provider,
                providerId:account.providerAccountId,
                role:null,
                date:new Date().toISOString()
              }
            const userColl=await connect('userColl')
           const existingUser=await userColl.findOne({userEmail:user.email,providerId:account.providerAccountId})
           if(!existingUser)
           {
             

           await userColl.insertOne(newUSer)
           }

     
    return true
  } catch (error) {
    console.log('auth error',error) 
    return false
  }
  },
async redirect({ url, baseUrl }) {
  // 
  if (url.startsWith("/"))
    { 
     
   
       return `${baseUrl}${url}`; }

  // 
  else if (new URL(url).origin === baseUrl) return url;

  baseUrl
  return baseUrl;
},
async jwt({ token, user, account }) {
  if (account?.provider === 'google') {
    // DB  user read
    const userColl = await connect('userColl');
    const dbUser = await userColl.findOne({ userEmail: token.email || user?.email });

    if (dbUser) {
      token._id = dbUser._id.toString();
      token.username = dbUser.username;
      token.email = dbUser.userEmail;
      token.userPhoto = dbUser.userPhoto;
      token.role = dbUser?.role;
    }
  }

  // Credentials case
  if (user && account?.provider === 'credentials') {
    token._id = user._id.toString();
    token.username = user.username;
    token.email = user.userEmail;
    token.userPhoto = user.userPhoto;
    token.role = user?.role;
  }

  return token;
},
  async session({ session, token}) {
        if(token)
        {
              session._id= token._id;
              session.username=token.username,
              session.email=token.email;
              session.userPhoto= token.userPhoto;
              session.role= token.role;
        
        }
        
        
    return session;
  },
 
},
  pages:{
    signIn:'/Login',
    signIn:'/Register',
    signOut: '/auth/signout',
  }
}
