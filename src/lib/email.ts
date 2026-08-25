// Builds the guest confirmation email (subject + HTML) in the guest's
// language, styled as an airline "electronic ticket receipt". CSS is inlined
// and the layout is table-based because email clients strip <style> blocks and
// don't support flex/grid reliably.

type Row = [label: string, value: string];

export type Ticket = {
  brandName: string; // top-left "logo" text
  receiptLabel: string; // top-right "Electronic Invitation Receipt"
  nameLabel: string;
  passenger: string;
  bookingThanks: string;
  meta: Row[]; // booking reference / date of issue / issued by
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  routeWhen: string; // centred under the route line: "23 JAN 2027 · 12:00"
  flightLine: string; // "CC 0123 · Colbert & Crystal"
  cabin: string; // cabin-class style badge, e.g. "Wedding Luncheon"
  details: Row[]; // DATE / BOARDING / GATE / SEAT
  footnote: string;
  venueLabel?: string;
  venueUrl?: string;
  mapLabel?: string;
  mapUrl?: string;
};

export type GroupButton = { label: string; url: string };

export type ConfirmationEmailInput = {
  subjectBrand: string;
  subjectTitle: string;
  ticket: Ticket;
  detailsHeading: string;
  detailRows: Row[];
  groupsIntro: string;
  groups: GroupButton[];
  contact: string;
  signoff: string;
  signature: string;
};

const GREEN = '#123526';
const GOLD = '#c99d3f';
const INK = '#2c2c2c';
const MUTED = '#8a8175';
const LINE = '#e7e0cf';
const PAGE = '#f4f1ea';

function esc(s: string) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// "LABEL / value" stack (airline receipts use tiny grey labels above values).
function field(label: string, value: string, big = false) {
  return (
    `<div style="color:${MUTED};font-size:11px;letter-spacing:0.5px;">${esc(label)}</div>` +
    `<div style="color:${INK};font-size:${big ? '17' : '14'}px;font-weight:700;margin-top:3px;">${esc(value)}</div>`
  );
}

// A fake barcode built from alternating solid cells so it renders everywhere
// (no gradients / SVG, which Gmail strips).
function barcode() {
  const widths = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 2, 3, 1, 2, 1, 3, 4, 1, 2, 1, 2, 3, 1, 4, 1, 2, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 1, 3, 2, 1];
  const cells = widths
    .map(
      (w, i) =>
        `<td style="width:${w * 2}px;height:44px;background:${i % 2 === 0 ? GREEN : '#ffffff'};font-size:0;line-height:0;">&nbsp;</td>`,
    )
    .join('');
  return `<table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;margin:0 auto;"><tr>${cells}</tr></table>`;
}

function metaTable(rows: Row[]) {
  return (
    '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">' +
    rows
      .map(
        ([label, value]) =>
          '<tr>' +
          `<td style="padding:3px 0;color:${MUTED};font-size:12px;white-space:nowrap;vertical-align:top;">${esc(label)}</td>` +
          `<td style="padding:3px 0 3px 12px;color:${INK};font-size:12px;font-weight:700;text-align:right;">${esc(value)}</td>` +
          '</tr>',
      )
      .join('') +
    '</table>'
  );
}

function routeRow(tk: Ticket) {
  return (
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>` +
    `<td width="30%" style="vertical-align:top;">` +
    `<div style="color:${GREEN};font-size:26px;font-weight:800;line-height:1;">${esc(tk.fromCode)}</div>` +
    `<div style="color:${MUTED};font-size:12px;margin-top:4px;">${esc(tk.fromCity)}</div></td>` +
    `<td width="40%" align="center" style="vertical-align:top;padding-top:6px;">` +
    `<div style="color:${GOLD};font-size:14px;letter-spacing:2px;white-space:nowrap;">&#9679;&nbsp;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&nbsp;&#9679;</div>` +
    `<div style="color:${MUTED};font-size:12px;margin-top:8px;">${esc(tk.routeWhen)}</div></td>` +
    `<td width="30%" align="right" style="vertical-align:top;">` +
    `<div style="color:${GREEN};font-size:26px;font-weight:800;line-height:1;">${esc(tk.toCode)}</div>` +
    `<div style="color:${MUTED};font-size:12px;margin-top:4px;">${esc(tk.toCity)}</div></td>` +
    `</tr></table>`
  );
}

// Two columns per row so the fuller date / time / venue values stay readable.
function detailsRow(rows: Row[]) {
  let html = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">';
  for (let i = 0; i < rows.length; i += 2) {
    const a = rows[i];
    const b = rows[i + 1];
    const topPad = i > 0 ? '14px' : '0';
    html +=
      '<tr>' +
      `<td width="50%" style="vertical-align:top;padding:${topPad} 12px 0 0;">${field(a[0], a[1])}</td>` +
      (b ? `<td width="50%" style="vertical-align:top;padding:${topPad} 0 0 0;">${field(b[0], b[1])}</td>` : '<td width="50%"></td>') +
      '</tr>';
  }
  return html + '</table>';
}

function itinerary(tk: Ticket) {
  return (
    `<div style="border:1px solid ${LINE};border-radius:8px;padding:18px 18px 16px;margin-top:18px;">` +
    routeRow(tk) +
    `<div style="border-top:1px solid ${LINE};margin:16px 0;"></div>` +
    // flight + cabin badge
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>` +
    `<td style="vertical-align:middle;color:${INK};font-size:13px;font-weight:700;letter-spacing:0.3px;">${esc(tk.flightLine)}</td>` +
    `<td align="right" style="vertical-align:middle;">` +
    `<span style="display:inline-block;background:${GREEN};color:#ffffff;font-size:11px;letter-spacing:0.5px;padding:4px 12px;border-radius:4px;">${esc(tk.cabin)}</span>` +
    `</td></tr></table>` +
    `<div style="border-top:1px solid ${LINE};margin:16px 0;"></div>` +
    detailsRow(tk.details) +
    `<div style="color:${MUTED};font-size:11px;margin-top:14px;">${esc(tk.footnote)}` +
    (tk.venueUrl && tk.venueLabel
      ? `&nbsp;&nbsp;<a href="${esc(tk.venueUrl)}" style="color:${GREEN};text-decoration:underline;">${esc(tk.venueLabel)}</a>`
      : '') +
    (tk.mapUrl && tk.mapLabel
      ? `&nbsp;（<a href="${esc(tk.mapUrl)}" style="color:${GREEN};text-decoration:underline;">${esc(tk.mapLabel)}</a>）`
      : '') +
    '</div>' +
    // barcode inside the ticket card
    `<div style="border-top:1px solid ${LINE};margin:16px 0 0;padding-top:16px;text-align:center;">` +
    barcode() +
    `<div style="color:${MUTED};font-size:11px;letter-spacing:3px;margin-top:8px;">${esc(tk.meta[0][1])}</div>` +
    '</div>' +
    '</div>'
  );
}

function replyTable(heading: string, rows: Row[]) {
  return (
    `<div style="margin-top:22px;">` +
    `<div style="color:${GREEN};font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">${esc(heading)}</div>` +
    '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">' +
    rows
      .map(
        ([label, value]) =>
          '<tr>' +
          `<td style="padding:6px 0;color:${MUTED};font-size:13px;white-space:nowrap;vertical-align:top;width:42%;">${esc(label)}</td>` +
          `<td style="padding:6px 0;color:${INK};font-size:13px;font-weight:600;">${esc(value)}</td>` +
          '</tr>',
      )
      .join('') +
    '</table></div>'
  );
}

function groupButton(g: GroupButton) {
  return (
    `<a href="${esc(g.url)}" style="display:block;background:${GREEN};color:#ffffff;text-decoration:none;` +
    `text-align:center;padding:13px 18px;border-radius:8px;font-size:14px;font-weight:600;margin-top:10px;">${esc(g.label)}</a>`
  );
}

export function buildConfirmationEmail(input: ConfirmationEmailInput): { subject: string; html: string } {
  const subject = `${input.subjectBrand}｜${input.subjectTitle}`;
  const tk = input.ticket;

  const html =
    `<div style="background:${PAGE};padding:24px 12px;font-family:'Helvetica Neue',Arial,'PingFang TC','Microsoft JhengHei',sans-serif;">` +
    `<div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid ${LINE};border-radius:12px;overflow:hidden;">` +
    `<div style="padding:22px 24px;">` +
    // title (e.g. "Your Travel Reminder") + wedding name
    `<div style="color:${GREEN};font-size:21px;font-weight:800;letter-spacing:0.3px;">${esc(tk.receiptLabel)}</div>` +
    `<div style="color:${GOLD};font-size:13px;margin-top:4px;">${esc(tk.brandName)}</div>` +
    `<div style="border-top:2px solid ${GREEN};margin:14px 0 18px;"></div>` +
    // name + booking meta
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>` +
    `<td width="58%" style="vertical-align:top;padding-right:16px;">` +
    field(tk.nameLabel, tk.passenger, true) +
    `<p style="margin:12px 0 0;color:${INK};font-size:13px;line-height:1.6;">${esc(tk.bookingThanks)}</p>` +
    `</td>` +
    `<td width="42%" style="vertical-align:top;">${metaTable(tk.meta)}</td>` +
    `</tr></table>` +
    // itinerary
    itinerary(tk) +
    // your reply
    replyTable(input.detailsHeading, input.detailRows) +
    // group-join buttons
    (input.groups.length
      ? `<div style="margin-top:24px;">` +
        `<p style="margin:0 0 4px;color:#6b6b6b;font-size:13px;">${esc(input.groupsIntro)}</p>` +
        input.groups.map(groupButton).join('') +
        '</div>'
      : '') +
    // contact + signature
    `<p style="margin:22px 0 0;color:#6b6b6b;font-size:13px;line-height:1.7;">${esc(input.contact)}</p>` +
    `<p style="margin:16px 0 0;font-size:13px;">${input.signoff ? `${esc(input.signoff)}<br/>` : ''}<b style="color:${GREEN};">${esc(input.signature)}</b></p>` +
    '</div>' +
    '</div>' +
    '</div>';

  return { subject, html };
}
