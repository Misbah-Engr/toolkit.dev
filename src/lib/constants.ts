/**
 * Global validation constants for the application
 */

export const VALIDATION_LIMITS = {
  /** Maximum length for message content and text parts */
  MESSAGE_MAX_LENGTH: 16348,

  /** Maximum length for file and attachment names */
  FILE_NAME_MAX_LENGTH: 2000,

  /** Maximum file size for uploads (in bytes) */
  FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
} as const;

/**
 * Convenience exports for commonly used limits
 */
export const MESSAGE_MAX_LENGTH = VALIDATION_LIMITS.MESSAGE_MAX_LENGTH;
export const FILE_NAME_MAX_LENGTH = VALIDATION_LIMITS.FILE_NAME_MAX_LENGTH;
export const FILE_MAX_SIZE = VALIDATION_LIMITS.FILE_MAX_SIZE;

export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_LOCAL_BLOB = process.env.NODE_ENV === "development" && !process.env.BLOB_READ_WRITE_TOKEN;