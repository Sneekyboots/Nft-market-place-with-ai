import React, { memo } from "react";
import Link from "next/link";
import {
  MarketIcon,
  PostIcon,
  ExploreIcon,
  FavouriteIcon,
  GenerateIcon,
  MintIcon,
  ManualIcon,
  CollectionIcon,
  SpaceIcon,
  WalletIcon,
  SettingsIcon,
} from "@/components/icons/Icons";
import Mode from "@/components/Mode/Mode";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import SignOut from "@/components/SignOut/SignOut";
import "./Sidebar.css";

import dynamic from "next/dynamic";

const SignOut = dynamic(() => import("@/components/SignOut/SignOut") as any, {
  ssr: false,
});

type Menu = {
  label: string;
  title: string;
  icon?: React.ReactNode;
  link?: string;
  action?: string;
  active?: boolean;
  disabled?: boolean;
  visibility?: boolean;
  expanded?: boolean;
  collapsible?: boolean;
  children?: Menu[];
};

const MenuList: Menu[] = [
  {
    label: "marketplace",
    title: "Marketplace",
    children: [
      {
        icon: <MarketIcon />,
        label: "market",
        title: "Market",
        link: "market",
      },
      {
        icon: <PostIcon />,
        label: "posts",
        title: "Posts",
        link: "posts",
      },
      {
        icon: <ExploreIcon />,
        label: "explore",
        title: "Explore",
        link: "explore",
      },
    ],
  },
  {
    label: "generate_nft",
    title: "Generate NFT",
    children: [
      {
        icon: <GenerateIcon />,
        label: "ai_generated",
        title: "AI generated",
        link: "ai_generated",
      },
      {
        icon: <MintIcon />,
        label: "ai_minting",
        title: "AI minting",
        link: "ai_minting",
      },
      {
        icon: <ManualIcon />,
        label: "manual",
        title: "Manual",
        link: "manual",
      },
    ],
  },
  {
    label: "personal",
    title: "Personal",
    children: [
      {
        icon: <CollectionIcon />,
        label: "collection",
        title: "Collection",
        link: "collection",
      },
      {
        icon: <SpaceIcon />,
        label: "space",
        title: "Space",
        link: "space",
      },
      {
        icon: <FavouriteIcon />,
        label: "favourites",
        title: "Favourites",
        link: "favourites",
      },
    ],
  },
];

const Navigation = memo((prop: any) => {
  const nav: Menu = prop.nav;

  return (
    <>
      {nav && (
        <Link href={`${nav.link}`}>
          <li className="flex gap-3 items-center cursor-pointer">
            <div>{nav.icon}</div>
            <h3>{nav.title}</h3>
          </li>
        </Link>
      )}
    </>
  );
});
Navigation.displayName = "Navigation";

const Section = memo((prop: any) => {
  const menu: Menu = prop.menu;

  return (
    <>
      {menu && (
        <div className="section">
          <h2>{menu.title}</h2>
          <ul className="pl-2">
            {menu.children && menu.children.length ? (
              menu.children.map((nav) => (
                <Navigation key={nav.label} nav={nav} />
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
      )}
    </>
  );
});
Section.displayName = "Section";

const BottomOptions = () => {
  return (
    <div className="flex justify-evenly sticky w-full bg-secondary rounded-t-xl bottom-0">
      <Mode />
      <Separator orientation="vertical" className="bg-primary-foreground" />
      <Button
        variant="outline"
        size="icon"
        name="mode"
        type="button"
        className="bg-transparent border-none rounded-full"
      >
        <WalletIcon />
      </Button>
      <Separator orientation="vertical" className="bg-primary-foreground" />
      <Button
        variant="outline"
        size="icon"
        name="mode"
        type="button"
        className="bg-transparent border-none rounded-full"
      >
        <SettingsIcon />
      </Button>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="layout sidebar flex justify-between flex-col">
      <div className="flex flex-col gap-5 mt-10">
        {MenuList && MenuList.length ? (
          MenuList.map((menu) => <Section key={menu.label} menu={menu} />)
        ) : (
          <div>Faild to fetch menu</div>
        )}
        <SignOut />
      </div>
      <BottomOptions />
    </div>
  );
};

export default Sidebar;

// {
//   icon: <WalletIcon />,
//   label: "wallet",
//   title: "Wallet",
//   link: "wallet",
// },
// {
//   icon: <SettingsIcon />,
//   label: "settings",
//   title: "Settings",
//   link: "settings",
// },
