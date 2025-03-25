import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { lambdaHandler } from "@toy0407/jobbie-lib/dist/utils/lambdaWrapper.util";
import { DbClient } from "@toy0407/jobbie-lib/dist/db/client";
import { logger } from "@toy0407/jobbie-lib/dist/utils/logger.util";

async function signUp(event: APIGatewayProxyEvent, context: Context) {}

export const handler = lambdaHandler(signUp);
