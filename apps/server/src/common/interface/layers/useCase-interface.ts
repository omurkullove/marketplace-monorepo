export interface InterfaceUseCase<TRequest, TResponse> {
	execute(req: TRequest): Promise<TResponse>;
}
