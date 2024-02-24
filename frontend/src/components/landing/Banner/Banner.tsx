import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AI_NFT from "@/assets/images/ai_nft.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner breakout">
      <div className="info-box">
        <p className="header">
          Embark on a journey with <span>ANIFIT Space</span>
        </p>
        <p className="sub-header">
          Your extraordinary NFT marketplace. Explore, collect, create, and
          showcase unique digital assets in a space where creativity knows no
          bounds.
        </p>
        <p className="info-text">
          Explore the best collections from hand-picked digital artists out
          there and find your gem here in ANIFIT Space.
        </p>
        <div className="info-buttons">
          <Button name="explore" type="button" className="info-btn selected">
            Explore
          </Button>
          <Button
            variant={"outline"}
            name="create"
            type="button"
            className="info-btn"
          >
            Create
          </Button>
        </div>
      </div>
      <div className="nft-box">
        <div className="nft-card">
          {/* <img src="logo.png" className="info-img"> */}
          <div className="card-image">
            <Image height={300} width={300} src={AI_NFT} alt={"AI_NFT"} />
          </div>
          <div className="card-info">
            <div>
              <p>RazZzoR</p>
              <p>0.21 Eth</p>
            </div>
            {/* <div className="likes">
              <div className="icon-box">
                <i className="bx bx-heart"></i>
                258
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
