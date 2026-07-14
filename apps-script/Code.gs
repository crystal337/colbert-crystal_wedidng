/**
 * Wedding RSVP backend.
 * Deploy this as a Google Apps Script Web App bound to the Google Sheet
 * that should collect responses. See ../README.md for full setup steps.
 */

const SHEET_NAME = 'RSVP';
const DRIVE_FOLDER_NAME = 'Wedding RSVP Photos';
// Shown in the confirmation email so guests know who to contact for changes.
const COUPLE_CONTACT = 'Colbert 或 Crystal';

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

    // Send the guest a confirmation email echoing their answers.
    if (data.email) {
      sendConfirmationEmail(data);
    }

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

function sendConfirmationEmail(data) {
  const rows = [
    ['姓名 Name', data.name],
    ['電郵 Email', data.email],
    ['與新人關係 Relationship', data.relationship || '—'],
    ['乘客人數 Guests', data.guestCount || 1],
    ['同行賓客 Companions', (data.companions || []).join('、') || '—'],
    ['參加活動 Attending', (data.attending || []).join('、')],
    ['兒童椅 High Chair', data.childChair || '—'],
    ['素食人數 Vegetarians', data.vegetarianCount || 0],
  ];

  const tableRows = rows
    .map(
      (r) =>
        '<tr><td style="padding:6px 12px;color:#6b6b6b;white-space:nowrap;">' +
        r[0] +
        '</td><td style="padding:6px 12px;color:#123526;font-weight:600;">' +
        r[1] +
        '</td></tr>',
    )
    .join('');

  const buttons = [];
  if (data.lineUrl) {
    buttons.push(linkButton('加入 LINE 群組', data.lineUrl));
  }
  if (data.whatsappUrl) {
    buttons.push(linkButton('加入 WhatsApp 群組', data.whatsappUrl));
  }

  const html =
    '<div style="font-family:sans-serif;max-width:520px;margin:auto;color:#3a2e22;">' +
    '<div style="background:#123526;color:#ddb54b;padding:20px 24px;border-radius:14px 14px 0 0;">' +
    '<div style="font-size:18px;font-weight:bold;letter-spacing:2px;">BOARDING PASS</div>' +
    "<div style=\"font-style:italic;font-size:13px;\">Colbert &amp; Crystal's Wedding</div>" +
    '</div>' +
    '<div style="border:1px solid #eadfbf;border-top:none;border-radius:0 0 14px 14px;padding:20px 24px;">' +
    '<p>謝謝你的回覆！以下是我們收到的內容：</p>' +
    '<table style="border-collapse:collapse;margin:12px 0;">' +
    tableRows +
    '</table>' +
    '<p style="color:#6b6b6b;font-size:13px;">如需修改，請聯絡 ' +
    COUPLE_CONTACT +
    '。</p>' +
    (buttons.length
      ? '<p style="margin-top:18px;">活動後續資訊會透過群組通知，歡迎加入：</p>' + buttons.join(' ')
      : '') +
    (data.siteUrl
      ? '<p style="margin-top:18px;font-size:13px;"><a href="' +
        data.siteUrl +
        '" style="color:#123526;">回到婚禮網站</a></p>'
      : '') +
    '</div></div>';

  MailApp.sendEmail({
    to: data.email,
    subject: "Colbert & Crystal's Wedding — 回覆確認 RSVP Confirmation",
    htmlBody: html,
  });
}

function linkButton(label, url) {
  return (
    '<a href="' +
    url +
    '" style="display:inline-block;background:#123526;color:#fdf6ea;text-decoration:none;' +
    'padding:10px 18px;border-radius:999px;font-size:14px;margin:4px 6px 4px 0;">' +
    label +
    '</a>'
  );
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
