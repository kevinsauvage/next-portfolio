import { ImageResponse } from 'next/og';

export const alt = 'Kévin Sauvage — Frontend Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const OgImage = () =>
  new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#000000',
        padding: '72px',
        color: '#fafafa',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', fontSize: 28, color: '#a1a1aa', letterSpacing: 2 }}>
        kevin-sauvage.com
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', fontSize: 78, fontWeight: 700, lineHeight: 1.05 }}>
          Kévin Sauvage
        </div>
        <div style={{ display: 'flex', fontSize: 40, color: '#818cf8' }}>
          Frontend Engineer — Accessible E-commerce at Scale
        </div>
      </div>

      <div style={{ display: 'flex', gap: 18, fontSize: 26, color: '#a1a1aa' }}>
        React · Next.js · Svelte · TypeScript
      </div>
    </div>,
    size
  );

export default OgImage;
