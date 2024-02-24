"use client";
import Image from "next/image";
import { MutableRefObject, memo, useRef, useState, useId } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type Picture = {
  category: string;
  image: string;
};

type Category = {
  id: string;
  title: string;
  label: string;
  link: string;
  auth: string;
};

type Generated = {
  id: number;
  description: string;
  images: Picture[];
};

const Galary = memo(({ generatedImages }: { generatedImages: Generated[] }) => {
  return (
    <div className="flex flex-wrap p-5">
      {generatedImages && generatedImages.length ? (
        generatedImages.map((generated: Generated) => (
          <div
            className="flex flex-col w-full gap-3 mb-10 flex-wrap"
            key={generated.id}
          >
            <div className="flex gap-3">
              <h2>{generated.id}.</h2>
              <h3>{generated.description}</h3>
            </div>
            <Separator />
            <div className="flex gap-3 flex-wrap">
              {generated.images.map((image: Picture, index: number) => (
                <Card
                  className="flex flex-col gap-3 overflow-hidden max-w-[400px] min-w-[300px]"
                  key={index}
                >
                  <Image
                    src={image.image}
                    alt={`image-${index}`}
                    width={400}
                    height={400}
                  />
                  <div className="flex justify-between px-3 pb-3 items-center">
                    <span className="inline-block font-semibold">
                      {image.category}
                    </span>
                    <Button size={"sm"} type="button">
                      Use image
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center w-full">No image generated!</div>
      )}
    </div>
  );
});
Galary.displayName = "Galary";

export default function Page() {
  const textInputRef: any = useRef(null);
  const [generatedImages, setGeneratedImages]: any[] = useState([]);
  const activeCategoryList: Category[] = [];
  const imageCategorycount: MutableRefObject<number> = useRef(0);

  const categoryList: Category[] = [
    {
      id: useId(),
      title: "Realistic",
      label: "realistic",
      link: "https://api-inference.huggingface.co/models/stablediffusionapi/newrealityxl-global-nsfw",
      auth: "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",
    },
    {
      id: useId(),
      title: "Fantasy",
      label: "fantasy",
      link: "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      auth: "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",
    },
    {
      id: useId(),
      title: "Animated",
      label: "animated",
      link: "https://api-inference.huggingface.co/models/stablediffusionapi/anything-v5",
      auth: "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",
    },
    {
      id: useId(),
      title: "Cartoonish",
      label: "cartoonish",
      link: "https://api-inference.huggingface.co/models/stablediffusionapi/disney-pixar-cartoon",
      auth: "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",
    },
  ];

  const query = async (queryString: any, category: Category) => {
    try {
      if (!queryString || !queryString.length) return;
      const response = await fetch(category.link, {
        headers: {
          Authorization: `Bearer ${category.auth}`,
        },
        method: "POST",
        body: JSON.stringify(queryString),
        cache: "no-cache",
      });
      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(
          "server status: " +
            response.status +
            "\n" +
            "server response:" +
            "\n" +
            responseText,
        );
      }
      const result = await response.blob();
      return result;
    } catch (error) {
      throw new Error("failed to fetch data caused by : " + error);
    }
  };

  const blobToBase64 = (blob: any) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const generateArt = async () => {
    if (!activeCategoryList.length) {
      alert("Please select any category");
      return;
    }
    if (textInputRef?.current?.value && textInputRef?.current?.value.length) {
      const generatedImage: Generated = {
        id: ++imageCategorycount.current,
        description: textInputRef?.current?.value,
        images: [],
      };

      await new Promise((resolve: any, rejects: any) => {
        activeCategoryList.forEach(
          async (_category: Category, index: number) => {
            await query(textInputRef?.current?.value || "", _category).then(
              async (response) => {
                if (response) {
                  await blobToBase64(response).then((image: any) => {
                    generatedImage.images.push({
                      category: _category.title,
                      image,
                    });
                    // setGeneratedImages((pre: any) => [...pre, res]);
                  });
                }
              },
            );
            if (index === activeCategoryList.length - 1) {
              resolve(true);
            }
          },
        );
      }).then((res) => {
        if (res) {
          setGeneratedImages((imageList: Generated[]) => [
            generatedImage,
            ...imageList,
          ]);
          // generatedImageList.current.push(generatedImage);
          // console.log(generatedImageList);
        }
      });
    } else alert("Please provide a description");
  };

  const updateCategory = (category: Category) => {
    if (activeCategoryList.length) {
      const activeIndex = activeCategoryList.findIndex(
        (_category: Category) => _category.id === category.id,
      );
      if (activeIndex !== -1) {
        activeCategoryList.splice(activeIndex, 1);
      } else {
        activeCategoryList.push(category);
      }
    } else {
      activeCategoryList.push(category);
    }
    console.log(activeCategoryList);
  };

  return (
    <ScrollArea className="h-[90vh] w-full rounded-md border">
      <div className="flex flex-col gap-5 p-5 h-full">
        <Card className="px-5">
          <h2 className="py-5 text-xl">Generate AI images</h2>
          <Textarea placeholder="Your sentence here..." ref={textInputRef} />
          <div className="flex gap-5 justify-between my-5 items-center">
            <div>
              <b>Categories</b>
              <ToggleGroup size={"sm"} variant="outline" type="multiple">
                {categoryList.map((category: Category) => (
                  <ToggleGroupItem
                    onClick={() => updateCategory(category)}
                    key={category.id}
                    value={category.label}
                    aria-label={category.label}
                  >
                    <b>{category.title}</b>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <Button onClick={generateArt}>Generate</Button>
          </div>
        </Card>

        <Card className="h-1/2 flex-auto">
          <h2 className="p-5 text-xl">Generated Images</h2>
          <Separator />
          <Galary generatedImages={generatedImages} />
          {generatedImages && generatedImages.length ? (
            <>
              <Separator />
              <div className="flex justify-center gap-5 m-5">
                <Button>Save to galary</Button>
                <Button>Mint NFT</Button>
              </div>
            </>
          ) : (
            <></>
          )}
        </Card>
      </div>
    </ScrollArea>
  );
}
