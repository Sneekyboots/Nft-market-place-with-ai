import React from "react";
import dynamic from "next/dynamic";
import "./layout.css";

const Brand = dynamic(() => import("@/components/Brand/Brand") as any, {
  ssr: true,
});

const Infobar = dynamic(
  () => import("@/components/layout/_chunk").then((module) => module.Infobar),
  {
    ssr: true,
  },
);

const Navbar = dynamic(
  () => import("@/components/layout/_chunk").then((module) => module.Navbar),
  {
    ssr: true,
  },
);

const Sidebar = dynamic(
  () => import("@/components/layout/_chunk").then((module) => module.Sidebar),
  {
    ssr: true,
  },
);

const UserCard = dynamic(
  () => import("@/components/layout/_chunk").then((module) => module.UserCard),
  {
    ssr: true,
  },
);

const Actionbar = dynamic(
  () => import("@/components/layout/_chunk").then((module) => module.Actionbar),
  {
    ssr: true,
  },
);

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      <div className="layout-container">
        <Brand />
        <Navbar />
        <UserCard />
        <Sidebar />
        <div className="child-wrap">{children}</div>
        <Infobar />
        {/* <Actionbar /> */}
      </div>
    </main>
  );
}
