export interface APIError<TData = unknown> {
  statusCode: number;
  data: TData;
}
