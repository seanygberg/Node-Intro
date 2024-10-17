const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, outFile) {
    if (outFile) {
        fs.writeFile(out, text, 'utf8', function(error) {
            if (error) {
              console.error(`Couldn't write ${outFile}: ${error}`);
              process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(filePath, outFile) {
    fs.readFile(filePath, 'utf8', function(error, data) {
        if (error) {
          console.error(`Error reading ${filePath}: ${error}`);
          process.exit(1);
        } else {
          handleOutput(data, outFile);
        }
      });
}

async function webCat(url, outFile) {
    try {
        let response = await axios.get(url);
        handleOutput(response.data, outFile);
    } catch (error) {
        console.error(`Error fetching ${url}: ${error}`);
        process.exit(1);
    }
}

let path = '';
let out = '';

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}