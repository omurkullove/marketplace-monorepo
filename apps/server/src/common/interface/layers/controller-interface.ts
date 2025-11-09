import type { NextFunction, Request, Response } from "express";

export interface InterfaceController {
	handle(req: Request, res: Response, next: NextFunction): Promise<void>;
}
