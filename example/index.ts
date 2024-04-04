import { Web3 } from "web3";
import { EASPlugin } from "web3-plugin-eas";

const web3 = new Web3("https://rpc.ankr.com/eth"); // Any RPC node you wanted to connect with
web3.registerPlugin(new EASPlugin());

async function main() {
  // Getting contract addresses of connected chain
  const addresses = await web3.eas.getContractAddresses();

  // or with given chain ID
  // const addresses = await web3.eas.getContractAddresses(80001); // Chain ID of Polygon Mumbai

  // Contract Instances
  const schemaRegistry = web3.eas.schemaRegistry(addresses.schemaRegistry);
  const easCore = web3.eas.easCore(addresses.eas);

  // Getting schema record
  const schemaUID =
    "0xd100943957d0f72cf5f93d55bea0dda8083817cd20af71863fe7efbb88eeb1ba"; // mainnet
  const schemaRecord = await schemaRegistry.methods.getSchema(schemaUID).call();
  console.log("Schema Record:", schemaRecord);

  // Getting Attestation
  const uid =
    "0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e";
  const attestation = await easCore.methods.getAttestation(uid).call();
  console.log("Attestation:", attestation);
}

main();
