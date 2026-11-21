/**
 * Bharat Project Connect - Enquiry backend
 * Create a Google Sheet, open Extensions > Apps Script, and paste this file.
 * Change ADMIN_PASSWORD before deployment.
 */
const ADMIN_PASSWORD = "CHANGE-THIS-TO-A-STRONG-PASSWORD";

function doGet(e) {
  if (e && e.parameter && e.parameter.admin === "1") {
    return HtmlService.createHtmlOutputFromFile("Admin")
      .setTitle("Bharat Project Connect | Enquiry Admin")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
  }
  return ContentService.createTextOutput("Bharat Project Connect enquiry service is running.");
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet_(ss);
  const p = (e && e.parameter) ? e.parameter : {};
  const id = Utilities.getUuid();
  sheet.appendRow([
    id, new Date(), p.name || "", p.organisation || "", p.phone || "",
    p.email || "", p.service || "", p.location || "", p.message || "",
    p.page || "", "New"
  ]);
  return ContentService.createTextOutput("OK");
}

function getOrCreateSheet_(ss) {
  let sh = ss.getSheetByName("Enquiries");
  if (!sh) sh = ss.insertSheet("Enquiries");
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Enquiry ID","Submitted At","Name","Organisation","Phone","Email","Service","Location","Message","Source Page","Status"]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function verifyAdmin_(password) {
  if (!password || password !== ADMIN_PASSWORD || ADMIN_PASSWORD.indexOf("CHANGE-") === 0) {
    throw new Error("Incorrect admin password or password not configured.");
  }
}

function getEnquiries(password) {
  verifyAdmin_(password);
  const sh = getOrCreateSheet_(SpreadsheetApp.getActiveSpreadsheet());
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  return values.slice(1).reverse().map(r => ({
    id: String(r[0]), date: r[1] instanceof Date ? Utilities.formatDate(r[1], Session.getScriptTimeZone(), "dd MMM yyyy, hh:mm a") : String(r[1]),
    name: String(r[2] || ""), organisation: String(r[3] || ""), phone: String(r[4] || ""),
    email: String(r[5] || ""), service: String(r[6] || ""), location: String(r[7] || ""),
    message: String(r[8] || ""), page: String(r[9] || ""), status: String(r[10] || "New")
  }));
}

function updateEnquiryStatus(id, status, password) {
  verifyAdmin_(password);
  const allowed = ["New","Contacted","In Progress","Converted","Closed"];
  if (allowed.indexOf(status) === -1) throw new Error("Invalid status.");
  const sh = getOrCreateSheet_(SpreadsheetApp.getActiveSpreadsheet());
  const values = sh.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      sh.getRange(i + 1, 11).setValue(status);
      return true;
    }
  }
  throw new Error("Enquiry not found.");
}
