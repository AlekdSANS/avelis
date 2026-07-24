import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model ProductNote
 *
 */
export type ProductNoteModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductNotePayload>;
export type AggregateProductNote = {
    _count: ProductNoteCountAggregateOutputType | null;
    _avg: ProductNoteAvgAggregateOutputType | null;
    _sum: ProductNoteSumAggregateOutputType | null;
    _min: ProductNoteMinAggregateOutputType | null;
    _max: ProductNoteMaxAggregateOutputType | null;
};
export type ProductNoteAvgAggregateOutputType = {
    position: number | null;
};
export type ProductNoteSumAggregateOutputType = {
    position: number | null;
};
export type ProductNoteMinAggregateOutputType = {
    productId: string | null;
    noteId: string | null;
    type: $Enums.FragranceNoteType | null;
    position: number | null;
};
export type ProductNoteMaxAggregateOutputType = {
    productId: string | null;
    noteId: string | null;
    type: $Enums.FragranceNoteType | null;
    position: number | null;
};
export type ProductNoteCountAggregateOutputType = {
    productId: number;
    noteId: number;
    type: number;
    position: number;
    _all: number;
};
export type ProductNoteAvgAggregateInputType = {
    position?: true;
};
export type ProductNoteSumAggregateInputType = {
    position?: true;
};
export type ProductNoteMinAggregateInputType = {
    productId?: true;
    noteId?: true;
    type?: true;
    position?: true;
};
export type ProductNoteMaxAggregateInputType = {
    productId?: true;
    noteId?: true;
    type?: true;
    position?: true;
};
export type ProductNoteCountAggregateInputType = {
    productId?: true;
    noteId?: true;
    type?: true;
    position?: true;
    _all?: true;
};
export type ProductNoteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductNote to aggregate.
     */
    where?: Prisma.ProductNoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductNotes to fetch.
     */
    orderBy?: Prisma.ProductNoteOrderByWithRelationInput | Prisma.ProductNoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ProductNoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductNotes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductNotes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ProductNotes
    **/
    _count?: true | ProductNoteCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ProductNoteAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ProductNoteSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ProductNoteMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ProductNoteMaxAggregateInputType;
};
export type GetProductNoteAggregateType<T extends ProductNoteAggregateArgs> = {
    [P in keyof T & keyof AggregateProductNote]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductNote[P]> : Prisma.GetScalarType<T[P], AggregateProductNote[P]>;
};
export type ProductNoteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductNoteWhereInput;
    orderBy?: Prisma.ProductNoteOrderByWithAggregationInput | Prisma.ProductNoteOrderByWithAggregationInput[];
    by: Prisma.ProductNoteScalarFieldEnum[] | Prisma.ProductNoteScalarFieldEnum;
    having?: Prisma.ProductNoteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductNoteCountAggregateInputType | true;
    _avg?: ProductNoteAvgAggregateInputType;
    _sum?: ProductNoteSumAggregateInputType;
    _min?: ProductNoteMinAggregateInputType;
    _max?: ProductNoteMaxAggregateInputType;
};
export type ProductNoteGroupByOutputType = {
    productId: string;
    noteId: string;
    type: $Enums.FragranceNoteType;
    position: number;
    _count: ProductNoteCountAggregateOutputType | null;
    _avg: ProductNoteAvgAggregateOutputType | null;
    _sum: ProductNoteSumAggregateOutputType | null;
    _min: ProductNoteMinAggregateOutputType | null;
    _max: ProductNoteMaxAggregateOutputType | null;
};
export type GetProductNoteGroupByPayload<T extends ProductNoteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductNoteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductNoteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductNoteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductNoteGroupByOutputType[P]>;
}>>;
export type ProductNoteWhereInput = {
    AND?: Prisma.ProductNoteWhereInput | Prisma.ProductNoteWhereInput[];
    OR?: Prisma.ProductNoteWhereInput[];
    NOT?: Prisma.ProductNoteWhereInput | Prisma.ProductNoteWhereInput[];
    productId?: Prisma.StringFilter<"ProductNote"> | string;
    noteId?: Prisma.StringFilter<"ProductNote"> | string;
    type?: Prisma.EnumFragranceNoteTypeFilter<"ProductNote"> | $Enums.FragranceNoteType;
    position?: Prisma.IntFilter<"ProductNote"> | number;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    note?: Prisma.XOR<Prisma.NoteScalarRelationFilter, Prisma.NoteWhereInput>;
};
export type ProductNoteOrderByWithRelationInput = {
    productId?: Prisma.SortOrder;
    noteId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    note?: Prisma.NoteOrderByWithRelationInput;
};
export type ProductNoteWhereUniqueInput = Prisma.AtLeast<{
    productId_noteId_type?: Prisma.ProductNoteProductIdNoteIdTypeCompoundUniqueInput;
    AND?: Prisma.ProductNoteWhereInput | Prisma.ProductNoteWhereInput[];
    OR?: Prisma.ProductNoteWhereInput[];
    NOT?: Prisma.ProductNoteWhereInput | Prisma.ProductNoteWhereInput[];
    productId?: Prisma.StringFilter<"ProductNote"> | string;
    noteId?: Prisma.StringFilter<"ProductNote"> | string;
    type?: Prisma.EnumFragranceNoteTypeFilter<"ProductNote"> | $Enums.FragranceNoteType;
    position?: Prisma.IntFilter<"ProductNote"> | number;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    note?: Prisma.XOR<Prisma.NoteScalarRelationFilter, Prisma.NoteWhereInput>;
}, "productId_noteId_type">;
export type ProductNoteOrderByWithAggregationInput = {
    productId?: Prisma.SortOrder;
    noteId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    _count?: Prisma.ProductNoteCountOrderByAggregateInput;
    _avg?: Prisma.ProductNoteAvgOrderByAggregateInput;
    _max?: Prisma.ProductNoteMaxOrderByAggregateInput;
    _min?: Prisma.ProductNoteMinOrderByAggregateInput;
    _sum?: Prisma.ProductNoteSumOrderByAggregateInput;
};
export type ProductNoteScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductNoteScalarWhereWithAggregatesInput | Prisma.ProductNoteScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductNoteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductNoteScalarWhereWithAggregatesInput | Prisma.ProductNoteScalarWhereWithAggregatesInput[];
    productId?: Prisma.StringWithAggregatesFilter<"ProductNote"> | string;
    noteId?: Prisma.StringWithAggregatesFilter<"ProductNote"> | string;
    type?: Prisma.EnumFragranceNoteTypeWithAggregatesFilter<"ProductNote"> | $Enums.FragranceNoteType;
    position?: Prisma.IntWithAggregatesFilter<"ProductNote"> | number;
};
export type ProductNoteCreateInput = {
    type: $Enums.FragranceNoteType;
    position?: number;
    product: Prisma.ProductCreateNestedOneWithoutNotesInput;
    note: Prisma.NoteCreateNestedOneWithoutProductsInput;
};
export type ProductNoteUncheckedCreateInput = {
    productId: string;
    noteId: string;
    type: $Enums.FragranceNoteType;
    position?: number;
};
export type ProductNoteUpdateInput = {
    type?: Prisma.EnumFragranceNoteTypeFieldUpdateOperationsInput | $Enums.FragranceNoteType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    product?: Prisma.ProductUpdateOneRequiredWithoutNotesNestedInput;
    note?: Prisma.NoteUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductNoteUncheckedUpdateInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    noteId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFragranceNoteTypeFieldUpdateOperationsInput | $Enums.FragranceNoteType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductNoteCreateManyInput = {
    productId: string;
    noteId: string;
    type: $Enums.FragranceNoteType;
    position?: number;
};
export type ProductNoteUpdateManyMutationInput = {
    type?: Prisma.EnumFragranceNoteTypeFieldUpdateOperationsInput | $Enums.FragranceNoteType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductNoteUncheckedUpdateManyInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    noteId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFragranceNoteTypeFieldUpdateOperationsInput | $Enums.FragranceNoteType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductNoteListRelationFilter = {
    every?: Prisma.ProductNoteWhereInput;
    some?: Prisma.ProductNoteWhereInput;
    none?: Prisma.ProductNoteWhereInput;
};
export type ProductNoteOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductNoteProductIdNoteIdTypeCompoundUniqueInput = {
    productId: string;
    noteId: string;
    type: $Enums.FragranceNoteType;
};
export type ProductNoteCountOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    noteId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type ProductNoteAvgOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type ProductNoteMaxOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    noteId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type ProductNoteMinOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    noteId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type ProductNoteSumOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type ProductNoteCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductNoteCreateWithoutProductInput, Prisma.ProductNoteUncheckedCreateWithoutProductInput> | Prisma.ProductNoteCreateWithoutProductInput[] | Prisma.ProductNoteUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductNoteCreateOrConnectWithoutProductInput | Prisma.ProductNoteCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductNoteCreateManyProductInputEnvelope;
    connect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
};
export type ProductNoteUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductNoteCreateWithoutProductInput, Prisma.ProductNoteUncheckedCreateWithoutProductInput> | Prisma.ProductNoteCreateWithoutProductInput[] | Prisma.ProductNoteUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductNoteCreateOrConnectWithoutProductInput | Prisma.ProductNoteCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductNoteCreateManyProductInputEnvelope;
    connect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
};
export type ProductNoteUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductNoteCreateWithoutProductInput, Prisma.ProductNoteUncheckedCreateWithoutProductInput> | Prisma.ProductNoteCreateWithoutProductInput[] | Prisma.ProductNoteUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductNoteCreateOrConnectWithoutProductInput | Prisma.ProductNoteCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductNoteUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductNoteUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductNoteCreateManyProductInputEnvelope;
    set?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    disconnect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    delete?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    connect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    update?: Prisma.ProductNoteUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductNoteUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductNoteUpdateManyWithWhereWithoutProductInput | Prisma.ProductNoteUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductNoteScalarWhereInput | Prisma.ProductNoteScalarWhereInput[];
};
export type ProductNoteUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductNoteCreateWithoutProductInput, Prisma.ProductNoteUncheckedCreateWithoutProductInput> | Prisma.ProductNoteCreateWithoutProductInput[] | Prisma.ProductNoteUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductNoteCreateOrConnectWithoutProductInput | Prisma.ProductNoteCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductNoteUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductNoteUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductNoteCreateManyProductInputEnvelope;
    set?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    disconnect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    delete?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    connect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    update?: Prisma.ProductNoteUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductNoteUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductNoteUpdateManyWithWhereWithoutProductInput | Prisma.ProductNoteUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductNoteScalarWhereInput | Prisma.ProductNoteScalarWhereInput[];
};
export type ProductNoteCreateNestedManyWithoutNoteInput = {
    create?: Prisma.XOR<Prisma.ProductNoteCreateWithoutNoteInput, Prisma.ProductNoteUncheckedCreateWithoutNoteInput> | Prisma.ProductNoteCreateWithoutNoteInput[] | Prisma.ProductNoteUncheckedCreateWithoutNoteInput[];
    connectOrCreate?: Prisma.ProductNoteCreateOrConnectWithoutNoteInput | Prisma.ProductNoteCreateOrConnectWithoutNoteInput[];
    createMany?: Prisma.ProductNoteCreateManyNoteInputEnvelope;
    connect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
};
export type ProductNoteUncheckedCreateNestedManyWithoutNoteInput = {
    create?: Prisma.XOR<Prisma.ProductNoteCreateWithoutNoteInput, Prisma.ProductNoteUncheckedCreateWithoutNoteInput> | Prisma.ProductNoteCreateWithoutNoteInput[] | Prisma.ProductNoteUncheckedCreateWithoutNoteInput[];
    connectOrCreate?: Prisma.ProductNoteCreateOrConnectWithoutNoteInput | Prisma.ProductNoteCreateOrConnectWithoutNoteInput[];
    createMany?: Prisma.ProductNoteCreateManyNoteInputEnvelope;
    connect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
};
export type ProductNoteUpdateManyWithoutNoteNestedInput = {
    create?: Prisma.XOR<Prisma.ProductNoteCreateWithoutNoteInput, Prisma.ProductNoteUncheckedCreateWithoutNoteInput> | Prisma.ProductNoteCreateWithoutNoteInput[] | Prisma.ProductNoteUncheckedCreateWithoutNoteInput[];
    connectOrCreate?: Prisma.ProductNoteCreateOrConnectWithoutNoteInput | Prisma.ProductNoteCreateOrConnectWithoutNoteInput[];
    upsert?: Prisma.ProductNoteUpsertWithWhereUniqueWithoutNoteInput | Prisma.ProductNoteUpsertWithWhereUniqueWithoutNoteInput[];
    createMany?: Prisma.ProductNoteCreateManyNoteInputEnvelope;
    set?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    disconnect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    delete?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    connect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    update?: Prisma.ProductNoteUpdateWithWhereUniqueWithoutNoteInput | Prisma.ProductNoteUpdateWithWhereUniqueWithoutNoteInput[];
    updateMany?: Prisma.ProductNoteUpdateManyWithWhereWithoutNoteInput | Prisma.ProductNoteUpdateManyWithWhereWithoutNoteInput[];
    deleteMany?: Prisma.ProductNoteScalarWhereInput | Prisma.ProductNoteScalarWhereInput[];
};
export type ProductNoteUncheckedUpdateManyWithoutNoteNestedInput = {
    create?: Prisma.XOR<Prisma.ProductNoteCreateWithoutNoteInput, Prisma.ProductNoteUncheckedCreateWithoutNoteInput> | Prisma.ProductNoteCreateWithoutNoteInput[] | Prisma.ProductNoteUncheckedCreateWithoutNoteInput[];
    connectOrCreate?: Prisma.ProductNoteCreateOrConnectWithoutNoteInput | Prisma.ProductNoteCreateOrConnectWithoutNoteInput[];
    upsert?: Prisma.ProductNoteUpsertWithWhereUniqueWithoutNoteInput | Prisma.ProductNoteUpsertWithWhereUniqueWithoutNoteInput[];
    createMany?: Prisma.ProductNoteCreateManyNoteInputEnvelope;
    set?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    disconnect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    delete?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    connect?: Prisma.ProductNoteWhereUniqueInput | Prisma.ProductNoteWhereUniqueInput[];
    update?: Prisma.ProductNoteUpdateWithWhereUniqueWithoutNoteInput | Prisma.ProductNoteUpdateWithWhereUniqueWithoutNoteInput[];
    updateMany?: Prisma.ProductNoteUpdateManyWithWhereWithoutNoteInput | Prisma.ProductNoteUpdateManyWithWhereWithoutNoteInput[];
    deleteMany?: Prisma.ProductNoteScalarWhereInput | Prisma.ProductNoteScalarWhereInput[];
};
export type EnumFragranceNoteTypeFieldUpdateOperationsInput = {
    set?: $Enums.FragranceNoteType;
};
export type ProductNoteCreateWithoutProductInput = {
    type: $Enums.FragranceNoteType;
    position?: number;
    note: Prisma.NoteCreateNestedOneWithoutProductsInput;
};
export type ProductNoteUncheckedCreateWithoutProductInput = {
    noteId: string;
    type: $Enums.FragranceNoteType;
    position?: number;
};
export type ProductNoteCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductNoteCreateWithoutProductInput, Prisma.ProductNoteUncheckedCreateWithoutProductInput>;
};
export type ProductNoteCreateManyProductInputEnvelope = {
    data: Prisma.ProductNoteCreateManyProductInput | Prisma.ProductNoteCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductNoteUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductNoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductNoteUpdateWithoutProductInput, Prisma.ProductNoteUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductNoteCreateWithoutProductInput, Prisma.ProductNoteUncheckedCreateWithoutProductInput>;
};
export type ProductNoteUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductNoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductNoteUpdateWithoutProductInput, Prisma.ProductNoteUncheckedUpdateWithoutProductInput>;
};
export type ProductNoteUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductNoteScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductNoteUpdateManyMutationInput, Prisma.ProductNoteUncheckedUpdateManyWithoutProductInput>;
};
export type ProductNoteScalarWhereInput = {
    AND?: Prisma.ProductNoteScalarWhereInput | Prisma.ProductNoteScalarWhereInput[];
    OR?: Prisma.ProductNoteScalarWhereInput[];
    NOT?: Prisma.ProductNoteScalarWhereInput | Prisma.ProductNoteScalarWhereInput[];
    productId?: Prisma.StringFilter<"ProductNote"> | string;
    noteId?: Prisma.StringFilter<"ProductNote"> | string;
    type?: Prisma.EnumFragranceNoteTypeFilter<"ProductNote"> | $Enums.FragranceNoteType;
    position?: Prisma.IntFilter<"ProductNote"> | number;
};
export type ProductNoteCreateWithoutNoteInput = {
    type: $Enums.FragranceNoteType;
    position?: number;
    product: Prisma.ProductCreateNestedOneWithoutNotesInput;
};
export type ProductNoteUncheckedCreateWithoutNoteInput = {
    productId: string;
    type: $Enums.FragranceNoteType;
    position?: number;
};
export type ProductNoteCreateOrConnectWithoutNoteInput = {
    where: Prisma.ProductNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductNoteCreateWithoutNoteInput, Prisma.ProductNoteUncheckedCreateWithoutNoteInput>;
};
export type ProductNoteCreateManyNoteInputEnvelope = {
    data: Prisma.ProductNoteCreateManyNoteInput | Prisma.ProductNoteCreateManyNoteInput[];
    skipDuplicates?: boolean;
};
export type ProductNoteUpsertWithWhereUniqueWithoutNoteInput = {
    where: Prisma.ProductNoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductNoteUpdateWithoutNoteInput, Prisma.ProductNoteUncheckedUpdateWithoutNoteInput>;
    create: Prisma.XOR<Prisma.ProductNoteCreateWithoutNoteInput, Prisma.ProductNoteUncheckedCreateWithoutNoteInput>;
};
export type ProductNoteUpdateWithWhereUniqueWithoutNoteInput = {
    where: Prisma.ProductNoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductNoteUpdateWithoutNoteInput, Prisma.ProductNoteUncheckedUpdateWithoutNoteInput>;
};
export type ProductNoteUpdateManyWithWhereWithoutNoteInput = {
    where: Prisma.ProductNoteScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductNoteUpdateManyMutationInput, Prisma.ProductNoteUncheckedUpdateManyWithoutNoteInput>;
};
export type ProductNoteCreateManyProductInput = {
    noteId: string;
    type: $Enums.FragranceNoteType;
    position?: number;
};
export type ProductNoteUpdateWithoutProductInput = {
    type?: Prisma.EnumFragranceNoteTypeFieldUpdateOperationsInput | $Enums.FragranceNoteType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NoteUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductNoteUncheckedUpdateWithoutProductInput = {
    noteId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFragranceNoteTypeFieldUpdateOperationsInput | $Enums.FragranceNoteType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductNoteUncheckedUpdateManyWithoutProductInput = {
    noteId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFragranceNoteTypeFieldUpdateOperationsInput | $Enums.FragranceNoteType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductNoteCreateManyNoteInput = {
    productId: string;
    type: $Enums.FragranceNoteType;
    position?: number;
};
export type ProductNoteUpdateWithoutNoteInput = {
    type?: Prisma.EnumFragranceNoteTypeFieldUpdateOperationsInput | $Enums.FragranceNoteType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    product?: Prisma.ProductUpdateOneRequiredWithoutNotesNestedInput;
};
export type ProductNoteUncheckedUpdateWithoutNoteInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFragranceNoteTypeFieldUpdateOperationsInput | $Enums.FragranceNoteType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductNoteUncheckedUpdateManyWithoutNoteInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFragranceNoteTypeFieldUpdateOperationsInput | $Enums.FragranceNoteType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductNoteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    noteId?: boolean;
    type?: boolean;
    position?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productNote"]>;
export type ProductNoteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    noteId?: boolean;
    type?: boolean;
    position?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productNote"]>;
export type ProductNoteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    noteId?: boolean;
    type?: boolean;
    position?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productNote"]>;
export type ProductNoteSelectScalar = {
    productId?: boolean;
    noteId?: boolean;
    type?: boolean;
    position?: boolean;
};
export type ProductNoteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"productId" | "noteId" | "type" | "position", ExtArgs["result"]["productNote"]>;
export type ProductNoteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
};
export type ProductNoteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
};
export type ProductNoteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
};
export type $ProductNotePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductNote";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        note: Prisma.$NotePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        productId: string;
        noteId: string;
        type: $Enums.FragranceNoteType;
        position: number;
    }, ExtArgs["result"]["productNote"]>;
    composites: {};
};
export type ProductNoteGetPayload<S extends boolean | null | undefined | ProductNoteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductNotePayload, S>;
export type ProductNoteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductNoteCountAggregateInputType | true;
};
export interface ProductNoteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductNote'];
        meta: {
            name: 'ProductNote';
        };
    };
    /**
     * Find zero or one ProductNote that matches the filter.
     * @param {ProductNoteFindUniqueArgs} args - Arguments to find a ProductNote
     * @example
     * // Get one ProductNote
     * const productNote = await prisma.productNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductNoteFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductNoteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductNoteClient<runtime.Types.Result.GetResult<Prisma.$ProductNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ProductNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductNoteFindUniqueOrThrowArgs} args - Arguments to find a ProductNote
     * @example
     * // Get one ProductNote
     * const productNote = await prisma.productNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductNoteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductNoteClient<runtime.Types.Result.GetResult<Prisma.$ProductNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNoteFindFirstArgs} args - Arguments to find a ProductNote
     * @example
     * // Get one ProductNote
     * const productNote = await prisma.productNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductNoteFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductNoteFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductNoteClient<runtime.Types.Result.GetResult<Prisma.$ProductNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNoteFindFirstOrThrowArgs} args - Arguments to find a ProductNote
     * @example
     * // Get one ProductNote
     * const productNote = await prisma.productNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductNoteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductNoteClient<runtime.Types.Result.GetResult<Prisma.$ProductNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ProductNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductNotes
     * const productNotes = await prisma.productNote.findMany()
     *
     * // Get first 10 ProductNotes
     * const productNotes = await prisma.productNote.findMany({ take: 10 })
     *
     * // Only select the `productId`
     * const productNoteWithProductIdOnly = await prisma.productNote.findMany({ select: { productId: true } })
     *
     */
    findMany<T extends ProductNoteFindManyArgs>(args?: Prisma.SelectSubset<T, ProductNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ProductNote.
     * @param {ProductNoteCreateArgs} args - Arguments to create a ProductNote.
     * @example
     * // Create one ProductNote
     * const ProductNote = await prisma.productNote.create({
     *   data: {
     *     // ... data to create a ProductNote
     *   }
     * })
     *
     */
    create<T extends ProductNoteCreateArgs>(args: Prisma.SelectSubset<T, ProductNoteCreateArgs<ExtArgs>>): Prisma.Prisma__ProductNoteClient<runtime.Types.Result.GetResult<Prisma.$ProductNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ProductNotes.
     * @param {ProductNoteCreateManyArgs} args - Arguments to create many ProductNotes.
     * @example
     * // Create many ProductNotes
     * const productNote = await prisma.productNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductNoteCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ProductNotes and returns the data saved in the database.
     * @param {ProductNoteCreateManyAndReturnArgs} args - Arguments to create many ProductNotes.
     * @example
     * // Create many ProductNotes
     * const productNote = await prisma.productNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ProductNotes and only return the `productId`
     * const productNoteWithProductIdOnly = await prisma.productNote.createManyAndReturn({
     *   select: { productId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductNoteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ProductNote.
     * @param {ProductNoteDeleteArgs} args - Arguments to delete one ProductNote.
     * @example
     * // Delete one ProductNote
     * const ProductNote = await prisma.productNote.delete({
     *   where: {
     *     // ... filter to delete one ProductNote
     *   }
     * })
     *
     */
    delete<T extends ProductNoteDeleteArgs>(args: Prisma.SelectSubset<T, ProductNoteDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductNoteClient<runtime.Types.Result.GetResult<Prisma.$ProductNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ProductNote.
     * @param {ProductNoteUpdateArgs} args - Arguments to update one ProductNote.
     * @example
     * // Update one ProductNote
     * const productNote = await prisma.productNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductNoteUpdateArgs>(args: Prisma.SelectSubset<T, ProductNoteUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductNoteClient<runtime.Types.Result.GetResult<Prisma.$ProductNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ProductNotes.
     * @param {ProductNoteDeleteManyArgs} args - Arguments to filter ProductNotes to delete.
     * @example
     * // Delete a few ProductNotes
     * const { count } = await prisma.productNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductNoteDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductNotes
     * const productNote = await prisma.productNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductNoteUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductNotes and returns the data updated in the database.
     * @param {ProductNoteUpdateManyAndReturnArgs} args - Arguments to update many ProductNotes.
     * @example
     * // Update many ProductNotes
     * const productNote = await prisma.productNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ProductNotes and only return the `productId`
     * const productNoteWithProductIdOnly = await prisma.productNote.updateManyAndReturn({
     *   select: { productId: true },
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
    updateManyAndReturn<T extends ProductNoteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ProductNote.
     * @param {ProductNoteUpsertArgs} args - Arguments to update or create a ProductNote.
     * @example
     * // Update or create a ProductNote
     * const productNote = await prisma.productNote.upsert({
     *   create: {
     *     // ... data to create a ProductNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductNote we want to update
     *   }
     * })
     */
    upsert<T extends ProductNoteUpsertArgs>(args: Prisma.SelectSubset<T, ProductNoteUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductNoteClient<runtime.Types.Result.GetResult<Prisma.$ProductNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ProductNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNoteCountArgs} args - Arguments to filter ProductNotes to count.
     * @example
     * // Count the number of ProductNotes
     * const count = await prisma.productNote.count({
     *   where: {
     *     // ... the filter for the ProductNotes we want to count
     *   }
     * })
    **/
    count<T extends ProductNoteCountArgs>(args?: Prisma.Subset<T, ProductNoteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductNoteCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ProductNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductNoteAggregateArgs>(args: Prisma.Subset<T, ProductNoteAggregateArgs>): Prisma.PrismaPromise<GetProductNoteAggregateType<T>>;
    /**
     * Group by ProductNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNoteGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ProductNoteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductNoteGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductNoteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ProductNote model
     */
    readonly fields: ProductNoteFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ProductNote.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ProductNoteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    note<T extends Prisma.NoteDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NoteDefaultArgs<ExtArgs>>): Prisma.Prisma__NoteClient<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ProductNote model
 */
export interface ProductNoteFieldRefs {
    readonly productId: Prisma.FieldRef<"ProductNote", 'String'>;
    readonly noteId: Prisma.FieldRef<"ProductNote", 'String'>;
    readonly type: Prisma.FieldRef<"ProductNote", 'FragranceNoteType'>;
    readonly position: Prisma.FieldRef<"ProductNote", 'Int'>;
}
/**
 * ProductNote findUnique
 */
export type ProductNoteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteInclude<ExtArgs> | null;
    /**
     * Filter, which ProductNote to fetch.
     */
    where: Prisma.ProductNoteWhereUniqueInput;
};
/**
 * ProductNote findUniqueOrThrow
 */
export type ProductNoteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteInclude<ExtArgs> | null;
    /**
     * Filter, which ProductNote to fetch.
     */
    where: Prisma.ProductNoteWhereUniqueInput;
};
/**
 * ProductNote findFirst
 */
export type ProductNoteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteInclude<ExtArgs> | null;
    /**
     * Filter, which ProductNote to fetch.
     */
    where?: Prisma.ProductNoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductNotes to fetch.
     */
    orderBy?: Prisma.ProductNoteOrderByWithRelationInput | Prisma.ProductNoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductNotes.
     */
    cursor?: Prisma.ProductNoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductNotes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductNotes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductNotes.
     */
    distinct?: Prisma.ProductNoteScalarFieldEnum | Prisma.ProductNoteScalarFieldEnum[];
};
/**
 * ProductNote findFirstOrThrow
 */
export type ProductNoteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteInclude<ExtArgs> | null;
    /**
     * Filter, which ProductNote to fetch.
     */
    where?: Prisma.ProductNoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductNotes to fetch.
     */
    orderBy?: Prisma.ProductNoteOrderByWithRelationInput | Prisma.ProductNoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductNotes.
     */
    cursor?: Prisma.ProductNoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductNotes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductNotes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductNotes.
     */
    distinct?: Prisma.ProductNoteScalarFieldEnum | Prisma.ProductNoteScalarFieldEnum[];
};
/**
 * ProductNote findMany
 */
export type ProductNoteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteInclude<ExtArgs> | null;
    /**
     * Filter, which ProductNotes to fetch.
     */
    where?: Prisma.ProductNoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductNotes to fetch.
     */
    orderBy?: Prisma.ProductNoteOrderByWithRelationInput | Prisma.ProductNoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ProductNotes.
     */
    cursor?: Prisma.ProductNoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductNotes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductNotes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductNotes.
     */
    distinct?: Prisma.ProductNoteScalarFieldEnum | Prisma.ProductNoteScalarFieldEnum[];
};
/**
 * ProductNote create
 */
export type ProductNoteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteInclude<ExtArgs> | null;
    /**
     * The data needed to create a ProductNote.
     */
    data: Prisma.XOR<Prisma.ProductNoteCreateInput, Prisma.ProductNoteUncheckedCreateInput>;
};
/**
 * ProductNote createMany
 */
export type ProductNoteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductNotes.
     */
    data: Prisma.ProductNoteCreateManyInput | Prisma.ProductNoteCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ProductNote createManyAndReturn
 */
export type ProductNoteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * The data used to create many ProductNotes.
     */
    data: Prisma.ProductNoteCreateManyInput | Prisma.ProductNoteCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductNote update
 */
export type ProductNoteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteInclude<ExtArgs> | null;
    /**
     * The data needed to update a ProductNote.
     */
    data: Prisma.XOR<Prisma.ProductNoteUpdateInput, Prisma.ProductNoteUncheckedUpdateInput>;
    /**
     * Choose, which ProductNote to update.
     */
    where: Prisma.ProductNoteWhereUniqueInput;
};
/**
 * ProductNote updateMany
 */
export type ProductNoteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductNotes.
     */
    data: Prisma.XOR<Prisma.ProductNoteUpdateManyMutationInput, Prisma.ProductNoteUncheckedUpdateManyInput>;
    /**
     * Filter which ProductNotes to update
     */
    where?: Prisma.ProductNoteWhereInput;
    /**
     * Limit how many ProductNotes to update.
     */
    limit?: number;
};
/**
 * ProductNote updateManyAndReturn
 */
export type ProductNoteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * The data used to update ProductNotes.
     */
    data: Prisma.XOR<Prisma.ProductNoteUpdateManyMutationInput, Prisma.ProductNoteUncheckedUpdateManyInput>;
    /**
     * Filter which ProductNotes to update
     */
    where?: Prisma.ProductNoteWhereInput;
    /**
     * Limit how many ProductNotes to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductNote upsert
 */
export type ProductNoteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteInclude<ExtArgs> | null;
    /**
     * The filter to search for the ProductNote to update in case it exists.
     */
    where: Prisma.ProductNoteWhereUniqueInput;
    /**
     * In case the ProductNote found by the `where` argument doesn't exist, create a new ProductNote with this data.
     */
    create: Prisma.XOR<Prisma.ProductNoteCreateInput, Prisma.ProductNoteUncheckedCreateInput>;
    /**
     * In case the ProductNote was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ProductNoteUpdateInput, Prisma.ProductNoteUncheckedUpdateInput>;
};
/**
 * ProductNote delete
 */
export type ProductNoteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteInclude<ExtArgs> | null;
    /**
     * Filter which ProductNote to delete.
     */
    where: Prisma.ProductNoteWhereUniqueInput;
};
/**
 * ProductNote deleteMany
 */
export type ProductNoteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductNotes to delete
     */
    where?: Prisma.ProductNoteWhereInput;
    /**
     * Limit how many ProductNotes to delete.
     */
    limit?: number;
};
/**
 * ProductNote without action
 */
export type ProductNoteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNote
     */
    select?: Prisma.ProductNoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductNote
     */
    omit?: Prisma.ProductNoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductNoteInclude<ExtArgs> | null;
};
//# sourceMappingURL=ProductNote.d.ts.map