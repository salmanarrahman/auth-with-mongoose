import { Admin } from "mongodb";
import { Iadmin } from "./interface";
import { Admins } from "./model";

const createAdmin = async (payload: Iadmin): Promise<Iadmin> => {


    const result = await Admins.create(payload)



    return result

}


export const service = {
    createAdmin
} 