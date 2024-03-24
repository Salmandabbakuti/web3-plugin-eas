import { utils, Web3 } from "web3";

export type ContractAddresses = {
  schemaRegistry: string;
  eas: string;
  eip712Proxy?: string;
  indexer?: string;
};

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

export const contractAddresses: Record<Chain, ContractAddresses> = {
  ethereum: {
    schemaRegistry: "0xA7b39296258348C78294F95B872b282326A97BDF",
    eas: "0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587"
  },
  optimism: {
    schemaRegistry: "0x4200000000000000000000000000000000000020",
    eas: "0x4200000000000000000000000000000000000021"
  },
  base: {
    schemaRegistry: "0x4200000000000000000000000000000000000020",
    eas: "0x4200000000000000000000000000000000000021"
  },
  arbitrumOne: {
    schemaRegistry: "0xA310da9c5B885E7fb3fbA9D66E9Ba6Df512b78eB",
    eas: "0xbD75f629A22Dc1ceD33dDA0b68c546A1c035c458"
  },
  arbitrumNova: {
    schemaRegistry: "0x49563d0DA8DF38ef2eBF9C1167270334D72cE0AE",
    eas: "0x6d3dC0Fe5351087E3Af3bDe8eB3F7350ed894fc3",
    eip712Proxy: "0xEbf2DeeD690F8A68b8248d6a12231ee70ED2154A",
    indexer: "0x7182Be5e84aFEe9Dc29C69D081F8A0FA834d6CB8"
  },
  polygon: {
    schemaRegistry: "0x7876EEF51A891E737AF8ba5A5E0f0Fd29073D5a7",
    eas: "0x5E634ef5355f45A855d02D66eCD687b1502AF790",
    eip712Proxy: "0x4be71865917C7907ccA531270181D9B7dD4f2733",
    indexer: "0x12d0f50Eb2d67b14293bdDA2C248358f3dfE5308"
  },
  scroll: {
    schemaRegistry: "0xD2CDF46556543316e7D34e8eDc4624e2bB95e3B6",
    eas: "0xC47300428b6AD2c7D03BB76D05A176058b47E6B0",
    eip712Proxy: "0x77b7DA1c40762Cd8AFfE2069b575328EfD4D9801",
    indexer: "0x8314bc1B2f7F286cb4f0323FE7119C0F99D4A083"
  },
  linea: {
    schemaRegistry: "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797",
    eas: "0xaEF4103A04090071165F78D45D83A0C0782c2B2a"
  },
  sepolia: {
    schemaRegistry: "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0",
    eas: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"
  },
  optimismSepolia: {
    schemaRegistry: "0x4200000000000000000000000000000000000020",
    eas: "0x4200000000000000000000000000000000000021"
  },
  optimismGoerli: {
    schemaRegistry: "0x4200000000000000000000000000000000000020",
    eas: "0x4200000000000000000000000000000000000021"
  },
  baseSepolia: {
    schemaRegistry: "0x4200000000000000000000000000000000000020",
    eas: "0x4200000000000000000000000000000000000021"
  },
  baseGoerli: {
    schemaRegistry: "0x4200000000000000000000000000000000000020",
    eas: "0x4200000000000000000000000000000000000021"
  },
  arbitrumGoerli: {
    schemaRegistry: "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797",
    eas: "0xaEF4103A04090071165F78D45D83A0C0782c2B2a"
  },
  polygonMumbai: {
    schemaRegistry: "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797",
    eas: "0xaEF4103A04090071165F78D45D83A0C0782c2B2a"
  },
  lineaGoerli: {
    schemaRegistry: "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797",
    eas: "0xaEF4103A04090071165F78D45D83A0C0782c2B2a"
  },
  scrollSepolia: {
    schemaRegistry: "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797",
    eas: "0xaEF4103A04090071165F78D45D83A0C0782c2B2a",
    eip712Proxy: "0xB3574f76b1720E61FdA98702c7016674CD6Eaa7b",
    indexer: "0x7C2cb1eDC328491da52de2a0afc44D3B0Ae7ee17"
  }
};

export type SchemaValue = string | boolean | number | bigint;
export interface SchemaItem {
  name: string;
  type: string;
  value: SchemaValue;
}

export class SchemaEncoder {
  signature: string[];
  web3: Web3;

  constructor(schema: string) {
    this.signature = schema.split(",").map((item: string) => item.trim());
    this.web3 = new Web3();
  }

  encodeData(dataSchema: SchemaItem[]): string {
    const data = dataSchema.map(({ type, value }) => {
      const sanitizedValue =
        type === "bytes32" && typeof value === "string"
          ? utils.utf8ToBytes(value)
          : value;
      return sanitizedValue;
    });
    console.log("data", data);
    console.log("signature", this.signature);
    const encodedData = this.web3.eth.abi.encodeParameters(
      this.signature,
      data
    );
    return encodedData;
  }
}
