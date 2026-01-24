import Skeleton from "@/components/common/Skeleton";

const MyCouponCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 flex flex-col h-full rounded-none">
      {/* 이미지 섹션 스켈레톤 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
        <Skeleton width="w-full" height="h-full" />
      </div>

      {/* 텍스트 정보 섹션 */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <Skeleton width="w-16" height="h-4" />
        </div>

        <div className="space-y-2 mb-6">
          <Skeleton width="w-full" height="h-5" />
          <Skeleton width="w-2/3" height="h-5" />
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-end">
          <Skeleton width="w-12" height="h-3" />
          <Skeleton width="w-24" height="h-4" />
        </div>
      </div>

      {/* 하단 버튼 스켈레톤 */}
      <div className="w-full h-[52px] bg-gray-50 border-t border-gray-100">
        <Skeleton width="w-full" height="h-full" />
      </div>
    </div>
  );
};

export default MyCouponCardSkeleton;
