import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model PromotionCode
 *
 */
export type PromotionCodeModel = runtime.Types.Result.DefaultSelection<Prisma.$PromotionCodePayload>;
export type AggregatePromotionCode = {
    _count: PromotionCodeCountAggregateOutputType | null;
    _avg: PromotionCodeAvgAggregateOutputType | null;
    _sum: PromotionCodeSumAggregateOutputType | null;
    _min: PromotionCodeMinAggregateOutputType | null;
    _max: PromotionCodeMaxAggregateOutputType | null;
};
export type PromotionCodeAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
    minSubtotal: runtime.Decimal | null;
    usageLimit: number | null;
    usageCount: number | null;
};
export type PromotionCodeSumAggregateOutputType = {
    amount: runtime.Decimal | null;
    minSubtotal: runtime.Decimal | null;
    usageLimit: number | null;
    usageCount: number | null;
};
export type PromotionCodeMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    description: string | null;
    discountType: $Enums.PromotionDiscountType | null;
    amount: runtime.Decimal | null;
    minSubtotal: runtime.Decimal | null;
    startsAt: Date | null;
    endsAt: Date | null;
    usageLimit: number | null;
    usageCount: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PromotionCodeMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    description: string | null;
    discountType: $Enums.PromotionDiscountType | null;
    amount: runtime.Decimal | null;
    minSubtotal: runtime.Decimal | null;
    startsAt: Date | null;
    endsAt: Date | null;
    usageLimit: number | null;
    usageCount: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PromotionCodeCountAggregateOutputType = {
    id: number;
    code: number;
    description: number;
    discountType: number;
    amount: number;
    minSubtotal: number;
    startsAt: number;
    endsAt: number;
    usageLimit: number;
    usageCount: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PromotionCodeAvgAggregateInputType = {
    amount?: true;
    minSubtotal?: true;
    usageLimit?: true;
    usageCount?: true;
};
export type PromotionCodeSumAggregateInputType = {
    amount?: true;
    minSubtotal?: true;
    usageLimit?: true;
    usageCount?: true;
};
export type PromotionCodeMinAggregateInputType = {
    id?: true;
    code?: true;
    description?: true;
    discountType?: true;
    amount?: true;
    minSubtotal?: true;
    startsAt?: true;
    endsAt?: true;
    usageLimit?: true;
    usageCount?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PromotionCodeMaxAggregateInputType = {
    id?: true;
    code?: true;
    description?: true;
    discountType?: true;
    amount?: true;
    minSubtotal?: true;
    startsAt?: true;
    endsAt?: true;
    usageLimit?: true;
    usageCount?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PromotionCodeCountAggregateInputType = {
    id?: true;
    code?: true;
    description?: true;
    discountType?: true;
    amount?: true;
    minSubtotal?: true;
    startsAt?: true;
    endsAt?: true;
    usageLimit?: true;
    usageCount?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PromotionCodeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PromotionCode to aggregate.
     */
    where?: Prisma.PromotionCodeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromotionCodes to fetch.
     */
    orderBy?: Prisma.PromotionCodeOrderByWithRelationInput | Prisma.PromotionCodeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PromotionCodeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromotionCodes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromotionCodes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PromotionCodes
    **/
    _count?: true | PromotionCodeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PromotionCodeAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PromotionCodeSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PromotionCodeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PromotionCodeMaxAggregateInputType;
};
export type GetPromotionCodeAggregateType<T extends PromotionCodeAggregateArgs> = {
    [P in keyof T & keyof AggregatePromotionCode]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePromotionCode[P]> : Prisma.GetScalarType<T[P], AggregatePromotionCode[P]>;
};
export type PromotionCodeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionCodeWhereInput;
    orderBy?: Prisma.PromotionCodeOrderByWithAggregationInput | Prisma.PromotionCodeOrderByWithAggregationInput[];
    by: Prisma.PromotionCodeScalarFieldEnum[] | Prisma.PromotionCodeScalarFieldEnum;
    having?: Prisma.PromotionCodeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PromotionCodeCountAggregateInputType | true;
    _avg?: PromotionCodeAvgAggregateInputType;
    _sum?: PromotionCodeSumAggregateInputType;
    _min?: PromotionCodeMinAggregateInputType;
    _max?: PromotionCodeMaxAggregateInputType;
};
export type PromotionCodeGroupByOutputType = {
    id: string;
    code: string;
    description: string;
    discountType: $Enums.PromotionDiscountType;
    amount: runtime.Decimal;
    minSubtotal: runtime.Decimal;
    startsAt: Date | null;
    endsAt: Date | null;
    usageLimit: number | null;
    usageCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: PromotionCodeCountAggregateOutputType | null;
    _avg: PromotionCodeAvgAggregateOutputType | null;
    _sum: PromotionCodeSumAggregateOutputType | null;
    _min: PromotionCodeMinAggregateOutputType | null;
    _max: PromotionCodeMaxAggregateOutputType | null;
};
export type GetPromotionCodeGroupByPayload<T extends PromotionCodeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PromotionCodeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PromotionCodeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PromotionCodeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PromotionCodeGroupByOutputType[P]>;
}>>;
export type PromotionCodeWhereInput = {
    AND?: Prisma.PromotionCodeWhereInput | Prisma.PromotionCodeWhereInput[];
    OR?: Prisma.PromotionCodeWhereInput[];
    NOT?: Prisma.PromotionCodeWhereInput | Prisma.PromotionCodeWhereInput[];
    id?: Prisma.StringFilter<"PromotionCode"> | string;
    code?: Prisma.StringFilter<"PromotionCode"> | string;
    description?: Prisma.StringFilter<"PromotionCode"> | string;
    discountType?: Prisma.EnumPromotionDiscountTypeFilter<"PromotionCode"> | $Enums.PromotionDiscountType;
    amount?: Prisma.DecimalFilter<"PromotionCode"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minSubtotal?: Prisma.DecimalFilter<"PromotionCode"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    startsAt?: Prisma.DateTimeNullableFilter<"PromotionCode"> | Date | string | null;
    endsAt?: Prisma.DateTimeNullableFilter<"PromotionCode"> | Date | string | null;
    usageLimit?: Prisma.IntNullableFilter<"PromotionCode"> | number | null;
    usageCount?: Prisma.IntFilter<"PromotionCode"> | number;
    isActive?: Prisma.BoolFilter<"PromotionCode"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PromotionCode"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PromotionCode"> | Date | string;
};
export type PromotionCodeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    minSubtotal?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    usageLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PromotionCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.PromotionCodeWhereInput | Prisma.PromotionCodeWhereInput[];
    OR?: Prisma.PromotionCodeWhereInput[];
    NOT?: Prisma.PromotionCodeWhereInput | Prisma.PromotionCodeWhereInput[];
    description?: Prisma.StringFilter<"PromotionCode"> | string;
    discountType?: Prisma.EnumPromotionDiscountTypeFilter<"PromotionCode"> | $Enums.PromotionDiscountType;
    amount?: Prisma.DecimalFilter<"PromotionCode"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minSubtotal?: Prisma.DecimalFilter<"PromotionCode"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    startsAt?: Prisma.DateTimeNullableFilter<"PromotionCode"> | Date | string | null;
    endsAt?: Prisma.DateTimeNullableFilter<"PromotionCode"> | Date | string | null;
    usageLimit?: Prisma.IntNullableFilter<"PromotionCode"> | number | null;
    usageCount?: Prisma.IntFilter<"PromotionCode"> | number;
    isActive?: Prisma.BoolFilter<"PromotionCode"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PromotionCode"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PromotionCode"> | Date | string;
}, "id" | "code">;
export type PromotionCodeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    minSubtotal?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    usageLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PromotionCodeCountOrderByAggregateInput;
    _avg?: Prisma.PromotionCodeAvgOrderByAggregateInput;
    _max?: Prisma.PromotionCodeMaxOrderByAggregateInput;
    _min?: Prisma.PromotionCodeMinOrderByAggregateInput;
    _sum?: Prisma.PromotionCodeSumOrderByAggregateInput;
};
export type PromotionCodeScalarWhereWithAggregatesInput = {
    AND?: Prisma.PromotionCodeScalarWhereWithAggregatesInput | Prisma.PromotionCodeScalarWhereWithAggregatesInput[];
    OR?: Prisma.PromotionCodeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PromotionCodeScalarWhereWithAggregatesInput | Prisma.PromotionCodeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PromotionCode"> | string;
    code?: Prisma.StringWithAggregatesFilter<"PromotionCode"> | string;
    description?: Prisma.StringWithAggregatesFilter<"PromotionCode"> | string;
    discountType?: Prisma.EnumPromotionDiscountTypeWithAggregatesFilter<"PromotionCode"> | $Enums.PromotionDiscountType;
    amount?: Prisma.DecimalWithAggregatesFilter<"PromotionCode"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minSubtotal?: Prisma.DecimalWithAggregatesFilter<"PromotionCode"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    startsAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PromotionCode"> | Date | string | null;
    endsAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PromotionCode"> | Date | string | null;
    usageLimit?: Prisma.IntNullableWithAggregatesFilter<"PromotionCode"> | number | null;
    usageCount?: Prisma.IntWithAggregatesFilter<"PromotionCode"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"PromotionCode"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PromotionCode"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PromotionCode"> | Date | string;
};
export type PromotionCodeCreateInput = {
    id?: string;
    code: string;
    description: string;
    discountType: $Enums.PromotionDiscountType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    minSubtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    startsAt?: Date | string | null;
    endsAt?: Date | string | null;
    usageLimit?: number | null;
    usageCount?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PromotionCodeUncheckedCreateInput = {
    id?: string;
    code: string;
    description: string;
    discountType: $Enums.PromotionDiscountType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    minSubtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    startsAt?: Date | string | null;
    endsAt?: Date | string | null;
    usageLimit?: number | null;
    usageCount?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PromotionCodeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.EnumPromotionDiscountTypeFieldUpdateOperationsInput | $Enums.PromotionDiscountType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minSubtotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    startsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usageCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionCodeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.EnumPromotionDiscountTypeFieldUpdateOperationsInput | $Enums.PromotionDiscountType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minSubtotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    startsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usageCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionCodeCreateManyInput = {
    id?: string;
    code: string;
    description: string;
    discountType: $Enums.PromotionDiscountType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    minSubtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    startsAt?: Date | string | null;
    endsAt?: Date | string | null;
    usageLimit?: number | null;
    usageCount?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PromotionCodeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.EnumPromotionDiscountTypeFieldUpdateOperationsInput | $Enums.PromotionDiscountType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minSubtotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    startsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usageCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionCodeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.EnumPromotionDiscountTypeFieldUpdateOperationsInput | $Enums.PromotionDiscountType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minSubtotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    startsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usageCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionCodeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    minSubtotal?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PromotionCodeAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    minSubtotal?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
};
export type PromotionCodeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    minSubtotal?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PromotionCodeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    minSubtotal?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PromotionCodeSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    minSubtotal?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
};
export type EnumPromotionDiscountTypeFieldUpdateOperationsInput = {
    set?: $Enums.PromotionDiscountType;
};
export type PromotionCodeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    description?: boolean;
    discountType?: boolean;
    amount?: boolean;
    minSubtotal?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    usageLimit?: boolean;
    usageCount?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["promotionCode"]>;
export type PromotionCodeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    description?: boolean;
    discountType?: boolean;
    amount?: boolean;
    minSubtotal?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    usageLimit?: boolean;
    usageCount?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["promotionCode"]>;
export type PromotionCodeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    description?: boolean;
    discountType?: boolean;
    amount?: boolean;
    minSubtotal?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    usageLimit?: boolean;
    usageCount?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["promotionCode"]>;
export type PromotionCodeSelectScalar = {
    id?: boolean;
    code?: boolean;
    description?: boolean;
    discountType?: boolean;
    amount?: boolean;
    minSubtotal?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    usageLimit?: boolean;
    usageCount?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PromotionCodeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "description" | "discountType" | "amount" | "minSubtotal" | "startsAt" | "endsAt" | "usageLimit" | "usageCount" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["promotionCode"]>;
export type $PromotionCodePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PromotionCode";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        description: string;
        discountType: $Enums.PromotionDiscountType;
        amount: runtime.Decimal;
        minSubtotal: runtime.Decimal;
        startsAt: Date | null;
        endsAt: Date | null;
        usageLimit: number | null;
        usageCount: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["promotionCode"]>;
    composites: {};
};
export type PromotionCodeGetPayload<S extends boolean | null | undefined | PromotionCodeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload, S>;
export type PromotionCodeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PromotionCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PromotionCodeCountAggregateInputType | true;
};
export interface PromotionCodeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PromotionCode'];
        meta: {
            name: 'PromotionCode';
        };
    };
    /**
     * Find zero or one PromotionCode that matches the filter.
     * @param {PromotionCodeFindUniqueArgs} args - Arguments to find a PromotionCode
     * @example
     * // Get one PromotionCode
     * const promotionCode = await prisma.promotionCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromotionCodeFindUniqueArgs>(args: Prisma.SelectSubset<T, PromotionCodeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PromotionCodeClient<runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PromotionCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromotionCodeFindUniqueOrThrowArgs} args - Arguments to find a PromotionCode
     * @example
     * // Get one PromotionCode
     * const promotionCode = await prisma.promotionCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromotionCodeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PromotionCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PromotionCodeClient<runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PromotionCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionCodeFindFirstArgs} args - Arguments to find a PromotionCode
     * @example
     * // Get one PromotionCode
     * const promotionCode = await prisma.promotionCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromotionCodeFindFirstArgs>(args?: Prisma.SelectSubset<T, PromotionCodeFindFirstArgs<ExtArgs>>): Prisma.Prisma__PromotionCodeClient<runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PromotionCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionCodeFindFirstOrThrowArgs} args - Arguments to find a PromotionCode
     * @example
     * // Get one PromotionCode
     * const promotionCode = await prisma.promotionCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromotionCodeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PromotionCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PromotionCodeClient<runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PromotionCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PromotionCodes
     * const promotionCodes = await prisma.promotionCode.findMany()
     *
     * // Get first 10 PromotionCodes
     * const promotionCodes = await prisma.promotionCode.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const promotionCodeWithIdOnly = await prisma.promotionCode.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PromotionCodeFindManyArgs>(args?: Prisma.SelectSubset<T, PromotionCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PromotionCode.
     * @param {PromotionCodeCreateArgs} args - Arguments to create a PromotionCode.
     * @example
     * // Create one PromotionCode
     * const PromotionCode = await prisma.promotionCode.create({
     *   data: {
     *     // ... data to create a PromotionCode
     *   }
     * })
     *
     */
    create<T extends PromotionCodeCreateArgs>(args: Prisma.SelectSubset<T, PromotionCodeCreateArgs<ExtArgs>>): Prisma.Prisma__PromotionCodeClient<runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PromotionCodes.
     * @param {PromotionCodeCreateManyArgs} args - Arguments to create many PromotionCodes.
     * @example
     * // Create many PromotionCodes
     * const promotionCode = await prisma.promotionCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PromotionCodeCreateManyArgs>(args?: Prisma.SelectSubset<T, PromotionCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PromotionCodes and returns the data saved in the database.
     * @param {PromotionCodeCreateManyAndReturnArgs} args - Arguments to create many PromotionCodes.
     * @example
     * // Create many PromotionCodes
     * const promotionCode = await prisma.promotionCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PromotionCodes and only return the `id`
     * const promotionCodeWithIdOnly = await prisma.promotionCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PromotionCodeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PromotionCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PromotionCode.
     * @param {PromotionCodeDeleteArgs} args - Arguments to delete one PromotionCode.
     * @example
     * // Delete one PromotionCode
     * const PromotionCode = await prisma.promotionCode.delete({
     *   where: {
     *     // ... filter to delete one PromotionCode
     *   }
     * })
     *
     */
    delete<T extends PromotionCodeDeleteArgs>(args: Prisma.SelectSubset<T, PromotionCodeDeleteArgs<ExtArgs>>): Prisma.Prisma__PromotionCodeClient<runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PromotionCode.
     * @param {PromotionCodeUpdateArgs} args - Arguments to update one PromotionCode.
     * @example
     * // Update one PromotionCode
     * const promotionCode = await prisma.promotionCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PromotionCodeUpdateArgs>(args: Prisma.SelectSubset<T, PromotionCodeUpdateArgs<ExtArgs>>): Prisma.Prisma__PromotionCodeClient<runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PromotionCodes.
     * @param {PromotionCodeDeleteManyArgs} args - Arguments to filter PromotionCodes to delete.
     * @example
     * // Delete a few PromotionCodes
     * const { count } = await prisma.promotionCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PromotionCodeDeleteManyArgs>(args?: Prisma.SelectSubset<T, PromotionCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PromotionCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PromotionCodes
     * const promotionCode = await prisma.promotionCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PromotionCodeUpdateManyArgs>(args: Prisma.SelectSubset<T, PromotionCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PromotionCodes and returns the data updated in the database.
     * @param {PromotionCodeUpdateManyAndReturnArgs} args - Arguments to update many PromotionCodes.
     * @example
     * // Update many PromotionCodes
     * const promotionCode = await prisma.promotionCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PromotionCodes and only return the `id`
     * const promotionCodeWithIdOnly = await prisma.promotionCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends PromotionCodeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PromotionCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PromotionCode.
     * @param {PromotionCodeUpsertArgs} args - Arguments to update or create a PromotionCode.
     * @example
     * // Update or create a PromotionCode
     * const promotionCode = await prisma.promotionCode.upsert({
     *   create: {
     *     // ... data to create a PromotionCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PromotionCode we want to update
     *   }
     * })
     */
    upsert<T extends PromotionCodeUpsertArgs>(args: Prisma.SelectSubset<T, PromotionCodeUpsertArgs<ExtArgs>>): Prisma.Prisma__PromotionCodeClient<runtime.Types.Result.GetResult<Prisma.$PromotionCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PromotionCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionCodeCountArgs} args - Arguments to filter PromotionCodes to count.
     * @example
     * // Count the number of PromotionCodes
     * const count = await prisma.promotionCode.count({
     *   where: {
     *     // ... the filter for the PromotionCodes we want to count
     *   }
     * })
    **/
    count<T extends PromotionCodeCountArgs>(args?: Prisma.Subset<T, PromotionCodeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PromotionCodeCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PromotionCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromotionCodeAggregateArgs>(args: Prisma.Subset<T, PromotionCodeAggregateArgs>): Prisma.PrismaPromise<GetPromotionCodeAggregateType<T>>;
    /**
     * Group by PromotionCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends PromotionCodeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PromotionCodeGroupByArgs['orderBy'];
    } : {
        orderBy?: PromotionCodeGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PromotionCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromotionCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PromotionCode model
     */
    readonly fields: PromotionCodeFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PromotionCode.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PromotionCodeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the PromotionCode model
 */
export interface PromotionCodeFieldRefs {
    readonly id: Prisma.FieldRef<"PromotionCode", 'String'>;
    readonly code: Prisma.FieldRef<"PromotionCode", 'String'>;
    readonly description: Prisma.FieldRef<"PromotionCode", 'String'>;
    readonly discountType: Prisma.FieldRef<"PromotionCode", 'PromotionDiscountType'>;
    readonly amount: Prisma.FieldRef<"PromotionCode", 'Decimal'>;
    readonly minSubtotal: Prisma.FieldRef<"PromotionCode", 'Decimal'>;
    readonly startsAt: Prisma.FieldRef<"PromotionCode", 'DateTime'>;
    readonly endsAt: Prisma.FieldRef<"PromotionCode", 'DateTime'>;
    readonly usageLimit: Prisma.FieldRef<"PromotionCode", 'Int'>;
    readonly usageCount: Prisma.FieldRef<"PromotionCode", 'Int'>;
    readonly isActive: Prisma.FieldRef<"PromotionCode", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"PromotionCode", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PromotionCode", 'DateTime'>;
}
/**
 * PromotionCode findUnique
 */
export type PromotionCodeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
    /**
     * Filter, which PromotionCode to fetch.
     */
    where: Prisma.PromotionCodeWhereUniqueInput;
};
/**
 * PromotionCode findUniqueOrThrow
 */
export type PromotionCodeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
    /**
     * Filter, which PromotionCode to fetch.
     */
    where: Prisma.PromotionCodeWhereUniqueInput;
};
/**
 * PromotionCode findFirst
 */
export type PromotionCodeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
    /**
     * Filter, which PromotionCode to fetch.
     */
    where?: Prisma.PromotionCodeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromotionCodes to fetch.
     */
    orderBy?: Prisma.PromotionCodeOrderByWithRelationInput | Prisma.PromotionCodeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PromotionCodes.
     */
    cursor?: Prisma.PromotionCodeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromotionCodes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromotionCodes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PromotionCodes.
     */
    distinct?: Prisma.PromotionCodeScalarFieldEnum | Prisma.PromotionCodeScalarFieldEnum[];
};
/**
 * PromotionCode findFirstOrThrow
 */
export type PromotionCodeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
    /**
     * Filter, which PromotionCode to fetch.
     */
    where?: Prisma.PromotionCodeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromotionCodes to fetch.
     */
    orderBy?: Prisma.PromotionCodeOrderByWithRelationInput | Prisma.PromotionCodeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PromotionCodes.
     */
    cursor?: Prisma.PromotionCodeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromotionCodes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromotionCodes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PromotionCodes.
     */
    distinct?: Prisma.PromotionCodeScalarFieldEnum | Prisma.PromotionCodeScalarFieldEnum[];
};
/**
 * PromotionCode findMany
 */
export type PromotionCodeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
    /**
     * Filter, which PromotionCodes to fetch.
     */
    where?: Prisma.PromotionCodeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromotionCodes to fetch.
     */
    orderBy?: Prisma.PromotionCodeOrderByWithRelationInput | Prisma.PromotionCodeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PromotionCodes.
     */
    cursor?: Prisma.PromotionCodeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromotionCodes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromotionCodes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PromotionCodes.
     */
    distinct?: Prisma.PromotionCodeScalarFieldEnum | Prisma.PromotionCodeScalarFieldEnum[];
};
/**
 * PromotionCode create
 */
export type PromotionCodeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
    /**
     * The data needed to create a PromotionCode.
     */
    data: Prisma.XOR<Prisma.PromotionCodeCreateInput, Prisma.PromotionCodeUncheckedCreateInput>;
};
/**
 * PromotionCode createMany
 */
export type PromotionCodeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PromotionCodes.
     */
    data: Prisma.PromotionCodeCreateManyInput | Prisma.PromotionCodeCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PromotionCode createManyAndReturn
 */
export type PromotionCodeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
    /**
     * The data used to create many PromotionCodes.
     */
    data: Prisma.PromotionCodeCreateManyInput | Prisma.PromotionCodeCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PromotionCode update
 */
export type PromotionCodeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
    /**
     * The data needed to update a PromotionCode.
     */
    data: Prisma.XOR<Prisma.PromotionCodeUpdateInput, Prisma.PromotionCodeUncheckedUpdateInput>;
    /**
     * Choose, which PromotionCode to update.
     */
    where: Prisma.PromotionCodeWhereUniqueInput;
};
/**
 * PromotionCode updateMany
 */
export type PromotionCodeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PromotionCodes.
     */
    data: Prisma.XOR<Prisma.PromotionCodeUpdateManyMutationInput, Prisma.PromotionCodeUncheckedUpdateManyInput>;
    /**
     * Filter which PromotionCodes to update
     */
    where?: Prisma.PromotionCodeWhereInput;
    /**
     * Limit how many PromotionCodes to update.
     */
    limit?: number;
};
/**
 * PromotionCode updateManyAndReturn
 */
export type PromotionCodeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
    /**
     * The data used to update PromotionCodes.
     */
    data: Prisma.XOR<Prisma.PromotionCodeUpdateManyMutationInput, Prisma.PromotionCodeUncheckedUpdateManyInput>;
    /**
     * Filter which PromotionCodes to update
     */
    where?: Prisma.PromotionCodeWhereInput;
    /**
     * Limit how many PromotionCodes to update.
     */
    limit?: number;
};
/**
 * PromotionCode upsert
 */
export type PromotionCodeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
    /**
     * The filter to search for the PromotionCode to update in case it exists.
     */
    where: Prisma.PromotionCodeWhereUniqueInput;
    /**
     * In case the PromotionCode found by the `where` argument doesn't exist, create a new PromotionCode with this data.
     */
    create: Prisma.XOR<Prisma.PromotionCodeCreateInput, Prisma.PromotionCodeUncheckedCreateInput>;
    /**
     * In case the PromotionCode was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PromotionCodeUpdateInput, Prisma.PromotionCodeUncheckedUpdateInput>;
};
/**
 * PromotionCode delete
 */
export type PromotionCodeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
    /**
     * Filter which PromotionCode to delete.
     */
    where: Prisma.PromotionCodeWhereUniqueInput;
};
/**
 * PromotionCode deleteMany
 */
export type PromotionCodeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PromotionCodes to delete
     */
    where?: Prisma.PromotionCodeWhereInput;
    /**
     * Limit how many PromotionCodes to delete.
     */
    limit?: number;
};
/**
 * PromotionCode without action
 */
export type PromotionCodeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCode
     */
    select?: Prisma.PromotionCodeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromotionCode
     */
    omit?: Prisma.PromotionCodeOmit<ExtArgs> | null;
};
//# sourceMappingURL=PromotionCode.d.ts.map