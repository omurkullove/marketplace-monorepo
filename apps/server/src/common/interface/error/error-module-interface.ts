import type { AppError } from "@/common/errors/config/app-error";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ErrorMapper = (error: any) => AppError | null;

export interface ErrorModule {
	registerErrors(factory: {
		registerMapper: (mapper: ErrorMapper) => void;
	}): void;
}
