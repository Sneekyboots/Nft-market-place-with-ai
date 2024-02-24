import dynamic from "next/dynamic";
import "./Navbar.css";

const Brand = dynamic(() => import("@/components/Brand/Brand") as any, {
  ssr: true,
});

const Account = dynamic(
  () => import("@/components/landing/_chunk").then((module) => module.Account),
  {
    ssr: true,
  },
);
const Mode = dynamic(() => import("@/components/Mode/Mode") as any, {
  ssr: false,
});

const Navbar = () => {
  return (
    <nav className="landing-navbar">
      <Brand />
      <div className="flex gap-5">
        <Account />
        <Mode />
      </div>
    </nav>
  );
};

export default Navbar;
