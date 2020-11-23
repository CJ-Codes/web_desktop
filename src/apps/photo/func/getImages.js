/**
 *
 * @param {string[]} urls
 * @returns {promise}
 */
export const getImages = (urls) => Promise.allSettled(
  urls.map(v => new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = process.env.PUBLIC_URL + '/lib/iamges/' + v;
  }))
)