import HospitatvaBackendStack from "./HospitatvaBackendStack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  new HospitatvaBackendStack(app, "hospitatva-backend-stack");

  // Add more stacks
}
