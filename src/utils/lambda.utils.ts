import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { AppError } from './app_error.utils'

export function parseLambdaBody<T>(event: APIGatewayProxyEventV2): T {
    if (!event.body) throw new AppError(400, 'Request body is required')
    try {
        return JSON.parse(event.body) as T
    } catch {
        throw new AppError(400, 'Invalid JSON body')
    }
}

export function generateLambdaResponse<dto>(status: number, body: dto): APIGatewayProxyResultV2 {
    return {
        statusCode: status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    }
}
