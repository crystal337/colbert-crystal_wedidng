// Site-wide configuration. Values can be overridden with a .env file
// (see .env.example) so real secrets/links never need to be hard-coded here.

// Google Apps Script Web App URL that receives RSVP submissions and writes
// them to the shared Google Sheet. See apps-script/Code.gs + README.md.
export const GAS_ENDPOINT = import.meta.env.VITE_GAS_ENDPOINT ?? '';

// Group invite links shown on the thank-you screen after a guest submits the form.
export const LINE_GROUP_URL = import.meta.env.VITE_LINE_URL ?? 'https://line.me/ti/g/REPLACE_WITH_LINE_INVITE';
export const WHATSAPP_GROUP_URL =
  import.meta.env.VITE_WHATSAPP_URL ?? 'https://chat.whatsapp.com/REPLACE_WITH_WHATSAPP_INVITE';
