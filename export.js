const fs = require('fs');
const { parse } = require('csv-parse/sync');

// selected 目录下筛选好的图片的 id
const { selectedIds } = require('./selectedIds');

/**
 * 图片乱序方法
 *
 * @param {array} imageIds 筛选出来的图片 ids + 1/1 ids
 * @return {array} 返回一个 random 的 id 数组
 */
const shuffle = (imageIds) => {
  let currentIndex = imageIds.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [imageIds[currentIndex], imageIds[randomIndex]] = [
      imageIds[randomIndex],
      imageIds[currentIndex],
    ];
  }

  return imageIds;
};

const imagePaths = {
  selected: './selected/',
  special: './special/',
};
const newImagePath = './export/images/';
const newMetadataPath = './export/metadata/';

// 替换成你的项目的 description
const desc = `中国人不骗中国人！国产良心 NFT 是专为中国人打造的一个存在于以太坊区块链上的由代码随机生成 1000 个国产良心 NFT。国产良心 NFT 的持有者将会获得一个头像，并且拥有扶持国产良心 NFT 的义务。For English speakers, we do not provide an English version, please consider learning Chinese or using Google Translate. Thanks.`;

// 创建一个 1/1 traits csv 列表用来生成 1/1 的 metadata
const specialTraits = {};
const traitsFile = fs.readFileSync('./special_traits.csv', 'utf8');
const traits = parse(traitsFile);
for (const [specId, beijing, lian, yanjing, bizi, zuiba, faxing] of traits) {
  specialTraits[specId.trim()] = [beijing, lian, yanjing, bizi, zuiba, faxing];
}

const getAtttById = (id) => {
  const [bj, l, y, b, z, f] = specialTraits[id.toString().trim()];
  const result = [
    { trait_type: 'Beijing', value: bj },
    { trait_type: 'Lian', value: l },
    { trait_type: 'Yanjing', value: y },
    { trait_type: 'Bizi', value: b },
    { trait_type: 'Zuiba', value: z },
    { trait_type: 'Faxing', value: f },
  ].filter((r) => !!r.value);
  return result;
};

/**
 * 对一些不合理的 trait 名称进行转化，可根据具体情况写逻辑
 * 对于国产良心 NFT 来说，我们有区分男性发型，开心或生气的表情，
 * 但对于 trait 展示来说，不想将细分类展示出来，所以就 format 了一下
 *
 * @param {array} attrs metadata 里的 attributes 数组
 * @return {array} 返回一个 format 后的 attributes 数组
 */
const normalizeAttr = (attrs) => {
  const newAttrs = [];
  for (const attr of attrs) {
    let type = attr['trait_type'];
    switch (type.toLowerCase()) {
      case 'yanjingkaixin':
      case 'yanjingshengqi':
        type = 'Yanjing';
        break;
      case 'zuibakaixin':
      case 'zuibashengqi':
        type = 'Zuiba';
        break;
      case 'faxingnan':
      case 'faxingshengqi':
        type = 'Faxing';
        break;
    }

    let value = attr['value'];
    if (type.toLowerCase() === 'beijing') {
      value = 'Beijing';
    }
    newAttrs.push({ trait_type: type, value: value });
  }
  return newAttrs;
};

/**
 * 合并筛选后的图片和 1/1 图片，并调用 shuffle 方法进行打乱
 * 再将对应的 build 目录下的原始 metadata 文件内容读取出来进行 metadata 内容更新
 * 同时对于 1/1 图片的 metadata，通过 getAtttById 方法进行更新
 * 最终此方法会生成最终的图片和 metadata（metadata JSON 中的 image 地址还需要之后进行更新）
 */
const main = async () => {
  const specialFiles = await fs.readdirSync('./special/');

  const selected = selectedIds.map((i) => `selected:${i}`);
  const special = specialFiles.map((f) => `special:${f.split('.')[0]}`);

  const normal = selected.concat(special);
  const shuffled = shuffle(normal);

  for (const [index, file] of shuffled.entries()) {
    const [category, id] = file.split(':');
    if (id !== '') {
      const oldImage = `${imagePaths[category]}${id}.png`;
      const newImage = `${newImagePath}${index}.png`;

      let newMetadata;
      if (category === 'selected') {
        const oldMetadataFile = await fs.readFileSync(
          `./build/json/${id}.json`
        );
        const oldMetadata = JSON.parse(oldMetadataFile);
        newMetadata = {
          name: `Eager Emu #${index}`,
          description: desc,
          image: `ipfs://NewUriToReplace/${index}.png`,
          attributes: normalizeAttr(oldMetadata['attributes']),
        };
      } else {
        newMetadata = {
          name: `Eager Emu #${index}`,
          description: desc,
          image: `ipfs://NewUriToReplace/${index}.png`,
          attributes: getAtttById(id),
        };
      }

      await fs.writeFileSync(
        `${newMetadataPath}${index}`,
        JSON.stringify(newMetadata)
      );

      await fs.copyFileSync(oldImage, newImage);
    }
  }
};

main();
