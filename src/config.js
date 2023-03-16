const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = 'EagerEmuNFT';
const description = 'Eager Emu, the endearing mascot of ClassNow! This lively and playful character embodies everything that our online educational marketplace represents.';
const baseUri = 'ipfs://xxxx';

const solanaMetadata = {
  symbol: 'YC',
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: 'https://www.youtube.com/c/hashlipsnft',
  creators: [
    {
      address: '7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC',
      share: 100,
    },
  ],
};

const layerConfigurations = [
  // 4/4 Golden
  {
    growEditionSizeTo: 10,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      {
        name: 'GoldenClothing',
        options: {
          displayName: "Clothing",
        },
      },
      { name: 'Head' },
      {
        name: 'GoldenWearables', options: {
          displayName: "Wearables",
        },
      },
      {
        name: 'GoldenMouth', options: {
          displayName: "Mouth",
        },
      },
      { name: 'Eyes' },
      {
        name: 'GoldenAccessories', options: {
          displayName: "Accessories",
        },
      },
    ],
  },
  // 3/4 Golden
  {
    growEditionSizeTo: 20,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      { name: 'Clothing', },
      { name: 'Head' },
      {
        name: 'GoldenWearables', options: {
          displayName: "Wearables",
        },
      },
      {
        name: 'GoldenMouth', options: {
          displayName: "Mouth",
        },
      },
      { name: 'Eyes' },
      {
        name: 'GoldenAccessories', options: {
          displayName: "Accessories",
        },
      },
    ],
  },
  {
    growEditionSizeTo: 30,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      {
        name: 'GoldenClothing',
        options: {
          displayName: "Clothing",
        },
      },
      { name: 'Head' },
      { name: 'Wearables', },
      {
        name: 'GoldenMouth', options: {
          displayName: "Mouth",
        },
      },
      { name: 'Eyes' },
      {
        name: 'GoldenAccessories', options: {
          displayName: "Accessories",
        },
      },
    ],
  },
  {
    growEditionSizeTo: 40,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      {
        name: 'GoldenClothing',
        options: {
          displayName: "Clothing",
        },
      },
      { name: 'Head' },
      {
        name: 'GoldenWearables', options: {
          displayName: "Wearables",
        },
      },
      { name: 'Mouth', },
      { name: 'Eyes' },
      {
        name: 'GoldenAccessories', options: {
          displayName: "Accessories",
        },
      },
    ],
  },
  {
    growEditionSizeTo: 50,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      {
        name: 'GoldenClothing',
        options: {
          displayName: "Clothing",
        },
      },
      { name: 'Head' },
      {
        name: 'GoldenWearables', options: {
          displayName: "Wearables",
        },
      },
      {
        name: 'GoldenMouth', options: {
          displayName: "Mouth",
        },
      },
      { name: 'Eyes' },
      { name: 'Accessories' },
    ],
  },
  // 2/4 Golden
  {
    growEditionSizeTo: 55,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      {
        name: 'GoldenClothing',
        options: {
          displayName: "Clothing",
        },
      },
      { name: 'Head' },
      {
        name: 'GoldenWearables', options: {
          displayName: "Wearables",
        },
      },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Accessories' },
    ],
  },
  {
    growEditionSizeTo: 60,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      {
        name: 'GoldenClothing',
        options: {
          displayName: "Clothing",
        },
      },
      { name: 'Head' },
      { name: 'Wearables' },
      {
        name: 'GoldenMouth', options: {
          displayName: "Mouth",
        },
      },
      { name: 'Eyes' },
      { name: 'Accessories' },
    ],
  },
  {
    growEditionSizeTo: 65,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      {
        name: 'GoldenClothing',
        options: {
          displayName: "Clothing",
        },
      },
      { name: 'Head' },
      { name: 'Wearables' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      {
        name: 'GoldenAccessories', options: {
          displayName: "Accessories",
        },
      },
    ],
  },

  {
    growEditionSizeTo: 70,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      { name: 'Clothing', },
      { name: 'Head' },
      {
        name: 'GoldenWearables', options: {
          displayName: "Wearables",
        },
      },
      {
        name: 'GoldenMouth', options: {
          displayName: "Mouth",
        },
      },
      { name: 'Eyes' },
      { name: 'Accessories' },
    ],
  },
  {
    growEditionSizeTo: 75,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      { name: 'Clothing' },
      { name: 'Head' },
      {
        name: 'GoldenWearables', options: {
          displayName: "Wearables",
        },
      },
      { name: 'Mouth' },
      { name: 'Eyes' },
      {
        name: 'GoldenAccessories', options: {
          displayName: "Accessories",
        },
      },
    ],
  },
  {
    growEditionSizeTo: 80,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      { name: 'Clothing' },
      { name: 'Head' },
      { name: 'Wearables' },
      {
        name: 'GoldenMouth', options: {
          displayName: "Mouth",
        },
      },
      { name: 'Eyes' },
      {
        name: 'GoldenAccessories', options: {
          displayName: "Accessories",
        },
      },
    ],
  },

  // 1/4 Golden
  {
    growEditionSizeTo: 85,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      {
        name: 'GoldenClothing',
        options: {
          displayName: "Clothing",
        },
      },
      { name: 'Head' },
      { name: 'Wearables' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Accessories' },
    ],
  },
  {
    growEditionSizeTo: 96,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      { name: 'Clothing' },
      { name: 'Head' },
      {
        name: 'GoldenWearables',
        options: {
          displayName: "Wearables",
        },
      },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Accessories' },
    ],
  },
  {
    growEditionSizeTo: 107,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      { name: 'Clothing' },
      { name: 'Head' },
      { name: 'Wearables' },
      {
        name: 'GoldenMouth',
        options: {
          displayName: "Mouth",
        },
      },
      { name: 'Eyes' },
      { name: 'Accessories' },
    ],
  },
  {
    growEditionSizeTo: 118,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      { name: 'Clothing' },
      { name: 'Head' },
      { name: 'Wearables' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      {
        name: 'GoldenAccessories',
        options: {
          displayName: "Accessories",
        },
      },
    ],
  },

  {
    growEditionSizeTo: 5500,
    layersOrder: [
      {
        name: 'Background',
        options: {
          bypassDNA: true,
        },
      },
      { name: 'Body' },
      { name: 'Clothing' },
      { name: 'Head' },
      { name: 'Wearables' },
      { name: 'Mouth' },
      { name: 'Eyes' },
      { name: 'Accessories' },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = true;

const format = {
  width: 600,
  height: 600,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: '#ffffff',
  size: 20,
  xGap: 40,
  yGap: 40,
  align: 'left',
  baseline: 'top',
  weight: 'regular',
  family: 'Courier',
  spacer: ' => ',
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: '80%',
  static: false,
  default: '#ffffff',
};

const extraMetadata = {};

const rarityDelimiter = '#';

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 50,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: 'preview.png',
};

const preview_gif = {
  numberOfImages: 10,
  order: 'MIXED', // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: 'preview.gif',
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
