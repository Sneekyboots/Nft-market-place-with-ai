import React from "react";

export default function Page({ params }: { params: { space_id: string } }) {
  return <div>Space ID: {params.space_id}</div>;
}
