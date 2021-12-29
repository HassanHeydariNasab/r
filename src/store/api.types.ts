export interface ApiResponse<T = any> {
  success: boolean;
  version: {
    minimum: number;
    current: number;
  };
  statusCode: number;
  responseCode: string;
  message: string;
  results: T;
}
