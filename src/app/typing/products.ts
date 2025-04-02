import { QueryParams } from "./query-builder";

interface Review {
    comment: string;
    date: string;
    rating: number;
    reviewerEmail: string;
    reviewerName: string;
}

interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

interface Meta {
    barcode: string;
    createdAt: string;
    qrCode: string;
    updatedAt: string;
}

interface Product {
    availabilityStatus: string;
    brand: string;
    category: string;
    description: string;
    dimensions: Dimensions;
    discountPercentage: number;
    id: number;
    images: string[];
    meta: Meta;
    minimumOrderQuantity: number;
    price: number;
    rating: number;
    returnPolicy: string;
    reviews: Review[];
    shippingInformation: string;
    sku: string;
    stock: number;
    tags: string[];
    thumbnail: string;
    title: string;
    warrantyInformation: string;
    weight: number;
}

interface ProductsResponse {
    limit: number;
    products: Product[];
    skip: number;
    total: number;
}

type FilterProducts = QueryParams & {
    category: string
}

export enum PRODUCTS_FILTER {
    EMPTY = '',
    LIMIT = '10',
    ORDER = '10',
    SKIP = '0',
    SORT = 'asc',
}

export type {
    Dimensions,
    FilterProducts,
    Meta,
    Product,
    ProductsResponse,
    Review,
}
