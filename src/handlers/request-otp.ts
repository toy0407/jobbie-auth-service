import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { lambdaHandler } from "@toy0407/jobbie-lib/dist/utils/lambdaWrapper.util";
import { validatorMiddleware } from "@toy0407/jobbie-lib/dist/middlewares/validator.middleware";
import { DbClient } from "@toy0407/jobbie-lib/dist/db/client";
import { logger } from "@toy0407/jobbie-lib/dist/utils/logger.util";
import { RequestOtpSchemas } from "../schemas/req-otp.schema";
import { ApiResponse } from "@toy0407/jobbie-lib/dist/types/api.types";

async function requestOtp(event: any, context: Context): Promise<any> {
  // Get email from body
  // Generate OTP
  // Save OTP to database
  // Send OTP to email
  // Return success message
  await DbClient.user.count();
  console.log(event.body.email);
  return event.body;
}

export const handler = lambdaHandler(requestOtp).use(
  validatorMiddleware({
    body: RequestOtpSchemas.bodySchema,
  })
);
