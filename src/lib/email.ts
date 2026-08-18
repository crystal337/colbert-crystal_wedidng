// Builds the guest confirmation email (subject + HTML) in the guest's
// language, styled with the site's green / gold / cream palette. All CSS is
// inlined because email clients strip <style> blocks.

type Row = [label: string, value: string];
type EventBlock = { name: string; rows: Row[] };

export type ConfirmationEmailInput = {
  brand: string;
  title: string;
  greeting: string;
  name: string;
  intro: string;
  detailsHeading: string;
  detailRows: Row[];
  eventsHeading: string;
  events: EventBlock[];
  contact: string;
  signoff: string;
  signature: string;
  lineUrl?: string;
  whatsappUrl?: string;
  lineLabel?: string;
  whatsappLabel?: string;
};

const GREEN = '#123526';
const GOLD = '#ddb54b';
const CREAM = '#fdf6ea';
const INK = '#3a2e22';

function esc(s: string) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function detailTable(rows: Row[]) {
  return (
    '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">' +
    rows
      .map(
        ([label, value]) =>
          '<tr>' +
          `<td style="padding:7px 0;color:#8a8175;font-size:13px;white-space:nowrap;vertical-align:top;width:38%;">${esc(label)}</td>` +
          `<td style="padding:7px 0;color:${INK};font-size:14px;font-weight:600;">${esc(value)}</td>` +
          '</tr>',
      )
      .join('') +
    '</table>'
  );
}

function eventCard(ev: EventBlock) {
  return (
    `<div style="border:1px solid #eadfbf;border-radius:12px;padding:14px 16px;margin-top:10px;">` +
    `<div style="color:${GREEN};font-size:15px;font-weight:700;margin-bottom:6px;">${esc(ev.name)}</div>` +
    detailTable(ev.rows) +
    '</div>'
  );
}

function button(label: string, url: string) {
  return (
    `<a href="${esc(url)}" style="display:inline-block;background:${GREEN};color:${CREAM};text-decoration:none;` +
    `padding:10px 18px;border-radius:999px;font-size:14px;margin:4px 8px 4px 0;">${esc(label)}</a>`
  );
}

export function buildConfirmationEmail(input: ConfirmationEmailInput): { subject: string; html: string } {
  const subject = `${input.brand}｜${input.title}`;

  const buttons: string[] = [];
  if (input.lineUrl && input.lineLabel) buttons.push(button(input.lineLabel, input.lineUrl));
  if (input.whatsappUrl && input.whatsappLabel) buttons.push(button(input.whatsappLabel, input.whatsappUrl));

  const html =
    `<div style="background:${CREAM};padding:24px 12px;font-family:'Helvetica Neue',Arial,'PingFang TC','Microsoft JhengHei',sans-serif;">` +
    `<div style="max-width:560px;margin:0 auto;background:#fffdf8;border:1px solid #eadfbf;border-radius:16px;overflow:hidden;">` +
    // header
    `<div style="background:${GREEN};padding:22px 28px;">` +
    `<div style="color:${GOLD};font-size:12px;letter-spacing:2px;text-transform:uppercase;">${esc(input.brand)}</div>` +
    `<div style="color:${CREAM};font-size:19px;font-weight:700;margin-top:6px;">${esc(input.title)}</div>` +
    '</div>' +
    // body
    `<div style="padding:24px 28px;color:${INK};font-size:14px;line-height:1.7;">` +
    `<p style="margin:0 0 12px;">${esc(input.greeting)} <b>${esc(input.name)}</b>,</p>` +
    `<p style="margin:0 0 16px;">${esc(input.intro)}</p>` +
    `<div style="color:${GREEN};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">${esc(input.detailsHeading)}</div>` +
    detailTable(input.detailRows) +
    `<div style="height:1px;background:#eadfbf;margin:20px 0;"></div>` +
    `<div style="color:${GREEN};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${esc(input.eventsHeading)}</div>` +
    input.events.map(eventCard).join('') +
    `<p style="margin:22px 0 0;color:#6b6b6b;">${esc(input.contact)}</p>` +
    (buttons.length ? `<p style="margin:16px 0 0;">${buttons.join('')}</p>` : '') +
    `<p style="margin:24px 0 0;">${esc(input.signoff)}<br/><b style="color:${GREEN};">${esc(input.signature)}</b></p>` +
    '</div>' +
    '</div>' +
    '</div>';

  return { subject, html };
}
