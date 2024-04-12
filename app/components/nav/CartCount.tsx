"use client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer "
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span className="absolute top-[1px] right-[-1px] bg-slate-700 text-white h-4 w-4 rounded-full flex items-center justify-center text-[10px]">
        {cartTotalQty}
      </span>
    </div>
  );
};
export default CartCount;
