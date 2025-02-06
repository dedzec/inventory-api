import { Response } from 'express';

export function sendResponse(res: Response, status: number, data: any, message = '') {
  res.status(status).json({
    status,
    message,
    data
  });
}
