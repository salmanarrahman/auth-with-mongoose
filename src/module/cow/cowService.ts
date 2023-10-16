import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { ObjectId } from "mongodb";
import { cowSearchableFields, category, cowBreed, label, location } from "./constants";
import { ICow, ICowFilters } from "./interface";
import { Cow } from "./model";
import { SortOrder } from "mongoose";
import { IPaginationOptions } from "../../shared/pagination";
import { paginationHelpers } from "../../shared/paginationHelper";
import { IGenericResponse } from "../../interface/error";

const createCow = async (payload: ICow): Promise<ICow> => {

    if (!location.includes(payload.location)) {

        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Location');
    } else if (!cowBreed.includes(payload.breed)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Breed');

    } else if (!label.includes(payload.label)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Label');

    } else if (!category.includes(payload.category)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Categroy');

    }
    const result = await Cow.create(payload)

    return result;

}



// const showAllCow = async (
//     filters: ICowFilters,
//     paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<ICow[]>> => {

//     const { searchTerm, ...filtersData } = filters;
//     const { page, limit, skip, sortBy, sortOrder } =
//         paginationHelpers.calculatePagination(paginationOptions);

//     let andConditions = [];
//     const searchCondition = [
//         {
//             $or: [
//                 {
//                     location: {
//                         $regex: searchTerm,
//                         $options: 'i'
//                     }
//                 }, {
//                     breed: {
//                         $regex: searchTerm,
//                         $options: 'i'
//                     }
//                 }, {
//                     category: {
//                         $regex: searchTerm,
//                         $options: 'i'
//                     }
//                 }
//             ]
//         }
//     ]

//     if (searchTerm) {
//         [andConditions, searchCondition] = [searchCondition, andConditions]
//     }

//     // if (Object.keys(filtersData).length) {
//     //     andConditions.push({
//     //         $and: Object.entries(filtersData).map(([field, value]) => ({
//     //             [field]: value,
//     //         })),
//     //     });
//     // }


//     const sortConditions: { [key: string]: SortOrder } = {};

//     if (sortBy && sortOrder) {
//         sortConditions[sortBy] = sortOrder;
//     }
//     const whereConditions =
//         andConditions.length > 0 ? { $and: andConditions } : {};

//     const result = await Cow.find(whereConditions)
//         .sort(sortConditions)
//         .skip(skip)
//         .limit(limit);

//     const total = await Cow.countDocuments();

//     return {
//         meta: {
//             page,
//             limit,
//             total,
//         },
//         data: result,
//     };
// };



const showAllCow = async (paginationOptions: IPaginationOptions, filters: ICowFilters,
):
    Promise<IGenericResponse<ICow[]>> => {

    const { page, limit, skip, sortBy, sortOrder, minPrice, maxPrice, location } =
        paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm, ...filtersData } = filters;

    const total = await Cow.countDocuments();

    const andConditions: any = [];

    if (searchTerm) {
        andConditions.push({
            $or: cowSearchableFields.map(
                field => ({
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                })
            )
        })
    }


    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }



    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    if (minPrice && maxPrice) {
        andConditions.push({
            $and: [
                ...andConditions,
                { price: { $gte: minPrice } }, // Minimum price query
                { price: { $lte: maxPrice } }, // Maximum price query
            ],
        })
    }
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Cow.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}


const getSingleCow = async (payload: string): Promise<ICow | null> => {
    const result = await Cow.findById({ _id: new ObjectId(payload) })
    return result;
}

const updateCow = async (id: string | undefined, payload: Partial<ICow | undefined>): Promise<IC | null> => {
    if (
        payload?.location !== undefined ||
        payload?.breed !== undefined ||
        payload?.category !== undefined ||
        payload?.label !== undefined
    ) {
        const location: string = String(payload?.location)
        const cowBreed: string = String(payload?.breed)
        const category: string = String(payload?.category)
        const label: string = String(payload?.label)


        if (!location.includes(location)) {

            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Location');
        } else if (!cowBreed.includes(cowBreed)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Breed');

        } else if (!label.includes(label)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Label');

        } else if (!category.includes(category)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Categroy');

        }
    }
    const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

const deleteSingleCow = async (payload: string): Promise<ICow | null> => {
    const result = await Cow.findByIdAndDelete({ _id: new ObjectId(payload) })
    return result;
}

export const serviceCow = {
    createCow,
    showAllCow,
    getSingleCow,
    updateCow,
    deleteSingleCow
}

