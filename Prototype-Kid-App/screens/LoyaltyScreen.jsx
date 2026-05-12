// Loyalty / Kundeklubb screen — premium, points-driven, repeat-purchase rewards
const LoyaltyScreen = ({ ctx }) => {
  const { userName, tier, showToast, openCategory } = ctx;
  const tierMap = {
    'Bronse':  { points: 280,  next: 'Sølv',    nextTh: 500,  start: 0    },
    'Sølv':    { points: 1240, next: 'Gull',    nextTh: 1500, start: 500  },
    'Gull':    { points: 2180, next: 'Platina', nextTh: 3000, start: 1500 },
    'Platina': { points: 3420, next: '—',       nextTh: 4000, start: 3000 },
  };
  const cur = tierMap[tier] || tierMap['Sølv'];
  const points = cur.points;
  const toGo = Math.max(0, cur.nextTh - points);
  const tierPct = Math.min(100, ((points - cur.start) / (cur.nextTh - cur.start)) * 100);

  // Repeat-purchase milestones (frekvens / mengde / streak / bursdag)
  const purchasesThisYear = 7;
  const spendThisYear = 4280;
  const monthsActive = 11;

  const milestones = [
    {
      kind: 'frequency',
      title: 'Hvert 5. kjøp · velkomstgave',
      current: purchasesThisYear % 5,
      goal: 5,
      unit: 'kjøp',
      meta: `${5 - (purchasesThisYear % 5)} igjen — neste: liten lykt fra kolleksjon`,
      ready: false,
    },
    {
      kind: 'spend',
      title: '5 000 kr brukt · 300 kr gavekort',
      current: spendThisYear,
      goal: 5000,
      unit: 'kr',
      meta: `${(5000 - spendThisYear).toLocaleString('no-NB').replace(/,/g,' ')} kr igjen til 300 kr gavekort`,
      ready: false,
    },
    {
      kind: 'streak',
      title: '12 måneder på rad · Sølv-jubileum',
      current: monthsActive,
      goal: 12,
      unit: 'mnd',
      meta: '1 måned igjen — bonus på 250 poeng venter',
      ready: false,
    },
    {
      kind: 'birthday',
      title: 'Bursdagsgave · klar 26. juni',
      current: null, goal: null, unit: null,
      meta: 'Velg gave fra utvalg når dagen kommer',
      ready: true,
    },
  ];

  const benefits = [
    { tier: 'Bronse',  text: 'Velkomstrabatt 10 %, fri frakt over 499,–' },
    { tier: 'Sølv',    text: 'Medlemspriser, fri frakt over 299,–, tidlig nyhetsbrev' },
    { tier: 'Gull',    text: 'Tidlig tilgang til kolleksjoner, eksklusiv tilgang til salg' },
    { tier: 'Platina', text: 'Privat shopping, invitasjon til arrangementer, gratis ombytte' },
  ].map(b => {
    const idx = ['Bronse','Sølv','Gull','Platina'].indexOf(b.tier);
    const cidx = ['Bronse','Sølv','Gull','Platina'].indexOf(tier);
    return { ...b, unlocked: idx <= cidx, current: idx === cidx };
  });

  const activity = [
    { date: '24. apr', desc: 'Kjøp · Sandnes Storsenter', pts: '+128' },
    { date: '21. apr', desc: 'Anmeldelse · Pute «Hav»',   pts: '+25'  },
    { date: '14. apr', desc: 'Kjøp · kid.no',             pts: '+86'  },
    { date: '02. apr', desc: 'Bursdagsbonus',             pts: '+100' },
    { date: '28. mar', desc: 'Innløst · Vårhilsen-pakke', pts: '−250' },
  ];

  return (
    <div className="screen">
      {/* Header — premium, less casual */}
      <div style={{ padding: '4px 22px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>Kid Programmet · medlem siden 2022</div>
        <h1 className="serif" style={{
          fontSize: 30, lineHeight: 1.05, margin: 0, letterSpacing: '-0.025em', fontWeight: 400,
        }}>
          Velkommen, <em style={{ fontStyle: 'italic' }}>{userName}</em>.
        </h1>
        <div style={{ marginTop: 8, fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.5, maxWidth: 300 }}>
          Et lojalitetsprogram som belønner gjenkjøp — ikke tilfeldige rabatter.
        </div>
      </div>

      {/* Member card — refined */}
      <div style={{ padding: '22px 22px 0' }}>
        <div className="member-card" style={{ borderRadius: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <div className="eyebrow" style={{ color: 'rgba(251,248,242,0.55)', marginBottom: 6 }}>
                {tier}-medlem
              </div>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1, fontStyle: 'italic' }}>
                {userName} Solheim
              </div>
            </div>
            <div className="mono" style={{
              fontSize: 9, letterSpacing: '0.18em',
              color: 'rgba(251,248,242,0.5)',
            }}>
              · KID — 04 26 ·
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22 }}>
            <div>
              <div className="eyebrow" style={{ color: 'rgba(251,248,242,0.55)', marginBottom: 4 }}>Saldo poeng</div>
              <div className="serif tnum" style={{
                fontSize: 52, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 400,
              }}>
                {points.toLocaleString('no-NB').replace(/,/g, ' ')}
              </div>
              <div style={{ fontSize: 10.5, color: 'rgba(251,248,242,0.55)', marginTop: 4 }}>
                Tjener 1 poeng pr 10 kr · 100 poeng = 10 kr i fradrag
              </div>
            </div>
          </div>

          <div style={{
            height: 1, background: 'rgba(251,248,242,0.18)', marginBottom: 14,
          }}/>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="mono" style={{
                fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(251,248,242,0.55)', marginBottom: 4,
              }}>Til {cur.next}</div>
              <div className="serif tnum" style={{ fontSize: 16 }}>{toGo} poeng</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{
                fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(251,248,242,0.55)', marginBottom: 4,
              }}>Nivå-progresjon</div>
              <div className="serif tnum" style={{ fontSize: 16 }}>{Math.round(tierPct)} %</div>
            </div>
          </div>

          <div style={{
            height: 2, background: 'rgba(251,248,242,0.14)', borderRadius: 1,
            marginTop: 10, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${tierPct}%`,
              background: 'var(--clay-soft)',
            }}/>
          </div>
        </div>
      </div>

      {/* === BELØNNINGER — repeat-purchase milestones === */}
      <div className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Belønninger</div>
            <h2 className="section-title">Dine <em>milepæler</em></h2>
          </div>
        </div>
        <div className="card" style={{ overflow: 'hidden', borderRadius: 4 }}>
          {milestones.map((m, i) => {
            const pct = m.goal ? Math.min(100, (m.current / m.goal) * 100) : 100;
            return (
              <div key={i} style={{
                padding: '18px 18px',
                borderBottom: i < milestones.length - 1 ? '1px solid var(--line)' : 'none',
                background: m.ready ? 'var(--paper-2)' : 'transparent',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <div className="serif" style={{ fontSize: 15, lineHeight: 1.2 }}>
                    {m.title}
                  </div>
                  {m.ready ? (
                    <button onClick={() => showToast('Gave reservert til 26. juni')} style={{
                      background: 'var(--clay)', color: 'var(--paper)',
                      border: 'none', borderRadius: 4,
                      padding: '5px 10px',
                      fontFamily: 'Geist Mono, monospace',
                      fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}>Klar</button>
                  ) : (
                    <span className="mono tnum" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>
                      {m.current}/{m.goal} {m.unit}
                    </span>
                  )}
                </div>
                {!m.ready && (
                  <div style={{
                    height: 2, background: 'var(--paper-3)', borderRadius: 1,
                    overflow: 'hidden', marginBottom: 8,
                  }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: 'var(--ink)',
                    }}/>
                  </div>
                )}
                <div style={{ fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.45 }}>
                  {m.meta}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tier ladder — refined, ingen rabatt-tall */}
      <div className="section">
        <div className="eyebrow" style={{ marginBottom: 14 }}>Nivåer i programmet</div>
        <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: 4 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{
              padding: '16px 18px',
              borderBottom: i < benefits.length - 1 ? '1px solid var(--line)' : 'none',
              background: b.current ? 'var(--paper-2)' : 'transparent',
              opacity: b.unlocked ? 1 : 0.55,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: b.unlocked ? 'var(--ink)' : 'transparent',
                border: b.unlocked ? 'none' : '1px dashed var(--ink-4)',
                display: 'grid', placeItems: 'center',
                flexShrink: 0, marginTop: 2,
              }}>
                {b.unlocked && (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="var(--paper)" strokeWidth="2.2">
                    <path d="M5 12l4 4 10-10"/>
                  </svg>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div className="serif" style={{
                  fontSize: 15, marginBottom: 4,
                  fontStyle: b.current ? 'italic' : 'normal',
                }}>
                  {b.tier}{b.current && ' · nå aktivt'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.45 }}>
                  {b.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aktivitet */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Aktivitet</h2>
          <button onClick={() => showToast('Full aktivitetsoversikt kommer')} className="section-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>Alle →</button>
        </div>
        <div className="card" style={{ borderRadius: 4 }}>
          {activity.map((a, i) => (
            <div key={i} style={{
              padding: '13px 18px',
              borderBottom: i < activity.length - 1 ? '1px solid var(--line)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <div className="mono" style={{
                fontSize: 10, color: 'var(--ink-3)', width: 50, flexShrink: 0,
                letterSpacing: '0.04em',
              }}>{a.date}</div>
              <div style={{ flex: 1, fontSize: 13, color: 'var(--ink)' }}>
                {a.desc}
              </div>
              <div className="mono tnum" style={{
                fontSize: 13,
                color: a.pts.startsWith('−') ? 'var(--ink-3)' : 'var(--ink)',
              }}>{a.pts}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 24 }}/>
    </div>
  );
};

window.LoyaltyScreen = LoyaltyScreen;
