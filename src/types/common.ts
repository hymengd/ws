export interface Pagination {
    page: number;
    pageSize: number;
    total: number;
}
export interface ResponseData<T> {
    code: number;
    message: string;
    data: T;
}
// 上面test，没什么用