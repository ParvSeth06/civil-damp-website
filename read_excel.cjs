const XLSX = require('xlsx');
const fs = require('fs');

const filePath = 'D:\\Downloads\\MeetTheTeam Post .xlsx';
try {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);
  
  console.log(JSON.stringify(data.slice(0, 5), null, 2));
} catch (error) {
  console.error("Error reading file:", error);
}
