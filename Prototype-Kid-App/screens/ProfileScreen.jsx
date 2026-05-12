// Profile / Profil og butikk
const ProfileScreen = ({ ctx }) => {
  const { userName, tier, cart, showToast } = ctx;
  const [notifs, setNotifs] = React.useState({
    offers: true, points: true, news: false, restock: true,
  });

  const toggle = (k) => setNotifs(n => ({ ...n, [k]: !n[k] }));

  const purchases = [
    { date: '24. apr · 2026', store: 'Sandnes Storsenter', items: '3 varer', total: '1 287' },
    { date: '14. apr · 2026', store: 'kid.no',             items: '1 vare',  total: '849'   },
    { date: '02. apr · 2026', store: 'Strømmen',           items: '5 varer', total: '2 130' },
  ];

  const stores = [
    { name: 'Sandnes Storsenter', dist: '0,8 km', open: 'Stenger 21:00', primary: true },
    { name: 'Kvadrat Lura',       dist: '3,2 km', open: 'Stenger 20:00' },
    { name: 'Forus Vest',         dist: '6,1 km', open: 'Stenger 21:00' },
  ];

  const notifLabels = {
    offers:  ['Personlige tilbud',     'Når noe i ditt favorittutvalg går ned i pris'],
    points:  ['Poeng og nivå',          'Påminnelser om bonus og nivåoppgradering'],
    news:    ['Nyheter og inspirasjon', 'Stylistens hjørne, kolleksjoner, guider'],
    restock: ['På lager igjen',         'Når en utsolgt favoritt er tilbake'],
  };

  return (
    <div className="screen">
      <div style={{ padding: '6px 22px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>Profil</div>
        <h1 className="serif" style={{
          fontSize: 32, lineHeight: 1.05, margin: 0, letterSpacing: '-0.025em', fontWeight: 400,
        }}>
          Hjemmet ditt, <em style={{ color: 'var(--clay)' }}>din konto</em>
        </h1>
      </div>

      {/* Profile head */}
      <div style={{ padding: '20px 22px 0' }}>
        <div className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--clay-bg)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'Newsreader, serif',
            fontStyle: 'italic',
            fontSize: 22,
            color: 'var(--clay)',
          }}>{userName.slice(0,1)}{userName.slice(-1).toUpperCase()}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="serif" style={{ fontSize: 19, lineHeight: 1.1 }}>{userName} Solheim</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
              {userName.toLowerCase()}.solheim@gmail.com
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <span className="pill" style={{ padding: '3px 8px', fontSize: 9 }}>{tier}-medlem</span>
              <span className="pill" style={{ padding: '3px 8px', fontSize: 9 }}>4 år</span>
            </div>
          </div>
          <button onClick={() => showToast('Profilredigering kommer snart')} style={{
            background: 'transparent', border: '1px solid var(--line-2)',
            borderRadius: 999, padding: '7px 12px',
            fontFamily: 'Geist Mono, monospace',
            fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--ink-2)',
            cursor: 'pointer',
          }}>Rediger</button>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ padding: '12px 22px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { k: cart.length.toString(),  l: 'I kurv' },
          { k: '38',      l: 'Kjøp' },
          { k: '12',      l: 'Favoritter' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: '12px 10px', textAlign: 'center' }}>
            <div className="serif tnum" style={{ fontSize: 22, lineHeight: 1 }}>{s.k}</div>
            <div className="eyebrow" style={{ marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Klikk og hent */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Klikk &amp; <em>hent</em></h2>
          <button onClick={() => showToast('Bytt favorittbutikk i Profil')} className="section-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>Bytt →</button>
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          {/* Map placeholder */}
          <div style={{
            height: 130,
            position: 'relative',
            background:
              'linear-gradient(135deg, #E8E4DA 0%, #DDD7C8 100%)',
            borderBottom: '1px solid var(--line)',
            overflow: 'hidden',
          }}>
            {/* fake map lines */}
            <svg viewBox="0 0 300 130" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d="M-10 40 Q 80 20, 160 60 T 320 50" stroke="rgba(31,27,22,0.12)" fill="none" strokeWidth="1.2"/>
              <path d="M-10 80 Q 100 110, 200 80 T 320 100" stroke="rgba(31,27,22,0.12)" fill="none" strokeWidth="1.2"/>
              <path d="M50 -10 Q 60 60, 100 140" stroke="rgba(31,27,22,0.08)" fill="none" strokeWidth="1.2"/>
              <path d="M180 -10 Q 200 70, 230 140" stroke="rgba(31,27,22,0.08)" fill="none" strokeWidth="1.2"/>
              <rect x="60" y="50" width="22" height="14" fill="rgba(122,130,117,0.4)"/>
              <rect x="200" y="30" width="30" height="18" fill="rgba(122,130,117,0.35)"/>
              <rect x="230" y="80" width="18" height="22" fill="rgba(122,130,117,0.4)"/>
            </svg>
            {/* pin */}
            <div style={{
              position: 'absolute',
              left: '38%', top: '46%',
              transform: 'translate(-50%, -100%)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50% 50% 50% 0',
                background: 'var(--clay)', transform: 'rotate(-45deg)',
                boxShadow: '0 4px 12px rgba(194,106,79,0.4)',
                display: 'grid', placeItems: 'center',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--paper)', transform: 'rotate(45deg)' }}/>
              </div>
            </div>
            <span className="label" style={{
              position: 'absolute', bottom: 10, left: 10,
              fontFamily: 'Geist Mono, monospace', fontSize: 9,
              padding: '4px 7px', borderRadius: 4,
              background: 'rgba(251,248,242,0.85)',
              color: 'rgba(31,27,22,0.6)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>Kart · Sandnes</span>
          </div>

          {/* store list */}
          {stores.map((s, i) => (
            <div key={i} onClick={() => showToast(s.primary ? `${s.name} er standard` : `Sett ${s.name} som standard`)} style={{
              padding: '14px 18px',
              borderTop: i > 0 ? '1px solid var(--line)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: s.primary ? 'var(--paper-2)' : 'transparent',
              cursor: 'pointer',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: s.primary ? 'var(--clay)' : 'var(--ink-4)',
                flexShrink: 0,
              }}/>
              <div style={{ flex: 1 }}>
                <div className="serif" style={{ fontSize: 15 }}>{s.name}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>
                  {s.dist} · {s.open}
                </div>
              </div>
              {s.primary && (
                <span className="pill" style={{ padding: '3px 8px', fontSize: 9 }}>Standard</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Purchase history */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Kjøps<em>historikk</em></h2>
          <button onClick={() => showToast('Full kjøpshistorikk kommer')} className="section-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>Alle →</button>
        </div>
        <div className="card">
          {purchases.map((p, i) => (
            <div key={i} onClick={() => showToast(`Ordredetaljer · ${p.store}`)} style={{
              padding: '14px 18px',
              borderBottom: i < purchases.length - 1 ? '1px solid var(--line)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--ink)' }}>{p.store}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>
                  {p.date} · {p.items}
                </div>
              </div>
              <div className="mono tnum" style={{ fontSize: 13 }}>kr {p.total}</div>
              <div style={{ color: 'var(--ink-3)', fontSize: 14 }}>›</div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Varslinger</h2>
        </div>
        <div className="card">
          {Object.keys(notifLabels).map((k, i, arr) => (
            <div key={k} style={{
              padding: '14px 18px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, color: 'var(--ink)' }}>{notifLabels[k][0]}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.35 }}>
                  {notifLabels[k][1]}
                </div>
              </div>
              <div className={`switch ${notifs[k] ? 'on' : ''}`} onClick={() => toggle(k)}/>
            </div>
          ))}
        </div>
      </div>

      {/* Settings list */}
      <div className="section">
        <div className="card">
          {[
            ['Adresser og betaling', '2 lagret'],
            ['Personvern',           null],
            ['Språk',                'Norsk (bokmål)'],
            ['Hjelp og kundeservice', null],
            ['Logg ut',               null],
          ].map(([t, v], i, arr) => (
            <div key={t} onClick={() => showToast(t === 'Logg ut' ? 'Logger ut...' : `Åpner ${t.toLowerCase()}`)} style={{
              padding: '14px 18px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: t === 'Logg ut' ? 'var(--clay)' : 'var(--ink)',
              cursor: 'pointer',
            }}>
              <div style={{ flex: 1, fontSize: 13.5 }}>{t}</div>
              {v && <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{v}</div>}
              <div style={{ color: 'var(--ink-3)', fontSize: 14 }}>›</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '20px 22px 4px' }}>
        <div className="mono" style={{ fontSize: 9, color: 'var(--ink-4)', letterSpacing: '0.1em' }}>
          KID · KUNDEKLUBB · v 2.4.1
        </div>
      </div>

      <div style={{ height: 24 }}/>
    </div>
  );
};

window.ProfileScreen = ProfileScreen;
