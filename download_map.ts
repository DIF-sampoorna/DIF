import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = [
  'https://cdn.jsdelivr.net/npm/@svg-maps/india@1.0.1/india.svg',
  'https://raw.githubusercontent.com/Anujarya30/india-map-svg/master/india.svg',
  'https://raw.githubusercontent.com/Anujarya30/india-map-svg/master/map.svg',
  'https://raw.githubusercontent.com/Anujarya30/india-map-svg/master/index.svg',
  'https://raw.githubusercontent.com/subidit/india-maps/master/india-map.svg',
  'https://raw.githubusercontent.com/stevenrbrandt/india-states-svg/master/india.svg',
  'https://raw.githubusercontent.com/gka/linear-algebra/master/india-states.svg',
  'https://raw.githubusercontent.com/Hrishikeshops/India-Maps/master/India_States.svg',
  'https://raw.githubusercontent.com/gka/linear-algebra/master/india-states.svg'
];

const outputPath = path.join(process.cwd(), 'Public', 'india_map.svg');

async function download(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    console.log(`Trying ${url}...`);
    const file = fs.createWriteStream(outputPath);
    const request = https.get(url, {
      headers: {
        'User-Agent': 'MentalHealthApp/1.0 (sunnydev30@gmail.com) Node/18.0'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Success with ${url}!`);
          resolve(true);
        });
      } else {
        file.close();
        try { fs.unlinkSync(outputPath); } catch(e) {}
        console.log(`Failed status code: ${response.statusCode}`);
        resolve(false);
      }
    });

    request.on('error', (err) => {
      file.close();
      try { fs.unlinkSync(outputPath); } catch(e) {}
      console.log(`Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  for (const url of urls) {
    const success = await download(url);
    if (success) {
      process.exit(0);
    }
  }
  console.error('All URLs failed.');
  process.exit(1);
}

main();
