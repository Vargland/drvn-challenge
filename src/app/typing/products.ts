import { EMPTY } from "rxjs";

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

interface ProductResponse {
    limit: number;
    products: Product[];
    skip: number;
    total: number;
}

type ProductQueryParams = {
    limit: string;
    order: string;
    search: string;
    skip: string;
}

type FilterProduct = ProductQueryParams

export enum PRODUCTS_FILTER {
    EMPTY = '',
    LIMIT = '10',
    ORDER = '10',
    SKIP = '0',
    SORT = 'asc',
}

export type {
    Dimensions,
    FilterProduct,
    Meta,
    Product,
    ProductQueryParams,
    ProductResponse,
    Review,
}
