import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model MerchandisingCampaignProduct
 *
 */
export type MerchandisingCampaignProductModel = runtime.Types.Result.DefaultSelection<Prisma.$MerchandisingCampaignProductPayload>;
export type AggregateMerchandisingCampaignProduct = {
    _count: MerchandisingCampaignProductCountAggregateOutputType | null;
    _avg: MerchandisingCampaignProductAvgAggregateOutputType | null;
    _sum: MerchandisingCampaignProductSumAggregateOutputType | null;
    _min: MerchandisingCampaignProductMinAggregateOutputType | null;
    _max: MerchandisingCampaignProductMaxAggregateOutputType | null;
};
export type MerchandisingCampaignProductAvgAggregateOutputType = {
    sortOrder: number | null;
};
export type MerchandisingCampaignProductSumAggregateOutputType = {
    sortOrder: number | null;
};
export type MerchandisingCampaignProductMinAggregateOutputType = {
    campaignId: string | null;
    productId: string | null;
    sortOrder: number | null;
};
export type MerchandisingCampaignProductMaxAggregateOutputType = {
    campaignId: string | null;
    productId: string | null;
    sortOrder: number | null;
};
export type MerchandisingCampaignProductCountAggregateOutputType = {
    campaignId: number;
    productId: number;
    sortOrder: number;
    _all: number;
};
export type MerchandisingCampaignProductAvgAggregateInputType = {
    sortOrder?: true;
};
export type MerchandisingCampaignProductSumAggregateInputType = {
    sortOrder?: true;
};
export type MerchandisingCampaignProductMinAggregateInputType = {
    campaignId?: true;
    productId?: true;
    sortOrder?: true;
};
export type MerchandisingCampaignProductMaxAggregateInputType = {
    campaignId?: true;
    productId?: true;
    sortOrder?: true;
};
export type MerchandisingCampaignProductCountAggregateInputType = {
    campaignId?: true;
    productId?: true;
    sortOrder?: true;
    _all?: true;
};
export type MerchandisingCampaignProductAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MerchandisingCampaignProduct to aggregate.
     */
    where?: Prisma.MerchandisingCampaignProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MerchandisingCampaignProducts to fetch.
     */
    orderBy?: Prisma.MerchandisingCampaignProductOrderByWithRelationInput | Prisma.MerchandisingCampaignProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MerchandisingCampaignProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MerchandisingCampaignProducts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MerchandisingCampaignProducts
    **/
    _count?: true | MerchandisingCampaignProductCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MerchandisingCampaignProductAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MerchandisingCampaignProductSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MerchandisingCampaignProductMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MerchandisingCampaignProductMaxAggregateInputType;
};
export type GetMerchandisingCampaignProductAggregateType<T extends MerchandisingCampaignProductAggregateArgs> = {
    [P in keyof T & keyof AggregateMerchandisingCampaignProduct]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMerchandisingCampaignProduct[P]> : Prisma.GetScalarType<T[P], AggregateMerchandisingCampaignProduct[P]>;
};
export type MerchandisingCampaignProductGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MerchandisingCampaignProductWhereInput;
    orderBy?: Prisma.MerchandisingCampaignProductOrderByWithAggregationInput | Prisma.MerchandisingCampaignProductOrderByWithAggregationInput[];
    by: Prisma.MerchandisingCampaignProductScalarFieldEnum[] | Prisma.MerchandisingCampaignProductScalarFieldEnum;
    having?: Prisma.MerchandisingCampaignProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MerchandisingCampaignProductCountAggregateInputType | true;
    _avg?: MerchandisingCampaignProductAvgAggregateInputType;
    _sum?: MerchandisingCampaignProductSumAggregateInputType;
    _min?: MerchandisingCampaignProductMinAggregateInputType;
    _max?: MerchandisingCampaignProductMaxAggregateInputType;
};
export type MerchandisingCampaignProductGroupByOutputType = {
    campaignId: string;
    productId: string;
    sortOrder: number;
    _count: MerchandisingCampaignProductCountAggregateOutputType | null;
    _avg: MerchandisingCampaignProductAvgAggregateOutputType | null;
    _sum: MerchandisingCampaignProductSumAggregateOutputType | null;
    _min: MerchandisingCampaignProductMinAggregateOutputType | null;
    _max: MerchandisingCampaignProductMaxAggregateOutputType | null;
};
export type GetMerchandisingCampaignProductGroupByPayload<T extends MerchandisingCampaignProductGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MerchandisingCampaignProductGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MerchandisingCampaignProductGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MerchandisingCampaignProductGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MerchandisingCampaignProductGroupByOutputType[P]>;
}>>;
export type MerchandisingCampaignProductWhereInput = {
    AND?: Prisma.MerchandisingCampaignProductWhereInput | Prisma.MerchandisingCampaignProductWhereInput[];
    OR?: Prisma.MerchandisingCampaignProductWhereInput[];
    NOT?: Prisma.MerchandisingCampaignProductWhereInput | Prisma.MerchandisingCampaignProductWhereInput[];
    campaignId?: Prisma.StringFilter<"MerchandisingCampaignProduct"> | string;
    productId?: Prisma.StringFilter<"MerchandisingCampaignProduct"> | string;
    sortOrder?: Prisma.IntFilter<"MerchandisingCampaignProduct"> | number;
    campaign?: Prisma.XOR<Prisma.MerchandisingCampaignScalarRelationFilter, Prisma.MerchandisingCampaignWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type MerchandisingCampaignProductOrderByWithRelationInput = {
    campaignId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    campaign?: Prisma.MerchandisingCampaignOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type MerchandisingCampaignProductWhereUniqueInput = Prisma.AtLeast<{
    campaignId_productId?: Prisma.MerchandisingCampaignProductCampaignIdProductIdCompoundUniqueInput;
    AND?: Prisma.MerchandisingCampaignProductWhereInput | Prisma.MerchandisingCampaignProductWhereInput[];
    OR?: Prisma.MerchandisingCampaignProductWhereInput[];
    NOT?: Prisma.MerchandisingCampaignProductWhereInput | Prisma.MerchandisingCampaignProductWhereInput[];
    campaignId?: Prisma.StringFilter<"MerchandisingCampaignProduct"> | string;
    productId?: Prisma.StringFilter<"MerchandisingCampaignProduct"> | string;
    sortOrder?: Prisma.IntFilter<"MerchandisingCampaignProduct"> | number;
    campaign?: Prisma.XOR<Prisma.MerchandisingCampaignScalarRelationFilter, Prisma.MerchandisingCampaignWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "campaignId_productId">;
export type MerchandisingCampaignProductOrderByWithAggregationInput = {
    campaignId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    _count?: Prisma.MerchandisingCampaignProductCountOrderByAggregateInput;
    _avg?: Prisma.MerchandisingCampaignProductAvgOrderByAggregateInput;
    _max?: Prisma.MerchandisingCampaignProductMaxOrderByAggregateInput;
    _min?: Prisma.MerchandisingCampaignProductMinOrderByAggregateInput;
    _sum?: Prisma.MerchandisingCampaignProductSumOrderByAggregateInput;
};
export type MerchandisingCampaignProductScalarWhereWithAggregatesInput = {
    AND?: Prisma.MerchandisingCampaignProductScalarWhereWithAggregatesInput | Prisma.MerchandisingCampaignProductScalarWhereWithAggregatesInput[];
    OR?: Prisma.MerchandisingCampaignProductScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MerchandisingCampaignProductScalarWhereWithAggregatesInput | Prisma.MerchandisingCampaignProductScalarWhereWithAggregatesInput[];
    campaignId?: Prisma.StringWithAggregatesFilter<"MerchandisingCampaignProduct"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"MerchandisingCampaignProduct"> | string;
    sortOrder?: Prisma.IntWithAggregatesFilter<"MerchandisingCampaignProduct"> | number;
};
export type MerchandisingCampaignProductCreateInput = {
    sortOrder?: number;
    campaign: Prisma.MerchandisingCampaignCreateNestedOneWithoutProductsInput;
    product: Prisma.ProductCreateNestedOneWithoutCampaignItemsInput;
};
export type MerchandisingCampaignProductUncheckedCreateInput = {
    campaignId: string;
    productId: string;
    sortOrder?: number;
};
export type MerchandisingCampaignProductUpdateInput = {
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    campaign?: Prisma.MerchandisingCampaignUpdateOneRequiredWithoutProductsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutCampaignItemsNestedInput;
};
export type MerchandisingCampaignProductUncheckedUpdateInput = {
    campaignId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MerchandisingCampaignProductCreateManyInput = {
    campaignId: string;
    productId: string;
    sortOrder?: number;
};
export type MerchandisingCampaignProductUpdateManyMutationInput = {
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MerchandisingCampaignProductUncheckedUpdateManyInput = {
    campaignId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MerchandisingCampaignProductListRelationFilter = {
    every?: Prisma.MerchandisingCampaignProductWhereInput;
    some?: Prisma.MerchandisingCampaignProductWhereInput;
    none?: Prisma.MerchandisingCampaignProductWhereInput;
};
export type MerchandisingCampaignProductOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MerchandisingCampaignProductCampaignIdProductIdCompoundUniqueInput = {
    campaignId: string;
    productId: string;
};
export type MerchandisingCampaignProductCountOrderByAggregateInput = {
    campaignId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type MerchandisingCampaignProductAvgOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type MerchandisingCampaignProductMaxOrderByAggregateInput = {
    campaignId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type MerchandisingCampaignProductMinOrderByAggregateInput = {
    campaignId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type MerchandisingCampaignProductSumOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type MerchandisingCampaignProductCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutProductInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutProductInput> | Prisma.MerchandisingCampaignProductCreateWithoutProductInput[] | Prisma.MerchandisingCampaignProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.MerchandisingCampaignProductCreateOrConnectWithoutProductInput | Prisma.MerchandisingCampaignProductCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.MerchandisingCampaignProductCreateManyProductInputEnvelope;
    connect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
};
export type MerchandisingCampaignProductUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutProductInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutProductInput> | Prisma.MerchandisingCampaignProductCreateWithoutProductInput[] | Prisma.MerchandisingCampaignProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.MerchandisingCampaignProductCreateOrConnectWithoutProductInput | Prisma.MerchandisingCampaignProductCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.MerchandisingCampaignProductCreateManyProductInputEnvelope;
    connect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
};
export type MerchandisingCampaignProductUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutProductInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutProductInput> | Prisma.MerchandisingCampaignProductCreateWithoutProductInput[] | Prisma.MerchandisingCampaignProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.MerchandisingCampaignProductCreateOrConnectWithoutProductInput | Prisma.MerchandisingCampaignProductCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.MerchandisingCampaignProductUpsertWithWhereUniqueWithoutProductInput | Prisma.MerchandisingCampaignProductUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.MerchandisingCampaignProductCreateManyProductInputEnvelope;
    set?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    disconnect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    delete?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    connect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    update?: Prisma.MerchandisingCampaignProductUpdateWithWhereUniqueWithoutProductInput | Prisma.MerchandisingCampaignProductUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.MerchandisingCampaignProductUpdateManyWithWhereWithoutProductInput | Prisma.MerchandisingCampaignProductUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.MerchandisingCampaignProductScalarWhereInput | Prisma.MerchandisingCampaignProductScalarWhereInput[];
};
export type MerchandisingCampaignProductUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutProductInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutProductInput> | Prisma.MerchandisingCampaignProductCreateWithoutProductInput[] | Prisma.MerchandisingCampaignProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.MerchandisingCampaignProductCreateOrConnectWithoutProductInput | Prisma.MerchandisingCampaignProductCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.MerchandisingCampaignProductUpsertWithWhereUniqueWithoutProductInput | Prisma.MerchandisingCampaignProductUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.MerchandisingCampaignProductCreateManyProductInputEnvelope;
    set?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    disconnect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    delete?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    connect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    update?: Prisma.MerchandisingCampaignProductUpdateWithWhereUniqueWithoutProductInput | Prisma.MerchandisingCampaignProductUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.MerchandisingCampaignProductUpdateManyWithWhereWithoutProductInput | Prisma.MerchandisingCampaignProductUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.MerchandisingCampaignProductScalarWhereInput | Prisma.MerchandisingCampaignProductScalarWhereInput[];
};
export type MerchandisingCampaignProductCreateNestedManyWithoutCampaignInput = {
    create?: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutCampaignInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutCampaignInput> | Prisma.MerchandisingCampaignProductCreateWithoutCampaignInput[] | Prisma.MerchandisingCampaignProductUncheckedCreateWithoutCampaignInput[];
    connectOrCreate?: Prisma.MerchandisingCampaignProductCreateOrConnectWithoutCampaignInput | Prisma.MerchandisingCampaignProductCreateOrConnectWithoutCampaignInput[];
    createMany?: Prisma.MerchandisingCampaignProductCreateManyCampaignInputEnvelope;
    connect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
};
export type MerchandisingCampaignProductUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutCampaignInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutCampaignInput> | Prisma.MerchandisingCampaignProductCreateWithoutCampaignInput[] | Prisma.MerchandisingCampaignProductUncheckedCreateWithoutCampaignInput[];
    connectOrCreate?: Prisma.MerchandisingCampaignProductCreateOrConnectWithoutCampaignInput | Prisma.MerchandisingCampaignProductCreateOrConnectWithoutCampaignInput[];
    createMany?: Prisma.MerchandisingCampaignProductCreateManyCampaignInputEnvelope;
    connect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
};
export type MerchandisingCampaignProductUpdateManyWithoutCampaignNestedInput = {
    create?: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutCampaignInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutCampaignInput> | Prisma.MerchandisingCampaignProductCreateWithoutCampaignInput[] | Prisma.MerchandisingCampaignProductUncheckedCreateWithoutCampaignInput[];
    connectOrCreate?: Prisma.MerchandisingCampaignProductCreateOrConnectWithoutCampaignInput | Prisma.MerchandisingCampaignProductCreateOrConnectWithoutCampaignInput[];
    upsert?: Prisma.MerchandisingCampaignProductUpsertWithWhereUniqueWithoutCampaignInput | Prisma.MerchandisingCampaignProductUpsertWithWhereUniqueWithoutCampaignInput[];
    createMany?: Prisma.MerchandisingCampaignProductCreateManyCampaignInputEnvelope;
    set?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    disconnect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    delete?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    connect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    update?: Prisma.MerchandisingCampaignProductUpdateWithWhereUniqueWithoutCampaignInput | Prisma.MerchandisingCampaignProductUpdateWithWhereUniqueWithoutCampaignInput[];
    updateMany?: Prisma.MerchandisingCampaignProductUpdateManyWithWhereWithoutCampaignInput | Prisma.MerchandisingCampaignProductUpdateManyWithWhereWithoutCampaignInput[];
    deleteMany?: Prisma.MerchandisingCampaignProductScalarWhereInput | Prisma.MerchandisingCampaignProductScalarWhereInput[];
};
export type MerchandisingCampaignProductUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutCampaignInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutCampaignInput> | Prisma.MerchandisingCampaignProductCreateWithoutCampaignInput[] | Prisma.MerchandisingCampaignProductUncheckedCreateWithoutCampaignInput[];
    connectOrCreate?: Prisma.MerchandisingCampaignProductCreateOrConnectWithoutCampaignInput | Prisma.MerchandisingCampaignProductCreateOrConnectWithoutCampaignInput[];
    upsert?: Prisma.MerchandisingCampaignProductUpsertWithWhereUniqueWithoutCampaignInput | Prisma.MerchandisingCampaignProductUpsertWithWhereUniqueWithoutCampaignInput[];
    createMany?: Prisma.MerchandisingCampaignProductCreateManyCampaignInputEnvelope;
    set?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    disconnect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    delete?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    connect?: Prisma.MerchandisingCampaignProductWhereUniqueInput | Prisma.MerchandisingCampaignProductWhereUniqueInput[];
    update?: Prisma.MerchandisingCampaignProductUpdateWithWhereUniqueWithoutCampaignInput | Prisma.MerchandisingCampaignProductUpdateWithWhereUniqueWithoutCampaignInput[];
    updateMany?: Prisma.MerchandisingCampaignProductUpdateManyWithWhereWithoutCampaignInput | Prisma.MerchandisingCampaignProductUpdateManyWithWhereWithoutCampaignInput[];
    deleteMany?: Prisma.MerchandisingCampaignProductScalarWhereInput | Prisma.MerchandisingCampaignProductScalarWhereInput[];
};
export type MerchandisingCampaignProductCreateWithoutProductInput = {
    sortOrder?: number;
    campaign: Prisma.MerchandisingCampaignCreateNestedOneWithoutProductsInput;
};
export type MerchandisingCampaignProductUncheckedCreateWithoutProductInput = {
    campaignId: string;
    sortOrder?: number;
};
export type MerchandisingCampaignProductCreateOrConnectWithoutProductInput = {
    where: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutProductInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutProductInput>;
};
export type MerchandisingCampaignProductCreateManyProductInputEnvelope = {
    data: Prisma.MerchandisingCampaignProductCreateManyProductInput | Prisma.MerchandisingCampaignProductCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type MerchandisingCampaignProductUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    update: Prisma.XOR<Prisma.MerchandisingCampaignProductUpdateWithoutProductInput, Prisma.MerchandisingCampaignProductUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutProductInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutProductInput>;
};
export type MerchandisingCampaignProductUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    data: Prisma.XOR<Prisma.MerchandisingCampaignProductUpdateWithoutProductInput, Prisma.MerchandisingCampaignProductUncheckedUpdateWithoutProductInput>;
};
export type MerchandisingCampaignProductUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.MerchandisingCampaignProductScalarWhereInput;
    data: Prisma.XOR<Prisma.MerchandisingCampaignProductUpdateManyMutationInput, Prisma.MerchandisingCampaignProductUncheckedUpdateManyWithoutProductInput>;
};
export type MerchandisingCampaignProductScalarWhereInput = {
    AND?: Prisma.MerchandisingCampaignProductScalarWhereInput | Prisma.MerchandisingCampaignProductScalarWhereInput[];
    OR?: Prisma.MerchandisingCampaignProductScalarWhereInput[];
    NOT?: Prisma.MerchandisingCampaignProductScalarWhereInput | Prisma.MerchandisingCampaignProductScalarWhereInput[];
    campaignId?: Prisma.StringFilter<"MerchandisingCampaignProduct"> | string;
    productId?: Prisma.StringFilter<"MerchandisingCampaignProduct"> | string;
    sortOrder?: Prisma.IntFilter<"MerchandisingCampaignProduct"> | number;
};
export type MerchandisingCampaignProductCreateWithoutCampaignInput = {
    sortOrder?: number;
    product: Prisma.ProductCreateNestedOneWithoutCampaignItemsInput;
};
export type MerchandisingCampaignProductUncheckedCreateWithoutCampaignInput = {
    productId: string;
    sortOrder?: number;
};
export type MerchandisingCampaignProductCreateOrConnectWithoutCampaignInput = {
    where: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutCampaignInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutCampaignInput>;
};
export type MerchandisingCampaignProductCreateManyCampaignInputEnvelope = {
    data: Prisma.MerchandisingCampaignProductCreateManyCampaignInput | Prisma.MerchandisingCampaignProductCreateManyCampaignInput[];
    skipDuplicates?: boolean;
};
export type MerchandisingCampaignProductUpsertWithWhereUniqueWithoutCampaignInput = {
    where: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    update: Prisma.XOR<Prisma.MerchandisingCampaignProductUpdateWithoutCampaignInput, Prisma.MerchandisingCampaignProductUncheckedUpdateWithoutCampaignInput>;
    create: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateWithoutCampaignInput, Prisma.MerchandisingCampaignProductUncheckedCreateWithoutCampaignInput>;
};
export type MerchandisingCampaignProductUpdateWithWhereUniqueWithoutCampaignInput = {
    where: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    data: Prisma.XOR<Prisma.MerchandisingCampaignProductUpdateWithoutCampaignInput, Prisma.MerchandisingCampaignProductUncheckedUpdateWithoutCampaignInput>;
};
export type MerchandisingCampaignProductUpdateManyWithWhereWithoutCampaignInput = {
    where: Prisma.MerchandisingCampaignProductScalarWhereInput;
    data: Prisma.XOR<Prisma.MerchandisingCampaignProductUpdateManyMutationInput, Prisma.MerchandisingCampaignProductUncheckedUpdateManyWithoutCampaignInput>;
};
export type MerchandisingCampaignProductCreateManyProductInput = {
    campaignId: string;
    sortOrder?: number;
};
export type MerchandisingCampaignProductUpdateWithoutProductInput = {
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    campaign?: Prisma.MerchandisingCampaignUpdateOneRequiredWithoutProductsNestedInput;
};
export type MerchandisingCampaignProductUncheckedUpdateWithoutProductInput = {
    campaignId?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MerchandisingCampaignProductUncheckedUpdateManyWithoutProductInput = {
    campaignId?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MerchandisingCampaignProductCreateManyCampaignInput = {
    productId: string;
    sortOrder?: number;
};
export type MerchandisingCampaignProductUpdateWithoutCampaignInput = {
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    product?: Prisma.ProductUpdateOneRequiredWithoutCampaignItemsNestedInput;
};
export type MerchandisingCampaignProductUncheckedUpdateWithoutCampaignInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MerchandisingCampaignProductUncheckedUpdateManyWithoutCampaignInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MerchandisingCampaignProductSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    campaignId?: boolean;
    productId?: boolean;
    sortOrder?: boolean;
    campaign?: boolean | Prisma.MerchandisingCampaignDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["merchandisingCampaignProduct"]>;
export type MerchandisingCampaignProductSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    campaignId?: boolean;
    productId?: boolean;
    sortOrder?: boolean;
    campaign?: boolean | Prisma.MerchandisingCampaignDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["merchandisingCampaignProduct"]>;
export type MerchandisingCampaignProductSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    campaignId?: boolean;
    productId?: boolean;
    sortOrder?: boolean;
    campaign?: boolean | Prisma.MerchandisingCampaignDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["merchandisingCampaignProduct"]>;
export type MerchandisingCampaignProductSelectScalar = {
    campaignId?: boolean;
    productId?: boolean;
    sortOrder?: boolean;
};
export type MerchandisingCampaignProductOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"campaignId" | "productId" | "sortOrder", ExtArgs["result"]["merchandisingCampaignProduct"]>;
export type MerchandisingCampaignProductInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    campaign?: boolean | Prisma.MerchandisingCampaignDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type MerchandisingCampaignProductIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    campaign?: boolean | Prisma.MerchandisingCampaignDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type MerchandisingCampaignProductIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    campaign?: boolean | Prisma.MerchandisingCampaignDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $MerchandisingCampaignProductPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MerchandisingCampaignProduct";
    objects: {
        campaign: Prisma.$MerchandisingCampaignPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        campaignId: string;
        productId: string;
        sortOrder: number;
    }, ExtArgs["result"]["merchandisingCampaignProduct"]>;
    composites: {};
};
export type MerchandisingCampaignProductGetPayload<S extends boolean | null | undefined | MerchandisingCampaignProductDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload, S>;
export type MerchandisingCampaignProductCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MerchandisingCampaignProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MerchandisingCampaignProductCountAggregateInputType | true;
};
export interface MerchandisingCampaignProductDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MerchandisingCampaignProduct'];
        meta: {
            name: 'MerchandisingCampaignProduct';
        };
    };
    /**
     * Find zero or one MerchandisingCampaignProduct that matches the filter.
     * @param {MerchandisingCampaignProductFindUniqueArgs} args - Arguments to find a MerchandisingCampaignProduct
     * @example
     * // Get one MerchandisingCampaignProduct
     * const merchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MerchandisingCampaignProductFindUniqueArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignProductFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignProductClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MerchandisingCampaignProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MerchandisingCampaignProductFindUniqueOrThrowArgs} args - Arguments to find a MerchandisingCampaignProduct
     * @example
     * // Get one MerchandisingCampaignProduct
     * const merchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MerchandisingCampaignProductFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignProductClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MerchandisingCampaignProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignProductFindFirstArgs} args - Arguments to find a MerchandisingCampaignProduct
     * @example
     * // Get one MerchandisingCampaignProduct
     * const merchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MerchandisingCampaignProductFindFirstArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignProductFindFirstArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignProductClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MerchandisingCampaignProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignProductFindFirstOrThrowArgs} args - Arguments to find a MerchandisingCampaignProduct
     * @example
     * // Get one MerchandisingCampaignProduct
     * const merchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MerchandisingCampaignProductFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignProductFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignProductClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MerchandisingCampaignProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MerchandisingCampaignProducts
     * const merchandisingCampaignProducts = await prisma.merchandisingCampaignProduct.findMany()
     *
     * // Get first 10 MerchandisingCampaignProducts
     * const merchandisingCampaignProducts = await prisma.merchandisingCampaignProduct.findMany({ take: 10 })
     *
     * // Only select the `campaignId`
     * const merchandisingCampaignProductWithCampaignIdOnly = await prisma.merchandisingCampaignProduct.findMany({ select: { campaignId: true } })
     *
     */
    findMany<T extends MerchandisingCampaignProductFindManyArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MerchandisingCampaignProduct.
     * @param {MerchandisingCampaignProductCreateArgs} args - Arguments to create a MerchandisingCampaignProduct.
     * @example
     * // Create one MerchandisingCampaignProduct
     * const MerchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.create({
     *   data: {
     *     // ... data to create a MerchandisingCampaignProduct
     *   }
     * })
     *
     */
    create<T extends MerchandisingCampaignProductCreateArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignProductCreateArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignProductClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MerchandisingCampaignProducts.
     * @param {MerchandisingCampaignProductCreateManyArgs} args - Arguments to create many MerchandisingCampaignProducts.
     * @example
     * // Create many MerchandisingCampaignProducts
     * const merchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MerchandisingCampaignProductCreateManyArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MerchandisingCampaignProducts and returns the data saved in the database.
     * @param {MerchandisingCampaignProductCreateManyAndReturnArgs} args - Arguments to create many MerchandisingCampaignProducts.
     * @example
     * // Create many MerchandisingCampaignProducts
     * const merchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MerchandisingCampaignProducts and only return the `campaignId`
     * const merchandisingCampaignProductWithCampaignIdOnly = await prisma.merchandisingCampaignProduct.createManyAndReturn({
     *   select: { campaignId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MerchandisingCampaignProductCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MerchandisingCampaignProduct.
     * @param {MerchandisingCampaignProductDeleteArgs} args - Arguments to delete one MerchandisingCampaignProduct.
     * @example
     * // Delete one MerchandisingCampaignProduct
     * const MerchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.delete({
     *   where: {
     *     // ... filter to delete one MerchandisingCampaignProduct
     *   }
     * })
     *
     */
    delete<T extends MerchandisingCampaignProductDeleteArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignProductDeleteArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignProductClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MerchandisingCampaignProduct.
     * @param {MerchandisingCampaignProductUpdateArgs} args - Arguments to update one MerchandisingCampaignProduct.
     * @example
     * // Update one MerchandisingCampaignProduct
     * const merchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MerchandisingCampaignProductUpdateArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignProductUpdateArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignProductClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MerchandisingCampaignProducts.
     * @param {MerchandisingCampaignProductDeleteManyArgs} args - Arguments to filter MerchandisingCampaignProducts to delete.
     * @example
     * // Delete a few MerchandisingCampaignProducts
     * const { count } = await prisma.merchandisingCampaignProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MerchandisingCampaignProductDeleteManyArgs>(args?: Prisma.SelectSubset<T, MerchandisingCampaignProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MerchandisingCampaignProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MerchandisingCampaignProducts
     * const merchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MerchandisingCampaignProductUpdateManyArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MerchandisingCampaignProducts and returns the data updated in the database.
     * @param {MerchandisingCampaignProductUpdateManyAndReturnArgs} args - Arguments to update many MerchandisingCampaignProducts.
     * @example
     * // Update many MerchandisingCampaignProducts
     * const merchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MerchandisingCampaignProducts and only return the `campaignId`
     * const merchandisingCampaignProductWithCampaignIdOnly = await prisma.merchandisingCampaignProduct.updateManyAndReturn({
     *   select: { campaignId: true },
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
    updateManyAndReturn<T extends MerchandisingCampaignProductUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MerchandisingCampaignProduct.
     * @param {MerchandisingCampaignProductUpsertArgs} args - Arguments to update or create a MerchandisingCampaignProduct.
     * @example
     * // Update or create a MerchandisingCampaignProduct
     * const merchandisingCampaignProduct = await prisma.merchandisingCampaignProduct.upsert({
     *   create: {
     *     // ... data to create a MerchandisingCampaignProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MerchandisingCampaignProduct we want to update
     *   }
     * })
     */
    upsert<T extends MerchandisingCampaignProductUpsertArgs>(args: Prisma.SelectSubset<T, MerchandisingCampaignProductUpsertArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignProductClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MerchandisingCampaignProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignProductCountArgs} args - Arguments to filter MerchandisingCampaignProducts to count.
     * @example
     * // Count the number of MerchandisingCampaignProducts
     * const count = await prisma.merchandisingCampaignProduct.count({
     *   where: {
     *     // ... the filter for the MerchandisingCampaignProducts we want to count
     *   }
     * })
    **/
    count<T extends MerchandisingCampaignProductCountArgs>(args?: Prisma.Subset<T, MerchandisingCampaignProductCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MerchandisingCampaignProductCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MerchandisingCampaignProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MerchandisingCampaignProductAggregateArgs>(args: Prisma.Subset<T, MerchandisingCampaignProductAggregateArgs>): Prisma.PrismaPromise<GetMerchandisingCampaignProductAggregateType<T>>;
    /**
     * Group by MerchandisingCampaignProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchandisingCampaignProductGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MerchandisingCampaignProductGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MerchandisingCampaignProductGroupByArgs['orderBy'];
    } : {
        orderBy?: MerchandisingCampaignProductGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MerchandisingCampaignProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMerchandisingCampaignProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MerchandisingCampaignProduct model
     */
    readonly fields: MerchandisingCampaignProductFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MerchandisingCampaignProduct.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MerchandisingCampaignProductClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    campaign<T extends Prisma.MerchandisingCampaignDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MerchandisingCampaignDefaultArgs<ExtArgs>>): Prisma.Prisma__MerchandisingCampaignClient<runtime.Types.Result.GetResult<Prisma.$MerchandisingCampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the MerchandisingCampaignProduct model
 */
export interface MerchandisingCampaignProductFieldRefs {
    readonly campaignId: Prisma.FieldRef<"MerchandisingCampaignProduct", 'String'>;
    readonly productId: Prisma.FieldRef<"MerchandisingCampaignProduct", 'String'>;
    readonly sortOrder: Prisma.FieldRef<"MerchandisingCampaignProduct", 'Int'>;
}
/**
 * MerchandisingCampaignProduct findUnique
 */
export type MerchandisingCampaignProductFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MerchandisingCampaignProduct to fetch.
     */
    where: Prisma.MerchandisingCampaignProductWhereUniqueInput;
};
/**
 * MerchandisingCampaignProduct findUniqueOrThrow
 */
export type MerchandisingCampaignProductFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MerchandisingCampaignProduct to fetch.
     */
    where: Prisma.MerchandisingCampaignProductWhereUniqueInput;
};
/**
 * MerchandisingCampaignProduct findFirst
 */
export type MerchandisingCampaignProductFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MerchandisingCampaignProduct to fetch.
     */
    where?: Prisma.MerchandisingCampaignProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MerchandisingCampaignProducts to fetch.
     */
    orderBy?: Prisma.MerchandisingCampaignProductOrderByWithRelationInput | Prisma.MerchandisingCampaignProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MerchandisingCampaignProducts.
     */
    cursor?: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MerchandisingCampaignProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MerchandisingCampaignProducts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MerchandisingCampaignProducts.
     */
    distinct?: Prisma.MerchandisingCampaignProductScalarFieldEnum | Prisma.MerchandisingCampaignProductScalarFieldEnum[];
};
/**
 * MerchandisingCampaignProduct findFirstOrThrow
 */
export type MerchandisingCampaignProductFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MerchandisingCampaignProduct to fetch.
     */
    where?: Prisma.MerchandisingCampaignProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MerchandisingCampaignProducts to fetch.
     */
    orderBy?: Prisma.MerchandisingCampaignProductOrderByWithRelationInput | Prisma.MerchandisingCampaignProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MerchandisingCampaignProducts.
     */
    cursor?: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MerchandisingCampaignProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MerchandisingCampaignProducts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MerchandisingCampaignProducts.
     */
    distinct?: Prisma.MerchandisingCampaignProductScalarFieldEnum | Prisma.MerchandisingCampaignProductScalarFieldEnum[];
};
/**
 * MerchandisingCampaignProduct findMany
 */
export type MerchandisingCampaignProductFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MerchandisingCampaignProducts to fetch.
     */
    where?: Prisma.MerchandisingCampaignProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MerchandisingCampaignProducts to fetch.
     */
    orderBy?: Prisma.MerchandisingCampaignProductOrderByWithRelationInput | Prisma.MerchandisingCampaignProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MerchandisingCampaignProducts.
     */
    cursor?: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MerchandisingCampaignProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MerchandisingCampaignProducts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MerchandisingCampaignProducts.
     */
    distinct?: Prisma.MerchandisingCampaignProductScalarFieldEnum | Prisma.MerchandisingCampaignProductScalarFieldEnum[];
};
/**
 * MerchandisingCampaignProduct create
 */
export type MerchandisingCampaignProductCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a MerchandisingCampaignProduct.
     */
    data: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateInput, Prisma.MerchandisingCampaignProductUncheckedCreateInput>;
};
/**
 * MerchandisingCampaignProduct createMany
 */
export type MerchandisingCampaignProductCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MerchandisingCampaignProducts.
     */
    data: Prisma.MerchandisingCampaignProductCreateManyInput | Prisma.MerchandisingCampaignProductCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MerchandisingCampaignProduct createManyAndReturn
 */
export type MerchandisingCampaignProductCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaignProduct
     */
    select?: Prisma.MerchandisingCampaignProductSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaignProduct
     */
    omit?: Prisma.MerchandisingCampaignProductOmit<ExtArgs> | null;
    /**
     * The data used to create many MerchandisingCampaignProducts.
     */
    data: Prisma.MerchandisingCampaignProductCreateManyInput | Prisma.MerchandisingCampaignProductCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignProductIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MerchandisingCampaignProduct update
 */
export type MerchandisingCampaignProductUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a MerchandisingCampaignProduct.
     */
    data: Prisma.XOR<Prisma.MerchandisingCampaignProductUpdateInput, Prisma.MerchandisingCampaignProductUncheckedUpdateInput>;
    /**
     * Choose, which MerchandisingCampaignProduct to update.
     */
    where: Prisma.MerchandisingCampaignProductWhereUniqueInput;
};
/**
 * MerchandisingCampaignProduct updateMany
 */
export type MerchandisingCampaignProductUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MerchandisingCampaignProducts.
     */
    data: Prisma.XOR<Prisma.MerchandisingCampaignProductUpdateManyMutationInput, Prisma.MerchandisingCampaignProductUncheckedUpdateManyInput>;
    /**
     * Filter which MerchandisingCampaignProducts to update
     */
    where?: Prisma.MerchandisingCampaignProductWhereInput;
    /**
     * Limit how many MerchandisingCampaignProducts to update.
     */
    limit?: number;
};
/**
 * MerchandisingCampaignProduct updateManyAndReturn
 */
export type MerchandisingCampaignProductUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchandisingCampaignProduct
     */
    select?: Prisma.MerchandisingCampaignProductSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MerchandisingCampaignProduct
     */
    omit?: Prisma.MerchandisingCampaignProductOmit<ExtArgs> | null;
    /**
     * The data used to update MerchandisingCampaignProducts.
     */
    data: Prisma.XOR<Prisma.MerchandisingCampaignProductUpdateManyMutationInput, Prisma.MerchandisingCampaignProductUncheckedUpdateManyInput>;
    /**
     * Filter which MerchandisingCampaignProducts to update
     */
    where?: Prisma.MerchandisingCampaignProductWhereInput;
    /**
     * Limit how many MerchandisingCampaignProducts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MerchandisingCampaignProductIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MerchandisingCampaignProduct upsert
 */
export type MerchandisingCampaignProductUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the MerchandisingCampaignProduct to update in case it exists.
     */
    where: Prisma.MerchandisingCampaignProductWhereUniqueInput;
    /**
     * In case the MerchandisingCampaignProduct found by the `where` argument doesn't exist, create a new MerchandisingCampaignProduct with this data.
     */
    create: Prisma.XOR<Prisma.MerchandisingCampaignProductCreateInput, Prisma.MerchandisingCampaignProductUncheckedCreateInput>;
    /**
     * In case the MerchandisingCampaignProduct was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MerchandisingCampaignProductUpdateInput, Prisma.MerchandisingCampaignProductUncheckedUpdateInput>;
};
/**
 * MerchandisingCampaignProduct delete
 */
export type MerchandisingCampaignProductDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which MerchandisingCampaignProduct to delete.
     */
    where: Prisma.MerchandisingCampaignProductWhereUniqueInput;
};
/**
 * MerchandisingCampaignProduct deleteMany
 */
export type MerchandisingCampaignProductDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MerchandisingCampaignProducts to delete
     */
    where?: Prisma.MerchandisingCampaignProductWhereInput;
    /**
     * Limit how many MerchandisingCampaignProducts to delete.
     */
    limit?: number;
};
/**
 * MerchandisingCampaignProduct without action
 */
export type MerchandisingCampaignProductDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=MerchandisingCampaignProduct.d.ts.map