// Home — editorial inspiration scroll, Zara Home / lookbook feel
const HomeScreen = ({ ctx }) => {
  const { favs, toggleFav, openCategory, openProduct, showToast, userName, tier, tweaks } = ctx;

  // Editorial spreads — each is a full-bleed "page"
  const spreads = [
    {
      cat: 'Soverom',
      img: './images/soverom-kid.webp',
      eyebrow: 'Kapittel 01 · Soverom',
      title: 'En myk start på dagen',
      copy: 'Sengeteppe i bomull, putetrekk i krepp — tekstur på tekstur.',
    },
    {
      cat: 'Stue',
      img: './images/stue-kid.webp',
      eyebrow: 'Kapittel 02 · Stue',
      title: 'Rom som roer ned',
      copy: 'Lin, ull og varme jordtoner — komponert med ro.',
    },
    {
      cat: 'Baderom',
      img: './images/baderom-kid.webp',
      eyebrow: 'Kapittel 03 · Baderom',
      title: 'Et rom for å puste ut',
      copy: 'Myke håndklær, vakre detaljer — baderommet som et lite fristed.',
    },
    {
      cat: 'Utendør',
      img: './images/utendoor-kid.webp',
      eyebrow: 'Kapittel 04 · Utendør',
      title: 'Sommerliv under åpen himmel',
      copy: 'Bambus, rotting og myke tepper — uterommet som en naturlig forlengelse av hjemmet.',
    },
  ];

  const shopTheLook = [
    { id: 200, name: 'Pute «Hav»',     price: '349',  img: './images/Pyntepute1r-stue.jpg' },
    { id: 201, name: 'Vase «Skog»',    price: '529',  img: './images/Vase1-stue.webp' },
    { id: 202, name: 'Dyne «Stripe»',  price: '899',  img: './images/dyne1-soverom.webp' },
    { id: 203, name: 'Pledd «Vinter»', price: '899',  img: './images/Ullpledd1-stue.webp' },
  ];

  return (
    <div className="screen" style={{ paddingBottom: 20 }}>
      {/* === COVER === */}
      <div style={{ padding: '8px 22px 18px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Kid — Magasin · våren 26</div>
        <h1 className="serif" style={{
          fontSize: 36, lineHeight: 1.0, margin: 0, letterSpacing: '-0.03em',
          fontWeight: 400,
        }}>
          Bla i <em style={{ color: 'var(--clay)' }}>rommene</em>
        </h1>
        <div style={{ marginTop: 10, fontSize: 12.5, color: 'var(--ink-2)', maxWidth: 280, margin: '10px auto 0', lineHeight: 1.5 }}>
          Fire kapitler om hvordan tekstil, lys og keramikk bygger et hjem.
        </div>
      </div>

      {/* === EDITORIAL SPREADS — full-bleed === */}
      {spreads.map((s, i) => {
        const id = 100 + i;
        const isFav = favs.has(id);
        return (
        <div key={i} style={{ marginBottom: i === spreads.length - 1 ? 0 : 6 }}>
          {/* image */}
          <div onClick={() => openCategory(s.cat)} style={{
            height: 420,
            position: 'relative',
            cursor: 'pointer',
            backgroundImage: `url(${s.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'var(--paper-3)',
          }}>
            {/* page number in corner */}
            <div style={{
              position: 'absolute', top: 16, left: 18,
              fontFamily: 'Geist Mono, monospace',
              fontSize: 10, letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.85)',
              textTransform: 'uppercase',
              mixBlendMode: 'difference',
            }}>
              0{i + 1} / 04
            </div>

            {s.personalTag && (
              <div style={{
                position: 'absolute', top: 14, left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--clay)',
                color: 'var(--paper)',
                padding: '5px 11px',
                borderRadius: 999,
                fontFamily: 'Geist Mono, monospace',
                fontSize: 9, letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                ★ {s.personalTag}
              </div>
            )}

            <button className="fav-btn"
              onClick={(e) => { e.stopPropagation(); toggleFav(id); }}
              style={{ top: 14, right: 16 }}
              aria-label="Lagre">
              <svg viewBox="0 0 24 24" fill={isFav ? 'var(--clay)' : 'none'} stroke={isFav ? 'var(--clay)' : 'var(--ink)'} strokeWidth="1.6">
                <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/>
              </svg>
            </button>
          </div>

          {/* caption — paper background, serif headline */}
          <div onClick={() => openCategory(s.cat)} style={{
            padding: '20px 22px 26px',
            cursor: 'pointer',
            background: 'var(--paper)',
          }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>{s.eyebrow}</div>
            <h2 className="serif" style={{
              fontSize: 26, lineHeight: 1.1, margin: '0 0 10px',
              letterSpacing: '-0.02em', fontWeight: 400,
            }}>
              {s.title}
            </h2>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 14, maxWidth: 320 }}>
              {s.copy}
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'Geist Mono, monospace',
              fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--ink)',
              borderBottom: '1px solid var(--ink)',
              paddingBottom: 3,
            }}>
              Bla i {s.cat.toLowerCase()} <span>→</span>
            </div>
          </div>
        </div>
      );})}

      {/* === SHOP THE LOOK — subtle product strip === */}
      <div style={{
        background: 'var(--paper-2)',
        padding: '30px 0 26px',
        margin: '12px 0',
      }}>
        <div style={{ padding: '0 22px', marginBottom: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Valgt til deg</div>
          <h2 className="serif" style={{
            fontSize: 22, lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em', fontWeight: 400,
          }}>
            Anbefalt for deg
          </h2>
        </div>
        <div style={{
          display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '46%',
          gap: 10, overflowX: 'auto',
          padding: '0 22px 4px',
          scrollbarWidth: 'none',
        }}>
          {shopTheLook.map(r => (
            <div key={r.id} onClick={() => {
              const found = Object.values(window.PRODUCTS_BY_CAT || {}).flat().find(p => p.name === r.name);
              if (found) openProduct(found); else showToast(r.name);
            }} style={{ cursor: 'pointer' }}>
              <div className="photo" style={{
                height: 180, borderRadius: 4, marginBottom: 8,
                backgroundImage: `url(${r.img})`,
                backgroundColor: 'var(--paper-3)',
              }}/>
              <div className="serif" style={{ fontSize: 14, lineHeight: 1.2 }}>{r.name}</div>
              <div className="mono tnum" style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>
                kr {r.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === STYLIST ARTICLE === */}
      <div style={{ padding: '8px 22px 0' }}>
        <div onClick={() => showToast('Artikkelen åpnes')} style={{
          cursor: 'pointer',
        }}>
          <div className="photo" style={{
            height: 280, borderRadius: 4, marginBottom: 14,
            backgroundImage: 'url(https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=900&q=85)',
            backgroundColor: 'var(--paper-3)',
          }}/>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Stylistens hjørne · 4 min</div>
          <h2 className="serif" style={{
            fontSize: 24, lineHeight: 1.15, margin: '0 0 10px',
            letterSpacing: '-0.02em', fontWeight: 400,
          }}>
            Tre lag tekstil for et roligere soverom
          </h2>
          <div style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.55 }}>
            Slik bygger du dybde med lin, ull og bomull — uten at rommet blir tungt.
            En guide for deg som vil ha mer enn ren minimalisme.
          </div>
          <div style={{
            marginTop: 14,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'Geist Mono, monospace',
            fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--ink)',
            borderBottom: '1px solid var(--ink)',
            paddingBottom: 3,
          }}>
            Les artikkelen <span>→</span>
          </div>
        </div>
      </div>

      {/* === NEWSLETTER / END PAGE === */}
      <div style={{
        marginTop: 40,
        padding: '36px 22px 32px',
        textAlign: 'center',
        background: 'var(--ink)',
        color: 'var(--paper)',
      }}>
        <div className="eyebrow" style={{ marginBottom: 10, color: 'rgba(251,248,242,0.55)' }}>
          Neste nummer i posten
        </div>
        <h3 className="serif" style={{
          fontSize: 24, lineHeight: 1.15, margin: '0 0 14px',
          letterSpacing: '-0.02em', fontWeight: 400, color: 'var(--paper)',
        }}>
          Få Kid-magasinet rett i innboksen
        </h3>
        <div style={{ fontSize: 12.5, color: 'rgba(251,248,242,0.6)', marginBottom: 20, lineHeight: 1.5 }}>
          Inspirasjon, guider og glimt fra nye kolleksjoner. Annenhver fredag.
        </div>
        <button onClick={() => showToast('Du er meldt på — sjekk innboksen')} style={{
          background: 'var(--paper)', color: 'var(--ink)',
          border: 'none', borderRadius: 999,
          padding: '11px 22px',
          fontFamily: 'Geist Mono, monospace',
          fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          Meld meg på
        </button>
      </div>

      <div style={{ height: 16 }}/>
    </div>
  );
};

window.HomeScreen = HomeScreen;
