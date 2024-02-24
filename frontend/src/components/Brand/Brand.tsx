"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import ANIFIT_light from "@/assets/logo/anifit_light.svg";
import ANIFIT_dark from "@/assets/logo/anifit_dark.svg";
import "./Brand.css";

const Brand = () => {
  const { theme } = useTheme();

  useEffect(() => {
    console.log("theme", theme);
  }, [theme]);

  return (
    <div className="brand">
     
      <div className="brand-name">
        <h1>Eco</h1>
        <p>Play</p>
      </div>
    </div>
  );
};

export default Brand;
