import { RequestHandler, Request, Response } from 'express';

/**
 * Flash middleware for Express using express-session.
 */
declare function flashMiddleware(): RequestHandler;
export = flashMiddleware;

// Augment Express types to include flash and getFlash

declare global {
  namespace Express {
    interface Request {
      /**
       * Set a flash message of a given type, or get and clear all messages of a given type.
       * @param type The type of message (e.g., 'info', 'error').
       * @param message The message to store. If omitted, retrieves and clears messages of the given type.
       */
      flash(type: string, message: string): void;
      flash(type: string): string[];
    }
    interface Response {
      locals: {
        /**
         * Get and clear all flash messages of a given type (for use in templates).
         * @param type The type of message.
         */
        getFlash(type: string): string[];
        [key: string]: any;
      };
    }
  }
} 