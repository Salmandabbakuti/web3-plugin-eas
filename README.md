# Ethereum Attestation Service(EAS) Web3 Plugin

[![npm version](https://img.shields.io/badge/npm-0.0.1-brightgreen)](https://www.npmjs.com/package/web3-plugin-eas)

The Ethereum Attestation Service(EAS) Web3.js Plugin extends the capabilities of the Web3.js library to interact seamlessly with the [Ethereum Attestation Service](https://attest.sh/). This plugin provides convenient methods for interacting with the Ethereum Attestation Service(EAS) contracts.

#### Supported Features:

- Get contract addresses of given network
- Schema Registration
- Attestations
- Native Schema Encoder(WIP)

## Installation

> Note: Make sure you are using `web3` version 4.0.3 or higher in your project.

```bash
npm install web3-plugin-eas web3@latest --save
```

## Usage

### Basic Usage

```js
import { Web3 } from "web3";
import { EASPlugin } from "web3-plugin-eas";

const web3 = new Web3("https://rpc-mumbai.maticvigil.com"); // Any RPC node you wanted to connect with
web3.registerPlugin(new EASPlugin());

// Getting contract addresses of given chain
const addresses = web3.eas.getContractAddresses("polygonMumbai"); // See supported chains for more information.

// Contract Instances
const schemaRegistry = web3.eas.schemaRegistry(addresses.schemaRegistry);
const easCore = web3.eas.easCore(addresses.eas);

// Getting schema record
const schemaUID = "0xYourSchemaUID";
const schemaRecord = await schemaRegistry.methods.getSchema(schemaUID).call();
console.log("Record", schemaRecord);

// Getting Attestation
const uid =
  "0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e";
const attestation = await easCore.methods.getAttestation(uid).call();
```

### Connecting Accounts to Web3

```js
import { Web3 } from "web3";
import { EASPlugin } from "web3-plugin-eas";

// With any RPC node and private key
const web3 = new Web3("https://rpc-mumbai.maticvigil.com/");
const wallet = web3.eth.accounts.wallet.add("0x..."); // Private Key
const { address: account } = wallet[0];

// or with browser wallets
const web3 = new Web3(window.ethereum);
const [account] = await window.ethereum.request({
  method: "eth_requestAccounts"
});

web3.registerPlugin(new EASPlugin());

// Getting contract addresses of given chain
const addresses = web3.getContractAddresses("polygonMumbai"); // See supported chains for more information.

// Contract Instances
const schemaRegistry = web3.eas.schemaRegistry(addresses.schemaRegistry);
const easCore = web3.eas.easCore(addresses.eas);
```

### Schema Registry:

#### Example1:

### EAS Core:

#### Example1:

### Supported Chains

`web3-plugin-eas` supports the following chains:

```ts
export type Chain =
  | "ethereum"
  | "optimism"
  | "base"
  | "arbitrumOne"
  | "arbitrumNova"
  | "polygon"
  | "scroll"
  | "linea"
  | "sepolia"
  | "optimismSepolia"
  | "optimismGoerli"
  | "baseSepolia"
  | "baseGoerli"
  | "arbitrumGoerli"
  | "polygonMumbai"
  | "lineaGoerli"
  | "scrollSepolia";
```

### Publishing

To publish a new version of the package to npm, run the following command:

```bash
npm run build

npm publish
```

## Change Log

#### 0.0.1

## Resources

- [Ethereum Attestation Service Documentation](https://docs.attest.sh/docs/welcome)
- [Web3js Plugins Documentation](https://docs.web3js.org/guides/web3_plugin_guide/)

## Safety

This is experimental software and subject to change over time.

This package is not audited and has not been tested for security. Use at your own risk.
I do not give any warranties and will not be liable for any loss incurred through any use of this codebase.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
