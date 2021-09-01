import { FieldTypeEnum } from "../enums/fieldType.enum";
import { FilterOperatorEnum } from "../enums/filterOperator.enum";

export class FilterInfo {
    // fieldName: string;
    // fieldType: FieldTypeEnum;
    // operator: FilterOperatorEnum;
    // value: any;

    constructor(
        public fieldName: string,
        public fieldType: FieldTypeEnum,
        public operator: FilterOperatorEnum,
        public value: any) {
    }

}
