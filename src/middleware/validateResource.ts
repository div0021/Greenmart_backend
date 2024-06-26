import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import logger from "../utils/logger";
const validate = (schema:AnyZodObject) => (req:Request,res:Response,next:NextFunction) => {

    try{
        schema.parse({
            body:req.body,
            query:req.query,
            params:req.params,
        });
        next();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e:any){
        logger.error(`Validation error: ${e.errors}}`);
        if(e instanceof ZodError){
            console.log("errors",e.message)
        }
        return res.status(400).send(e.errors);

    }

}
export default validate;