
interface Sauce {
	(file: string | Buffer | ReadableStream, params?: object): Promise<object>
	dbmask: number | Array<number>
}

interface NodeSauce {
	new (api_key: string, rps?: number): Sauce
}

export default NodeSauce
