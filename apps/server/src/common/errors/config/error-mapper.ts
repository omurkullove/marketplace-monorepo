// src/common/errors/error-factory.ts
import { CommonErrorCode } from "@marketplace/shared-packages";
import { AppError } from "./app-error";
import type { ErrorModule } from "@/common/interface/error/error-module-interface";

class ErrorMapper {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	private mappers: ((error: any) => AppError | null)[] = [];

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	registerMapper(mapper: (error: any) => AppError | null) {
		this.mappers.push(mapper);
	}

	registerModule(module: ErrorModule) {
		module.registerErrors(this);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	map(error: any): AppError {
		if (!error) return new AppError(CommonErrorCode.UNKNOWN_ERROR);

		for (const mapper of this.mappers) {
			try {
				const mapped = mapper(error);
				if (mapped instanceof AppError) return mapped;
			} catch {}
		}

		const msg = typeof error?.message === "string" ? error.message : undefined;

		return new AppError(CommonErrorCode.UNKNOWN_ERROR, msg);
	}
}

export const errorMapper = new ErrorMapper();
