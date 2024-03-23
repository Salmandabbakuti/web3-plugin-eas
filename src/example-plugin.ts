import { Web3PluginBase } from "web3";

export class ExamplePlugin extends Web3PluginBase {
  public pluginNamespace = "example";

  public someMethod(param: string): string {
    return param;
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    example: ExamplePlugin;
  }
}
