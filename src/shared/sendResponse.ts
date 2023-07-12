import { Response } from 'express';
type IResponse<T> = {
  status: number;
  success: boolean;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};
export const sendResponse = <T>(res: Response, data: IResponse<T>): void => {
  res.status(data.status).json({
    status: data.status,
    success: data.success,
    message: data?.message || null || undefined,
    meta: data?.meta || null || undefined,
    data: data?.data || null,
  });
};
