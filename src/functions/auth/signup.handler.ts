import { APIGatewayProxyHandlerV2 } from 'aws-lambda'

import * as authService from '../../modules/auth/auth.service'
import { LoginDto } from '../../modules/auth/dtos/login.dto'
import { LoginResponseDto } from '../../modules/auth/dtos/login_response.dto'
import { AppError } from '../../utils/app_error.utils'

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
    // Function code
    console.log('Processing signup request...')

    try {
        const body = JSON.parse(event.body || '{}') as LoginDto
        const jwt = await authService.signup(body.username, body.keyHash)

        const response: LoginResponseDto = {
            jwt: jwt,
        }
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
        }
    } catch (error) {
        if (error instanceof AppError) {
            return {
                statusCode: error.statusCode,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: error.message }),
            }
        }

        console.log(`There was an error: ${error}`)
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Internal server error' }),
        }
    }
}
