import { Web3PluginBase, Contract, validator } from "web3";
import SchemaRegistryABI from "./abis/schemaRegistry";
import EASCoreABI from "./abis/eas";
import {
  EAS,
  Offchain,
  SchemaEncoder,
  SchemaRegistry
} from "@ethereum-attestation-service/eas-sdk";

export type SchemaRegistryType = Contract<typeof SchemaRegistryABI>;
export type EASCoreType = Contract<typeof EASCoreABI>;

export class EASPlugin extends Web3PluginBase {
  public pluginNamespace = "eas";

  /**
   * This method creates EAS's SchemaRegistry Contract instance of connected chain
   * @param address - SchemaRegistry Contract Address of connected chain
   * @returns SchemaRegistry Contract instance
   * @throws Error if address is not a valid address
   * @example
   * ```ts
   * const web3 = new Web3("http://127.0.0.1:8545");
   * web3.registerPlugin(new EASPlugin());
   * const SchemaRegistry = web3.eas.SchemaRegistry(SchemaRegistryAddress);
   * ```
   */
  public schemaRegistry(address: string): SchemaRegistryType {
    if (!validator.isAddress(address))
      throw new Error("EAS Plugin: Invalid Schema Registry Address");
    const schemaRegistryContract = new Contract(SchemaRegistryABI, address);
    schemaRegistryContract.link(this);
    return schemaRegistryContract;
  }

  /**
   * This method creates EAS's EAS Contract instance of connected chain
   * @param address - EAS Contract Address of connected chain
   * @returns EAS Contract instance
   * @throws Error if address is not a valid address
   * @example
   * ```ts
   * const web3 = new Web3("http://127.0.0.1:8545");
   * web3.registerPlugin(new EASPlugin());
   * const EAS = web3.eas.EAS(EASAddress);
   * ```
   */

  public easCore(address: string): EASCoreType {
    if (!validator.isAddress(address))
      throw new Error("EAS Plugin: Invalid EAS Address");
    const easContract = new Contract(EASCoreABI, address);
    easContract.link(this);
    return easContract;
  }

  public someMethod(param: string): string {
    return param;
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    eas: EASPlugin;
  }
}
