import iDeveloper from '../../../interfaces'

// export {}

declare global {
    namespace Express {
        export interface Request {
            requestingUser?: iDeveloper
            } // or any other type
        }
}
