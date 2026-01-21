import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCouponDetail, Coupon } from "@/api/coupon";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const couponId = id ? parseInt(id) : undefined;

  /* --- Data Fetching --- */
  const {
    data: coupon,
    isLoading,
    isError,
  } = useQuery<Coupon>({
    queryKey: ["couponDetail", couponId],
    queryFn: () => getCouponDetail(couponId!),
    enabled: !!couponId,
  });

  if (isLoading || !coupon)
    return (
      <div className="p-20 text-center font-mono tracking-widest text-gray-300 italic">
        LOADING...
      </div>
    );

  if (isError)
    return (
      <div className="p-20 text-center text-red-500 font-mono">
        ERROR: Failed to load detail.
      </div>
    );

  return (
    <div className="max-w-[600px] mx-auto bg-white min-h-screen relative pb-32">
      {/* Hero Image */}
      <div className="w-full mt-1 aspect-[16/10] bg-gray-50 border-b border-gray-100 overflow-hidden">
        <img
          src={coupon.imageUrl || "/images/card.jpg"}
          alt={coupon.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-5 sm:px-0 transition-all duration-300">
        {/* Title Section */}
        <div className="pt-10 pb-12">
          <div className="w-10 h-[3px] bg-black mb-4" />
          <h1 className="text-[26px] sm:text-[28px] font-black text-black leading-tight tracking-tighter break-keep">
            {coupon.title}
          </h1>
          <p className="mt-5 text-[14px] text-gray-400 font-light leading-relaxed">
            {coupon.description ||
              "해당 쿠폰에 대한 상세 설명이 준비 중입니다."}
          </p>
        </div>

        {/* Info Grid */}
        <div className="border-y border-black -mx-5 sm:mx-0">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            {/* Total Quantity */}
            <div className="py-8 px-5 sm:px-0 sm:pr-4 flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                총 개수
              </span>
              <span className="text-[17px] font-black text-black font-mono">
                {coupon.totalQuantity.toLocaleString()} EA
              </span>
            </div>

            {/* Issued Status */}
            <div className="py-8 px-5 sm:pl-8 sm:px-0 flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                남은 개수
              </span>
              <span className="text-[17px] font-black text-black font-mono">
                {(
                  coupon.totalQuantity - coupon.issuedQuantity
                ).toLocaleString()}{" "}
                EA
              </span>
            </div>
          </div>

          {/* Period Section */}
          <div className="py-8 px-5 sm:px-0 border-t border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase mb-2 block tracking-tight">
              발급 기간
            </span>
            <span className="text-[14px] font-bold text-black tracking-tight font-mono">
              {new Date(coupon.startAt).toLocaleDateString()} —{" "}
              {new Date(coupon.endAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Guide Section */}
        <div className="py-12">
          <h2 className="text-[13px] font-bold mb-6 text-black uppercase tracking-widest border-b border-black w-fit pr-4 pb-1">
            INFORMATION
          </h2>
          <ul className="text-[12px] text-gray-400 space-y-5 font-light leading-relaxed">
            <li className="flex gap-4 items-start">
              <span className="text-black font-bold font-mono text-[10px] mt-0.5">
                01
              </span>
              <span>
                본 쿠폰은 계정당 1회에 한하여 발급 및 사용이 가능합니다.
              </span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-black font-bold font-mono text-[10px] mt-0.5">
                02
              </span>
              <span>
                한정 수량으로 조기 소진 시 별도의 안내 없이 종료될 수 있습니다.
              </span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-black font-bold font-mono text-[10px] mt-0.5">
                03
              </span>
              <span>
                유효기간이 지난 쿠폰은 재발행되지 않으니 기간 내 사용 바랍니다.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
        <div className="max-w-[600px] mx-auto">
          <button
            disabled={coupon.issuedQuantity >= coupon.totalQuantity}
            className={`w-full py-6 text-[15px] font-bold tracking-[0.2em] rounded-none transition-all duration-300
            ${
              coupon.issuedQuantity >= coupon.totalQuantity
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-black text-white hover:bg-[#111] active:bg-black active:scale-[0.99]"
            }`}
          >
            {coupon.issuedQuantity >= coupon.totalQuantity
              ? "SOLD OUT"
              : "COUPON DOWNLOAD"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
