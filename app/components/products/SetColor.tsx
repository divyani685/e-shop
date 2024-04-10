"use client";

import {
  CartProductType,
  SelectedImg,
} from "@/app/product/[productId]/ProductDetails";

import React from "react";

interface SetColorProps {
  images: SelectedImg[];
  cartProduct: CartProductType;
  handleColorSelect: (Value: SelectedImg) => void;
}
const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  console.log(images);
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR :</span>
        <div className="flex gap-1">
          {images.map((image) => {
            return (
              <div
                key={image.color}
                onClick={() => handleColorSelect(image)}
                className={`w-7 h-7 rounded-full border-teal-300 flex justify-center items-center ${
                  cartProduct.selectedImg.color === image.color
                    ? "border-[1.5px]"
                    : "border-none"
                }`}
              >
                <div
                  style={{ background: image.colorCode }}
                  className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
