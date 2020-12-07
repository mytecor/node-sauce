
interface sauce {
	(file: string | Buffer | ReadableStream, params?: object): Promise<object>
	dbmask: number | Array<number>
}

export default function Sauce(api_key: string, rps?: number): sauce
