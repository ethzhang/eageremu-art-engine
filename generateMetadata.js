const fs = require('fs');

const metadataDirectory = './export/metadata';
const newMetadataDir = "./export/meta"

if (!fs.existsSync(newMetadataDir)) {
  fs.mkdirSync(newMetadataDir);
}

// 注意要替换 image 的 CID
const generateRevealedMD = async () => {
  const indexes = [...Array(5000).keys()];

  for (const id of indexes) {
    const oldMetadataFile = await fs.readFileSync(`./export/metadata/${id}`);
    const oldMetadata = JSON.parse(oldMetadataFile);
    const newMetadata = {
      name: `Eager Emu #${id}`,
      description: oldMetadata['description'],
      image: `ipfs://QmVU8xfBjLDXuDG9rbwNfXiD1RKES4Jua6ngUi5nd1WsZq/${id}.png`,
      attributes: oldMetadata['attributes'],
    };

    fs.writeFileSync(`${newMetadataDir}/${id}`, JSON.stringify(newMetadata));
  }
};

generateRevealedMD();
