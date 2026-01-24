import { useState, FormEvent, useEffect, useMemo } from "react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchCoupons,
  Coupon,
  CouponResponse,
  CouponFilterType,
} from "@/api/coupon";
import HeroSection from "@/components/features/HeroSection";
import CouponCard from "@/components/features/CouponCard";
import CouponCardSkeleton from "@/components/features/CouponCardSkeleton"; // 분리된 스켈레톤 임포트
import { Search } from "lucide-react";
import { useInView } from "react-intersection-observer";

const filterOptions: { label: string; value: CouponFilterType }[] = [
  { label: "전체", value: "ALL" },
  { label: "발급 중", value: "ISSUING" },
  { label: "예정", value: "READY" },
  { label: "종료", value: "CLOSED" },
];

const MainPage = () => {
  /* --- State --- */
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<CouponFilterType>("ISSUING");

  /* --- Infinite Scroll --- */
  const { ref, inView } = useInView({ threshold: 0.1 });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    CouponResponse,
    Error,
    InfiniteData<CouponResponse>,
    [string, string, CouponFilterType],
    number
  >({
    queryKey: ["coupons", searchQuery, filterType],
    queryFn: ({ pageParam = 0 }) =>
      fetchCoupons(pageParam, searchQuery, filterType),
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
    initialPageParam: 0,
    gcTime: 0,
  });

  /* --- Event Handlers --- */
  const handleFilterClick = (type: CouponFilterType) => {
    setFilterType(type);
    window.scrollTo(0, 0);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  /* --- Side Effects --- */
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  /* --- Data Processing --- */
  const allCoupons = useMemo(() => {
    if (!data?.pages) return [];
    const flatList = data.pages.flatMap((page) => page.content);

    const seen = new Set();
    return flatList.filter((coupon) => {
      if (seen.has(coupon.id)) return false;
      seen.add(coupon.id);
      return true;
    });
  }, [data?.pages]);

  if (isError)
    return (
      <div className="p-20 text-center text-red-500 font-mono text-sm uppercase tracking-widest">
        ERROR: Failed to load data.
      </div>
    );

  return (
    <div className="max-w-[1440px] mx-auto p-6 bg-white min-h-screen">
      <HeroSection />

      <div className="mx-auto py-12">
        {/* Search Section */}
        <form
          onSubmit={handleSearchSubmit}
          className="mb-16 flex items-center border-b border-black transition-all duration-300"
        >
          <input
            type="text"
            placeholder="찾으시는 브랜드나 쿠폰을 입력하세요"
            className="flex-grow outline-none text-black placeholder-gray-300 py-5 bg-transparent text-xl font-light tracking-tight"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="p-4 text-black hover:opacity-50 transition-opacity"
          >
            <Search size={28} strokeWidth={1} />
          </button>
        </form>

        {/* Filter Tabs */}
        <div className="flex space-x-12 mb-12 overflow-x-auto no-scrollbar border-b border-gray-100">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterClick(option.value)}
              className={`pb-4 text-[13px] font-black tracking-widest uppercase border-b-2 transition-all duration-300
                ${filterType === option.value ? "text-black border-black" : "text-gray-300 border-transparent hover:text-gray-500"}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <h2 className="text-[24px] font-black mb-10 tracking-tighter text-black uppercase border-l-4 border-black pl-4">
          쿠폰 목록
        </h2>

        {/* Coupon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-16">
          {isLoading && !isFetchingNextPage ? (
            Array.from({ length: 6 }).map((_, i) => (
              <CouponCardSkeleton key={i} />
            ))
          ) : allCoupons.length > 0 ? (
            allCoupons.map((coupon: Coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))
          ) : (
            <div className="col-span-full py-40 text-center border border-dashed border-gray-100">
              <p className="text-gray-300 font-bold tracking-widest uppercase">
                쿠폰이 존재하지 않습니다.
              </p>
            </div>
          )}
        </div>

        {/* Infinite Scroll Trigger */}
        <div ref={ref} className="h-40 flex items-center justify-center">
          {isFetchingNextPage && (
            <span className="text-[10px] font-black tracking-[0.3em] uppercase animate-pulse">
              Loading More...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
