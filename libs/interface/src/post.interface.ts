export interface IPost {
    id: string;
    content?: string;
    image?: string[];
    tag?: string;
    uploadBy: string;
    createdAt: Date;
    updatedAt: Date;
}