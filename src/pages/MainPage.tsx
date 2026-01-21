import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchCoupons,
  Coupon,
  CouponResponse,
  CouponFilterType,
} from "@/api/coupon";
import HeroSection from "@/components/features/HeroSection";
import CouponCard from "@/components/features/CouponCard";
import { Search } from "lucide-react";
import { useInView } from "react-intersection-observer";

const filterOptions: { label: string; value: CouponFilterType }[] = [
  { label: "전체", value: "ALL" },
  { label: "예정", value: "READY" },
  { label: "진행중", value: "ISSUING" },
  { label: "종료", value: "CLOSED" },
];

const MainPage = () => {
  /* --- State --- */
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<CouponFilterType>("ALL");

  /* --- Infinite Scroll Setting --- */
  const { ref, inView } = useInView({ threshold: 0.5 });

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
  });

  /* --- Event Handlers --- */
  const handleFilterClick = (type: CouponFilterType) => setFilterType(type);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  // 엔터 또는 검색 버튼 클릭 시에만 검색 실행
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  /* --- Side Effects --- */
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  /* --- Data Processing --- */
  // 각 페이지의 content 배열을 단일 배열로 평탄화
  const allCoupons: Coupon[] = data?.pages
    ? data.pages.flatMap((page) => page.content)
    : [];

  if (isError)
    return (
      <div className="p-20 text-center text-red-500 font-mono">
        ERROR: Failed to load coupons.
      </div>
    );

  return (
    <div className="max-w-[1440px] mx-auto p-6 bg-white min-h-screen">
      <HeroSection />

      <div className="mx-auto py-12">
        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="mb-12 flex items-center border-b border-black focus-within:border-b-2 transition-all duration-200 group"
        >
          <input
            type="text"
            placeholder="검색어를 입력해주세요..."
            className="flex-grow outline-none text-black placeholder-gray-400 py-4 bg-transparent text-lg"
            value={inputValue}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="p-2 text-black hover:opacity-50"
            aria-label="검색"
          >
            <Search size={24} strokeWidth={1.5} />
          </button>
        </form>

        {/* Filter Tabs */}
        <div className="flex space-x-6 mb-8 overflow-x-auto border-b border-gray-100">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterClick(option.value)}
              className={`pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200
                ${filterType === option.value ? "text-black border-black" : "text-gray-400 border-transparent hover:text-gray-600"}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <h1 className="text-2xl font-black mb-8 tracking-tighter text-black uppercase">
          Coupon List
        </h1>

        {/* Coupon Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-10">
          {isLoading && !isFetchingNextPage ? (
            // Skeleton Loader
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-50 h-64 border border-gray-100"
              />
            ))
          ) : allCoupons.length > 0 ? (
            allCoupons.map((coupon: Coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))
          ) : (
            <p className="col-span-full text-center py-20 text-gray-400 font-light">
              찾으시는 쿠폰이 없습니다.
            </p>
          )}
        </div>

        {/* Infinite Scroll Trigger */}
        <div ref={ref} className="h-20" />
      </div>
    </div>
  );
};

export default MainPage;
