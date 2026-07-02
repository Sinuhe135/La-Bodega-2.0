import { APIGatewayProxyHandlerV2 } from 'aws-lambda'

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
    // Function code
    console.log('Event:', event)
    console.log('Context:', context)

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Checado' }),
    }
}
