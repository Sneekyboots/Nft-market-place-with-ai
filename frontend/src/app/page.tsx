import dynamic from "next/dynamic";
import "./styles.css";

const Navbar = dynamic(
  () => import("@/components/landing/_chunk").then((module) => module.Navbar),
  {
    ssr: true,
  },
);

const Banner = dynamic(
  () => import("@/components/landing/_chunk").then((module) => module.Banner),
  {
    ssr: true,
  },
);

const Features = dynamic(
  () => import("@/components/landing/_chunk").then((module) => module.Features),
  {
    ssr: true,
  },
);

const Content = dynamic(
  () => import("@/components/landing/_chunk").then((module) => module.Content),
  {
    ssr: true,
  },
);

const Footer = dynamic(
  () => import("@/components/landing/_chunk").then((module) => module.Footer),
  {
    ssr: true,
  },
);

const Rights = dynamic(
  () => import("@/components/landing/_chunk").then((module) => module.Rights),
  {
    ssr: true,
  },
);

export default function Landing() {
  return (
    <main className="landing content-grid">
      <Navbar />
      <Banner />
      <Features />
      <Content />
      <Footer />
      <Rights />
    </main>
  );
}
