import { API } from './fetcher';

export interface Book {
    id: string;
    title: string;
}

export interface ReviewData {
    rate: number;
    review: string;
}

export interface BookDetails {
    book: Book,
    rate: number;
    ratings: ReviewData[]
}

export const getDetail = async (id: string) => {
    return await API.get<BookDetails>(`/book/detail/${id}`);
}

export const submitReview = async (data: ReviewData) => {
    return await API.post('/add-rating/1', data);
}