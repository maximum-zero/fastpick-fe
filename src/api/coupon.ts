import axiosInstance from './axiosInstance';

// API 응답의 공통 형식
interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

// 쿠폰 필터 타입
export type CouponFilterType = 'ALL' | 'READY' | 'ISSUING' | 'CLOSED';

// 단일 쿠폰 정보
export interface Coupon {
  id: number;
  title: string;
  totalQuantity: number;
  issuedQuantity: number;
  startAt: string;
  endAt: string;
  // 추가적으로 필요한 필드를 여기에 정의합니다. (예: description, imageUrl 등)
  description?: string;
  imageUrl?: string;
}

// 쿠폰 목록 응답 형식
export interface CouponResponse {
  content: Coupon[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

/**
 * 쿠폰 목록을 조회하는 API 호출
 * @param page 페이지 번호 (0부터 시작)
 * @param search 검색어
 * @param filterType 필터 타입 ('ALL' | 'READY' | 'ISSUING' | 'CLOSED')
 * @returns Promise<CouponResponse>
 */
export const fetchCoupons = async (
  page: number,
  search: string,
  filterType: CouponFilterType,
): Promise<CouponResponse> => {
  const response = await axiosInstance.get<ApiResponse<CouponResponse>>(
    `/api/v1/coupons?page=${page}&size=10&search=${search}&filterType=${filterType}`,
  );
  return response.data.data;
};

/**
 * 특정 쿠폰의 상세 정보를 조회하는 API 호출
 * @param id 쿠폰 ID
 * @returns Promise<Coupon>
 */
export const getCouponDetail = async (id: number): Promise<Coupon> => {
  const response = await axiosInstance.get<ApiResponse<Coupon>>(
    `/api/v1/coupons/${id}`,
  );
  return response.data.data;
};
