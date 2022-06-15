import * as sst from "@serverless-stack/resources";
import { Duration } from "aws-cdk-lib";
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
    const tableArray: Array<sst.Table> = [];
    let tableNameEnv: any = {};

    for (let i = 0; i < inventoryArray.length; i++) {
      tableArray.push(
        new sst.Table(this, `Hospitatva-Table-${i + 1}`, {
          fields: {
            id: sst.TableFieldType.STRING,
            updatedAt: sst.TableFieldType.STRING,
            price: sst.TableFieldType.STRING,
            address: sst.TableFieldType.STRING,
            available: sst.TableFieldType.STRING,
          },
          primaryIndex: {
            partitionKey: "updatedAt",
          },
          stream: true,
        })
      );
      tableNameEnv[`TABLE_NAME_${i + 1}`] = tableArray[i].tableName;
    }

    tableArray.forEach((table, index) =>
      table.addConsumers(this, {
        [`priceInference-${index + 1}`]: {
          function: {
            functionName: this.stage + "-priceInferenceConsumer" + (index + 1),
            handler:
              "src/prediction/consumers/predictionInferenceConsumer.handler",
            timeout: 900,
            bundle: {
              nodeModules: ["@zilliqa-js/zilliqa"],
              minify: false,
            },
            permissions: [...tableArray, ssmIamPermission],
          },
        },
      })
    );

    const indexerCron = new sst.Cron(this, "Hospitatva-Indexer-Cron", {
      job: {
        function: {
          handler: "src/indexer/indexerCronJob.indexBlocksByTime",
          permissions: [...tableArray],
          environment: { ...tableNameEnv },
          bundle: {
            nodeModules: ["@zilliqa-js/zilliqa"],
            minify: false,
          },
        },
      },
      schedule: "cron(0/1 * * * ? *)",
    });

    indexerCron.attachPermissions([ssmIamPermission]);

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
            bundle: {
              nodeModules: ["@zilliqa-js/zilliqa"],
              minify: false,
            },
          },
        },
        "POST /user/magic": {
          function: {
            handler: "src/user/auth/getMagicUserController.handler",
            permissions: [ssmIamPermission],
            bundle: {
              nodeModules: ["@zilliqa-js/zilliqa"],
              minify: false,
            },
          },
        },
        "GET /hospital": {
          function: {
            handler: "src/hospital/getHospitalData.handler",
            permissions: [nonceTable, ssmIamPermission],
            environment: {
              NONCE_TABLE_NAME: nonceTable.tableName,
            },
            bundle: {
              nodeModules: ["@zilliqa-js/zilliqa"],
              minify: false,
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
