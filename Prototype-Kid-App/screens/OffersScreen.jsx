// Tilbud / Offers screen
const OffersScreen = ({ ctx }) => {
  const { addToCart, showToast, openCategory, openProduct, userName, tier } = ctx;
  const filters = ['Alle', 'Kun for deg', 'Tekstil', 'Soverom', 'Baderom', 'Utendør'];
  const [active, setActive] = React.useState('Alle');

  const spendThisYear = 4280;
  const spendGoal = 5000;
  const spendPct = Math.min(100, (spendThisYear / spendGoal) * 100);

  const allOffers = [
    {
      id: 501,
      cat: 'Tekstil',
      forYou: true,
      img: './images/Pyntepute1r-stue.jpg',
      title: 'Pute «Hav» i lin',
      reason: 'Du lagret denne forrige uke',
      member: 279, regular: 349,
      ends: '3 dager igjen',
    },
    {
      id: 502,
      cat: 'Tekstil',
      forYou: true,
      img: './images/Ullpledd1-stue.webp',
      title: 'Pledd «Vinter» i ull',
      reason: 'Passer til sofaen din',
      member: 749, regular: 899,
      ends: '4 dager igjen',
    },
    {
      id: 503,
      cat: 'Soverom',
      forYou: true,
      img: './images/dyne1-soverom.webp',
      title: 'Dyne «Stripe»',
      reason: 'Basert på ditt soverom-kjøp',
      member: 699, regular: 899,
      ends: '1 uke igjen',
    },
    {
      id: 504,
      cat: 'Tekstil',
      forYou: true,
      img: './images/Vase1-stue.webp',
      title: 'Vase «Skog» i keramikk',
      reason: 'Passer til kolleksjonen din',
      member: 419, regular: 529,
      ends: '5 dager igjen',
    },
    {
      id: 505,
      cat: 'Baderom',
      forYou: true,
      img: './images/Baderomsmatte-baderom.webp',
      title: 'Baderomsmatte «Ro»',
      reason: 'Ny i din størrelse',
      member: 279, regular: 349,
      ends: '6 dager igjen',
    },
    {
      id: 506,
      cat: 'Utendør',
      forYou: true,
      img: './images/pute-utendørs.webp',
      title: 'Uteputetrekk «Sol»',
      reason: 'Vår er her — klar til terrassen?',
      member: 229, regular: 299,
      ends: '2 uker igjen',
    },
  ];

  const visible = allOffers.filter(o => {
    if (active === 'Alle') return true;
    if (active === 'Kun for deg') return o.forYou;
    return o.cat === active;
  });

  const campaigns = [
    { tag: 'Sesongnyhet',  title: 'Nye soverom-tekstiler',   sub: 'Friske farger til våren · kun for medlemmer', img: './images/soverom-kid.webp',   cat: 'Soverom'  },
    { tag: 'Uteklar',      title: 'Utekollektion er her',    sub: 'Putetrekk, pledd og lykter',                  img: './images/utendoor-kid.webp',  cat: 'Utendør'  },
    { tag: 'Baderom',      title: 'Myke hverdagsluksuser',   sub: 'Håndklær og matter i ny kolleksjon',          img: './images/baderom-kid.webp',   cat: 'Baderom'  },
  ];

  return (
    <div className="screen">
      <div style={{ padding: '6px 22px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>Tilbud · uke 20</div>
        <h1 className="serif" style={{
          fontSize: 32, lineHeight: 1.05, margin: 0, letterSpacing: '-0.025em', fontWeight: 400,
        }}>
          Plukket <em style={{ color: 'var(--clay)' }}>til deg</em><br/>
          denne uken
        </h1>
      </div>

      {/* Personlig gavekort-teller */}
      <div style={{ padding: '18px 22px 0' }}>
        <div onClick={() => setActive('Kun for deg')} className="card" style={{
          padding: 0, overflow: 'hidden', cursor: 'pointer',
          background: 'var(--ink)', color: 'var(--paper)', border: 'none',
        }}>
          <div style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--clay)', color: 'var(--paper)',
                display: 'grid', placeItems: 'center', flexShrink: 0,
                fontFamily: 'Newsreader, Georgia, serif', fontSize: 13, fontStyle: 'italic',
              }}>300</div>
              <div style={{ flex: 1 }}>
                <div className="eyebrow" style={{ marginBottom: 3, color: 'rgba(251,248,242,0.6)' }}>
                  ★ {tier}-fordel · gavekort
                </div>
                <div className="serif" style={{ fontSize: 16, lineHeight: 1.2, fontStyle: 'italic' }}>
                  {(spendGoal - spendThisYear).toLocaleString('no-NB')} kr igjen til 300 kr gavekort
                </div>
              </div>
              <div style={{ color: 'rgba(251,248,242,0.55)', fontSize: 18 }}>→</div>
            </div>
            <div style={{ height: 3, background: 'rgba(251,248,242,0.14)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${spendPct}%`, background: 'var(--clay)' }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span className="mono" style={{ fontSize: 9, color: 'rgba(251,248,242,0.5)' }}>
                {spendThisYear.toLocaleString('no-NB')} kr brukt
              </span>
              <span className="mono" style={{ fontSize: 9, color: 'rgba(251,248,242,0.5)' }}>
                mål: {spendGoal.toLocaleString('no-NB')} kr
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters — funksjonelle */}
      <div className="chip-strip" style={{ padding: '20px 22px 0', overflowX: 'auto' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActive(f)}
            className="pill"
            style={{
              cursor: 'pointer',
              background: active === f ? 'var(--ink)' : 'var(--paper)',
              color: active === f ? 'var(--paper)' : 'var(--ink-2)',
              borderColor: active === f ? 'var(--ink)' : 'var(--line-2)',
            }}
          >{f}</button>
        ))}
      </div>

      {/* Featured offers — filtrert */}
      <div className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 6, color: 'var(--clay)' }}>
              {active === 'Kun for deg' ? '★ Kun for deg' : `Filter · ${active}`}
            </div>
            <h2 className="section-title">
              Medlems<em>priser</em>
              <span className="mono tnum" style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 10 }}>
                {visible.length} {visible.length === 1 ? 'tilbud' : 'tilbud'}
              </span>
            </h2>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>
            Ingen tilbud i denne kategorien akkurat nå.
          </div>
        ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {visible.map((o) => (
            <div key={o.id} className="card" style={{ padding: 12, display: 'flex', gap: 14, cursor: 'pointer' }}
              onClick={() => openProduct ? openProduct({ id: o.id, name: o.title, price: o.member, art: o.art, bg: o.bg }) : addToCart(o.title)}>
              <div style={{
                width: 110, height: 130, flexShrink: 0, borderRadius: 12, overflow: 'hidden',
                position: 'relative',
                backgroundImage: `url(${o.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'var(--paper-3)',
              }}>
                <span style={{
                  position: 'absolute', top: 8, left: 8,
                  background: 'var(--clay)', color: 'var(--paper)',
                  fontFamily: 'Geist Mono, monospace', fontSize: 8,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '3px 6px', borderRadius: 4,
                }}>★ For deg</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div className="eyebrow" style={{ marginBottom: 4 }}>{o.reason}</div>
                <div className="serif" style={{ fontSize: 18, lineHeight: 1.15, marginBottom: 8 }}>
                  {o.title}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span className="mono tnum" style={{
                    fontSize: 11, color: 'var(--ink-3)', textDecoration: 'line-through',
                  }}>kr {o.regular}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span className="serif tnum" style={{
                    fontSize: 24, lineHeight: 1, color: 'var(--clay)',
                  }}>kr {o.member}</span>
                  <span className="mono" style={{
                    fontSize: 9, color: 'var(--clay)', letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>medlem</span>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>
                    ⏱ {o.ends}
                  </span>
                  <button onClick={(e) => { e.stopPropagation(); addToCart({ id: o.id, name: o.title, price: o.member, art: o.art, bg: o.bg }); }} className="btn-primary">
                    Legg i kurv
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Campaigns */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Aktive <em>kampanjer</em></h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {campaigns.map((c, i) => (
            <div key={i} onClick={() => openCategory(c.cat)} className="card" style={{
              padding: 0, overflow: 'hidden', display: 'flex', cursor: 'pointer',
            }}>
              <div className="photo" style={{
                width: 86, flexShrink: 0,
                backgroundImage: `url(${c.img})`,
                backgroundColor: 'var(--paper-3)',
              }}/>
              <div style={{ padding: '14px 16px', flex: 1 }}>
                <div className="eyebrow" style={{ marginBottom: 4 }}>{c.tag}</div>
                <div className="serif" style={{ fontSize: 17, lineHeight: 1.2, marginBottom: 4 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{c.sub}</div>
              </div>
              <div style={{
                alignSelf: 'center', padding: '0 16px', color: 'var(--ink-3)', fontSize: 16,
              }}>→</div>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon */}
      <div className="section">
        <div onClick={() => { navigator.clipboard?.writeText('INGRID-2604'); showToast('Kupongkode kopiert'); }} className="card" style={{
          padding: 18,
          background: 'var(--paper-2)',
          borderStyle: 'dashed',
          borderColor: 'var(--line-2)',
          textAlign: 'center',
          cursor: 'pointer',
        }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Bursdagskupong · gyldig til 30. apr</div>
          <div className="serif" style={{ fontSize: 22, marginBottom: 4 }}>
            <em style={{ color: 'var(--clay)' }}>−15 %</em> på hele kjøpet
          </div>
          <div className="mono tnum" style={{
            fontSize: 11, letterSpacing: '0.18em', color: 'var(--ink-2)', marginTop: 8,
            padding: '6px 10px', background: 'var(--paper)', borderRadius: 6, display: 'inline-block',
            border: '1px solid var(--line)',
          }}>
            INGRID-2604
          </div>
        </div>
      </div>

      <div style={{ height: 24 }}/>
    </div>
  );
};

window.OffersScreen = OffersScreen;
