const fs = require('fs');
const path = require('path');

// Create a simple 512x512 PNG placeholder (green color)
const width = 512;
const height = 512;

// Simple PNG file structure
const pngHeader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

// IHDR chunk (image header)
const ihdr = Buffer.alloc(25);
ihdr.writeUInt32BE(13, 0); // chunk length
ihdr.write('IHDR', 4);
ihdr.writeUInt32BE(width, 8); // width
ihdr.writeUInt32BE(height, 12); // height
ihdr.writeUInt8(8, 16); // bit depth
ihdr.writeUInt8(2, 17); // color type (RGB)
ihdr.writeUInt8(0, 18); // compression
ihdr.writeUInt8(0, 19); // filter
ihdr.writeUInt8(0, 20); // interlace
const crc1 = Buffer.alloc(4);
crc1.writeUInt32BE(0x90773546, 0);
const ihdrChunk = Buffer.concat([ihdr, crc1]);

// IDAT chunk (image data) - simple green image
const pixelData = Buffer.alloc(width * height * 3);
for (let i = 0; i < pixelData.length; i += 3) {
  pixelData[i] = 26;      // R: #1A (primary color)
  pixelData[i + 1] = 107; // G: #6B
  pixelData[i + 2] = 58;  // B: #3A
}

// Create minimal IDAT
const zlib = require('zlib');
const compressed = zlib.deflateSync(Buffer.concat([
  Buffer.alloc(1), // filter type
  pixelData.slice(0, 100)
]));

const idat = Buffer.alloc(8 + compressed.length);
idat.writeUInt32BE(compressed.length, 0);
idat.write('IDAT', 4);
compressed.copy(idat, 8);
const crc2 = Buffer.alloc(4);
crc2.writeUInt32BE(0x123456, 0);
const idatChunk = Buffer.concat([idat, crc2]);

// IEND chunk
const iend = Buffer.concat([
  Buffer.from([0, 0, 0, 0]),
  Buffer.from('IEND'),
  Buffer.from([0xae, 0x42, 0x60, 0x82])
]);

const png = Buffer.concat([pngHeader, ihdrChunk, idatChunk, iend]);

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

fs.writeFileSync(path.join(assetsDir, 'icon.png'), png);
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), png);

console.log('Images created successfully');
