import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

interface Coupon {
  id: number;
  title: string;
  totalQuantity: number;
  issuedQuantity: number;
  startAt: string;
  endAt: string;
}

interface CouponResponse {
  content: Coupon[];
  // Other potential fields like page, size, totalElements, etc. if they exist
}

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

const fetchCoupons = async (): Promise<Coupon[]> => {
  const response =
    await axiosInstance.get<ApiResponse<CouponResponse>>("/api/v1/coupons");
  return response.data?.data?.content || [];
};

const TestPage = () => {
  const { data, isLoading, refetch, isFetching } = useQuery<Coupon[]>({
    queryKey: ["coupons"],
    queryFn: fetchCoupons,
    enabled: false, // 초기에 비활성화
  });

  const handleFetchClick = () => {
    refetch();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">쿠폰 목록 테스트</h1>
      <button
        onClick={handleFetchClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isFetching}
      >
        {isFetching ? "불러오는 중..." : "쿠폰 정보 불러오기"}
      </button>

      <div className="mt-4">
        {isLoading && (
          // 스켈레톤 UI
          <div className="space-y-2">
            <div className="animate-pulse bg-gray-300 h-8 w-full rounded"></div>
            <div className="animate-pulse bg-gray-300 h-8 w-full rounded"></div>
            <div className="animate-pulse bg-gray-300 h-8 w-full rounded"></div>
          </div>
        )}
        {!isLoading && data && (
          <ul>
            {data.map(
              (
                coupon, // Directly map `data` now that `fetchCoupons` returns `data.content`
              ) => (
                <li key={coupon.id} className="border p-2 my-2 rounded">
                  <p>
                    <strong>{coupon.title}</strong>
                  </p>
                  <p>
                    총 수량: {coupon.totalQuantity}, 발행 수량:{" "}
                    {coupon.issuedQuantity}
                  </p>
                  <p>
                    시작일: {new Date(coupon.startAt).toLocaleDateString()},
                    종료일: {new Date(coupon.endAt).toLocaleDateString()}
                  </p>
                </li>
              ),
            )}
          </ul>
        )}
        {!isLoading && !data && (
          <p>데이터가 없습니다. 버튼을 클릭하여 쿠폰 정보를 가져오세요.</p>
        )}
      </div>
    </div>
  );
};

export default TestPage;
