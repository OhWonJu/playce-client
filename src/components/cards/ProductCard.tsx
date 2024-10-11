import React from "react";

import { AlbumInfo } from "@/types";

import Image from "../Image";
import { Button } from "../buttons";
import { Minus, Plus, Trash } from "../icons";
import { useCartStore } from "@/stores/useCartStore";

interface ProductCardProps {
  item: {
    product: AlbumInfo;
    quantity: number;
  };
}

const ProductCard = ({ item }: ProductCardProps) => {
  const { addItem, removeItem } = useCartStore();

  return (
    <div className="flex flex-col w-full min-h-[170px] justify-between border border-neutral-200 dark:border-neutral-700 p-2 rounded-lg">
      <div className="flex flex-row w-full gap-x-4">
        <Image
          imageUrl={item.product.albumArtURL}
          alt="product image"
          width={100}
          className="rounded-md shadow-md"
        />
        <div className="flex flex-col">
          <span className="font-bold">{item.product.albumName}</span>
          <span className="text-sm text-primary-foreground font-medium pb-1">
            {item.product.artist.artistName}
          </span>
          <span className="text-sm font-bold">
            {item.product.price.toLocaleString("ko-KR")}원
          </span>
        </div>
      </div>
      <div className="w-full flex flex-row justify-start">
        <div className="flex flex-row justify-between items-center min-w-[100px] border border-neutral-200 dark:border-neutral-700 rounded-md">
          <Button
            variant="plain"
            useRipple
            size="icon"
            onClick={() => removeItem(item.product.id)}
          >
            {item.quantity < 2 ? (
              <Trash className="w-[14px] h-[14px]" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
          </Button>
          <span>{item.quantity}</span>
          <Button
            variant="plain"
            useRipple
            size="icon"
            onClick={() => addItem(item.product)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
