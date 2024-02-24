import React from "react";

export default function Page({ params }: { params: { user_id: string } }) {
  return <div>User ID: {params.user_id}</div>;
}
