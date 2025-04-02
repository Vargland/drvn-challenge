import { QueryParams } from "@typing/query-builder"

function queryBuilder(url: string, filters: QueryParams): string {
    const newUrl = new URL(url)

    newUrl.searchParams?.append('q', filters.search)
    newUrl.searchParams?.append('limit', filters.limit)
    newUrl.searchParams?.append('order', filters.order)
    newUrl.searchParams?.append('skip', filters.skip)

    return newUrl.href as unknown as string
}

export {
    queryBuilder
}
