import React from "react";

export default function Page({ params }: { params: { gallery_id: string } }) {
  return <div>Gallery ID: {params.gallery_id}</div>;
}
