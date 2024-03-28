import { Web3 } from "web3";
import { EASPlugin, SchemaRegistry, EASCore } from "../src";

const rpcUrl = "https://rpc.ankr.com/eth";
const chainId = 1;

describe("EASPlugin Tests", () => {
  it("should register example plugin to Web3", () => {
    const web3 = new Web3(rpcUrl);
    web3.registerPlugin(new EASPlugin());

    expect(web3.eas).toBeInstanceOf(EASPlugin);
    expect(web3.eas.pluginNamespace).toBe("eas");
    expect(web3.eas.schemaRegistry).toBeInstanceOf(Function);
    expect(web3.eas.easCore).toBeInstanceOf(Function);
    expect(web3.eas.getContractAddresses).toBeInstanceOf(Function);
  });

  it("should throw error if address passed to plugin functions is not valid", () => {
    const web3 = new Web3("http://127.0.0.1:8545");
    web3.registerPlugin(new EASPlugin());

    expect(() => {
      web3.eas.schemaRegistry("0x123");
    }).toThrow("EAS Plugin: Invalid Schema Registry Address");

    expect(() => {
      web3.eas.easCore("0x123");
    }).toThrow("EAS Plugin: Invalid EAS Address");
  });
});

describe("EASPlugin Method Tests", () => {
  let web3: Web3;
  let schemaRegistry: SchemaRegistry;
  let easCore: EASCore;

  beforeAll(async () => {
    web3 = new Web3(rpcUrl);
    web3.registerPlugin(new EASPlugin());
    const addresses = await web3.eas.getContractAddresses();
    schemaRegistry = web3.eas.schemaRegistry(addresses.schemaRegistry);
    easCore = web3.eas.easCore(addresses.eas);
  });

  it("contractAddresses: should throw error if provided chainId is not supported", async () => {
    expect(async () => {
      const chainId = 123;
      await web3.eas.getContractAddresses(chainId);
    }).rejects.toThrow(`EAS Plugin: Unsupported ChainId ${chainId}`);
  });

  it("contractAddresses: should get contract addresses for given chainId", async () => {
    const addresses = await web3.eas.getContractAddresses(chainId);
    expect(addresses).toBeInstanceOf(Object);
    expect(addresses).toHaveProperty("eas");
    expect(addresses).toHaveProperty("schemaRegistry");
  });

  it("contractAddresses: should get contract addresses for connected chain if chainId is not provided", async () => {
    const addresses = await web3.eas.getContractAddresses();
    expect(addresses).toBeInstanceOf(Object);
    expect(addresses).toHaveProperty("eas");
    expect(addresses).toHaveProperty("schemaRegistry");
  });

  it("schemaRegistry: should get schema from schemaRegistry contract instance", async () => {
    const schemaUID =
      "0xd100943957d0f72cf5f93d55bea0dda8083817cd20af71863fe7efbb88eeb1ba"; // Mainnet Schema UID
    const { schema, resolver, uid, revocable } = await schemaRegistry.methods
      .getSchema(schemaUID)
      .call();
    expect(typeof schema).toBe("string");
    expect(uid).toEqual(schemaUID);
    expect(typeof resolver);
    expect(typeof revocable).toBe("boolean");
  });

  it("schemaRegistry: should get version from schema registry contract instance", async () => {
    const version = await schemaRegistry.methods.VERSION().call();
    expect(version).toBeDefined();
  });

  // GET attestation
  it("easCore: should get attestation for given uid", async () => {
    const uid =
      "0x30d407a15dae7fef2a1ee043368bd605d5789ecd5e2d9583f5597f4233e9aaee";
    const attestation = await easCore.methods.getAttestation(uid).call();
    expect(attestation).toBeInstanceOf(Object);
    expect(attestation.uid).toEqual(uid);
    expect(attestation.schema).toBeDefined();
    expect(attestation.attester).toEqual(
      "0x2bF22CAe1dc34f265cAE03F6ff419177b4f4FBb3"
    );
    expect(attestation.revocable).toBe(true);
    expect(attestation.expirationTime).toEqual(0n);
  });

  // check if attestation is valid
  it("easCore: should check if attestation is valid", async () => {
    const uid =
      "0x30d407a15dae7fef2a1ee043368bd605d5789ecd5e2d9583f5597f4233e9aaee";
    const isValid = await easCore.methods.isAttestationValid(uid).call();
    expect(isValid).toBe(true);
  });
});
