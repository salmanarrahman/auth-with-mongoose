export type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    minPrice?: number;
    maxPrice?: number;
    location?: string;
};

export const paginationFields = [
    'page', 'limit', 'sortBy', 'sortOrder', 'maxPrice', 'minPrice', 'location'
];

