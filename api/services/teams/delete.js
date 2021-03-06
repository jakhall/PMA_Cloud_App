import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {

  const data = JSON.parse(event.body);

  const userId = "";
  const projectId = "";

  if(data.userId == null){
    userId = event.pathParameters.id;
    projectId = data.projectId;
  } else {
    userId = data.userId;
    projectId =  event.pathParameters.id;
  }

  const params = {
    TableName: "TEAM_Table",
    Key: {
      userId: userId,
      projectId: projectId
    }
  };

  try {
    const result = await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: e });
  }
}
