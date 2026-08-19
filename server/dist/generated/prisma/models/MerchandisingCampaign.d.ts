import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model MerchandisingCampaign
 *
 */
export type MerchandisingCampaignModel = runtime.Types.Result.DefaultSelection<Prisma.$MerchandisingCampaignPayload>;
export type AggregateMerchandisingCampaign = {
    _count: MerchandisingCampaignCountAggregateOutputType | null;
    _min: MerchandisingCampaignMinAggregateOutputType | null;
    _max: MerchandisingCampaignMaxAggregateOutputType | null;
};
export type MerchandisingCampaignMinAggregateOutputType = {
    id: string | null;
    slug: string | null;
    type: $Enums.MerchandisingCampaignType | null;
    title: string | null;
    eyebrow: string | null;
    description: string | null;
    imageUrl: string | null;
    status: $Enums.MerchandisingStatus | null;
    isFeatured: boolean | null;
    startsAt: Date | null;
    endsAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MerchandisingCampaignMaxAggregateOutputType = {
    id: string | null;
    slug: string | null;
    type: $Enums.MerchandisingCampaignType | null;
    title: string | null;
    eyebrow: string | null;
    description: string | null;
    imageUrl: string | null;
    status: $Enums.MerchandisingStatus | null;
    isFeatured: boolean | null;
    startsAt: Date | null;
    endsAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MerchandisingCampaignCountAggregateOutputType = {
    id: number;
    slug: number;
    type: number;
    title: number;
    eyebrow: number;
    description: number;
    imageUrl: number;
    status: number;
    isFeatured: number;
    startsAt: number;
    endsAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MerchandisingCampaignMinAggregateInputType = {
    id?: true;
    slug?: true;
    type?: true;
    title?: true;
    eyebrow?: true;
    description?: true;
    imageUrl?: true;
    status?: true;
    isFeatured?: true;
    startsAt?: true;
    endsAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MerchandisingCampaignMaxAggregateInputType = {
    id?: true;
    slug?: true;
    type?: true;
    title?: true;
    eyebrow?: true;
    description?: true;
    imageUrl?: true;
    status?: true;
    isFeatured?: true;
    startsAt?: true;
    endsAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MerchandisingCampaignCountAggregateInputType = {
    id?: true;
    slug?: true;
    type?: true;
    title?: true;
    eyebrow?: true;
    description?: true;
    imageUrl?: true;
    status?: true;
    isFeatured?: true;
    startsAt?: true;
    endsAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MerchandisingCampaignAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MerchandisingCampaign to aggregate.
     */
    where?: Prisma.MerchandisingCampaignWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MerchandisingCampaigns to fetch.
     */
    orderBy?: Prisma.MerchandisingCampaignOrderByWithRelationInput | Prisma.MerchandisingCampaignOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MerchandisingCampaignWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MerchandisingCampaigns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MerchandisingCampaigns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MerchandisingCampaigns
    **/
    _count?: true | MerchandisingCampaignCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MerchandisingCampaignMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MerchandisingCampaignMaxAggregateInputType;
};
export type GetMerchandisingCampaignAggregateType<T extends MerchandisingCampaignAggregateArgs> = {
    [P in keyof T & keyof AggregateMerchandisingCampaign]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMerchandisingCampaign[P]> : Prisma.GetScalarType<T[P], AggregateMerchandisingCampaign[P]>;
};
export type MerchandisingCampaignGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MerchandisingCampaignWhereInput;
    orderBy?: Prisma.MerchandisingCampaignOrderByWithAggregationInput | Prisma.MerchandisingCampaignOrderByWithAggregationInput[];
    by: Prisma.MerchandisingCampaignScalarFieldEnum[] | Prisma.MerchandisingCampaignScalarFieldEnum;
    having?: Prisma.MerchandisingCampaignScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MerchandisingCampaignCountAggregateInputType | true;
    _min?: MerchandisingCampaignMinAggregateInputType;
    _max?: MerchandisingCampaignMaxAggregateInputType;
};
export type MerchandisingCampaignGroupByOutputType = {
    id: string;
    slug: string;
    type: $Enums.MerchandisingCampaignType;
    title: string;
    eyebrow: string | null;
    description: string;
    imageUrl: string | null;
    status: $Enums.MerchandisingStatus;
    isFeatured: boolean;
    startsAt: Date | null;
    endsAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: MerchandisingCampaignCountAggregateOutputType | null;
    _min: MerchandisingCampaignMinAggregateOutputType | null;
    _max: MerchandisingCampaignMaxAggregateOutputType | null;
};
export type GetMerchandisingCampaignGroupByPayload<T extends MerchandisingCampaignGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MerchandisingCampaignGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MerchandisingCampaignGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MerchandisingCampaignGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MerchandisingCampaignGroupByOutputType[P]>;
}>>;
export type MerchandisingCampaignWhereInput = {
    AND?: Prisma.MerchandisingCampaignWhereInput | Prisma.MerchandisingCampaignWhereInput[];
    OR?: Prisma.MerchandisingCampaignWhereInput[];
    NOT?: Prisma.MerchandisingCampaignWhereInput | Prisma.MerchandisingCampaignWhereInput[];
    id?: Prisma.StringFilter<"MerchandisingCampaign"> | string;
    slug?: Prisma.StringFilter<"MerchandisingCampaign"> | string;
    type?: Prisma.EnumMerchandisingCampaignTypeFilter<"MerchandisingCampaign"> | $Enums.MerchandisingCampaignType;
    title?: Prisma.StringFilter<"MerchandisingCampaign"> | string;
    eyebrow?: Prisma.StringNullableFilter<"MerchandisingCampaign"> | string | null;
    description?: Prisma.StringFilter<"MerchandisingCampaign"> | string;
    imageUrl?: Prisma.StringNullableFilter<"MerchandisingCampaign"> | string | null;
    status?: Prisma.EnumMerchandisingStatusFilter<"MerchandisingCampaign"> | $Enums.MerchandisingStatus;
    isFeatured?: Prisma.BoolFilter<"MerchandisingCampaign"> | boolean;
    startsAt?: Prisma.DateTimeNullableFilter<"MerchandisingCampaign"> | Date | string | null;
    endsAt?: Prisma.DateTimeNullableFilter<"MerchandisingCampaign"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"MerchandisingCampaign"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MerchandisingCampaign"> | Date | string;
    products?: Prisma.MerchandisingCampaignProductListRelationFilter;
};
export type MerchandisingCampaignOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    eyebrow?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    products?: Prisma.MerchandisingCampaignProductOrderByRelationAggregateInput;
};
export type MerchandisingCampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.MerchandisingCampaignWhereInput | Prisma.MerchandisingCampaignWhereInput[];
    OR?: Prisma.MerchandisingCampaignWhereInput[];
    NOT?: Prisma.MerchandisingCampaignWhereInput | Prisma.MerchandisingCampaignWhereInput[];
    type?: Prisma.EnumMerchandisingCampaignTypeFilter<"MerchandisingCampaign"> | $Enums.MerchandisingCampaignType;
    title?: Prisma.StringFilter<"MerchandisingCampaign"> | string;
    eyebrow?: Prisma.StringNullableFilter<"MerchandisingCampaign"> | string | null;
    description?: Prisma.StringFilter<"MerchandisingCampaign"> | string;
    imageUrl?: Prisma.StringNullableFilter<"MerchandisingCampaign"> | string | null;
    status?: Prisma.EnumMerchandisingStatusFilter<"MerchandisingCampaign"> | $Enums.MerchandisingStatus;
    isFeatured?: Prisma.BoolFilter<"MerchandisingCampaign"> | boolean;
    startsAt?: Prisma.DateTimeNullableFilter<"MerchandisingCampaign"> | Date | string | null;
    endsAt?: Prisma.DateTimeNullableFilter<"MerchandisingCampaign"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"MerchandisingCampaign"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MerchandisingCampaign"> | Date | string;
    products?: Prisma.MerchandisingCampaignProductListRelationFilter;
}, "id" | "slug">;
export type MerchandisingCampaignOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    eyebrow?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MerchandisingCampaignCountOrderByAggregateInput;
    _max?: Prisma.MerchandisingCampaignMaxOrderByAggregateInput;
    _min?: Prisma.MerchandisingCampaignMinOrderByAggregateInput;
};
export type MerchandisingCampaignScalarWhereWithAggregatesInput = {
    AND?: Prisma.MerchandisingCampaignScalarWhereWithAggregatesInput | Prisma.MerchandisingCampaignScalarWhereWithAggregatesInput[];
    OR?: Prisma.MerchandisingCampaignScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MerchandisingCampaignScalarWhereWithAggregatesInput | Prisma.MerchandisingCampaignScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MerchandisingCampaign"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"MerchandisingCampaign"> | string;
    type?: Prisma.EnumMerchandisingCampaignTypeWithAggregatesFilter<"MerchandisingCampaign"> | $Enums.MerchandisingCampaignType;
    title?: Prisma.StringWithAggregatesFilter<"MerchandisingCampaign"> | string;
    eyebrow?: Prisma.StringNullableWithAggregatesFilter<"MerchandisingCampaign"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"MerchandisingCampaign"> | string;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"MerchandisingCampaign"> | string | null;
    status?: Prisma.EnumMerchandisingStatusWithAggregatesFilter<"MerchandisingCampaign"> | $Enums.MerchandisingStatus;
    isFeatured?: Prisma.BoolWithAggregatesFilter<"MerchandisingCampaign"> | boolean;
    startsAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MerchandisingCampaign"> | Date | string | null;
    endsAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MerchandisingCampaign"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MerchandisingCampaign"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MerchandisingCampaign"> | Date | string;
};
export type MerchandisingCampaignCreateInput = {
    id?: string;
    slug: string;
    type: $Enums.MerchandisingCampaignType;
    title: string;
    eyebrow?: string | null;
    description: string;
    imageUrl?: string | null;
    status?: $Enums.MerchandisingStatus;
    isFeatured?: boolean;
    startsAt?: Date | string | null;
    endsAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    products?: Prisma.MerchandisingCampaignProductCreateNestedManyWithoutCampaignInput;
};
export type MerchandisingCampaignUncheckedCreateInput = {
    id?: string;
    slug: string;
    type: $Enums.MerchandisingCampaignType;
    title: string;
    eyebrow?: string | null;
    description: string;
    imageUrl?: string | null;
    status?: $Enums.MerchandisingStatus;
    isFeatured?: boolean;
    startsAt?: Date | string | null;
    endsAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    products?: Prisma.MerchandisingCampaignProductUncheckedCreateNestedManyWithoutCampaignInput;
};
export type MerchandisingCampaignUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMerchandisingCampaignTypeFieldUpdateOperationsInput | $Enums.MerchandisingCampaignType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    eyebrow?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMerchandisingStatusFieldUpdateOperationsInput | $Enums.MerchandisingStatus;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.MerchandisingCampaignProductUpdateManyWithoutCampaignNestedInput;
};
export type MerchandisingCampaignUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMerchandisingCampaignTypeFieldUpdateOperationsInput | $Enums.MerchandisingCampaignType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    eyebrow?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMerchandisingStatusFieldUpdateOperationsInput | $Enums.MerchandisingStatus;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.MerchandisingCampaignProductUncheckedUpdateManyWithoutCampaignNestedInput;
};
export type MerchandisingCampaignCreateManyInput = {
    id?: string;
    slug: string;
    type: $Enums.MerchandisingCampaignType;
    title: string;
    eyebrow?: string | null;
    description: string;
    imageUrl?: string | null;
    status?: $Enums.MerchandisingStatus;
    isFeatured?: boolean;
    startsAt?: Date | string | null;
    endsAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MerchandisingCampaignUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMerchandisingCampaignTypeFieldUpdateOperationsInput | $Enums.MerchandisingCampaignType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    eyebrow?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMerchandisingStatusFieldUpdateOperationsInput | $Enums.MerchandisingStatus;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MerchandisingCampaignUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMerchandisingCampaignTypeFieldUpdateOperationsInput | $Enums.MerchandisingCampaignType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    eyebrow?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMerchandisingStatusFieldUpdateOperationsInput | $Enums.MerchandisingStatus;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MerchandisingCampaignCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    eyebrow?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MerchandisingCampaignMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    eyebrow?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MerchandisingCampaignMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    eyebrow?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MerchandisingCampaignScalarRelationFilter = {
    is?: Prisma.MerchandisingCampaignWhereInput;
    isNot?: Prisma.MerchandisingCampaignWhereInput;
};
export type EnumMerchandisingCampaignTypeFieldUpdateOperationsInput = {
    set?: $Enums.MerchandisingCampaignType;
};
export type EnumMerchandisingStatusFieldUpdateOperationsInput = {
    set?: $Enums.MerchandisingStatus;
};
export type MerchandisingCampaignCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.MerchandisingCampaignCreateWithoutProductsInput, Prisma.MerchandisingCampaignUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.MerchandisingCampaignCreateOrConnectWithoutProductsInput;
    connect?: Prisma.MerchandisingCampaignWhereUniqueInput;
};
export type MerchandisingCampaignUpdateOneRequiredWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.MerchandisingCampaignCreateWithoutProductsInput, Prisma.MerchandisingCampaignUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.MerchandisingCampaignCreateOrConnectWithoutProductsInput;
    upsert?: Prisma.MerchandisingCampaignUpsertWithoutProductsInput;
    connect?: Prisma.MerchandisingCampaignWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MerchandisingCampaignUpdateToOneWithWhereWithoutProductsInput, Prisma.MerchandisingCampaignUpdateWithoutProductsInput>, Prisma.MerchandisingCampaignUncheckedUpdateWithoutProductsInput>;
};
export type MerchandisingCampaignCreateWithoutProductsInput = {
    id?: string;
    slug: string;
    type: $Enums.MerchandisingCampaignType;
    title: string;
    eyebrow?: string | null;
    description: string;
    imageUrl?: string | null;
    status?: $Enums.MerchandisingStatus;
    isFeatured?: boolean;
    startsAt?: Date | string | null;
    endsAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MerchandisingCampaignUncheckedCreateWithoutProductsInput = {
    id?: string;
    slug: string;
    type: $Enums.MerchandisingCampaignType;
    title: string;
    eyebrow?: string | null;
    description: string;
    imageUrl?: string | null;
    status?: $Enums.MerchandisingStatus;
    isFeatured?: boolean;
    startsAt?: Date | string | null;
    endsAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MerchandisingCampaignCreateOrConnectWithoutProductsInput = {
    where: Prisma.MerchandisingCampaignWhereUniqueInput;
    create: Prisma.XOR<Prisma.MerchandisingCampaignCreateWithoutProductsInput, Prisma.MerchandisingCampaignUncheckedCreateWithoutProductsInput>;
};
export type MerchandisingCampaignUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.MerchandisingCampaignUpdateWithoutProductsInput, Prisma.MerchandisingCampaignUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.MerchandisingCampaignCreateWithoutProductsInput, Prisma.MerchandisingCampaignUncheckedCreateWithoutProductsInput>;
    where?: Prisma.MerchandisingCampaignWhereInput;
};
export type MerchandisingCampaignUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.MerchandisingCampaignWhereInput;
    data: Prisma.XOR<Prisma.MerchandisingCampaignUpdateWithoutProductsInput, Prisma.MerchandisingCampaignUncheckedUpdateWithoutProductsInput>;
};
export type MerchandisingCampaignUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMerchandisingCampaignTypeFieldUpdateOperationsInput | $Enums.MerchandisingCampaignType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    eyebrow?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMerchandisingStatusFieldUpdateOperationsInput | $Enums.MerchandisingStatus;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MerchandisingCampaignUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMerchandisingCampaignTypeFieldUpdateOperationsInput | $Enums.MerchandisingCampaignType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    eyebrow?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMerchandisingStatusFieldUpdateOperationsInput | $Enums.MerchandisingStatus;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type MerchandisingCampaignCountOutputType
 */
export type MerchandisingCampaignCountOutputType = {
    products: number;
};
export type MerchandisingCampaignCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | MerchandisingCampaignCountOutputTypeCountProductsArgs;
};
/**
 * MerchandisingCampaignCountOutputType without action
 */
export type MerchandisingCampaignCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaignCountOutputType
     */
    select?: Prisma.MerchandisingCampaignCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * MerchandisingCampaignCountOutputType without action
 */
export type MerchandisingCampaignCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MerchandisingCampaignProductWhereInput;
};
export type MerchandisingCampaignSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    type?: boolean;
    title?: boolean;
    eyebrow?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    status?: boolean;
    isFeatured?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    products?: boolean | Prisma.MerchandisingCampaign$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.MerchandisingCampaignCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["merchandisingCampaign"]>;
export type MerchandisingCampaignSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    type?: boolean;
    title?: boolean;
    eyebrow?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    status?: boolean;
    isFeatured?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["merchandisingCampaign"]>;
export type MerchandisingCampaignSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    type?: boolean;
    title?: boolean;
    eyebrow?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    status?: boolean;
    isFeatured?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["merchandisingCampaign"]>;
export type MerchandisingCampaignSelectScalar = {
    id?: boolean;
    slug?: boolean;
    type?: boolean;
    title?: boolean;
    eyebrow?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    status?: boolean;
    isFeatured?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MerchandisingCampaignOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "slug" | "type" | "title" | "eyebrow" | "description" | "imageUrl" | "status" | "isFeatured" | "startsAt" | "endsAt" | "createdAt" | "updatedAt", ExtArgs["result"]["merchandisingCampaign"]>;
export type MerchandisingCampaignInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | Prisma.MerchandisingCampaign$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.MerchandisingCampaignCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MerchandisingCampaignIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type MerchandisingCampaignIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $MerchandisingCampaignPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MerchandisingCampaign";
    objects: {
        products: Prisma.$MerchandisingCampaignProductPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        slug: string;
        type: $Enums.MerchandisingCampaignType;
        title: string;
        eyebrow: string | null;
        description: string;
        imageUrl: string | null;
        status: $Enums.MerchandisingStatus;
        isFeatured: boolean;
        startsAt: Date | null;
        endsAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["merchandisingCampaign"]>;
    composites: {};
};
export type MerchandisingCampaignGetPayload<S extends boolean | null | undefined | MerchandisingCampaignDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload, S>;
export type MerchandisingCampaignCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MerchandisingCampaignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MerchandisingCampaignCountAggregateInputType | true;
};
export interface MerchandisingCampaignDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MerchandisingCampaign'];
        meta: {
            name: 'MerchandisingCampaign';
        };
    };
    /**
     * Find zero or one MerchandisingCampaign that matches the filter.
     * @param {MerchandisingCampaignFindUniqueArgs} args - Arguments to find a MerchandisingCampaign
     * @example
     * // Get one MerchandisingCampaign
     * const merchandisingCampaign = await prisma.merchandisingCampaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MerchandisingCampaignFindUniqueArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MerchandisingCampaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MerchandisingCampaignFindUniqueOrThrowArgs} args - Arguments to find a MerchandisingCampaign
     * @example
     * // Get one MerchandisingCampaign
     * const merchandisingCampaign = await prisma.merchandisingCampaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MerchandisingCampaignFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MerchandisingCampaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignFindFirstArgs} args - Arguments to find a MerchandisingCampaign
     * @example
     * // Get one MerchandisingCampaign
     * const merchandisingCampaign = await prisma.merchandisingCampaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MerchandisingCampaignFindFirstArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignFindFirstArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MerchandisingCampaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignFindFirstOrThrowArgs} args - Arguments to find a MerchandisingCampaign
     * @example
     * // Get one MerchandisingCampaign
     * const merchandisingCampaign = await prisma.merchandisingCampaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MerchandisingCampaignFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MerchandisingCampaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MerchandisingCampaigns
     * const merchandisingCampaigns = await prisma.merchandisingCampaign.findMany()
     *
     * // Get first 10 MerchandisingCampaigns
     * const merchandisingCampaigns = await prisma.merchandisingCampaign.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const merchandisingCampaignWithIdOnly = await prisma.merchandisingCampaign.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MerchandisingCampaignFindManyArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MerchandisingCampaign.
     * @param {MerchandisingCampaignCreateArgs} args - Arguments to create a MerchandisingCampaign.
     * @example
     * // Create one MerchandisingCampaign
     * const MerchandisingCampaign = await prisma.merchandisingCampaign.create({
     *   data: {
     *     // ... data to create a MerchandisingCampaign
     *   }
     * })
     *
     */
    create<T extends MerchandisingCampaignCreateArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignCreateArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MerchandisingCampaigns.
     * @param {MerchandisingCampaignCreateManyArgs} args - Arguments to create many MerchandisingCampaigns.
     * @example
     * // Create many MerchandisingCampaigns
     * const merchandisingCampaign = await prisma.merchandisingCampaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MerchandisingCampaignCreateManyArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MerchandisingCampaigns and returns the data saved in the database.
     * @param {MerchandisingCampaignCreateManyAndReturnArgs} args - Arguments to create many MerchandisingCampaigns.
     * @example
     * // Create many MerchandisingCampaigns
     * const merchandisingCampaign = await prisma.merchandisingCampaign.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MerchandisingCampaigns and only return the `id`
     * const merchandisingCampaignWithIdOnly = await prisma.merchandisingCampaign.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MerchandisingCampaignCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MerchandisingCampaign.
     * @param {MerchandisingCampaignDeleteArgs} args - Arguments to delete one MerchandisingCampaign.
     * @example
     * // Delete one MerchandisingCampaign
     * const MerchandisingCampaign = await prisma.merchandisingCampaign.delete({
     *   where: {
     *     // ... filter to delete one MerchandisingCampaign
     *   }
     * })
     *
     */
    delete<T extends MerchandisingCampaignDeleteArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignDeleteArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MerchandisingCampaign.
     * @param {MerchandisingCampaignUpdateArgs} args - Arguments to update one MerchandisingCampaign.
     * @example
     * // Update one MerchandisingCampaign
     * const merchandisingCampaign = await prisma.merchandisingCampaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MerchandisingCampaignUpdateArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignUpdateArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MerchandisingCampaigns.
     * @param {MerchandisingCampaignDeleteManyArgs} args - Arguments to filter MerchandisingCampaigns to delete.
     * @example
     * // Delete a few MerchandisingCampaigns
     * const { count } = await prisma.merchandisingCampaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MerchandisingCampaignDeleteManyArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MerchandisingCampaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MerchandisingCampaigns
     * const merchandisingCampaign = await prisma.merchandisingCampaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MerchandisingCampaignUpdateManyArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MerchandisingCampaigns and returns the data updated in the database.
     * @param {MerchandisingCampaignUpdateManyAndReturnArgs} args - Arguments to update many MerchandisingCampaigns.
     * @example
     * // Update many MerchandisingCampaigns
     * const merchandisingCampaign = await prisma.merchandisingCampaign.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MerchandisingCampaigns and only return the `id`
     * const merchandisingCampaignWithIdOnly = await prisma.merchandisingCampaign.updateManyAndReturn({
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
    updateManyAndReturn<T extends MerchandisingCampaignUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MerchandisingCampaign.
     * @param {MerchandisingCampaignUpsertArgs} args - Arguments to update or create a MerchandisingCampaign.
     * @example
     * // Update or create a MerchandisingCampaign
     * const merchandisingCampaign = await prisma.merchandisingCampaign.upsert({
     *   create: {
     *     // ... data to create a MerchandisingCampaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MerchandisingCampaign we want to update
     *   }
     * })
     */
    upsert<T extends MerchandisingCampaignUpsertArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignUpsertArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MerchandisingCampaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignCountArgs} args - Arguments to filter MerchandisingCampaigns to count.
     * @example
     * // Count the number of MerchandisingCampaigns
     * const count = await prisma.merchandisingCampaign.count({
     *   where: {
     *     // ... the filter for the MerchandisingCampaigns we want to count
     *   }
     * })
    **/
    count<T extends MerchandisingCampaignCountArgs>(args?: Prisma.Subset<T, MerchandisingCampaignCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MerchandisingCampaignCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MerchandisingCampaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MerchandisingCampaignAggregateArgs>(args: Prisma.Subset<T, MerchandisingCampaignAggregateArgs>): Prisma.PrismaPromise<GetMerchandisingCampaignAggregateType<T>>;
    /**
     * Group by MerchandisingCampaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MerchandisingCampaignGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MerchandisingCampaignGroupByArgs['orderBy'];
    } : {
        orderBy?: MerchandisingCampaignGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MerchandisingCampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMerchandisingCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MerchandisingCampaign model
     */
    readonly fields: MerchandisingCampaignFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MerchandisingCampaign.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MerchandisingCampaignClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    products<T extends Prisma.MerchandisingCampaign$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MerchandisingCampaign$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the MerchandisingCampaign model
 */
export interface MerchandisingCampaignFieldRefs {
    readonly id: Prisma.FieldRef<"MerchandisingCampaign", 'String'>;
    readonly slug: Prisma.FieldRef<"MerchandisingCampaign", 'String'>;
    readonly type: Prisma.FieldRef<"MerchandisingCampaign", 'MerchandisingCampaignType'>;
    readonly title: Prisma.FieldRef<"MerchandisingCampaign", 'String'>;
    readonly eyebrow: Prisma.FieldRef<"MerchandisingCampaign", 'String'>;
    readonly description: Prisma.FieldRef<"MerchandisingCampaign", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"MerchandisingCampaign", 'String'>;
    readonly status: Prisma.FieldRef<"MerchandisingCampaign", 'MerchandisingStatus'>;
    readonly isFeatured: Prisma.FieldRef<"MerchandisingCampaign", 'Boolean'>;
    readonly startsAt: Prisma.FieldRef<"MerchandisingCampaign", 'DateTime'>;
    readonly endsAt: Prisma.FieldRef<"MerchandisingCampaign", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"MerchandisingCampaign", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MerchandisingCampaign", 'DateTime'>;
}
/**
 * MerchandisingCampaign findUnique
 */
export type MerchandisingCampaignFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignInclude<ExtArgs> | null;
    /**
     * Filter, which MerchandisingCampaign to fetch.
     */
    where: Prisma.MerchandisingCampaignWhereUniqueInput;
};
/**
 * MerchandisingCampaign findUniqueOrThrow
 */
export type MerchandisingCampaignFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignInclude<ExtArgs> | null;
    /**
     * Filter, which MerchandisingCampaign to fetch.
     */
    where: Prisma.MerchandisingCampaignWhereUniqueInput;
};
/**
 * MerchandisingCampaign findFirst
 */
export type MerchandisingCampaignFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignInclude<ExtArgs> | null;
    /**
     * Filter, which MerchandisingCampaign to fetch.
     */
    where?: Prisma.MerchandisingCampaignWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MerchandisingCampaigns to fetch.
     */
    orderBy?: Prisma.MerchandisingCampaignOrderByWithRelationInput | Prisma.MerchandisingCampaignOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MerchandisingCampaigns.
     */
    cursor?: Prisma.MerchandisingCampaignWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MerchandisingCampaigns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MerchandisingCampaigns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MerchandisingCampaigns.
     */
    distinct?: Prisma.MerchandisingCampaignScalarFieldEnum | Prisma.MerchandisingCampaignScalarFieldEnum[];
};
/**
 * MerchandisingCampaign findFirstOrThrow
 */
export type MerchandisingCampaignFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignInclude<ExtArgs> | null;
    /**
     * Filter, which MerchandisingCampaign to fetch.
     */
    where?: Prisma.MerchandisingCampaignWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MerchandisingCampaigns to fetch.
     */
    orderBy?: Prisma.MerchandisingCampaignOrderByWithRelationInput | Prisma.MerchandisingCampaignOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MerchandisingCampaigns.
     */
    cursor?: Prisma.MerchandisingCampaignWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MerchandisingCampaigns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MerchandisingCampaigns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MerchandisingCampaigns.
     */
    distinct?: Prisma.MerchandisingCampaignScalarFieldEnum | Prisma.MerchandisingCampaignScalarFieldEnum[];
};
/**
 * MerchandisingCampaign findMany
 */
export type MerchandisingCampaignFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignInclude<ExtArgs> | null;
    /**
     * Filter, which MerchandisingCampaigns to fetch.
     */
    where?: Prisma.MerchandisingCampaignWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MerchandisingCampaigns to fetch.
     */
    orderBy?: Prisma.MerchandisingCampaignOrderByWithRelationInput | Prisma.MerchandisingCampaignOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MerchandisingCampaigns.
     */
    cursor?: Prisma.MerchandisingCampaignWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MerchandisingCampaigns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MerchandisingCampaigns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MerchandisingCampaigns.
     */
    distinct?: Prisma.MerchandisingCampaignScalarFieldEnum | Prisma.MerchandisingCampaignScalarFieldEnum[];
};
/**
 * MerchandisingCampaign create
 */
export type MerchandisingCampaignCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignInclude<ExtArgs> | null;
    /**
     * The data needed to create a MerchandisingCampaign.
     */
    data: Prisma.XOR<Prisma.MerchandisingCampaignCreateInput, Prisma.MerchandisingCampaignUncheckedCreateInput>;
};
/**
 * MerchandisingCampaign createMany
 */
export type MerchandisingCampaignCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MerchandisingCampaigns.
     */
    data: Prisma.MerchandisingCampaignCreateManyInput | Prisma.MerchandisingCampaignCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MerchandisingCampaign createManyAndReturn
 */
export type MerchandisingCampaignCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * The data used to create many MerchandisingCampaigns.
     */
    data: Prisma.MerchandisingCampaignCreateManyInput | Prisma.MerchandisingCampaignCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MerchandisingCampaign update
 */
export type MerchandisingCampaignUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignInclude<ExtArgs> | null;
    /**
     * The data needed to update a MerchandisingCampaign.
     */
    data: Prisma.XOR<Prisma.MerchandisingCampaignUpdateInput, Prisma.MerchandisingCampaignUncheckedUpdateInput>;
    /**
     * Choose, which MerchandisingCampaign to update.
     */
    where: Prisma.MerchandisingCampaignWhereUniqueInput;
};
/**
 * MerchandisingCampaign updateMany
 */
export type MerchandisingCampaignUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MerchandisingCampaigns.
     */
    data: Prisma.XOR<Prisma.MerchandisingCampaignUpdateManyMutationInput, Prisma.MerchandisingCampaignUncheckedUpdateManyInput>;
    /**
     * Filter which MerchandisingCampaigns to update
     */
    where?: Prisma.MerchandisingCampaignWhereInput;
    /**
     * Limit how many MerchandisingCampaigns to update.
     */
    limit?: number;
};
/**
 * MerchandisingCampaign updateManyAndReturn
 */
export type MerchandisingCampaignUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * The data used to update MerchandisingCampaigns.
     */
    data: Prisma.XOR<Prisma.MerchandisingCampaignUpdateManyMutationInput, Prisma.MerchandisingCampaignUncheckedUpdateManyInput>;
    /**
     * Filter which MerchandisingCampaigns to update
     */
    where?: Prisma.MerchandisingCampaignWhereInput;
    /**
     * Limit how many MerchandisingCampaigns to update.
     */
    limit?: number;
};
/**
 * MerchandisingCampaign upsert
 */
export type MerchandisingCampaignUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignInclude<ExtArgs> | null;
    /**
     * The filter to search for the MerchandisingCampaign to update in case it exists.
     */
    where: Prisma.MerchandisingCampaignWhereUniqueInput;
    /**
     * In case the MerchandisingCampaign found by the `where` argument doesn't exist, create a new MerchandisingCampaign with this data.
     */
    create: Prisma.XOR<Prisma.MerchandisingCampaignCreateInput, Prisma.MerchandisingCampaignUncheckedCreateInput>;
    /**
     * In case the MerchandisingCampaign was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MerchandisingCampaignUpdateInput, Prisma.MerchandisingCampaignUncheckedUpdateInput>;
};
/**
 * MerchandisingCampaign delete
 */
export type MerchandisingCampaignDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignInclude<ExtArgs> | null;
    /**
     * Filter which MerchandisingCampaign to delete.
     */
    where: Prisma.MerchandisingCampaignWhereUniqueInput;
};
/**
 * MerchandisingCampaign deleteMany
 */
export type MerchandisingCampaignDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MerchandisingCampaigns to delete
     */
    where?: Prisma.MerchandisingCampaignWhereInput;
    /**
     * Limit how many MerchandisingCampaigns to delete.
     */
    limit?: number;
};
/**
 * MerchandisingCampaign.products
 */
export type MerchandisingCampaign$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaignProduct
     */
    select?: Prisma.MerchandisingCampaignProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaignProduct
     */
    omit?: Prisma.MerchandisingCampaignProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignProductInclude<ExtArgs> | null;
    where?: Prisma.MerchandisingCampaignProductWhereInput;
    orderBy?: Prisma.MerchandisingCampaignProductOrderByWithRelationInput | Prisma.MerchandisingCampaignProductOrderByWithRelationInput[];
    cursor?: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MerchandisingCampaignProductScalarFieldEnum | Prisma.MerchandisingCampaignProductScalarFieldEnum[];
};
/**
 * MerchandisingCampaign without action
 */
export type MerchandisingCampaignDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaign
     */
    select?: Prisma.MerchandisingCampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaign
     */
    omit?: Prisma.MerchandisingCampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignInclude<ExtArgs> | null;
};
//# sourceMappingURL=MerchandisingCampaign.d.ts.map