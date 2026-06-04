const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'UploadNews.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replacements for Hindi Text
const translations = {
  "खबर का मुख्य शीर्षक (Title) *": "Main News Title *",
  "खबर की श्रेणी (Category)": "News Category",
  "लेखक / रिपोर्टर": "Author / Reporter",
  "राज्य (State)": "State",
  "शहर (City)": "City",
  "सोर्स लिंक (Source Link)": "Source Link",
  "(वैकल्पिक)": "(Optional)",
  "खबर का मुख्य विवरण (Rich Text Editor)": "Main News Content (Rich Text Editor)",
  "संपादक मोड: मुख्य लेख": "Edit Mode: Main Article",
  "टैग्स और कीवर्ड्स (Tags & Keywords)": "Tags & Keywords",
  "सुझाए गए टैग्स (Templates)": "Suggested Tags (Templates)",
  "कस्टम टैग जोड़ें (Enter दबाएं)": "Add Custom Tag (Press Enter)",
  "चुने गए टैग्स": "Selected Tags",
  "कोई टैग नहीं चुना गया है": "No tags selected",
  "खोज कीवर्ड्स (SEO Keywords)": "Search Keywords (SEO)",
  "खबर से जुड़े कीवर्ड्स कॉमा (,) लगाकर लिखें...": "Enter keywords separated by comma (,)...",
  "नया टैग लिखें और Enter दबाएं...": "Type new tag and press Enter...",
  "राज्य चुनें...": "Select State...",
  "पहले राज्य चुनें": "Select State First",
  "संपादक": "Editor",
  "मुख्य समाचार": "Main News",
  "लिंक का URL दर्ज करें:": "Enter Link URL:",
  "शहर चुनें...": "Select City..."
};

for (const [hi, en] of Object.entries(translations)) {
  content = content.split(hi).join(en);
}

// Increase text size: replace text-sm with text-base specifically in labels, inputs, and placeholders
// Also we can just replace text-sm with text-base globally where it makes sense, but global might break other things.
// Let's replace 'text-sm' with 'text-base' for labels and standard text.
content = content.replace(/className="block text-zinc-700 font-bold mb-1.5 text-sm"/g, 'className="block text-zinc-700 font-bold mb-1.5 text-base"');
content = content.replace(/text-sm/g, 'text-base'); // Just replace all text-sm with text-base to make everything slightly larger as requested.

// JoditEditor config translation - might be 'hi' to 'en'
content = content.replace(/language: 'hi'/g, "language: 'en'");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Translation complete!");
