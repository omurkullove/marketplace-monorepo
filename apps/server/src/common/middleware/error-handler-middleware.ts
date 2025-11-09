import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/config/app-error";
import { errorMapper } from "../errors/config/error-mapper";

export function errorHandler(
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const appError = error instanceof AppError ? error : errorMapper.map(error);
	res.status(appError.status).json(appError.toJSON());
}
