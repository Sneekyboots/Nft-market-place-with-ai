"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { SignOutIcon } from "@/components/icons/Icons";

const SignOut = () => {
  const signOutUser = () => {
    signOut();
  };

  return (
    <li
      className="flex gap-3 items-center cursor-pointer ml-2"
      onClick={signOutUser}
    >
      <div>
        <SignOutIcon />
      </div>
      <h3>Logout</h3>
    </li>
  );
};

export default SignOut;
