import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/stores/authStore";
import { fetchMyCoupons, MyCouponFilterType } from "@/api/myPage";
import MyCouponCard from "@/components/features/MyCouponCard";
import MyCouponCardSkeleton from "@/components/features/MyCouponCardSkeleton";
import { Search } from "lucide-react";

const filterOptions: { label: string; value: MyCouponFilterType }[] = [
  { label: "전체", value: "ALL" },
  { label: "사용가능", value: "AVAILABLE" },
  { label: "사용완료", value: "USED" },
  { label: "기간만료", value: "EXPIRED" },
];

const MyPage = () => {
  /* --- Hooks & State --- */
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [filterType, setFilterType] = useState<MyCouponFilterType>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  /* --- Auth Guard --- */
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  /* --- Data Fetching --- */
  const {
    data: myCouponsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myCoupons", filterType, searchTerm],
    queryFn: () => fetchMyCoupons(filterType, searchTerm),
    enabled: isAuthenticated,
  });

  const myCoupons = myCouponsResponse?.content || [];
  const totalCoupons = myCouponsResponse?.totalElements || 0;

  if (!isAuthenticated) return null;

  return (
    <div className="flex-1 max-w-[1200px] mx-auto p-6 bg-white min-h-screen">
      {/* MyPage Header */}
      <div className="py-12 border-b border-gray-100 mb-8">
        <h1 className="text-2xl font-bold text-black tracking-tight mb-2 uppercase">
          {user?.name || "방문자"} 님
        </h1>
        <p className="text-[14px] font-normal text-gray-500">
          보유 쿠폰{" "}
          <span className="font-black text-black underline underline-offset-4 mx-1">
            {totalCoupons}
          </span>{" "}
          개
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="sticky top-[60px] bg-white z-10 py-4 mb-10 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex space-x-10">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterType(option.value)}
                className={`pb-4 text-[13px] font-black tracking-widest uppercase border-b-2 transition-all duration-300
                  ${filterType === option.value ? "text-black border-black" : "text-gray-300 border-transparent hover:text-gray-600"}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="w-1/4 relative">
            <input
              type="text"
              placeholder="쿠폰 검색"
              className="w-full outline-none text-black placeholder-gray-300 py-2 border-b border-gray-100 focus:border-black transition-all text-[13px] font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-black hover:opacity-50">
              <Search size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <MyCouponCardSkeleton key={i} />
          ))
        ) : isError ? (
          <div className="col-span-full text-center py-40 text-red-500 font-mono text-[12px] uppercase tracking-widest">
            ERROR: Failed to load coupons.
          </div>
        ) : myCoupons.length > 0 ? (
          myCoupons.map((coupon) => (
            <MyCouponCard key={coupon.id} coupon={coupon} />
          ))
        ) : (
          <div className="col-span-full text-center py-40 border border-dashed border-gray-100">
            <p className="text-gray-300 font-bold tracking-widest uppercase text-[12px]">
              쿠폰이 존재하지 않습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
