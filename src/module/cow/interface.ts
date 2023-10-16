import { Model } from "mongoose";

export type ILocation =
    | "Dhaka"
    | "Chattogram"
    | "Barishal"
    | "Rajshahi"
    | "Sylhet"
    | "Comilla"
    | "Rangpur"
    | "Mymensingh";
export type ICowBreed =
    | "Brahman"
    | "Nellore"
    | "Sahiwal"
    | "Gir"
    | "Indigenous"
    | "Tharparkar"
    | "Kankrej";
export type Ilabel =
    | "for sale"
    | "sold out"
export type Icategory =
    | "Dairy"
    | "Beef"
    | "Dual Purpose"



export type ICow = {
    name: string;
    age: number;
    price: number;
    location: ILocation;
    breed: ICowBreed;
    weight: string;
    label: Ilabel;
    category: Icategory;
    seller: string;
}
export type ICowFilters = {
    searchTerm?: string;
};

export type CowModel = Model<ICow>