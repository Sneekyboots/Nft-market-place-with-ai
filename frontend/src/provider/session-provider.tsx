"use client";

import { SessionProvider } from "next-auth/react";
export default SessionProvider;

// import { Session } from "next-auth";

// import { ReactNode } from "react";

// export default function NextAuthProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   return <SessionProvider>{children}</SessionProvider>;
// }

// "use client";

// import { SessionProvider } from "next-auth/react";
// import type { AppProps } from "next/app";

// export default function AuthProvider({
//   Component,
//   pageProps: { session, ...pageProps },
// }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }
