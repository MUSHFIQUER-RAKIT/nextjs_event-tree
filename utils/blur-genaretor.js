const { getPlaiceholder } = require("plaiceholder");

export async function getBlurData(imgSrc) {
  const buffer = await fetch(imgSrc).then(async res =>
    Buffer.from(await res.arrayBuffer())
  );
  const data = await getPlaiceholder(buffer);

  return data;
}
