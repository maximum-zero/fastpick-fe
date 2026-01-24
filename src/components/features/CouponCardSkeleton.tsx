import Skeleton from "@/components/common/Skeleton";

const CouponCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 flex flex-col h-full rounded-none">
      {/* 이미지 섹션 스켈레톤) */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-50">
        <Skeleton width="w-full" height="h-full" />
      </div>

      {/* 텍스트 정보 섹션 */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4 space-y-2">
          <Skeleton width="w-16" height="h-4" />
          <Skeleton width="w-full" height="h-6" />
          <Skeleton width="w-2/3" height="h-6" />
        </div>

        <Skeleton width="w-1/2" height="h-4" className="mb-6" />

        <div className="mt-auto">
          <div className="flex justify-between items-end mb-3">
            <div className="space-y-1">
              <Skeleton width="w-12" height="h-3" />
              <Skeleton width="w-20" height="h-6" />
            </div>
            <Skeleton width="w-10" height="h-5" />
          </div>
          {/* 프로그레스 바 라인 */}
          <Skeleton width="w-full" height="h-[2px]" />
        </div>
      </div>
    </div>
  );
};

export default CouponCardSkeleton;
