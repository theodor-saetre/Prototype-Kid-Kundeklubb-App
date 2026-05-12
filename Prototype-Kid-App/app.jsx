// Main app — tab navigation + tweaks
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#C26A4F",
  "userName": "Ingrid",
  "tier": "Sølv",
  "showBanner": true,
  "density": "regular",
  "serifDisplay": "Newsreader",
  "darkMode": false,
  "showWave": true
}/*EDITMODE-END*/;

const TIER_OPTIONS = ['Bronse', 'Sølv', 'Gull', 'Platina'];

const TABS = [
  { id: 'home',    label: 'Hjem',     icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></svg>
  )},
  { id: 'loyalty', label: 'Klubb',    icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3l2.5 5.5L20 9.5l-4 4L17 20l-5-3-5 3 1-6.5-4-4 5.5-1z"/></svg>
  )},
  { id: 'offers',  label: 'Tilbud',   icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 12l-8 8-8-8 8-8h7a1 1 0 0 1 1 1z"/><circle cx="15" cy="9" r="1.3" fill="currentColor"/></svg>
  )},
  { id: 'profile', label: 'Profil',   icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
  )},
];

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [tab, setTab] = useState('home');
  const [favs, setFavs] = useState(new Set([1]));
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [overlay, setOverlay] = useState(null); // {kind:'category'|'product'|'cart'|'checkout'|'confirm', data}
  const [notifOpen, setNotifOpen] = useState(false);
  const [readNotifs, setReadNotifs] = useState(new Set());
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const scrollRef = useRef(null);

  const NOTIFICATIONS = [
    {
      id: 'n1', kind: 'tilbud',
      title: 'Pute «Hav» er på tilbud',
      body: 'Kun for deg · 3 dager igjen — kr 279 (ord. 349)',
      action: () => { setTab('offers'); },
    },
    {
      id: 'n2', kind: 'varsel',
      title: '720 kr igjen til 300 kr gavekort',
      body: 'Du har handlet for 4 280 kr — nesten i mål',
      action: () => { setTab('loyalty'); },
    },
    {
      id: 'n3', kind: 'tilbud',
      title: 'Ny utekollektion er tilgjengelig',
      body: 'Putetrekk, pledd og lykter — klar til terrassen',
      action: () => { setOverlay({ kind: 'category', data: 'Utendør' }); },
    },
    {
      id: 'n4', kind: 'varsel',
      title: 'Bursdagsgave klar 26. juni',
      body: 'Velg din gave fra utvalget når dagen nærmer seg',
      action: () => { setTab('loyalty'); },
    },
    {
      id: 'n5', kind: 'tilbud',
      title: 'Baderomsmatte «Ro» — nyhet',
      body: 'Ny i din størrelse · kr 279 (ord. 349)',
      action: () => { setOverlay({ kind: 'category', data: 'Baderom' }); },
    },
  ];

  // Apply tweaks to CSS vars
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--clay', t.accent);
    if (t.darkMode) {
      root.style.setProperty('--paper', '#1a1713');
      root.style.setProperty('--paper-2', '#23201a');
      root.style.setProperty('--paper-3', '#2c281f');
      root.style.setProperty('--ink', '#F4EDE0');
      root.style.setProperty('--ink-2', '#C8BFAF');
      root.style.setProperty('--ink-3', '#8A8275');
      root.style.setProperty('--ink-4', '#5A5247');
      root.style.setProperty('--line', 'rgba(244,237,224,0.10)');
      root.style.setProperty('--line-2', 'rgba(244,237,224,0.18)');
    } else {
      root.style.setProperty('--paper', '#FBF8F2');
      root.style.setProperty('--paper-2', '#F4EEE3');
      root.style.setProperty('--paper-3', '#EBE3D4');
      root.style.setProperty('--ink', '#1F1B16');
      root.style.setProperty('--ink-2', '#4A433A');
      root.style.setProperty('--ink-3', '#8A8275');
      root.style.setProperty('--ink-4', '#B8AE9D');
      root.style.setProperty('--line', 'rgba(31, 27, 22, 0.08)');
      root.style.setProperty('--line-2', 'rgba(31, 27, 22, 0.14)');
    }
    document.body.style.setProperty('--display-serif', `'${t.serifDisplay}', Georgia, serif`);
  }, [t.accent, t.darkMode, t.serifDisplay]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [tab]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const toggleFav = (id) => {
    setFavs(f => {
      const n = new Set(f);
      if (n.has(id)) { n.delete(id); showToast('Fjernet fra favoritter'); }
      else { n.add(id); showToast('Lagt til favoritter'); }
      return n;
    });
  };

  const addToCart = (item) => {
    // Resolve item — could be string (legacy) or product object
    let entry;
    if (typeof item === 'string') {
      // try find in catalog
      let found = null;
      Object.values(window.PRODUCTS_BY_CAT || {}).forEach(arr => {
        arr.forEach(p => { if (p.name === item) found = p; });
      });
      entry = found || { name: item, price: 0, img: '' };
    } else {
      entry = item;
    }
    setCart(c => [...c, entry]);
    showToast(`«${entry.name}» lagt i kurv`);
  };

  const removeFromCart = (idx) => {
    setCart(c => c.filter((_, i) => i !== idx));
  };

  const openCategory = (cat) => setOverlay({ kind: 'category', data: cat });
  const openProduct  = (p)   => setOverlay({ kind: 'product',  data: p });
  const openCart     = ()    => setOverlay({ kind: 'cart' });

  const ctx = {
    tweaks: t,
    userName: t.userName,
    tier: t.tier,
    favs, toggleFav,
    cart, addToCart, removeFromCart,
    showToast,
    openCategory, openProduct, openCart,
  };

  const Screen = {
    home:    window.HomeScreen,
    loyalty: window.LoyaltyScreen,
    offers:  window.OffersScreen,
    profile: window.ProfileScreen,
  }[tab];

  return (
    <div className={`app density-${t.density}`}>
      {/* Header */}
      <div className="app-header">
        <div className="brand">
          KID<span style={{ fontStyle: 'normal' }}>&nbsp;Interiør</span>
          <span className="brand-mark"/>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="icon-btn" aria-label="Søk" onClick={() => { setSearchOpen(v => !v); setSearchQ(''); }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--ink)" strokeWidth="1.6">
              <circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Kurv" onClick={openCart}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--ink)" strokeWidth="1.6">
              <path d="M5 7h14l-1.4 11a2 2 0 0 1-2 1.7H8.4a2 2 0 0 1-2-1.7z"/>
              <path d="M9 7V5a3 3 0 0 1 6 0v2"/>
            </svg>
            {cart.length > 0 && <span className="dot" style={{ background: 'var(--clay)' }}/>}
          </button>
          <button className="icon-btn" aria-label="Varsler" onClick={() => setNotifOpen(v => !v)}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--ink)" strokeWidth="1.6">
              <path d="M6 9a6 6 0 0 1 12 0c0 4 2 5 2 7H4c0-2 2-3 2-7z"/>
              <path d="M10 19a2 2 0 0 0 4 0"/>
            </svg>
            {NOTIFICATIONS.some(n => !readNotifs.has(n.id)) && <span className="dot"/>}
          </button>
        </div>
      </div>

      {/* Screen */}
      <div className="scroll" ref={scrollRef} key={tab}>
        {Screen ? <Screen ctx={ctx}/> : null}
      </div>

      {/* Search panel */}
      {searchOpen && (
        <div style={{ position: 'absolute', top: 52, left: 0, right: 0, bottom: 0, zIndex: 130 }}>
          <div onClick={() => setSearchOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(31,27,22,0.32)' }}/>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'var(--paper)', maxHeight: '80%', display: 'flex', flexDirection: 'column' }}>
            {/* input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--ink-3)" strokeWidth="1.6" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>
              </svg>
              <input
                autoFocus
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Søk etter produkter…"
                style={{
                  flex: 1, border: 'none', background: 'transparent', outline: 'none',
                  fontSize: 14, fontFamily: 'Geist, sans-serif', color: 'var(--ink)',
                }}
              />
              {searchQ && (
                <button onClick={() => setSearchQ('')} style={{ background: 'none', border: 'none', color: 'var(--ink-3)', cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1 }}>×</button>
              )}
            </div>
            {/* results */}
            <div style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
              {(() => {
                const q = searchQ.trim().toLowerCase();
                if (!q) return (
                  <div style={{ padding: '18px 20px' }}>
                    <div className="eyebrow" style={{ marginBottom: 10 }}>Kategorier</div>
                    {['Soverom', 'Stue', 'Baderom', 'Utendør'].map(cat => (
                      <div key={cat} onClick={() => { setSearchOpen(false); openCategory(cat); }} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px 0', borderBottom: '1px solid var(--line)', cursor: 'pointer',
                      }}>
                        <span style={{ fontSize: 14 }}>{cat}</span>
                        <span style={{ color: 'var(--ink-4)' }}>→</span>
                      </div>
                    ))}
                  </div>
                );
                const allProducts = Object.values(window.PRODUCTS_BY_CAT || {}).flat();
                const results = allProducts.filter(p =>
                  p.name.toLowerCase().includes(q) || (p.mat && p.mat.toLowerCase().includes(q))
                );
                if (results.length === 0) return (
                  <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>
                    Ingen treff på «{searchQ}»
                  </div>
                );
                return results.map((p, i) => (
                  <div key={p.id} onClick={() => { setSearchOpen(false); openProduct(p); }} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
                    borderBottom: '1px solid var(--line)', cursor: 'pointer',
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 8, flexShrink: 0,
                      backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                      backgroundColor: 'var(--paper-3)',
                    }}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13 }}>{p.name}</div>
                      <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>{p.mat}</div>
                    </div>
                    <div className="mono tnum" style={{ fontSize: 12, color: 'var(--ink)' }}>
                      kr {Math.floor(p.price * 0.85)}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Notification panel */}
      {notifOpen && (
        <div style={{
          position: 'absolute', top: 52, left: 0, right: 0, bottom: 0,
          zIndex: 120,
        }}>
          {/* backdrop */}
          <div onClick={() => setNotifOpen(false)} style={{
            position: 'absolute', inset: 0,
            background: 'rgba(31,27,22,0.32)',
          }}/>
          {/* panel */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            background: 'var(--paper)',
            borderBottom: '1px solid var(--line)',
            maxHeight: '70%',
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px 12px',
              borderBottom: '1px solid var(--line)',
            }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 2 }}>Varsler</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>
                  {NOTIFICATIONS.filter(n => !readNotifs.has(n.id)).length} uleste
                </div>
              </div>
              <button onClick={() => setReadNotifs(new Set(NOTIFICATIONS.map(n => n.id)))}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Geist Mono, monospace', fontSize: 9,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--ink-3)', padding: '4px 0',
                }}>
                Marker alle lest
              </button>
            </div>

            {NOTIFICATIONS.map((n, i) => {
              const isRead = readNotifs.has(n.id);
              return (
                <div key={n.id} onClick={() => {
                  setReadNotifs(r => new Set([...r, n.id]));
                  setNotifOpen(false);
                  n.action();
                }} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '14px 20px',
                  borderBottom: i < NOTIFICATIONS.length - 1 ? '1px solid var(--line)' : 'none',
                  background: isRead ? 'transparent' : 'var(--paper-2)',
                  cursor: 'pointer',
                }}>
                  {/* icon */}
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: n.kind === 'tilbud' ? 'var(--clay)' : 'var(--ink)',
                    display: 'grid', placeItems: 'center',
                    marginTop: 2,
                  }}>
                    {n.kind === 'tilbud' ? (
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--paper)" strokeWidth="1.8">
                        <path d="M20 12l-8 8-8-8 8-8h7a1 1 0 0 1 1 1z"/><circle cx="15" cy="9" r="1.3" fill="var(--paper)"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--paper)" strokeWidth="1.8">
                        <path d="M12 3l2.5 5.5L20 9.5l-4 4L17 20l-5-3-5 3 1-6.5-4-4 5.5-1z"/>
                      </svg>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3,
                    }}>
                      <span className="mono" style={{
                        fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: n.kind === 'tilbud' ? 'var(--clay)' : 'var(--ink-3)',
                      }}>{n.kind}</span>
                      {!isRead && (
                        <span style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: 'var(--clay)', display: 'inline-block',
                        }}/>
                      )}
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 3, lineHeight: 1.25 }}>
                      {n.title}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-3)', lineHeight: 1.4 }}>
                      {n.body}
                    </div>
                  </div>
                  <div style={{ color: 'var(--ink-4)', fontSize: 14, alignSelf: 'center' }}>→</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast">{toast}</div>
      )}

      {/* Overlays — category / product / cart / checkout / confirm */}
      {overlay?.kind === 'category' && (
        <window.CategoryView ctx={ctx} category={overlay.data}
          onClose={() => setOverlay(null)}
          onProduct={(p) => setOverlay({ kind: 'product', data: p, returnTo: { kind: 'category', data: overlay.data } })}/>
      )}
      {overlay?.kind === 'product' && (
        <window.ProductView ctx={ctx} product={overlay.data}
          onClose={() => setOverlay(overlay.returnTo || null)}/>
      )}
      {overlay?.kind === 'cart' && (
        <window.CartView ctx={ctx}
          onClose={() => setOverlay(null)}
          onCheckout={() => setOverlay({ kind: 'checkout' })}/>
      )}
      {overlay?.kind === 'checkout' && (
        <window.CheckoutView ctx={ctx}
          onClose={() => setOverlay({ kind: 'cart' })}
          onComplete={() => { setCart([]); setOverlay({ kind: 'confirm' }); }}/>
      )}
      {overlay?.kind === 'confirm' && (
        <window.ConfirmView onClose={() => setOverlay(null)}/>
      )}

      {/* Tab bar */}
      <div className="tabbar">
        {TABS.map(tt => (
          <button key={tt.id}
            className={`tab ${tab === tt.id ? 'active' : ''}`}
            onClick={() => setTab(tt.id)}
          >
            <div style={{ position: 'relative' }}>
              {React.cloneElement(tt.icon, {
                width: 22, height: 22,
                strokeWidth: tab === tt.id ? 1.8 : 1.3,
                style: { display: 'block' },
              })}
              {tab === tt.id && (
                <div style={{
                  position: 'absolute',
                  bottom: -6, left: '50%', transform: 'translateX(-50%)',
                  width: 4, height: 4, borderRadius: '50%',
                  background: 'var(--clay)',
                }}/>
              )}
            </div>
            <span>{tt.label}</span>
          </button>
        ))}
      </div>

      {/* Tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Innhold"/>
        <TweakText label="Navn" value={t.userName} onChange={v => setTweak('userName', v)}/>
        <TweakRadio label="Medlemsnivå" value={t.tier} options={TIER_OPTIONS}
          onChange={v => setTweak('tier', v)}/>
        <TweakToggle label="Vis sesongbanner" value={t.showBanner}
          onChange={v => setTweak('showBanner', v)}/>
        <TweakToggle label="Vis 👋 emoji" value={t.showWave}
          onChange={v => setTweak('showWave', v)}/>

        <TweakSection label="Tema"/>
        <TweakColor label="Aksentfarge" value={t.accent}
          onChange={v => setTweak('accent', v)}/>
        <TweakToggle label="Mørk modus" value={t.darkMode}
          onChange={v => setTweak('darkMode', v)}/>
        <TweakSelect label="Display-serif" value={t.serifDisplay}
          options={['Newsreader', 'Cormorant Garamond', 'Playfair Display', 'DM Serif Display']}
          onChange={v => setTweak('serifDisplay', v)}/>
        <TweakRadio label="Tetthet" value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={v => setTweak('density', v)}/>
      </TweaksPanel>
    </div>
  );
};

window.KidApp = App;
