import { FilterInfo } from "./filterInfo.model";
import { OrderInfo } from "./orderInfo.model";

export class QueryInfo {
    pageNumber: number;
    pageSize: number;
    filters: FilterInfo[];
    order: OrderInfo;
}
