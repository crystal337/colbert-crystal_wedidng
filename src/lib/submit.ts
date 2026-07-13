import { GAS_ENDPOINT } from '../config';

export type RSVPPayload = {
  name: string;
  email: string;
  relationship: string;
  guestCount: number;
  companions: string[];
  attending: ('wedding' | 'afterParty')[];
  childChair: string;
  vegetarianCount: number;
  photoBase64?: string;
  photoFileName?: string;
};

export async function submitRSVP(payload: RSVPPayload): Promise<void> {
  if (!GAS_ENDPOINT) {
    throw new Error('Missing VITE_GAS_ENDPOINT — see README.md to connect the Google Sheet backend.');
  }

  // Sent as text/plain to avoid a CORS preflight that Apps Script Web Apps
  // can't answer; Code.gs still parses the body as JSON.
  const res = await fetch(GAS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Submission failed with status ${res.status}`);
  }

  const data = await res.json().catch(() => null);
  if (data && data.ok === false) {
    throw new Error(data.error || 'Submission failed');
  }
}
