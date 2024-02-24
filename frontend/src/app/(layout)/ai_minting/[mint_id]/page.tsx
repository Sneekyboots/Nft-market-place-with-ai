import React from "react";

export default function Page({ params }: { params: { mint_id: string } }) {
  return <div>Mint ID: {params.mint_id}</div>;
}
