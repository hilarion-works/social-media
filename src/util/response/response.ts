import express, { Request, Response, NextFunction } from 'express';

export default {
  serverError(messages: string, res: Response, flag = 0) {
    res.status(500).json({
      success: false,
      flag,
      messages
    })
  },
  success(message: string, res: Response, data: object) {
    res.status(200).json({
      success: true,
      flag: 200,
      message,
      result: data
    })
  },
  error(message: string, res: Response, flag = 0) {
    res.status(500).json({
      success: false,
      flag,
      message
    })
  },
  notFound(message: string, res: Response, flag = 0) {
    res.status(404).json({
      success: false,
      flag,
      message
    })
  },
  invalidInput(message: string, res: Response, flag = 0) {
    res.status(400).json({
      success: false,
      flag,
      message
    })
  },
  unauthorized(message: string, res: Response, flag = 0) {
    res.status(401).json({
      success: false,
      flag,
      message
    })
  },
  forbidden(message: string, res: Response, flag = 0) {
    res.status(403).json({
      success: false,
      flag,
      message
    })
  },
  conflict(message: string, res: Response, flag = 0) {
    res.status(409).json({
      success: false,
      flag,
      message
    })
  }
}
