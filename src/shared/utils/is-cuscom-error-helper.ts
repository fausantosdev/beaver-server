import { AppError } from '@shared/errors/app-error'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { ResourceNotFound } from '@shared/errors/resource-not-found'

const customErrors = [
  AppError,
  NotAuthorized,
  ResourceNotFound
]

/**
 * Checks whether the provided error is a custom application error.
 *
 * Type Predicate: This function uses the `error is AppError | NotAuthorized` syntax
 * to tell TypeScript that if the function returns `true`, the `error` value
 * can safely be treated as an instance of `AppError` or `NotAuthorized` in conditional blocks.
 *
 * Type Guard: Inside the function body, `instanceof` is used to check at runtime
 * whether `error` is an instance of any of the error classes defined in the `customErrors` array.
 *
 * @param {unknown} error - The error to be checked.
 * @returns {boolean} Returns `true` if the error is an instance of `AppError` or `NotAuthorized`.
 */
export function isCustomErrorHelper(error: unknown):
  error is
  AppError |
  NotAuthorized |
  ResourceNotFound {
  return customErrors.some((customError) => error instanceof customError)
}
