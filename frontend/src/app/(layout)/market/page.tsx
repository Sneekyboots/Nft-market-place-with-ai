import React from "react";
import Carousel from "@/components/Carousel/Carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DetailsCard = ({ data }: { data: any }) => {
  return (
    <>
      {data && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>card</div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

const CardList = () => {
  const cardList: any[] = [];

  return (
    <>
      {cardList && cardList.length ? (
        cardList.map((card: any, index: number) => (
          <DetailsCard key={index} data={card} />
        ))
      ) : (
        <div>No items found!</div>
      )}
    </>
  );
};

export default function Page() {
  return (
    <div className="p-4">
      <Carousel />
      <h3 className="py-5 text-2xl">Trending Collections</h3>
      <CardList />
    </div>
  );
}
