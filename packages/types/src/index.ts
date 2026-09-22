export type ApiSuccess<T> = {
  success: true;
  data: T;
  requestId?: string;
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    requestId?: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type CursorPage<T> = {
  items: T[];
  nextCursor: string | null;
};
