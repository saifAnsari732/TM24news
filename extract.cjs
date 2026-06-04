const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'UploadNews.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /[\u0900-\u097F]+[\s\u0900-\u097F\(\)a-zA-Z0-9&:,\*\.\/]*/g;
const matches = content.match(regex);
if (matches) {
  const uniqueMatches = [...new Set(matches.map(s => s.trim()))].filter(s => s.length > 0);
  console.log("Found Hindi strings:");
  console.log(JSON.stringify(uniqueMatches, null, 2));
} else {
  console.log("No Hindi strings found.");
}
