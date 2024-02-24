import React, { memo } from "react";
import { twMerge } from "tailwind-merge";
import "./MiniCard.css";

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

type Prop = {
  className?: string;
  data: Collection | Creator | any;
  type: number;
};

const MiniCard = ({ className, data, type }: Prop) => {
  return (
    <div className={twMerge("mini-card", className, `type-${type}`)}>
      <div className="flex">
        <div className="card-avatar">{data.image}</div>
        <div className="card-details">
          {type ? (
            <>
              <h3>{data.title}</h3>
              <div>{data.creator.username}</div>
            </>
          ) : (
            <>
              <h3>{data.name}</h3>
              <div>{data.username}</div>
            </>
          )}
        </div>
      </div>
      <div>
        <button type="button">{type ? "View" : "Follow"}</button>
      </div>
    </div>
  );
};

export default memo(MiniCard);
