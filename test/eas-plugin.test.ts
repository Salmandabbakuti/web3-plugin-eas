import { Web3 } from "web3";
import { EASPlugin } from "../src";

const rpcUrl = "http://127.0.0.1:8545";

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
});

describe("EASPlugin Method Tests", () => {
  let web3: Web3;

  beforeAll(() => {
    web3 = new Web3(rpcUrl);
    web3.registerPlugin(new EASPlugin());
  });

  it("someMethod: should return passed data", () => {
    const res = web3.eas.someMethod("test");
    expect(typeof res).toBe("string");
    expect(res).toEqual("test");
  });
});
