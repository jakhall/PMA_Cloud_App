import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "TEAM_Table",
    FilterExpression: "projectId = :projectId",
    ExpressionAttributeValues: {
      ":projectId": event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: e });
  }
}
