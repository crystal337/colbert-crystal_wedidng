/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GAS_ENDPOINT?: string;
  readonly VITE_LINE_URL?: string;
  readonly VITE_WHATSAPP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
