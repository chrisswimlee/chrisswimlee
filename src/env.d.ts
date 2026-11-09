/// <reference path="../.astro/types.d.ts" />

declare module '*.svg?url' {
  const src: string;
  export default src;
}

interface Navigator {
  connection?: { saveData?: boolean };
}

// Vanta ships no types; the fog module is loaded dynamically in VantaFog.astro.
declare module 'vanta/dist/vanta.fog.min';
