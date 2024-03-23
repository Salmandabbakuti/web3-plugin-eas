import { Web3 } from "web3";
import { ExamplePlugin } from "../src";

const rpcUrl = "http://127.0.0.1:8545";

describe("ExamplePlugin Tests", () => {
  it("should register example plugin to Web3", () => {
    const web3 = new Web3(rpcUrl);
    web3.registerPlugin(new ExamplePlugin());

    expect(web3.example).toBeInstanceOf(ExamplePlugin);
    expect(web3.example.pluginNamespace).toBe("example");
    expect(web3.example.someMethod).toBeInstanceOf(Function);
  });
});

describe("ExamplePlugin Method Tests", () => {
  let web3: Web3;

  beforeAll(() => {
    web3 = new Web3(rpcUrl);
    web3.registerPlugin(new ExamplePlugin());
  });

  it("someMethod: should return passed data", () => {
    const res = web3.example.someMethod("test");
    expect(typeof res).toBe("string");
    expect(res).toEqual("test");
  });
});
