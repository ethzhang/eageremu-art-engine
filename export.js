const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// selected 目录下筛选好的图片的 id
const selectedIds = require('./selectedIds');

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

if (!fs.existsSync(newMetadataPath)) {
  fs.mkdirSync(newMetadataPath);
}
if (!fs.existsSync(newImagePath)) {
  fs.mkdirSync(newImagePath);
}

// 替换成你的项目的 description
const desc = `Eager Emu, the endearing mascot of ClassNow! This lively and playful character embodies everything that our online educational marketplace represents.`;

// 创建一个 1/1 traits csv 列表用来生成 1/1 的 metadata
const specialTraits = {};
const traitsFile = fs.readFileSync('./special_traits.csv', 'utf8');
const traits = parse(traitsFile);
for (const [specId, Background, Body, Clothing, Head, Wearables, Mouth, Eyes, Accessories] of traits) {
  specialTraits[specId.trim()] = [Background.trim(), Body.trim(), Clothing.trim(), Head.trim(), Wearables.trim(), Mouth.trim(), Eyes.trim(), Accessories.trim()];
}

const getAtttById = (id) => {
  const [Background, Body, Clothing, Head, Wearables, Mouth, Eyes, Accessories] = specialTraits[id.toString().trim()];
  const result = [
    { trait_type: 'Background', value: Background },
    { trait_type: 'Body', value: Body },
    { trait_type: 'Clothing', value: Clothing },
    { trait_type: 'Head', value: Head },
    { trait_type: 'Wearables', value: Wearables },
    Mouth == 'no' ? '' : { trait_type: 'Mouth', value: Mouth },
    { trait_type: 'Eyes', value: Eyes },
    { trait_type: 'Accessories', value: Accessories },
  ].filter((r) => !!r.value);
  return result;
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
          attributes: oldMetadata['attributes'],
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
