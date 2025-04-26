import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';

// Handle ES modules paths (needed since __dirname isn't available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create data directory if it doesn't exist
const dataDir = path.resolve(__dirname, '../src/data');
if (!fs.existsSync(dataDir)){
  fs.mkdirSync(dataDir, { recursive: true });
}

// Read the CSV file
const csvPath = path.resolve(__dirname, '../../Analysis/ocupacion_hotelera.csv');
console.log(`Reading CSV from: ${csvPath}`);

try {
  const csvData = fs.readFileSync(csvPath, 'utf8');
  
  // Parse the CSV data
  Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: (results) => {
      // Clean and transform the data
      const cleanedData = results.data
        .filter(item => item.hotel_nombre) // Remove rows without hotel names
        .map(item => ({
          id: item.id || item[""] || results.data.indexOf(item), // Handle index column
          hotel_nombre: item.hotel_nombre,
          fecha: item.fecha,
          tasa_ocupacion: Number(item.tasa_ocupacion || 0),
          reservas_confirmadas: Number(item.reservas_confirmadas || 0),
          cancelaciones: Number(item.cancelaciones || 0),
          precio_promedio_noche: Number(item.precio_promedio_noche || 0),
          RatioDeIngreso: Number(item.RatioDeIngreso || 0)
        }));

      // Create the JavaScript module with the data
      const outputPath = path.resolve(__dirname, '../src/data/hotelOccupancyData.js');
      const jsContent = `// Generated from CSV data - do not edit manually
export const occupancyData = ${JSON.stringify(cleanedData, null, 2)};
`;

      // Write the file
      fs.writeFileSync(outputPath, jsContent);
      console.log(`✅ Converted CSV to JSON and saved to ${outputPath}`);
    },
    error: (error) => {
      console.error('Error parsing CSV:', error);
    }
  });
} catch (error) {
  console.error(`Error reading CSV file: ${error.message}`);
  console.error(`File path tried: ${csvPath}`);
  console.error(`Current directory: ${process.cwd()}`);
}