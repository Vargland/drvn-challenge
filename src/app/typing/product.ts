interface Dimensions {
    depth: number;
    height: number;
    width: number;
}

interface Review {
    comment: string;
    date: string;
    rating: number;
    reviewerEmail: string;
    reviewerName: string;
}

interface Meta {
    barcode: string;
    createdAt: string;
    qrCode: string;
    updatedAt: string;
}

interface ProductResponse {
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

type Product = Pick<ProductResponse, 'brand' | 'description' | 'images' | 'price' | 'stock' | 'title' | 'tags' | 'warrantyInformation' | 'weight' >

type ProductPayload = Pick<Product, 'description' | 'price' | 'stock' | 'title'>

export type {
    Product,
    ProductPayload,
    ProductResponse,
}
