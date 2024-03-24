import { Web3 } from "web3";
import { EASPlugin } from "../src";

const rpcUrl = "http://127.0.0.1:8545";
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

  beforeAll(() => {
    web3 = new Web3(rpcUrl);
    web3.registerPlugin(new EASPlugin());
  });

  it("contractAddresses: should throw error if chainId is not supported", () => {
    expect(() => {
      web3.eas.getContractAddresses(123);
    }).toThrow("EAS Plugin: Unsupported ChainId");
  });

  it("contractAddresses: should get contract addresses for given chainId", () => {
    const addresses = web3.eas.getContractAddresses(chainId);
    expect(addresses).toBeInstanceOf(Object);
    expect(addresses).toHaveProperty("eas");
    expect(addresses).toHaveProperty("schemaRegistry");
  });
});
