export const CAR_REGISTRATION_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "registrationNumber",
        type: "string"
      },
      {
        internalType: "address",
        name: "buyer",
        type: "address"
      }
    ],
    name: "changeCarOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address"
      }
    ],
    name: "OwnershipChanged",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "registrationNumber",
        type: "string"
      },
      {
        internalType: "string",
        name: "brandName",
        type: "string"
      },
      {
        internalType: "string",
        name: "modelName",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "launchYear",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "setCarDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "registrationNumber",
        type: "string"
      }
    ],
    name: "getCarDetails",
    outputs: [
      {
        internalType: "string",
        name: "brandName",
        type: "string"
      },
      {
        internalType: "string",
        name: "modelName",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "launchYear",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "registrationNumber",
        type: "string"
      }
    ],
    name: "getCarOwner",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

export const SMART_CONTRACT_ADDRESS =
  "0xef0779423b940dda1118f3be44e63519442a84d4";
