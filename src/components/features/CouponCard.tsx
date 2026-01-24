import React from "react";
import { Link } from "react-router-dom";
import { Coupon } from "@/api/coupon";

interface CouponCardProps {
  coupon: Coupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  const issuedPercentage =
    (coupon.totalQuantity > 0
      ? (coupon.issuedQuantity / coupon.totalQuantity) * 100
      : 0) || 0;
  const remainingQuantity = coupon.totalQuantity - coupon.issuedQuantity;

  /* --- 상태 배지 --- */
  const getStatusBadge = () => {
    const now = new Date();
    const start = new Date(coupon.startAt);
    const end = new Date(coupon.endAt);

    let badgeClass = "px-3 py-1.5 text-[11px] font-black tracking-tight ";
    let badgeText = "";

    if (now < start) {
      badgeClass += "bg-white text-black border-r border-b border-black";
      badgeText = "공개 예정";
    } else if (now >= start && now <= end && remainingQuantity > 0) {
      badgeClass += "bg-black text-white";
      badgeText = "발급 중";
    } else {
      badgeClass += "bg-gray-800 text-white";
      badgeText = remainingQuantity <= 0 ? "품절" : "종료";
    }

    return <span className={badgeClass}>{badgeText}</span>;
  };

  return (
    <Link to={`/coupon/${coupon.id}`} className="group block h-full">
      <div className="bg-white border border-gray-100 transition-all duration-500 relative rounded-none group-hover:border-black flex flex-col h-full">
        {/* 이미지 섹션 */}
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-50">
          <div className="absolute top-0 left-0 z-20">{getStatusBadge()}</div>
          <img
            src={coupon.imageUrl || "/images/card.jpg"}
            alt={coupon.title}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          {/* 브랜드 & 타이틀 */}
          <div className="mb-4">
            {coupon.brand && (
              <span className="text-[11px] text-black font-black tracking-tighter border-b-2 border-black pb-0.5 mb-2 inline-block">
                {coupon.brand}
              </span>
            )}
            <h3 className="text-[16px] font-bold text-black leading-tight line-clamp-2 tracking-tight uppercase">
              {coupon.title}
            </h3>
          </div>

          {coupon.summary && (
            <p className="text-gray-400 text-[12px] line-clamp-1 mb-6 font-normal">
              {coupon.summary}
            </p>
          )}

          <div className="mt-auto">
            {/* 수량 정보 */}
            <div className="flex justify-between items-end mb-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold mb-1 tracking-tighter">
                  남은 개수
                </span>
                <div className="flex items-baseline gap-0.5">
                  <span
                    className={`text-[20px] font-mono font-black tracking-tighter ${issuedPercentage >= 80 ? "text-red-500" : "text-black"}`}
                  >
                    {remainingQuantity.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-black font-bold">개</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[15px] text-black font-mono font-black italic tracking-tighter">
                  {issuedPercentage.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* 프로그레스 바 */}
            <div className="w-full bg-gray-100 h-[2px] overflow-hidden">
              <div
                className="bg-black h-full transition-all duration-1000 ease-in-out"
                style={{ width: `${issuedPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CouponCard;
