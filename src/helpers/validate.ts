import { isString } from "lodash";

// Utility function to validate req.body
export const validateBody = (body: any) => {
    if (!isString(body.title) || body.title.trim().length === 0) {
      throw new Error("Invalid title: must be a non-empty string.");
    }
    // Add more validations as needed
  };