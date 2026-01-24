import axiosInstance from "./axiosInstance";
import { ApiResponse } from "./common";

export type MyCouponFilterType = "ALL" | "AVAILABLE" | "USED" | "EXPIRED";

export interface MyCouponItem {
  id: number;
  couponId: number;
  brand: string;
  title: string;
  summary: string;
  totalQuantity: number;
  issuedQuantity: number;
  expireAt: string;
  status: MyCouponFilterType;
  imageUrl?: string;
}

interface MyCouponResponse {
  content: MyCouponItem[];
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
 * 마이페이지에서 내 쿠폰 목록을 조회하는 API 호출
 * @param status 쿠폰 상태 필터 ('ALL' | 'AVAILABLE' | 'USED' | 'EXPIRED')
 * @param search 검색어
 * @returns Promise<MyCouponResponse>
 */
export const fetchMyCoupons = async (
  status: MyCouponFilterType = "ALL",
  search: string = "",
): Promise<MyCouponResponse> => {
  const response = await axiosInstance.get<ApiResponse<MyCouponResponse>>(
    `/api/v1/my/coupons?status=${status}&search=${search}`,
  );
  return response.data.data;
};
