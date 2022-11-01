import { Router, Request, Response } from "express";

/**
 * Controller interface
 */

export default interface Controller {
  path: string;
  router: Router;
}
