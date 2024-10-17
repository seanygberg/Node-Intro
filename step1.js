const fs = require('fs');
const process = require('process');

function cat(filePath) {
    fs.readFile(filePath, 'utf8', function(error, data) {
        if (error) {
          console.error(`Error reading ${filePath}: ${error}`);
          process.exit(1);
        } else {
          console.log(data);
        }
      });
}

cat(process.argv[2]);