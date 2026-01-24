import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MyCouponItem } from "@/api/myPage";

interface MyCouponCardProps {
  coupon: MyCouponItem;
}

const MyCouponCard: React.FC<MyCouponCardProps> = ({ coupon }) => {
  const isActionable = coupon.status === "AVAILABLE";
  const isExpired = coupon.status === "EXPIRED";
  const isUsed = coupon.status === "USED";
  const isClickDisabled = isUsed || isExpired;

  const cardClasses = `bg-white border transition-all duration-500 flex flex-col h-full rounded-none
    ${isClickDisabled ? "border-gray-100 opacity-60" : "border-gray-200 hover:border-black shadow-sm hover:shadow-none"}`;

  const StatusBadge = () => {
    if (!isActionable) return null;
    return (
      <div className="absolute top-0 left-0 bg-black text-white px-3 py-1.5 text-[10px] font-bold tracking-tight z-10">
        사용 가능
      </div>
    );
  };

  const CardContent = (
    <div className="flex flex-col flex-1">
      {/* 이미지 섹션 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
        <StatusBadge />
        <img
          src={coupon.imageUrl || "/images/card.jpg"}
          alt={coupon.title}
          className={`w-full h-full object-cover transition-all duration-700 
            ${isClickDisabled ? "grayscale" : "grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105"}`}
        />
        {/* 상태 오버레이 */}
        {isClickDisabled && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center backdrop-blur-[1px]">
            <span className="text-black font-black text-[15px] tracking-widest border-2 border-black px-5 py-2">
              {isUsed ? "사용 완료" : "기간 만료"}
            </span>
          </div>
        )}
      </div>

      {/* 텍스트 정보 섹션 */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[11px] text-black font-black tracking-tighter border-b border-black pb-0.5">
            {coupon.brand}
          </span>
        </div>

        <h3 className="text-[16px] font-bold text-black mb-2 leading-tight line-clamp-2 tracking-tight">
          {coupon.title}
        </h3>
        <p className="text-[12px] text-gray-400 font-normal line-clamp-1 mb-6">
          {coupon.summary}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-50">
          <div className="flex justify-between items-end">
            <span className="text-[10px] text-gray-400 font-medium">
              유효기간
            </span>
            <span className="text-[12px] text-black font-mono font-bold tracking-tighter">
              {coupon.expireAt.split("T")[0].replace(/-/g, ".")} 까지
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`group ${cardClasses}`}>
      {isClickDisabled ? (
        <div className="flex-1 cursor-default">{CardContent}</div>
      ) : (
        <Link to={`/coupon/${coupon.couponId}`} className="flex-1 block">
          {CardContent}
        </Link>
      )}

      {/* 하단 액션 버튼 */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toast("현재 준비 중인 서비스입니다.", {
            style: {
              borderRadius: "0px",
              background: "#000",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "bold",
            },
          });
        }}
        disabled={!isActionable}
        className={`w-full py-4 text-[13px] font-bold tracking-tight transition-all duration-300 rounded-none
          ${
            isActionable
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-50 text-gray-300 cursor-not-allowed border-t border-gray-100"
          }`}
      >
        사용하기
      </button>
    </div>
  );
};

export default MyCouponCard;
