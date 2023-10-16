import { ICowBreed, ILocation, Icategory, Ilabel } from "./interface";

export const location: ILocation[] =
    [
        "Dhaka",
        "Chattogram",
        "Barishal",
        "Rajshahi",
        "Sylhet",
        "Comilla",
        "Rangpur",
        "Mymensingh",
    ];

export const cowBreed: ICowBreed[] = [
    "Brahman",
    "Nellore",
    "Sahiwal",
    "Gir",
    "Indigenous",
    "Tharparkar",
    "Kankrej",
];

export const label: Ilabel[] =
    [
        "for sale",
        "sold out",
    ];

export const category: Icategory[] =
    [
        "Dairy",
        "Beef",
        "Dual Purpose",
    ];

export const cowSearchableFields = ['searchTerm', 'location', 'breed', 'category'];
