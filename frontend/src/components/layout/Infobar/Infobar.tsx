import React, { memo } from "react";
import Card from "@/components/Card/Card";
import MiniCard from "@/components/MiniCard/MiniCard";
import "./Infobar.css";

type Creator = {
  id?: number;
  image?: string;
  name?: string;
  username?: string;
  following?: boolean;
};

type Collection = {
  id?: number;
  label: string;
  title: string;
  image: string;
  creator: Creator;
};

type Info = {
  id?: number;
  label: string;
  title: string;
  type: number;
  pinned?: boolean;
  childrens?: Collection[] | Creator[];
};

const InfoList: Info[] = [
  {
    id: 1,
    label: "trending_collection",
    title: "Trending collection",
    type: 1,
    childrens: [
      {
        id: 1,
        label: "collection_name",
        title: "Collection Name",
        image: "",
        creator: {
          username: "creator_username",
        },
      },
      {
        id: 2,
        label: "collection_name",
        title: "Collection Name",
        image: "",
        creator: {
          username: "creator_username",
        },
      },
      {
        id: 3,
        label: "collection_name",
        title: "Collection Name",
        image: "",
        creator: {
          username: "creator_username",
        },
      },
    ],
  },
  {
    id: 2,
    label: "top_creators",
    title: "Top creators",
    type: 0,
    childrens: [
      {
        id: 1,
        name: "creator name",
        username: "creator_username",
        following: false,
      },
      {
        id: 2,
        name: "creator name",
        username: "creator_username",
        following: false,
      },
      {
        id: 3,
        name: "creator name",
        username: "creator_username",
        following: false,
      },
    ],
  },
];

const Section = memo((prop: any) => {
  const info: Info = prop.info;

  return (
    <>
      {info && (
        <Card className={"section mb-5"}>
          <h2>{info.title}</h2>
          <div>
            {info.childrens && info.childrens.length ? (
              info.childrens.map((children: Collection | Creator) => (
                <MiniCard key={children.id} data={children} type={info.type} />
              ))
            ) : (
              <></>
            )}
          </div>
        </Card>
      )}
    </>
  );
});
Section.displayName = "Section";

const Infobar = () => {
  return (
    <div className="layout infobar">
      {InfoList && InfoList.length ? (
        InfoList.map((info: Info) => <Section key={info.label} info={info} />)
      ) : (
        <div>Failed to fetch collection</div>
      )}
    </div>
  );
};

export default Infobar;
