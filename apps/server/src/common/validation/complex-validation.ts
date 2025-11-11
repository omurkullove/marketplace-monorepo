import { AppError } from "../errors/config/app-error";
import { CommonErrorCode, type ErrorCode } from "@marketplace/shared-packages";
import { isArray } from "./basic-validations/isArray";
import { isBoolean } from "./basic-validations/isBoolean";
import { isNumber } from "./basic-validations/isNumber";
import { isObject } from "./basic-validations/isObject";
import { isString } from "./basic-validations/isString";

type PrimitiveType = "string" | "number" | "boolean" | "array" | "object";

type Validator<T> = (value: unknown) => value is T | boolean;

export type ValidationRule<Key extends string = string, T = unknown> = {
	key: Key;
	isRequired: "required" | "optional" | "false";
	shouldBe: PrimitiveType | Validator<T>;
	customValidator?: (value: unknown) => boolean;
	errorMessage?: string;

	greaterThan?: number;
	lessThan?: number;
	equal?: number;
};

type ValidatedFromRules<Rules extends readonly ValidationRule[]> = {
	[K in Rules[number] as K["key"]]: K extends { shouldBe: Validator<infer T> }
		? T
		: K extends { shouldBe: "string" }
			? string
			: K extends { shouldBe: "number" }
				? number
				: K extends { shouldBe: "boolean" }
					? boolean
					: K extends { shouldBe: "array" }
						? unknown[]
						: K extends { shouldBe: "object" }
							? Record<string, unknown>
							: unknown;
};

export function complexValidation<
	const Rules extends readonly ValidationRule[],
>(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	source: Record<string, any>,
	rules: Rules,
	errorCode?: ErrorCode,
): ValidatedFromRules<Rules> {
	if (!source || typeof source !== "object") {
		throw new AppError(errorCode ?? CommonErrorCode.INVALID_QUERY_OBJECT);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const result: Record<string, any> = {};

	for (const rule of rules) {
		const {
			key,
			isRequired = "required",
			shouldBe,
			customValidator,
			errorMessage,
		} = rule;

		const value = source[key];
		const exists = key in source && value !== undefined && value !== null;

		if (isRequired === "required" && !exists) {
			throw new AppError(
				errorCode ?? CommonErrorCode.MISSING_FIELD,
				errorMessage ?? `Missing required field: "${key}"`,
			);
		}

		if ((isRequired === "optional" || isRequired === "false") && !exists) {
			continue;
		}

		if (exists) {
			let isValid = false;

			if (typeof shouldBe === "function") {
				isValid = shouldBe(value);
			} else {
				switch (shouldBe) {
					case "string":
						isValid = isString(value);
						break;
					case "number":
						isValid = isNumber(Number(value));
						if (isValid) {
							const num = Number(value);
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							if ("greaterThan" in rule && num <= rule.greaterThan!) {
								isValid = false;
							}
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							if ("lessThan" in rule && num >= rule.lessThan!) {
								isValid = false;
							}
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							if ("equal" in rule && num !== rule.equal!) {
								isValid = false;
							}
						}
						break;
					case "boolean":
						isValid =
							isBoolean(value) ||
							(isString(value) &&
								["true", "false"].includes(value.toLowerCase()));
						break;
					case "array":
						isValid = isArray(value);
						break;
					case "object":
						isValid = isObject(value);
						break;
					default:
						isValid = true;
				}
			}

			if (isValid && customValidator) {
				isValid = customValidator(value);
			}

			if (!isValid) {
				throw new AppError(
					errorCode ?? CommonErrorCode.INVALID_VALUE,
					errorMessage ?? `Field "${key}" has invalid type or format`,
				);
			}

			if (shouldBe === "number") {
				result[key] = Number(value);
			} else if (shouldBe === "boolean" && typeof value === "string") {
				result[key] = value.toLowerCase() === "true";
			} else {
				result[key] = value;
			}
		}
	}

	return result as ValidatedFromRules<Rules>;
}
