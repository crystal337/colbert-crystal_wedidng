/**
 * Wedding RSVP backend.
 * Deploy this as a Google Apps Script Web App bound to the Google Sheet
 * that should collect responses. See ../README.md for full setup steps.
 */

const SHEET_NAME = 'RSVP';
const DRIVE_FOLDER_NAME = 'Wedding RSVP Photos';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (!data.name || !Array.isArray(data.attending) || data.attending.length === 0) {
      return jsonResponse({ ok: false, error: 'Missing required fields.' });
    }

    let photoUrl = '';
    if (data.photoBase64) {
      photoUrl = savePhoto(data.photoBase64, data.photoFileName, data.name);
    }

    getSheet().appendRow([
      new Date(),
      data.name,
      data.email || '',
      data.relationship || '',
      data.guestCount || 1,
      (data.companions || []).join(', '),
      data.attending.join(', '),
      data.childChair || '',
      data.vegetarianCount || 0,
      photoUrl,
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, message: 'Wedding RSVP endpoint is running.' });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp',
      'Name 姓名',
      'Email 電郵',
      'Relationship 與新人關係',
      'Guest Count 人數',
      'Companions 同行賓客',
      'Attending 參加活動',
      'High Chair 兒童椅',
      'Vegetarians 素食人數',
      'Photo 照片',
    ]);
  }
  return sheet;
}

function savePhoto(base64, fileName, guestName) {
  const match = base64.match(/^data:(image\/\w+);base64,(.*)$/);
  if (!match) return '';

  const contentType = match[1];
  const bytes = Utilities.base64Decode(match[2]);
  const blob = Utilities.newBlob(bytes, contentType, fileName || guestName + '.jpg');

  const folder = getOrCreateFolder(DRIVE_FOLDER_NAME);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function getOrCreateFolder(name) {
  const folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
