import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginService, registerService } from "@/service/auth/auth.service";

export const authOption = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const login = await loginService(credentials);
        if (login.statusCode === 200) {
          const modifiedLogin = {
            ...login,
            payload: {
              ...login.payload,
              accessToken: login.payload.token,
              user: {
                ...login.payload.userInfo,
                name: `${login?.payload?.userInfo?.firstName} ${login?.payload?.userInfo?.lastName}`,
              },
            },
          };
          delete modifiedLogin.payload.token;
          delete modifiedLogin.payload.userInfo;
          console.log("login :",login);
          return modifiedLogin.payload;
        } else {
          throw new Error("Login failed: " + login);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const useGoogle = true;
        const userRegister = {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          email: profile?.email,
          password: `ClassSphere280620224@${account.providerAccountId}`,
        };
        const register = await registerService(userRegister, useGoogle);
        if (register.statusCode == 200) {
          const userLogin = {
            email: userRegister?.email,
            password: userRegister?.password,
          };
          const loginWithGoogle = await loginService(userLogin);
          if (loginWithGoogle?.errorMessage) {
            return `/login?error=${loginWithGoogle?.errorMessage}`;
          } else {
            account.accessToken = loginWithGoogle?.payload?.token;
          }
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
        return { ...token, ...user };
      } else {
        return { ...token, ...user };
      }
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.name = token.name;
      session.user.email = token?.user?.email || token.email;
      session.user.image =
        token.picture ||
        "http://34.143.147.188:8083/api/v1/fileUpload?fileName=091b07e1-a51b-449b-8c69-13f252158e09.png";
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes("error")) {
        return `${baseUrl}/login`;
      }
      return baseUrl + "/dashboard";
    },
    debug: true,
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
