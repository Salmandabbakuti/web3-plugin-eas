import { Web3PluginBase, Contract, validator } from "web3";
import { contractAddresses, ContractAddresses, Chain } from "./utils";
import SchemaRegistryABI from "./abis/schemaRegistry";
import EASCoreABI from "./abis/eas";
// import {
//   EAS,
//   Offchain,
//   SchemaEncoder,
//   SchemaRegistry
// } from "@ethereum-attestation-service/eas-sdk";

export type SchemaRegistry = Contract<typeof SchemaRegistryABI>;
export type EASCore = Contract<typeof EASCoreABI>;

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
  public schemaRegistry(address: string): SchemaRegistry {
    if (!validator.isAddress(address))
      throw new Error("EAS Plugin: Invalid Schema Registry Address");
    const schemaRegistryContract = new Contract(SchemaRegistryABI, address);
    schemaRegistryContract.link(this);
    return schemaRegistryContract;
  }

  /**
   * This method creates EAS's EAS Contract instance of connected chain
   * @param address - EAS Contract Address of connected chain
   * @returns EASCore Contract instance
   * @throws Error if address is not a valid address
   * @example
   * ```ts
   * const web3 = new Web3("http://127.0.0.1:8545");
   * web3.registerPlugin(new EASPlugin());
   * const easCore = web3.eas.easCore(EASAddress);
   * ```
   */

  public easCore(address: string): EASCore {
    if (!validator.isAddress(address))
      throw new Error("EAS Plugin: Invalid EAS Address");
    const easContract = new Contract(EASCoreABI, address);
    easContract.link(this);
    return easContract;
  }

  /**
   * This method returns EAS's Contract Addresses of the given chain
   * @param chain - Chain name
   * @returns Contract Addresses of the chain
   * @throws Error if chain is not a valid chain
   * @example
   * ```ts
   * const web3 = new Web3("http://)
   * web3.registerPlugin(new EASPlugin());
   * const addresses = web3.eas.getContractAddresses("ethereum");
   * ```
   */

  public getContractAddresses(chain: Chain): ContractAddresses {
    const addressesObj = contractAddresses[chain];
    if (!addressesObj) throw new Error("EAS Plugin: Invalid Chain");
    return addressesObj;
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
