// Category browse + product detail + cart/checkout overlays
const { useState: useS } = React;

const PRODUCTS_BY_CAT = {
  'Stue': [
    { id: 'p1', name: 'Pute «Hav»',     price: 349, was: null, img: './images/Pyntepute1r-stue.jpg',  mat: 'Lin · 50×50' },
    { id: 'p2', name: 'Pledd «Vinter»', price: 899, was: 1099, img: './images/Ullpledd1-stue.webp',   mat: 'Ull · 130×170' },
    { id: 'p4', name: 'Vase «Skog»',    price: 529, was: null, img: './images/Vase1-stue.webp',       mat: 'Stentøy' },
  ],
  'Soverom': [
    { id: 'p5', name: 'Dyne «Stripe»',   price: 899,  was: null, img: './images/dyne1-soverom.webp', mat: 'Bomull · 140×200' },
    { id: 'p6', name: 'Pute «Hvit»',     price: 299,  was: null, img: './images/pute1-soverom.webp', mat: 'Mikrofiber · 50×70' },
    { id: 'p7', name: 'Sengeteppe «Ro»', price: 1290, was: null, img: './images/soverom-kid.webp',   mat: 'Bomull · 240×260' },
  ],
  'Baderom': [
    { id: 'p9',  name: 'Håndkle «Fjord»',     price: 199, was: null, img: './images/Håndkle1-baderom.webp',      mat: 'Bomull · 50×100' },
    { id: 'p14', name: 'Hamam-håndkle «Sol»',  price: 249, was: null, img: './images/Håndkle2-baderom.webp',      mat: 'Bomull · 90×170' },
    { id: 'p16', name: 'Baderomsmatte «Ro»',   price: 349, was: 449, img: './images/Baderomsmatte-baderom.webp', mat: 'Bomull · 50×80' },
  ],
  'Utendør': [
    { id: 'p11', name: 'Uteputetrekk «Sol»', price: 299, was: null, img: './images/pute-utendørs.webp',    mat: 'Akryl · 50×50' },
    { id: 'p12', name: 'Pledd «Terrasse»',   price: 749, was: 899,  img: './images/pledd-utendørs.webp',   mat: 'Bomull · 130×170' },
    { id: 'p13', name: 'Lyslenke «Hage»',    price: 449, was: null, img: './images/lyslenke-utendørs.webp', mat: 'Glass · stormlykt' },
  ],
};

const CategoryView = ({ ctx, category, onClose, onProduct }) => {
  const { userName, tier } = ctx;
  const products = window.PRODUCTS_BY_CAT[category] || [];

  // Preference tags + match scores per product (deterministic from id)
  const prefs = ['Lin & ull', 'Varme toner', 'Skandi', 'Naturlig'];
  const reasons = {
    p1: 'Du la til lignende i favoritter',
    p2: 'Passer fargene du har valgt før',
    p3: 'Bestselger blant Sølv-medlemmer',
    p4: 'Matcher kolleksjonen din',
    p5: 'Anbefalt — du har sett på det 2 ganger',
    p6: 'Naturlige materialer, dine preferanser',
    p7: 'Trending blant medlemmer som deg',
    p8: 'Passer til glassene du kjøpte i mars',
    p9: 'Du la til lignende i favoritter',
    p10: 'Anbefalt for ditt soverom',
  };

  // member price = price * 0.85 (kept SUBTLE — not a flashing %)
  const memberPrice = (p) => Math.floor(p.price * 0.85);
  const points = (p) => Math.floor(p.price / 10);

  return (
    <div className="overlay">
      <div className="overlay-head">
        <button className="icon-btn" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--ink)" strokeWidth="1.6">
            <path d="M15 6l-6 6 6 6"/>
          </svg>
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div className="eyebrow">Kategori</div>
          <div className="serif" style={{ fontSize: 18, fontStyle: 'italic' }}>{category}</div>
        </div>
        <div style={{ width: 32 }}/>
      </div>

      <div className="scroll">
        {/* Personalisert intro */}
        <div style={{
          background: 'var(--paper-2)',
          padding: '22px 22px 18px',
          borderBottom: '1px solid var(--line)',
        }}>
          <div className="eyebrow" style={{ marginBottom: 6, color: 'var(--clay)' }}>
            ★ Plukket for {userName}
          </div>
          <h2 className="serif" style={{
            fontSize: 22, lineHeight: 1.15, margin: '0 0 10px',
            letterSpacing: '-0.02em', fontWeight: 400,
          }}>
            {category}, tilpasset <em>deg</em>
          </h2>
          <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 14 }}>
            Sortert etter dine preferanser og forrige kjøp.
            Som {tier}-medlem ser du medlemspris og tjener poeng på hvert kjøp.
          </div>

          {/* preferanse-chips, klikkbare for å justere */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {prefs.map(p => (
              <span key={p} style={{
                fontFamily: 'Geist Mono, monospace',
                fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '5px 10px', borderRadius: 999,
                background: 'var(--paper)',
                color: 'var(--ink-2)',
                border: '1px solid var(--line-2)',
              }}>{p}</span>
            ))}
            <span style={{
              fontFamily: 'Geist Mono, monospace',
              fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '5px 10px', borderRadius: 999,
              background: 'transparent',
              color: 'var(--ink-3)',
              border: '1px dashed var(--ink-4)',
              cursor: 'pointer',
            }}>+ Juster</span>
          </div>
        </div>

        {/* produktrutenett */}
        <div style={{ padding: '18px 16px 28px' }}>
          {products.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>
              Ingen produkter her ennå.
            </div>
          ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {products.map((p, i) => {
              const mp = memberPrice(p);
              const reason = reasons[p.id] || 'Anbefalt for deg';
              const showTopPick = i === 0; // first product gets a "Topp-anbefaling" tag
              return (
              <div key={p.id} className="card" style={{
                padding: 8, cursor: 'pointer', position: 'relative',
              }} onClick={() => onProduct(p)}>
                <div className="photo" style={{
                  height: 140, borderRadius: 10, marginBottom: 8,
                  backgroundImage: `url(${p.img})`,
                  backgroundColor: 'var(--paper-3)',
                  position: 'relative',
                }}>
                  {showTopPick && (
                    <div style={{
                      position: 'absolute', top: 8, left: 8,
                      background: 'var(--clay)', color: 'var(--paper)',
                      fontFamily: 'Geist Mono, monospace',
                      fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '3px 7px', borderRadius: 4,
                    }}>
                      ★ Topp-anbefaling
                    </div>
                  )}
                </div>

                {/* «Valgt fordi…» — personalisert kontekst */}
                <div style={{
                  fontSize: 10, color: 'var(--clay)',
                  fontFamily: 'Geist Mono, monospace',
                  letterSpacing: '0.04em',
                  marginBottom: 4, lineHeight: 1.3,
                }}>
                  {reason}
                </div>

                <div className="serif" style={{ fontSize: 14, lineHeight: 1.2 }}>{p.name}</div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', marginTop: 2 }}>{p.mat}</div>

                {/* medlemspris diskret + poeng */}
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span className="mono tnum" style={{ fontSize: 13, color: 'var(--ink)' }}>kr {mp}</span>
                  <span className="mono tnum" style={{
                    fontSize: 10, color: 'var(--ink-3)', textDecoration: 'line-through',
                  }}>kr {p.price}</span>
                </div>
                <div style={{
                  marginTop: 4,
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 9.5, color: 'var(--ink-2)',
                  fontFamily: 'Geist Mono, monospace',
                  letterSpacing: '0.04em',
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: 'var(--clay)', display: 'inline-block',
                  }}/>
                  Medlemspris · +{points(p)} poeng
                </div>
              </div>
            );})}
          </div>
          )}
        </div>

        {/* Loyalty footer — frekvens-incentiv, ikke kampanje */}
        <div style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          padding: '24px 22px 28px',
          textAlign: 'center',
        }}>
          <div className="eyebrow" style={{ marginBottom: 8, color: 'rgba(244,237,224,0.55)' }}>
            Du er nær neste nivå
          </div>
          <div className="serif" style={{ fontSize: 18, lineHeight: 1.2, marginBottom: 6 }}>
            260 poeng til <em style={{ color: 'var(--clay-soft, #E8C5B5)' }}>Gull</em>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(244,237,224,0.6)', marginBottom: 14, lineHeight: 1.5 }}>
            Som Gull-medlem får du tidlig tilgang til kolleksjoner og personlig stylist.
          </div>
          <button onClick={() => onClose()} style={{
            background: 'transparent',
            color: 'var(--paper)',
            border: '1px solid rgba(244,237,224,0.3)',
            borderRadius: 999,
            padding: '10px 20px',
            fontFamily: 'Geist Mono, monospace',
            fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}>
            Se medlemsfordelene
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductView = ({ product, ctx, onClose }) => {
  const { addToCart, favs, toggleFav } = ctx;
  const isFav = favs.has(product.id);
  const memberP = product.memberPrice || Math.floor(product.price * 0.85);
  const fullP = product.was || product.price;
  const hasMemberDiscount = memberP < product.price;
  const cartProduct = { ...product, price: memberP };

  return (
    <div className="overlay">
      <div className="overlay-head" style={{ background: 'transparent', borderBottom: 'none' }}>
        <button className="icon-btn" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--ink)" strokeWidth="1.6"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
        <div style={{ flex: 1 }}/>
        <button className="icon-btn" onClick={() => toggleFav(product.id)}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill={isFav ? 'var(--clay)' : 'none'} stroke={isFav ? 'var(--clay)' : 'var(--ink)'} strokeWidth="1.6">
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/>
          </svg>
        </button>
      </div>
      <div className="scroll">
        <div className="photo" style={{ height: 360, backgroundImage: `url(${product.img})`, backgroundColor: 'var(--paper-3)' }}/>
        <div style={{ padding: '20px 22px 100px' }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>{product.mat}</div>
          <h2 className="serif" style={{ fontSize: 28, lineHeight: 1.05, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
            {product.name}
          </h2>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <span className="serif tnum" style={{ fontSize: 24, color: 'var(--clay)' }}>kr {memberP}</span>
            {hasMemberDiscount && (
              <span className="mono tnum" style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'line-through' }}>kr {product.price}</span>
            )}
          </div>
          {hasMemberDiscount && (
            <div style={{ fontSize: 10, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--clay)', marginBottom: 16 }}>
              ★ Medlemspris · spar kr {product.price - memberP}
            </div>
          )}
          <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 22 }}>
            Et håndlaget objekt i naturlige materialer. Tåler hverdagen, blir vakrere med tid. Norsk lager — leveres på 2–4 dager.
          </div>
          <div className="card" style={{ padding: 14, marginBottom: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Detaljer</div>
            {[['Materiale', product.mat || '—'], ['Pleie', 'Vask 30°, ikke tørketrommel'], ['Opphav', 'Designet i Norge'], ['Lager', 'På lager · sendes i dag']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 12, borderTop: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--ink-3)' }}>{k}</span>
                <span style={{ color: 'var(--ink)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '12px 16px 28px',
        background: 'rgba(251,248,242,0.95)',
        backdropFilter: 'blur(14px)',
        borderTop: '1px solid var(--line)',
        display: 'flex', gap: 10,
      }}>
        <button className="btn-primary" style={{ flex: 1, padding: '14px', fontSize: 11 }}
          onClick={() => { addToCart(cartProduct); onClose(); }}>
          Legg i kurv · kr {memberP}
        </button>
      </div>
    </div>
  );
};

const CartView = ({ ctx, onClose, onCheckout }) => {
  const { cart, removeFromCart } = ctx;
  const total = cart.reduce((s, c) => s + c.price, 0);
  return (
    <div className="overlay">
      <div className="overlay-head">
        <button className="icon-btn" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--ink)" strokeWidth="1.6"><path d="M6 6l12 12M6 18L18 6"/></svg>
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div className="eyebrow">Handlekurv</div>
          <div className="serif" style={{ fontSize: 18, fontStyle: 'italic' }}>{cart.length} {cart.length === 1 ? 'vare' : 'varer'}</div>
        </div>
        <div style={{ width: 32 }}/>
      </div>
      <div className="scroll" style={{ padding: '8px 16px 100px' }}>
        {cart.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center' }}>
            <div className="serif" style={{ fontSize: 18, marginBottom: 8 }}>Kurven er tom</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Legg til varer for å starte handelen.</div>
          </div>
        ) : (
          <>
            {cart.map((c, i) => (
              <div key={i} className="card" style={{ padding: 10, marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className="photo" style={{ width: 60, height: 60, borderRadius: 8, backgroundImage: `url(${c.img})`, flexShrink: 0, background: 'var(--paper-3)' }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="serif" style={{ fontSize: 14 }}>{c.name}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>1 stk</div>
                </div>
                <div className="mono tnum" style={{ fontSize: 13 }}>kr {c.price}</div>
                <button onClick={() => removeFromCart(i)} style={{ background: 'transparent', border: 'none', color: 'var(--ink-3)', cursor: 'pointer', fontSize: 16, padding: 4 }}>×</button>
              </div>
            ))}
            <div className="card" style={{ padding: 14, marginTop: 14 }}>
              {[['Sum', `kr ${total}`], ['Frakt · medlem', 'Gratis'], ['Poeng du tjener', `+${Math.floor(total/10)}`]].map(([k,v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 12 }}>
                  <span style={{ color: 'var(--ink-3)' }}>{k}</span>
                  <span className="mono tnum">{v}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--line)', marginTop: 6, paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                <span className="serif" style={{ fontSize: 16 }}>Å betale</span>
                <span className="serif tnum" style={{ fontSize: 18 }}>kr {total}</span>
              </div>
            </div>
          </>
        )}
      </div>
      {cart.length > 0 && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '12px 16px 28px',
          background: 'rgba(251,248,242,0.95)',
          backdropFilter: 'blur(14px)',
          borderTop: '1px solid var(--line)',
        }}>
          <button className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 11 }}
            onClick={onCheckout}>
            Til kassen · kr {total}
          </button>
        </div>
      )}
    </div>
  );
};

const CheckoutView = ({ ctx, onClose, onComplete }) => {
  const { cart } = ctx;
  const [step, setStep] = useS(1);
  const [payMethod, setPayMethod] = useS('Vipps');
  const total = cart.reduce((s,c) => s + c.price, 0);
  const steps = ['Levering', 'Betaling', 'Bekreft'];

  const payOptions = [
    {
      id: 'Vipps',
      label: 'Vipps',
      sub: 'Betal med mobilnummer',
      icon: (
        <div style={{ width: 36, height: 24, borderRadius: 5, background: '#FF5B24', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 11 }}>V</span>
        </div>
      ),
    },
    {
      id: 'Klarna',
      label: 'Klarna · del opp',
      sub: '3 rentefrie avdrag',
      icon: (
        <div style={{ width: 36, height: 24, borderRadius: 5, background: '#FFB3C7', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <span style={{ color: '#1a1a1a', fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 11 }}>K</span>
        </div>
      ),
    },
    {
      id: 'Kort',
      label: 'Kort · ••• 4892',
      sub: 'Visa / Mastercard',
      icon: (
        <div style={{ width: 36, height: 24, borderRadius: 5, background: 'var(--ink)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 16" width="22" height="14" fill="none">
            <rect x="0" y="0" width="24" height="16" rx="2" fill="none"/>
            <rect x="1" y="5" width="22" height="3" fill="rgba(255,255,255,0.3)"/>
            <rect x="14" y="10" width="8" height="2" rx="1" fill="rgba(255,255,255,0.7)"/>
          </svg>
        </div>
      ),
    },
    {
      id: 'Faktura',
      label: 'Faktura',
      sub: '14 dagers betalingsfrist',
      icon: (
        <div style={{ width: 36, height: 24, borderRadius: 5, background: 'var(--paper-3)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="var(--ink-2)" strokeWidth="1.5">
            <rect x="3" y="2" width="14" height="16" rx="2"/>
            <line x1="7" y1="7" x2="13" y2="7"/><line x1="7" y1="10" x2="13" y2="10"/><line x1="7" y1="13" x2="11" y2="13"/>
          </svg>
        </div>
      ),
    },
  ];
  return (
    <div className="overlay">
      <div className="overlay-head">
        <button className="icon-btn" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--ink)" strokeWidth="1.6"><path d="M6 6l12 12M6 18L18 6"/></svg>
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div className="eyebrow">Kasse · steg {step}/3</div>
          <div className="serif" style={{ fontSize: 16, fontStyle: 'italic' }}>{steps[step-1]}</div>
        </div>
        <div style={{ width: 32 }}/>
      </div>
      <div className="scroll" style={{ padding: '14px 18px 100px' }}>
        {/* step indicator */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i <= step ? 'var(--clay)' : 'var(--paper-3)',
            }}/>
          ))}
        </div>

        {step === 1 && (
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Leveringsmåte</div>
            {[
              { name: 'Klikk &amp; hent · Sandnes Storsenter', sub: 'Klar i morgen 12:00', price: 'Gratis', sel: true },
              { name: 'Hjem til døren', sub: '2–4 dager · Posten', price: 'kr 49' },
              { name: 'Hentepunkt nær deg', sub: 'Velg ved kassen', price: 'kr 39' },
            ].map((d, i) => (
              <div key={i} className="card" style={{
                padding: 14, marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center',
                borderColor: d.sel ? 'var(--ink)' : 'var(--line)',
                borderWidth: d.sel ? 1.5 : 1,
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: d.sel ? '5px solid var(--ink)' : '1.5px solid var(--ink-4)',
                  flexShrink: 0,
                }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }} dangerouslySetInnerHTML={{__html: d.name}}/>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{d.sub}</div>
                </div>
                <div className="mono tnum" style={{ fontSize: 11 }}>{d.price}</div>
              </div>
            ))}
            <div className="eyebrow" style={{ marginTop: 22, marginBottom: 12 }}>Adresse</div>
            <div className="card" style={{ padding: 14 }}>
              <div className="serif" style={{ fontSize: 14, marginBottom: 4 }}>Solheim · Storgata 14</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>4307 Sandnes · 99 88 77 66</div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Velg betaling</div>
            {payOptions.map((p) => {
              const sel = payMethod === p.id;
              return (
                <div key={p.id} onClick={() => setPayMethod(p.id)} className="card" style={{
                  padding: 14, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12,
                  cursor: 'pointer',
                  borderColor: sel ? 'var(--ink)' : 'var(--line)',
                  borderWidth: sel ? 1.5 : 1,
                  background: sel ? 'var(--paper-2)' : 'var(--paper)',
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                    border: sel ? '5px solid var(--ink)' : '1.5px solid var(--ink-4)',
                  }}/>
                  {p.icon}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13 }}>{p.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{p.sub}</div>
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 18, padding: 14, background: 'var(--paper-2)', borderRadius: 12, fontSize: 12, color: 'var(--ink-2)' }}>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '0.06em' }}>SØLV-MEDLEM</span> · du tjener <strong className="tnum">{Math.floor(total/10)}</strong> poeng på dette kjøpet.
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Sammendrag</div>
            <div className="card" style={{ padding: 14 }}>
              {cart.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                  <span>{c.name}</span><span className="mono tnum">kr {c.price}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--line)', marginTop: 6, paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                <span className="serif" style={{ fontSize: 16 }}>Total</span>
                <span className="serif tnum" style={{ fontSize: 18 }}>kr {total}</span>
              </div>
            </div>
            <div style={{ marginTop: 16, fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.5 }}>
              Ved å bekrefte godtar du våre vilkår. Du tjener {Math.floor(total/10)} poeng.
            </div>
          </div>
        )}
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '12px 16px 28px',
        background: 'rgba(251,248,242,0.95)',
        backdropFilter: 'blur(14px)',
        borderTop: '1px solid var(--line)',
        display: 'flex', gap: 8,
      }}>
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} style={{
            background: 'transparent', border: '1px solid var(--line-2)', borderRadius: 999,
            padding: '12px 18px', fontFamily: 'Geist Mono, monospace', fontSize: 10,
            letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
          }}>Tilbake</button>
        )}
        <button className="btn-primary" style={{ flex: 1, padding: '14px', fontSize: 11 }}
          onClick={() => step < 3 ? setStep(step + 1) : onComplete()}>
          {step < 3 ? 'Fortsett' : `Betal kr ${total}`}
        </button>
      </div>
    </div>
  );
};

const ConfirmView = ({ onClose }) => (
  <div className="overlay" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 30, textAlign: 'center' }}>
    <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--clay)', display: 'grid', placeItems: 'center', marginBottom: 24 }}>
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--paper)" strokeWidth="2"><path d="M5 12l4 4 10-10"/></svg>
    </div>
    <div className="eyebrow" style={{ marginBottom: 8 }}>Ordre #4827 · bekreftet</div>
    <h2 className="serif" style={{ fontSize: 28, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
      Tusen takk
    </h2>
    <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5, maxWidth: 280, marginBottom: 28 }}>
      Vi har sendt bekreftelsen til din e-post. Klar til henting i Sandnes Storsenter i morgen 12:00.
    </div>
    <button className="btn-primary" onClick={onClose} style={{ padding: '12px 24px' }}>
      Fortsett å handle
    </button>
  </div>
);

window.CategoryView = CategoryView;
window.ProductView = ProductView;
window.CartView = CartView;
window.CheckoutView = CheckoutView;
window.ConfirmView = ConfirmView;
window.PRODUCTS_BY_CAT = PRODUCTS_BY_CAT;
