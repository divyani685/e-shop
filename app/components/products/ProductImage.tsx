"use client";

import {
  CartProductType,
  SelectedImg,
} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (Value: SelectedImg) => void;
}
const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full min-h-[300px] max-h-[500px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full min-h-[300px] max-h-[500px] sm:min-h-[400px]">
        {product.images.map((image: SelectedImg) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`rounded relative w-[80%] aspect-square border-teal-300
             ${
               cartProduct.selectedImg.color === image.color
                 ? "border-[1.5px]"
                 : "border-none"
             }
             ${
               cartProduct.selectedImg.color === image.color
                 ? "py-1 px-2"
                 : "py-0 px-0"
             }`}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-5 relative aspect-square">
        <Image
          fill
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
        />
      </div>
    </div>
  );
};

export default ProductImage;
