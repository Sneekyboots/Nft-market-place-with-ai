import NextAuth, { TokenSet } from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../../../prisma";
import { connectToDatabase } from "@/helpers/server-helpers";

const prismaClient = new PrismaClient();

const authOptions: any = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    // OAuth authentication providers...
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "username"},
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          if (!credentials.email || !credentials.password) {
            throw Error("Please enter an email and password");
          }
          // await connect();
          await connectToDatabase();
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          // const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password as string,
            );
            if (isPasswordCorrect) {
              console.log("User : ", user);
              return user;
            } else {
              throw Error("Incorrect password");
            }
          } else {
            throw Error("No user found");
          }
        } catch (error: any) {
          console.log(error);
          throw new Error(error);
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: (process.env.GITHUB_CLIENT_ID as string) ?? "",
      clientSecret: (process.env.GITHUB_CLIENT_SECRET as string) ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      } else if (
        account?.provider == "github" ||
        account?.provider == "google"
      ) {
        try {
          await connectToDatabase();
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email as string,
            },
          });
          console.log("callback", user, existingUser);
          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: user.name as string,
                email: user.email as string,
                image: user.image as string,
              },
            });
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        } finally {
          await prisma.$disconnect();
        }
      }
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: TokenSet;
      user: AuthUser;
      account: Account;
    }) {
      console.log("JWT token ", { token, user, account });
      if (user) {
        if (account?.provider == "github" || account?.provider == "google") {
          if (user.email) {
            console.log("Account provider : ", account?.provider);
            try {
              await connectToDatabase();
              const existingUser = await prisma.user.findUnique({
                where: {
                  email: user.email as string,
                },
              });
              if (existingUser) {
                user.id = existingUser.id;
              }
            } catch (error) {
              console.log(error);
            } finally {
              await prisma.$disconnect();
            }
          }
        }
        if (user.id)
          return {
            ...token,
            ...account,
            id: user.id,
          };
        return token;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: TokenSet }) {
      console.log("Session callback", { session, token });
      if (session.user && token.id)
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
          },
        };
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  // jwt: {
  //   secret: "",
  //   encryption:
  // }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import User from "@/models/User";
// import connect from "@/utils/db";

// await connect();
// const existingUser = await User.findOne({ email: user.email });

// const newUser = new User({
//   name: user.name,
//   email: user.email,
//   image: user.image,
// });

// await newUser.save();

// await connect();
// const existingUser = await User.findOne({ email: user.email });
