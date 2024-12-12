export class ServiceError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

export class DocumentNotFoundError extends ServiceError {
  constructor(id: string, collection: string) {
    super(`Document with id ${id} not found in collection ${collection}`);
    this.name = 'DocumentNotFoundError';
    this.code = 'DOCUMENT_NOT_FOUND';
  }
}

export class ValidationError extends ServiceError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.code = 'VALIDATION_ERROR';
  }
}