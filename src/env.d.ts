/// <reference path="../.astro/types.d.ts" />

interface Navigator {
  connection?: { saveData?: boolean };
}

// Vanta ships no types; the fog module is loaded dynamically in VantaFog.astro.
declare module 'vanta/dist/vanta.fog.min';
