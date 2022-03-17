import * as sst from "@serverless-stack/resources";
import * as iam from "aws-cdk-lib/aws-iam";
import { readFileSync } from "fs";
import path from "path";

export default class HospitatvaBackendStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Read the inventory JSON file and initialize dynmaic values
    const inventoryArray: Array<{ id: number; name: string }> = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "..", "inventory.json")
      ).toString()
    );

    // Create an IAM permission to access AWS SSM stored parameters
    const ssmIamPermission = new iam.PolicyStatement({
      actions: ["ssm:*"],
      effect: iam.Effect.ALLOW,
      resources: ["*"],
    });

    // Create a DynamoDB table array for products
    let tableArray: Array<sst.Table> = [];

    for (let i = 0; i < inventoryArray.length; i++) {
      tableArray.push(
        new sst.Table(
          this,
          `Hospitatva-DynamoDB-Table-${i + 1}-${inventoryArray[i].name.replace(
            /\s/g,
            "-"
          )}`,
          {
            fields: {
              id: sst.TableFieldType.STRING,
              updatedAt: sst.TableFieldType.STRING,
              price: sst.TableFieldType.STRING,
            },
            primaryIndex: {
              partitionKey: "id",
            },
            stream: true,
          }
        )
      );
    }

    // Create a DynamoDB table for the nonce storage
    const nonceTable = new sst.Table(
      this,
      `Hospitatva-DynamoDB-Table-Nonce-Storage`,
      {
        fields: {
          userWallet: sst.TableFieldType.STRING,
          nonce: sst.TableFieldType.STRING,
        },
        primaryIndex: {
          partitionKey: "userWallet",
        },
      }
    );

    // Create a HTTP API
    const api = new sst.Api(this, "Hospitatva-Api", {
      routes: {
        "GET /user/nonce": {
          function: {
            handler: "src/user/nonce/getNonceController.handler",
            permissions: [nonceTable],
            environment: {
              NONCE_TABLE_NAME: nonceTable.tableName,
            },
          },
        },
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}