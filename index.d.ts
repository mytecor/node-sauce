
interface Sauce {
	(file: string | Buffer | ReadableStream, params?: object): Promise<object>
	dbmask?: number | Array<number>
	numres?: number
}

declare const NodeSauce: {
	new (api_key: string, rps?: number): Sauce
	prototype: Sauce
}

export default NodeSauce
