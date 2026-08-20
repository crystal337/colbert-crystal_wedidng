// Builds the guest confirmation email (subject + HTML) in the guest's
// language, styled as a "boarding pass" ticket to match the site. All CSS is
// inlined and the layout is table-based because email clients strip <style>
// blocks and don't support flex/grid reliably.

type Row = [label: string, value: string];

export type Ticket = {
  title: string; // BOARDING PASS
  subtitle: string; // Wedding Boarding Pass
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  passengerLabel: string;
  passenger: string;
  rowsTop: Row[]; // FLIGHT / DATE / BOARDING
  rowsBottom: Row[]; // GATE / SEAT
  note: string;
};

export type ConfirmationEmailInput = {
  brand: string;
  title: string;
  greeting: string;
  name: string;
  intro: string;
  ticket: Ticket;
  detailsHeading: string;
  detailRows: Row[];
  contact: string;
  signoff: string;
  signature: string;
};

const GREEN = '#123526';
const GOLD = '#ddb54b';
const CREAM = '#fdf6ea';
const INK = '#3a2e22';
const MUTED = '#8a8175';

function esc(s: string) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// A small "LABEL / value" stack used inside the ticket cells.
function field(label: string, value: string) {
  return (
    `<div style="color:${MUTED};font-size:10px;letter-spacing:1.5px;text-transform:uppercase;">${esc(label)}</div>` +
    `<div style="color:${GREEN};font-size:15px;font-weight:700;margin-top:3px;">${esc(value)}</div>`
  );
}

// A fake barcode built from alternating solid cells so it renders everywhere
// (no gradients / SVG, which Gmail strips).
function barcode() {
  const widths = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 2, 3, 1, 2, 1, 3, 4, 1, 2, 1, 2, 3, 1, 4, 1, 2, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 1, 3, 2, 1];
  const cells = widths
    .map(
      (w, i) =>
        `<td style="width:${w * 2}px;height:46px;background:${i % 2 === 0 ? GREEN : '#ffffff'};font-size:0;line-height:0;">&nbsp;</td>`,
    )
    .join('');
  return `<table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;margin:0 auto;"><tr>${cells}</tr></table>`;
}

function ticketBlock(tk: Ticket) {
  const topCells = tk.rowsTop
    .map((r, i) => `<td width="33%" style="vertical-align:top;padding-right:${i < tk.rowsTop.length - 1 ? '8' : '0'}px;">${field(r[0], r[1])}</td>`)
    .join('');
  const bottomCells = tk.rowsBottom
    .map((r, i) => `<td width="${i === 0 ? '67' : '33'}%" style="vertical-align:top;padding-right:${i < tk.rowsBottom.length - 1 ? '8' : '0'}px;">${field(r[0], r[1])}</td>`)
    .join('');

  return (
    `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:440px;margin:8px auto 0;border-collapse:separate;">` +
    // header band
    `<tr><td style="background:${GREEN};border-radius:14px 14px 0 0;padding:16px 22px;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>` +
    `<td style="vertical-align:middle;"><div style="color:#ffffff;font-size:15px;font-weight:bold;letter-spacing:2px;">${esc(tk.title)}</div>` +
    `<div style="color:${GOLD};font-size:12px;font-style:italic;margin-top:2px;">${esc(tk.subtitle)}</div></td>` +
    `<td align="right" style="vertical-align:middle;color:${GOLD};font-size:22px;">&#9992;</td>` +
    `</tr></table></td></tr>` +
    // body
    `<tr><td style="background:#ffffff;border:1px solid #eadfbf;border-top:none;border-radius:0 0 14px 14px;padding:20px 22px;">` +
    // route
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>` +
    `<td style="vertical-align:top;"><div style="color:${GREEN};font-size:30px;font-weight:800;line-height:1;">${esc(tk.fromCode)}</div><div style="color:${MUTED};font-size:12px;margin-top:3px;">${esc(tk.fromCity)}</div></td>` +
    `<td align="center" style="vertical-align:middle;color:${GOLD};font-size:18px;">&#9992;</td>` +
    `<td align="right" style="vertical-align:top;"><div style="color:${GREEN};font-size:30px;font-weight:800;line-height:1;">${esc(tk.toCode)}</div><div style="color:${MUTED};font-size:12px;margin-top:3px;">${esc(tk.toCity)}</div></td>` +
    `</tr></table>` +
    // passenger
    `<div style="margin-top:18px;">${field(tk.passengerLabel, tk.passenger)}</div>` +
    // flight / date / boarding
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;"><tr>${topCells}</tr></table>` +
    // gate / seat
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;"><tr>${bottomCells}</tr></table>` +
    // divider
    `<div style="border-top:1px dashed #cbb98a;margin:18px 0 16px;"></div>` +
    barcode() +
    `<div style="text-align:center;color:${MUTED};font-size:12px;font-style:italic;margin-top:14px;">${esc(tk.note)}</div>` +
    `</td></tr>` +
    `</table>`
  );
}

function detailTable(rows: Row[]) {
  return (
    '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">' +
    rows
      .map(
        ([label, value]) =>
          '<tr>' +
          `<td style="padding:7px 0;color:${MUTED};font-size:13px;white-space:nowrap;vertical-align:top;width:38%;">${esc(label)}</td>` +
          `<td style="padding:7px 0;color:${INK};font-size:14px;font-weight:600;">${esc(value)}</td>` +
          '</tr>',
      )
      .join('') +
    '</table>'
  );
}

export function buildConfirmationEmail(input: ConfirmationEmailInput): { subject: string; html: string } {
  const subject = `${input.brand}｜${input.title}`;

  const html =
    `<div style="background:${CREAM};padding:24px 12px;font-family:'Helvetica Neue',Arial,'PingFang TC','Microsoft JhengHei',sans-serif;">` +
    `<div style="max-width:480px;margin:0 auto;">` +
    // brand + title
    `<div style="text-align:center;margin-bottom:18px;">` +
    `<div style="color:${GOLD};font-size:12px;letter-spacing:2px;text-transform:uppercase;">${esc(input.brand)}</div>` +
    `<div style="color:${GREEN};font-size:20px;font-weight:700;margin-top:6px;">${esc(input.title)}</div>` +
    '</div>' +
    // greeting + intro
    `<div style="color:${INK};font-size:14px;line-height:1.7;">` +
    `<p style="margin:0 0 10px;">${esc(input.greeting)} <b>${esc(input.name)}</b>,</p>` +
    `<p style="margin:0 0 4px;">${esc(input.intro)}</p>` +
    '</div>' +
    // the boarding-pass ticket
    ticketBlock(input.ticket) +
    // your reply
    `<div style="max-width:440px;margin:26px auto 0;">` +
    `<div style="color:${GREEN};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:2px;">${esc(input.detailsHeading)}</div>` +
    detailTable(input.detailRows) +
    // contact + signature
    `<p style="margin:22px 0 0;color:#6b6b6b;font-size:14px;line-height:1.7;">${esc(input.contact)}</p>` +
    `<p style="margin:18px 0 0;font-size:14px;">${input.signoff ? `${esc(input.signoff)}<br/>` : ''}<b style="color:${GREEN};">${esc(input.signature)}</b></p>` +
    '</div>' +
    '</div>' +
    '</div>';

  return { subject, html };
}
