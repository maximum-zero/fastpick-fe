import React from "react";
import { Link } from "react-router-dom";
import { Coupon } from "@/api/coupon";

interface CouponCardProps {
  coupon: Coupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  /* --- Data Calculation --- */
  const issuedPercentage =
    (coupon.totalQuantity > 0
      ? (coupon.issuedQuantity / coupon.totalQuantity) * 100
      : 0) || 0;
  const remainingQuantity = coupon.totalQuantity - coupon.issuedQuantity;

  /* --- Element Builders --- */
  const getStatusBadge = () => {
    const now = new Date();
    const start = new Date(coupon.startAt);
    const end = new Date(coupon.endAt);

    let badgeClass =
      "px-2 py-1 text-[10px] font-bold tracking-widest uppercase border ";
    let badgeText = "";

    if (now < start) {
      badgeClass += "bg-white text-black border-black";
      badgeText = "공개 예정";
    } else if (now >= start && now <= end && remainingQuantity > 0) {
      badgeClass += "bg-black text-white border-black";
      badgeText = "발급중";
    } else {
      badgeClass += "bg-gray-100 text-gray-400 border-gray-100";
      badgeText = "종료";
    }

    return <span className={badgeClass}>{badgeText}</span>;
  };

  const getRemainingText = () => {
    if (remainingQuantity <= 0) {
      return (
        <span className="text-gray-300 font-black italic text-[10px] font-mono">
          SOLD OUT
        </span>
      );
    }
    const colorClass = issuedPercentage >= 80 ? "text-black" : "text-gray-400";
    return (
      <span
        className={`${colorClass} font-bold text-[10px] font-mono uppercase tracking-tighter`}
      >
        {remainingQuantity.toLocaleString()} EA LEFT
      </span>
    );
  };

  return (
    <Link to={`/coupon/${coupon.id}`} className="group block">
      {/* Card Container */}
      <div className="bg-white border border-gray-100 transition-all duration-500 group-hover:border-black relative rounded-none">
        {/* Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
          <img
            src={coupon.imageUrl || "/images/card.jpg"}
            alt={coupon.title}
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">{getStatusBadge()}</div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <h3 className="text-[15px] font-black text-black mb-1 line-clamp-1 tracking-tight uppercase">
            {coupon.title}
          </h3>
          <p className="text-gray-400 text-[12px] line-clamp-1 mb-6 font-light">
            {coupon.description || "NO DESCRIPTION AVAILABLE."}
          </p>

          <div className="flex justify-between items-end mb-2">
            {getRemainingText()}
            <span className="text-[10px] text-gray-300 font-mono">
              {issuedPercentage.toFixed(0)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-50 h-[1px] overflow-hidden">
            <div
              className="bg-black h-full transition-all duration-1000 ease-in-out"
              style={{ width: `${issuedPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CouponCard;
