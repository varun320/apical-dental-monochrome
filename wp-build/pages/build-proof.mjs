// Proof page (id=21) — editorial big-stat layout.
// Each case study: huge headline number + supporting metrics strip + narrative.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sectionsDir = resolve(here, '..', 'sections');
const nav    = JSON.parse(readFileSync(resolve(sectionsDir, '00-navbar.json'), 'utf-8'));
const footer = JSON.parse(readFileSync(resolve(sectionsDir, '08-footer.json'), 'utf-8'));

const P = 'pproof_';
const BONE = '#F3EEE5';
const INK  = '#1A1A1C';
const ACC  = '#B85C3C';

// ── helpers ─────────────────────────────────────────────────────────
const heading = (id, title, klass, opt = {}) => ({
  id: P + id, elType: 'widget', widgetType: 'heading',
  settings: { title, header_size: opt.h || 'h2', _css_classes: klass, ...(opt.set || {}) }
});
const text = (id, html, klass, opt = {}) => ({
  id: P + id, elType: 'widget', widgetType: 'text-editor',
  settings: { editor: html, _css_classes: klass, ...(opt.set || {}) }
});

// SVG icon strings (currentColor-friendly)
const ICONS = {
  network: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v3M9.5 11.5h5M7 17l2.5-4M17 17l-2.5-4"/></svg>',
  bolt:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>',
  growth:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18M5 16l4-5 4 3 6-8"/><path d="M14 6h5v5"/></svg>'
};

// ── page-level CSS ──────────────────────────────────────────────────
const CSS = `
.ap-proof *{box-sizing:border-box}
.ap-proof a{color:inherit}
.ap-eyebrow{font-family:Inter;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${INK};margin:0}
.ap-eyebrow .elementor-heading-title{font:inherit;color:inherit;letter-spacing:inherit;margin:0}
.ap-h1 .elementor-heading-title{font-family:Fraunces;font-size:clamp(2.1rem,1rem + 4.6vw,4.75rem);font-weight:300;line-height:1.04;letter-spacing:-2px;color:${INK};margin:0}
.ap-h2-italic .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(2.1rem,1rem + 3vw,3.4rem);font-weight:300;line-height:1.05;letter-spacing:-1.4px;color:${INK};margin:0}
.ap-body{font-family:Inter;font-size:1.1875rem;line-height:1.7;color:rgba(26,26,28,0.88);max-width:62ch}
.ap-body p{margin:0}
.ap-body-dark{font-family:Inter;font-size:1.1875rem;line-height:1.7;color:rgba(243,238,229,0.88);max-width:62ch}
.ap-body-dark p{margin:0}

/* huge headline stat */
.ap-stat{font-family:Fraunces;font-weight:300;font-variant-numeric:tabular-nums;color:${INK};line-height:.92;letter-spacing:-5px;margin:0 0 12px}
.ap-stat .elementor-heading-title{font:inherit;color:inherit;letter-spacing:inherit;margin:0;font-size:clamp(4.5rem,3rem + 8vw,11rem)}
.ap-stat .elementor-heading-title em{font-style:italic;color:${ACC};font-size:.55em;letter-spacing:-1px;margin-left:8px;vertical-align:.18em}
.ap-stat-cap{font-family:Inter;font-size:15px;color:rgba(26,26,28,0.68);letter-spacing:.3px;line-height:1.55;margin:0 0 56px}
.ap-stat-cap p{margin:0}

/* case-row chrome */
.ap-case-head{display:flex;align-items:center;gap:18px;font-family:Inter;font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55);margin:0 0 28px}
.ap-case-head p{margin:0;display:flex;align-items:center;gap:18px}
.ap-case-head svg{width:22px;height:22px;color:${ACC};flex-shrink:0}
.ap-case-head .num{font-family:Fraunces;font-style:italic;font-size:15px;font-weight:300;color:${ACC};letter-spacing:.5px}
.ap-case-head .sep{width:32px;height:1px;background:rgba(26,26,28,0.25)}

/* supporting metric strip */
.ap-metrics{font-family:Inter;border-top:1px solid rgba(26,26,28,0.14);border-bottom:1px solid rgba(26,26,28,0.14);padding:22px 0;margin:32px 0 28px}
.ap-metrics p{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin:0}
.ap-metrics span{display:block}
.ap-metrics strong{display:block;font-size:11px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:rgba(26,26,28,0.55);margin-bottom:6px}
.ap-metrics em{font-style:normal;font-family:Fraunces;font-size:1.4rem;font-weight:300;color:${INK};font-variant-numeric:tabular-nums;letter-spacing:-.4px;display:block}

/* anchor nav under hero */
.ap-anchor-nav{font-family:Inter;font-size:13px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;margin:28px 0 0}
.ap-anchor-nav p{display:flex;gap:32px;flex-wrap:wrap;margin:0}
.ap-anchor-nav a{color:${INK};border-bottom:1px solid rgba(26,26,28,0.3);padding-bottom:4px;text-decoration:none;transition:border-color .2s}
.ap-anchor-nav a:hover{border-bottom-color:${INK}}

/* authority section — people behind the work */
.ap-auth-eye{font-family:Inter;font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55);margin:0 0 18px}
.ap-auth-eye p{margin:0}
.ap-auth-h .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(2rem,1rem + 3vw,3.4rem);font-weight:300;line-height:1.06;letter-spacing:-1.4px;color:${INK};margin:0}
.ap-auth-card{font-family:Inter;padding:36px 0 0;border-top:1px solid rgba(26,26,28,0.18);display:grid;grid-template-columns:180px 1fr;gap:8px 48px;align-items:start}
.ap-auth-card .role{grid-column:1;grid-row:1;font-size:11px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55);margin:0 0 10px}
.ap-auth-card .name{grid-column:2;grid-row:1;font-family:Fraunces;font-size:1.7rem;font-weight:300;line-height:1.15;letter-spacing:-.5px;color:${INK};margin:0 0 6px}
.ap-auth-card .name em{font-style:italic;color:${ACC};font-size:.7em;letter-spacing:.4px;margin-left:8px}
.ap-auth-card .since{grid-column:1;grid-row:2;font-family:Fraunces;font-style:italic;font-size:14px;color:${ACC};letter-spacing:.3px;display:block;margin-bottom:18px}
.ap-auth-card .bio{grid-column:2;grid-row:2;font-size:1.05rem;line-height:1.7;color:rgba(26,26,28,0.85);margin:0}
.ap-auth-card .creds{grid-column:2;grid-row:3;display:grid;grid-template-columns:repeat(2,1fr);gap:14px 32px;margin:22px 0 0;padding-top:18px;border-top:1px solid rgba(26,26,28,0.1)}
.ap-auth-card .creds span{display:block}
.ap-auth-card .creds strong{display:block;font-size:10px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:rgba(26,26,28,0.5);margin-bottom:4px}
.ap-auth-card .creds em{font-style:normal;font-family:Fraunces;font-size:1.05rem;font-weight:300;color:${INK};letter-spacing:-.2px;display:block;line-height:1.35}

/* FAQ — accordion-less detail/summary */
.ap-faq{font-family:Inter;border-top:1px solid rgba(26,26,28,0.14)}
.ap-faq details{border-bottom:1px solid rgba(26,26,28,0.14);padding:0}
.ap-faq summary{list-style:none;cursor:pointer;padding:28px 56px 28px 0;font-family:Fraunces;font-size:clamp(1.2rem,1rem + .55vw,1.5rem);font-weight:300;line-height:1.32;letter-spacing:-.3px;color:${INK};position:relative;transition:color .2s}
.ap-faq summary::-webkit-details-marker{display:none}
.ap-faq summary::after{content:'+';position:absolute;right:6px;top:50%;transform:translateY(-50%);font-family:Inter;font-size:24px;font-weight:300;color:${ACC};transition:transform .25s,content .2s}
.ap-faq details[open] summary{color:${ACC}}
.ap-faq details[open] summary::after{content:'–'}
.ap-faq .ans{padding:0 0 32px;font-size:1.0625rem;line-height:1.7;color:rgba(26,26,28,0.82);max-width:62ch}
.ap-faq .ans p{margin:0 0 14px}
.ap-faq .ans p:last-child{margin:0}
.ap-faq .ans em{font-family:Fraunces;font-style:italic;color:${ACC};font-size:.92em;letter-spacing:.2px}

@media(max-width:768px){.ap-auth-card{grid-template-columns:1fr;gap:8px}.ap-auth-card .role,.ap-auth-card .name,.ap-auth-card .since,.ap-auth-card .bio,.ap-auth-card .creds{grid-column:1;grid-row:auto}.ap-auth-card .creds{grid-template-columns:1fr;gap:14px}}

/* CTA + footer reused style */
.ap-cta-h .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(2.15rem,1rem + 5vw,4.75rem);font-weight:300;line-height:1.02;letter-spacing:-2px;color:${BONE};margin:0}
.ap-cta-eye .elementor-heading-title{font-family:Inter;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${BONE};margin:0}
.ap-foot{font-family:Inter;font-size:12px;color:rgba(243,238,229,.5);letter-spacing:.3px}
.ap-foot p{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;margin:0}
.ap-foot a{color:rgba(243,238,229,.7);text-decoration:none}
.ap-foot a.brand{font-family:Fraunces;font-size:18px;font-weight:500;letter-spacing:2px;color:${BONE};text-decoration:none}

@media(max-width:768px){.ap-stat .elementor-heading-title{letter-spacing:-3px}.ap-metrics p{grid-template-columns:1fr;gap:18px}}
`.trim();

const styles = text('stylesV2', `<style>${CSS}</style>`, '');

// ── HERO ────────────────────────────────────────────────────────────
const hero = {
  id: P+'hero', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'200',right:'40',bottom:'110',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'160',right:'32',bottom:'80', left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'120',right:'22',bottom:'60', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    css_classes: 'ap-proof'
  },
  elements: [{
    id: P+'hcol', elType:'column',
    settings: { _column_size:100, space_between_widgets:{unit:'px',size:24} },
    elements: [
      styles,
      heading('heyebrow', 'METHODOLOGY · HOW WE EARN A YES', 'ap-eyebrow', { h:'h6' }),
      heading('hh1', 'We prescribe before we ship. Then we supervise after.', 'ap-h1', { h:'h1', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('hsub', '<p>Three principles that decide whether a humanoid robot belongs in your practice — and the framework that keeps the recommendation honest before there is a single live case to point at.</p>', 'ap-body', { set:{ _animation:'fadeInUp', _animation_delay:240, _element_custom_width:{unit:'%',size:62} } }),
      text('hnav', '<p><a href="#case01">Independence</a><a href="#case02">The lab</a><a href="#case03">The pilot</a></p>', 'ap-anchor-nav', { set:{ _animation:'fadeInUp', _animation_delay:360 } })
    ]
  }]
};

// ── CASE STUDY SECTION ──────────────────────────────────────────────
const caseSection = ({i, anchor, icon, brand, locations, stat, statSuffix, statCap, h2, metrics, body, last}) => ({
  id: P+'case'+i, elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'110',right:'40',bottom: last ? '160' : '110', left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'80', right:'32',bottom: last ? '110' : '80',  left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'56', right:'22',bottom: last ? '76'  : '56',  left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    border_border:'solid', border_width:{unit:'px',top:'1',right:'0',bottom:'0',left:'0',isLinked:false},
    border_color:'rgba(26,26,28,0.12)',
    _element_id: anchor, css_classes:'ap-proof'
  },
  elements: [{
    id: P+'case'+i+'col', elType:'column',
    settings: { _column_size:100, space_between_widgets:{unit:'px',size:0}, max_width:{unit:'px',size:980} },
    elements: [
      // header strip (icon + numbered + brand + locations)
      text('case'+i+'head', `<p>${ICONS[icon]}<span>${brand}</span><span class="sep"></span><span>${locations}</span></p>`, 'ap-case-head', { set:{ _animation:'fadeInUp' } }),
      // headline stat
      heading('case'+i+'stat', stat + (statSuffix ? `<em>${statSuffix}</em>` : ''), 'ap-stat', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:100 } }),
      // stat caption (small italic line)
      text('case'+i+'cap', `<p>${statCap}</p>`, 'ap-stat-cap', { set:{ _animation:'fadeInUp', _animation_delay:180 } }),
      // italic h2 narrative anchor
      heading('case'+i+'h2', h2, 'ap-h2-italic', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:260 } }),
      // metrics strip (3 columns)
      text('case'+i+'met', `<p>${metrics.map(m=>`<span><strong>${m.k}</strong><em>${m.v}</em></span>`).join('')}</p>`, 'ap-metrics', { set:{ _animation:'fadeInUp', _animation_delay:340 } }),
      // body paragraph
      text('case'+i+'b', `<p>${body}</p>`, 'ap-body', { set:{ _animation:'fadeInUp', _animation_delay:420 } })
    ]
  }]
});

const case1 = caseSection({
  i:1, anchor:'case01', icon:'network',
  brand:'Independence', locations:'The prescription, kept honest',
  stat:'$0', statSuffix:'', statCap:'Compensation accepted from any robotic manufacturer or distributor',
  h2:'The right robot for a practice isn’t always the most capable one. Independence is what keeps the call honest.',
  metrics:[
    { k:'Platforms tracked', v:'Global market' },
    { k:'Compensation accepted', v:'None' },
    { k:'Filter', v:'Fit, not capability' }
  ],
  body:'A general-practice chair does not need a research-lab humanoid. A specialty surgery suite does not need a consumer-grade arm. Apical evaluates the global humanoid-robotics market every quarter and prescribes the platform that fits the practice — not the platform with the loudest demo reel. Manufacturers do not pay us to recommend them. Practices pay us to recommend the right one.'
});

const case2 = caseSection({
  i:2, anchor:'case02', icon:'bolt',
  brand:'The lab', locations:'Four decades on the bench',
  stat:'1981', statSuffix:'', statCap:'First implant placed by the lab Apical is built around',
  h2:'Every recommendation is benchmarked against the lab Dr. Lewis has run since 1981.',
  metrics:[
    { k:'Operator', v:'Practising dentist' },
    { k:'Lab systems', v:'Multi-site replication-ready' },
    { k:'Training data', v:'In-house, not licensed' }
  ],
  body:'Apical’s prescription model is built around the lab Dr. Ted Lewis has run since 1981 — the same lab systems replicated across the multi-office DSO he trains. Before any humanoid platform is recommended to a partner practice, it is exercised in that lab against a known clinical baseline. The bench is the benchmark, not the marketing copy.'
});

const case3 = caseSection({
  i:3, anchor:'case03', icon:'growth', last:true,
  brand:'The pilot', locations:'Single chair, board-cert supervision',
  stat:'1:1', statSuffix:'', statCap:'Robot to supervising specialist · always · no autonomous mode',
  h2:'Every chair gets a board-certified specialist on the loop. There is no unsupervised mode, and never will be.',
  metrics:[
    { k:'Robot autonomy', v:'None' },
    { k:'Supervisor', v:'Board-cert · live' },
    { k:'Takeover', v:'Single-button' }
  ],
  body:'The pilot pattern is the same in every practice. Apical goes into a single chair. A board-certified periodontist or oral surgeon supervises every case in real time. The practice’s own clinicians shadow until they’re cleared by the supervisor — at the supervisor’s pace, not the platform’s. Apical never operates without licensed oversight. That is the product. That is the prescription.'
});

// ── AUTHORITY · the people behind the prescription ─────────────────
const authoritySec = {
  id: P+'auth', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1080},
    padding:        {unit:'px',top:'130',right:'40',bottom:'140',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'90', right:'32',bottom:'100',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'64', right:'22',bottom:'72', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    border_border:'solid', border_width:{unit:'px',top:'1',right:'0',bottom:'0',left:'0',isLinked:false},
    border_color:'rgba(26,26,28,0.12)',
    _element_id:'authority', css_classes:'ap-proof'
  },
  elements:[{
    id: P+'authcol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:0} },
    elements:[
      text('authk', '<p>WHO PRESCRIBES</p>', 'ap-auth-eye', { set:{ _animation:'fadeInUp' } }),
      heading('authh', 'The prescription is signed by a clinician, not a salesperson.', 'ap-auth-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120, _margin:{unit:'px',top:'0',right:'0',bottom:'56',left:'0',isLinked:false} } }),
      text('authc1', '<p class="role">FOUNDING CLINICIAN</p><h3 class="name">Dr. Ted Lewis<em>DDS · 44 years on the chair</em></h3><span class="since">First implant placed · 1981</span><p class="bio">Dr. Lewis has run the lab Apical is built around since 1981 — the same bench that has trained the multi-office DSO he leads today. Every humanoid platform Apical recommends is exercised in that lab against a known clinical baseline before any partner practice sees a demo. He signs every prescription personally and is on the loop for every flagship case.</p><p class="creds"><span><strong>Years on the chair</strong><em>44 · 1981 → present</em></span><span><strong>Lab systems</strong><em>Multi-office DSO replication</em></span><span><strong>Supervises</strong><em>Every flagship case · live</em></span><span><strong>Manufacturer comp</strong><em>None accepted · ever</em></span></p>', 'ap-auth-card', { set:{ _animation:'fadeInUp', _animation_delay:200, _margin:{unit:'px',top:'0',right:'0',bottom:'48',left:'0',isLinked:false} } }),
      text('authc2', '<p class="role">SPECIALIST PANEL</p><h3 class="name">Board-certified periodontists &amp; oral surgeons<em>on every loop</em></h3><span class="since">No autonomous mode · no exceptions</span><p class="bio">A licensed specialist supervises every chair Apical deploys. Panel composition, coverage hours, and escalation paths are scoped to your case windows and documented in the partnership contract — not promised generically. The robot is the instrument. The specialist is the operator. The practice owns the patient relationship.</p><p class="creds"><span><strong>Autonomy</strong><em>None · single-button takeover</em></span><span><strong>Supervision</strong><em>Live · board-certified</em></span><span><strong>Clearance</strong><em>At the supervisor\'s pace</em></span><span><strong>Liability</strong><em>Platform on us · clinical on practice</em></span></p>', 'ap-auth-card', { set:{ _animation:'fadeInUp', _animation_delay:300 } })
    ]
  }]
};

// ── FAQ · honest answers to the five hardest questions ─────────────
const faqRow = (i, q, ansHtml) => text('faq'+i,
  `<details${i===1?' open':''}><summary>${q}</summary><div class="ans">${ansHtml}</div></details>`,
  '', { set:{ _animation:'fadeInUp', _animation_delay: 60*i } });

const faqSec = {
  id: P+'faq', elType:'section', isInner:false,
  settings:{
    layout:'boxed', content_width:{unit:'px',size:1080},
    padding:        {unit:'px',top:'130',right:'40',bottom:'140',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'90', right:'32',bottom:'100',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'64', right:'22',bottom:'72', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    border_border:'solid', border_width:{unit:'px',top:'1',right:'0',bottom:'0',left:'0',isLinked:false},
    border_color:'rgba(26,26,28,0.12)',
    _element_id:'faq', css_classes:'ap-proof'
  },
  elements:[{
    id: P+'faqcol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:0} },
    elements:[
      text('faqk', '<p>WHAT WE GET ASKED</p>', 'ap-auth-eye', { set:{ _animation:'fadeInUp' } }),
      heading('faqh', 'The questions every operator asks before they sign.', 'ap-auth-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120, _margin:{unit:'px',top:'0',right:'0',bottom:'48',left:'0',isLinked:false} } }),
      {
        id: P+'faqwrap', elType:'widget', widgetType:'text-editor',
        settings: { _css_classes:'ap-faq', editor: [
          `<details open><summary>Where are the case studies with real names and real numbers?</summary><div class="ans"><p>We don't publish fabricated case studies, and we won't show you a fake testimonial with a stock photo. <em>The flagship is being scoped now.</em> What we can show you on a call: the lab baseline Dr. Lewis runs against, the platforms currently under evaluation, the supervisor panel composition, and the exact per-case economic model we'd build for your geography.</p></div></details>`,
          `<details><summary>Why a per-case fee instead of selling us the hardware?</summary><div class="ans"><p>Capex on robotic platforms transfers obsolescence risk to the practice. Per-case alignment keeps Apical on the hook for uptime, calibration, and platform refresh — and it keeps our incentive aligned with cases that actually run cleanly, not cases that get billed for showing up.</p></div></details>`,
          `<details><summary>What happens if the platform we recommend gets eclipsed by a better one mid-contract?</summary><div class="ans"><p>That's why the contract renews annually. If a materially better platform clears our lab evaluation during your term, we re-prescribe at renewal at no transition cost to you. Hardware comes back to us. The supervisor panel stays with you.</p></div></details>`,
          `<details><summary>Will the robot ever operate without a licensed clinician on the loop?</summary><div class="ans"><p>No. There is no autonomous mode and there will not be one. Every case is supervised live by a board-certified periodontist or oral surgeon. Single-button takeover is always armed. The day we change that is the day we stop calling ourselves Apical.</p></div></details>`,
          `<details><summary>Who owns the clinical liability when something goes wrong?</summary><div class="ans"><p>Platform liability — hardware fault, software fault, calibration drift — sits with Apical. Clinical judgement liability sits with the supervising specialist and the practice, the same way it does with any operator-assisted instrument. The contract spells out exactly which failure mode lives where. We don't ship until both sides have signed off on that table.</p></div></details>`
        ].join('') }
      }
    ]
  }]
};

// ── CTA (dark) ─────────────────────────────────────────────────────
const ctaSec = {
  id: P+'cta', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'180',right:'40',bottom:'180',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'130',right:'32',bottom:'130',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'96', right:'22',bottom:'96', left:'22',isLinked:false},
    background_background:'classic', background_color: INK, css_classes:'ap-proof'
  },
  elements: [{
    id: P+'ctacol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:32} },
    elements: [
      heading('ctak', 'NEXT', 'ap-cta-eye', { h:'h6', set:{ _animation:'fadeInUp' } }),
      heading('ctah', 'Run the math on your network.', 'ap-cta-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text('ctab', '<p>We build a case-by-case revenue model for your geography, payer mix, and chair count. Thirty minutes with your clinical director and CFO.</p>', 'ap-body-dark', { set:{ _animation:'fadeInUp', _animation_delay:240 } }),
      { id: P+'ctabtn', elType:'widget', widgetType:'button',
        settings:{ text:'Book a demo', link:{url:'mailto:info@apicaldental.ai?subject=Apical%20Dental%20demo'},
                   background_color:ACC, button_text_color:BONE, hover_background_color:BONE, hover_color:INK,
                   border_radius:{unit:'px',top:'0',right:'0',bottom:'0',left:'0',isLinked:true},
                   text_padding:{unit:'px',top:'20',right:'32',bottom:'20',left:'32',isLinked:false},
                   selected_icon:{value:'fas fa-arrow-right',library:'fa-solid'}, icon_align:'right',
                   _animation:'fadeInUp', _animation_delay:360 } }
    ]
  }]
};

// ── FOOTER ──────────────────────────────────────────────────────────
// footer imported from sections/08-footer.json (shared cross-page primitive)

// also update hero anchor nav to surface new sections
hero.elements[0].elements[4].settings.editor =
  '<p><a href="#case01">Independence</a><a href="#case02">The lab</a><a href="#case03">The pilot</a><a href="#authority">Who signs</a><a href="#faq">FAQ</a></p>';

// ── ASSEMBLE ────────────────────────────────────────────────────────
const data = [nav, hero, case1, case2, case3, authoritySec, faqSec, ctaSec, footer];
writeFileSync(resolve(here, 'proof.json'), JSON.stringify(data));
console.log('proof →', JSON.stringify(data).length, 'bytes');
