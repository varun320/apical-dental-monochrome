// Builds the redesigned Technology page (id=20) — editorial schematic layout
// Each visible item is a separate Elementor widget (heading / text-editor / image / button)
// Typography styling lives in a single page-level <style> block via the ap-styles widget
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sectionsDir = resolve(here, '..', 'sections');
const nav = JSON.parse(readFileSync(resolve(sectionsDir, '00-navbar.json'), 'utf-8'));

const P = 'ptech_';
const BONE = '#F3EEE5';
const INK  = '#1A1A1C';

// ── widget helpers ──────────────────────────────────────────────────
const heading = (id, title, klass, opt = {}) => ({
  id: P + id, elType: 'widget', widgetType: 'heading',
  settings: { title, header_size: opt.h || 'h2', _css_classes: klass, ...(opt.set || {}) }
});
const text = (id, html, klass, opt = {}) => ({
  id: P + id, elType: 'widget', widgetType: 'text-editor',
  settings: { editor: html, _css_classes: klass, ...(opt.set || {}) }
});
const image = (id, url, klass) => ({
  id: P + id, elType: 'widget', widgetType: 'image',
  settings: { image: { url }, image_size: 'full', _css_classes: klass }
});
const button = (id, text, url, klass) => ({
  id: P + id, elType: 'widget', widgetType: 'button',
  settings: {
    text, link: { url }, _css_classes: klass,
    selected_icon: { value: 'fas fa-arrow-right', library: 'fa-solid' },
    icon_align: 'right'
  }
});

// ── page-level stylesheet (loaded once at top of page) ───────────────
const PAGE_CSS = `
.ap-page *{box-sizing:border-box}
.ap-eyebrow{font-family:Inter;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${INK};margin:0 0 4px}
.ap-eyebrow .elementor-heading-title{font:inherit;color:inherit;letter-spacing:inherit}
.ap-h1 .elementor-heading-title{font-family:Fraunces;font-size:clamp(2.1rem,1rem + 4.6vw,4.75rem);font-weight:300;line-height:1.04;letter-spacing:-2px;color:${INK};margin:0}
.ap-h2 .elementor-heading-title{font-family:Fraunces;font-size:clamp(1.85rem,1rem + 2.5vw,2.6rem);font-weight:300;line-height:1.12;letter-spacing:-1px;color:${INK};margin:0}
.ap-h2-italic .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(1.95rem,1rem + 2.5vw,2.8rem);font-weight:300;line-height:1.08;letter-spacing:-1.2px;color:${INK};margin:0}
.ap-cta-h .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(2.15rem,1rem + 5vw,4.75rem);font-weight:300;line-height:1.02;letter-spacing:-2px;color:${BONE};margin:0}
.ap-cta-eye .elementor-heading-title{font-family:Inter;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${BONE};margin:0}
.ap-body{font-family:Inter;font-size:1.0625rem;line-height:1.65;color:rgba(26,26,28,0.78)}
.ap-body p{margin:0}
.ap-body-dark{font-family:Inter;font-size:1.0625rem;line-height:1.65;color:rgba(243,238,229,0.78);max-width:560px}
.ap-body-dark p{margin:0}
.ap-anchor-nav{font-family:Inter;font-size:13px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;margin:18px 0 0}
.ap-anchor-nav p{display:flex;gap:32px;flex-wrap:wrap;margin:0}
.ap-anchor-nav a{color:${INK};border-bottom:1px solid rgba(26,26,28,0.3);padding-bottom:4px;text-decoration:none;transition:border-color .2s}
.ap-anchor-nav a:hover{border-bottom-color:${INK}}
.ap-step-num .elementor-heading-title{font-family:Fraunces;font-style:italic;font-size:clamp(4.2rem,2rem + 5vw,6.5rem);font-weight:300;line-height:.9;letter-spacing:-4px;color:#B85C3C;margin:0 0 6px}
.ap-spec-num .elementor-heading-title{font-family:Fraunces;font-size:clamp(2.4rem,1.4rem + 2vw,3.25rem);font-weight:300;line-height:1;letter-spacing:-1.5px;color:${BONE};margin:0}
.ap-spec-label .elementor-heading-title{font-family:Inter;font-size:11px;font-weight:500;letter-spacing:1.8px;text-transform:uppercase;color:rgba(243,238,229,0.55);margin:6px 0 0}
.ap-spec-sub{font-family:Inter;font-size:13px;line-height:1.55;color:rgba(243,238,229,0.7)}
.ap-spec-sub p{margin:8px 0 0}
.ap-step-meta{font-family:Inter;border-top:1px solid rgba(26,26,28,0.15);padding-top:24px;margin-top:6px}
.ap-step-meta p{margin:0;display:flex;gap:32px;flex-wrap:wrap}
.ap-step-meta strong{display:block;font-size:10px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:rgba(26,26,28,0.55);margin-bottom:6px}
.ap-step-meta span{font-size:14px;color:${INK};font-weight:500}
.ap-ds-row{font-family:Inter;border-bottom:1px solid rgba(26,26,28,0.14);padding:30px 0}
.ap-ds-row:first-of-type{border-top:1px solid rgba(26,26,28,0.14)}
.ap-ds-row p{display:grid;grid-template-columns:56px 1fr;column-gap:28px;row-gap:10px;margin:0}
.ap-ds-row .ap-idx{font-family:Fraunces;font-style:italic;font-size:15px;font-weight:300;color:#B85C3C;letter-spacing:.4px;font-variant-numeric:tabular-nums;grid-row:1 / 3;grid-column:1;align-self:start;padding-top:10px;line-height:1}
.ap-ds-row strong{font-family:Inter;font-size:12px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:rgba(26,26,28,0.55);grid-column:2;display:block;align-self:end}
.ap-ds-row .ap-val{font-family:Fraunces;font-size:clamp(1.5rem,1rem + 1.3vw,1.95rem);line-height:1.18;color:${INK};font-weight:300;font-variant-numeric:tabular-nums;letter-spacing:-.4px;grid-column:2;display:block}
.ap-ds-row .ap-val em{font-style:italic;color:rgba(26,26,28,0.45);font-size:.7em;letter-spacing:0;margin-left:8px;font-variant-numeric:normal}
.ap-step-img img,.ap-hero-img img{filter:saturate(.8) contrast(1.08);object-fit:cover;width:100%;height:100%}
.ap-foot{font-family:Inter;font-size:12px;color:rgba(243,238,229,.5);letter-spacing:.3px}
.ap-foot p{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;margin:0}
.ap-foot a{color:rgba(243,238,229,.7);text-decoration:none}
.ap-foot a.brand{font-family:Fraunces;font-size:18px;font-weight:500;letter-spacing:2px;color:${BONE}}
@media(max-width:768px){.ap-step-meta p{gap:18px}.ap-ds-row{padding:22px 0}.ap-ds-row p{grid-template-columns:1fr;row-gap:6px}.ap-ds-row .ap-idx{grid-row:auto;grid-column:1;padding-top:0;margin-bottom:4px}.ap-ds-row strong{grid-column:1}.ap-ds-row .ap-val{grid-column:1;font-size:1.4rem}}
`.trim();

const styles = text('styles', `<style>${PAGE_CSS}</style>`, '');

// ── HERO ─────────────────────────────────────────────────────────────
const hero = {
  id: P+'hero', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320}, gap:'extended',
    padding:        {unit:'px',top:'200',right:'40',bottom:'130',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'160',right:'32',bottom:'96', left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'120',right:'22',bottom:'68', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    structure:'27', css_classes: 'ap-page'
  },
  elements: [
    { id: P+'heroL', elType:'column',
      settings: { _column_size: 58, _inline_size_tablet: 100, content_position:'center',
                  space_between_widgets:{unit:'px',size:24} },
      elements: [
        styles,
        heading('heyebrow', 'TECHNOLOGY · v2.4 PLATFORM', 'ap-eyebrow', { h:'h6' }),
        heading('hh1', 'A supervised robotic platform — not an autonomous one.', 'ap-h1', { h:'h1', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
        text('hsub', '<p>Apical pairs a haptic-feedback surgical arm with remote specialist oversight. The robot handles precision. The human handles judgement. Every implant placement is supervised in real time.</p>', 'ap-body', { set:{ _animation:'fadeInUp', _animation_delay:240 } }),
        text('hnav', '<p><a href="#step01">Planning AI</a><a href="#step02">Haptic arm</a><a href="#step03">Supervision</a><a href="#step04">Restoration</a></p>', 'ap-anchor-nav', { set:{ _animation:'fadeInUp', _animation_delay:360 } })
      ]
    },
    { id: P+'heroR', elType:'column',
      settings: { _column_size: 42, _inline_size_tablet: 100,
                  margin_tablet:{unit:'px',top:'48',right:'0',bottom:'0',left:'0',isLinked:false} },
      elements: [
        { ...image('himg', 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1200&h=1500&q=80&auto=format&fit=crop', 'ap-hero-img'),
          settings: { image: { url:'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1200&h=1500&q=80&auto=format&fit=crop' },
                      image_size:'full', _css_classes:'ap-hero-img',
                      height:{unit:'px',size:640}, height_tablet:{unit:'px',size:460}, height_mobile:{unit:'px',size:360},
                      _animation:'fadeIn', _animation_delay:300 } }
      ]
    }
  ]
};

// ── SPEC STRIP (dark) ────────────────────────────────────────────────
const specCol = (i, big, label, sub) => ({
  id: P+'spc'+i, elType:'column',
  settings: { _column_size: 25, _inline_size_tablet: 50, _inline_size_mobile: 100,
              border_border:'solid', border_width:{unit:'px',top:'0',right:'1',bottom:'0',left:'0',isLinked:false},
              border_color:'rgba(243,238,229,0.12)',
              padding:{unit:'px',top:'8',right:'28',bottom:'8',left:'28',isLinked:false},
              padding_mobile:{unit:'px',top:'18',right:'4',bottom:'18',left:'4',isLinked:false} },
  elements: [
    heading('spcb'+i, big,   'ap-spec-num',   { h:'h2', set:{ _animation:'fadeInUp', _animation_delay: 80*i } }),
    heading('spcl'+i, label, 'ap-spec-label', { h:'h6', set:{ _animation:'fadeInUp', _animation_delay: 80*i+80 } }),
    text   ('spcs'+i, '<p>'+sub+'</p>', 'ap-spec-sub', { set:{ _animation:'fadeInUp', _animation_delay: 80*i+160 } })
  ]
});

const specStrip = {
  id: P+'specs', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320}, gap:'no',
    padding:        {unit:'px',top:'72',right:'40',bottom:'72',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'56',right:'32',bottom:'56',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'40',right:'22',bottom:'40',left:'22',isLinked:false},
    background_background:'classic', background_color: INK,
    structure:'44'
  },
  elements: [
    specCol(1, '0.3mm',  'Placement deviation', 'RMS measured across 240 live placements'),
    specCol(2, '5 min',  'Plan generation',     'Scan → trajectory + clearance map'),
    specCol(3, '47 min', 'Median case time',    'Down from 84 min baseline'),
    specCol(4, '24/7',   'Specialist on loop',  'Global rotation of board-cert oversight')
  ]
};

// ── PROCESS STEPS (alternating image / text) ─────────────────────────
const stepSec = ({i, anchor, kicker, title, body, specs, img, imgRight}) => {
  const textCol = {
    id: P+'st'+i+'t', elType:'column',
    settings: { _column_size: 50, _inline_size_tablet: 100, content_position:'center',
                space_between_widgets:{unit:'px',size:20},
                padding:{unit:'px',top:'0',right: imgRight ? '48' : '0', bottom:'0', left: imgRight ? '0' : '48', isLinked:false},
                padding_tablet:{unit:'px',top:'0',right:'0',bottom:'0',left:'0',isLinked:true} },
    elements: [
      heading('st'+i+'num', '0'+i,   'ap-step-num',   { h:'h2', set:{ _animation:'fadeInUp' } }),
      heading('st'+i+'k',   kicker,  'ap-eyebrow',    { h:'h6', set:{ _animation:'fadeInUp', _animation_delay:100 } }),
      heading('st'+i+'h',   title,   'ap-h2',         { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:180 } }),
      text   ('st'+i+'b',   '<p>'+body+'</p>',  'ap-body', { set:{ _animation:'fadeInUp', _animation_delay:260 } }),
      text   ('st'+i+'m',   '<p>'+specs.map(s=>'<span><strong>'+s.k+'</strong>'+s.v+'</span>').join('')+'</p>',
              'ap-step-meta', { set:{ _animation:'fadeInUp', _animation_delay:340 } })
    ]
  };
  const imgCol = {
    id: P+'st'+i+'i', elType:'column',
    settings: { _column_size: 50, _inline_size_tablet: 100,
                margin_tablet:{unit:'px',top:'32',right:'0',bottom:'0',left:'0',isLinked:false} },
    elements: [
      { id: P+'st'+i+'img', elType:'widget', widgetType:'image',
        settings: { image:{url:img}, image_size:'full', _css_classes:'ap-step-img',
                    height:{unit:'px',size:540}, height_tablet:{unit:'px',size:400}, height_mobile:{unit:'px',size:300},
                    _animation:'fadeIn', _animation_delay:200 } }
    ]
  };
  return {
    id: P+'st'+i, elType:'section', isInner:false,
    settings: {
      layout:'boxed', content_width:{unit:'px',size:1320}, gap:'extended',
      padding:        {unit:'px',top:'110',right:'40',bottom:'110',left:'40',isLinked:false},
      padding_tablet: {unit:'px',top:'80', right:'32',bottom:'80', left:'32',isLinked:false},
      padding_mobile: {unit:'px',top:'56', right:'22',bottom:'56', left:'22',isLinked:false},
      background_background:'classic', background_color: BONE,
      border_border:'solid', border_width:{unit:'px',top:'1',right:'0',bottom:'0',left:'0',isLinked:false},
      border_color:'rgba(26,26,28,0.08)',
      structure:'22', _element_id: anchor
    },
    elements: imgRight ? [textCol, imgCol] : [imgCol, textCol]
  };
};

const step1 = stepSec({
  i:1, anchor:'step01', imgRight:true,
  kicker:'PLANNING AI',
  title:'From scan to surgical trajectory in five minutes.',
  body:'We ingest an intraoral scan and a cone-beam CT, auto-segment the mandible, and generate an optimal implant trajectory with clearance checks against the inferior alveolar nerve. The planning surgeon approves or adjusts — the robot never chooses the path itself.',
  specs:[{k:'Inputs',v:'STL · CBCT (DICOM)'},{k:'Output',v:'Trajectory + clearance map'},{k:'Latency',v:'≈ 4m 30s typical'}],
  img:'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=1400&q=80&auto=format&fit=crop'
});
const step2 = stepSec({
  i:2, anchor:'step02', imgRight:false,
  kicker:'HAPTIC ARM',
  title:'Sub-millimetre placement with active drift correction.',
  body:'A six-axis haptic arm tracks the patient in real time via fiducial markers. The arm constrains the drill to the planned trajectory — if the surgeon tries to deviate, the arm applies counter-force. Typical placement deviation: 0.3 mm / 1.2°.',
  specs:[{k:'Axes',v:'6 DOF haptic'},{k:'Tracking',v:'Optical fiducials, 240 Hz'},{k:'Deviation',v:'0.3 mm / 1.2°'}],
  img:'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1200&h=1400&q=80&auto=format&fit=crop'
});
const step3 = stepSec({
  i:3, anchor:'step03', imgRight:true,
  kicker:'REMOTE SUPERVISION',
  title:'A board-certified specialist is always on the loop.',
  body:'Every case is supervised in real time by a board-certified periodontist or oral surgeon on our panel, via ultra-low-latency video. They can pause, reroute, or take over at any moment. Think air-traffic control for implant surgery.',
  specs:[{k:'Video latency',v:'&lt; 80 ms (p95)'},{k:'Coverage',v:'24 / 7 · global rotation'},{k:'Takeover',v:'Single-button — &lt; 400 ms'}],
  img:'https://images.unsplash.com/photo-1551601651-bc60f254d532?w=1200&h=1400&q=80&auto=format&fit=crop'
});
const step4 = stepSec({
  i:4, anchor:'step04', imgRight:false,
  kicker:'RESTORATION',
  title:'Same-day temporary crown, milled chairside.',
  body:'As soon as the implant is placed and torque-tested, we mill the temporary crown from a pre-planned STL in your in-clinic mill. Patient walks out with a tooth. Final restoration fitted at week 12.',
  specs:[{k:'Mill time',v:'≈ 22 min per crown'},{k:'Material',v:'PMMA → zirconia'},{k:'Final fit',v:'Week 12'}],
  img:'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&h=1400&q=80&auto=format&fit=crop'
});

// ── DATA SHEET ───────────────────────────────────────────────────────
const dsRow = (i,k,v) => text('ds'+i, '<p><span class="ap-idx">0'+i+'</span><strong>'+k+'</strong><span class="ap-val">'+v+'</span></p>', 'ap-ds-row', { set:{ _animation:'fadeInUp', _animation_delay: 60*i } });

const datasheet = {
  id: P+'ds', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1080}, gap:'no',
    padding:        {unit:'px',top:'130',right:'40',bottom:'140',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'90', right:'32',bottom:'100',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'64', right:'22',bottom:'72', left:'22',isLinked:false},
    background_background:'classic', background_color: BONE,
    border_border:'solid', border_width:{unit:'px',top:'1',right:'0',bottom:'0',left:'0',isLinked:false},
    border_color:'rgba(26,26,28,0.1)'
  },
  elements: [{
    id: P+'dscol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:0} },
    elements: [
      heading('dsk', 'ENGINEERING DATA · v2.4 PLATFORM', 'ap-eyebrow',   { h:'h6', set:{ _animation:'fadeInUp', _margin:{unit:'px',top:'0',right:'0',bottom:'22',left:'0',isLinked:false} } }),
      heading('dsh', 'The numbers, with the asterisks.', 'ap-h2-italic', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120, _margin:{unit:'px',top:'0',right:'0',bottom:'72',left:'0',isLinked:false} } }),
      dsRow(1,'Surgical accuracy (RMS)',    '0.32 mm · 1.2°<em>* n = 240 cases, linear &amp; angular</em>'),
      dsRow(2,'Median case time',           '47 minutes<em>* anaesthesia to suture</em>'),
      dsRow(3,'Planning AI latency',        '4 m 30 s<em>* p50 · 6 m 10 s p95</em>'),
      dsRow(4,'Specialist response time',   '&lt; 12 seconds<em>* from pause-button press</em>'),
      dsRow(5,'Sterility class',            'ISO 14644-1 Class 8<em>* sealed sterile shroud</em>'),
      dsRow(6,'Regulatory',                 'FDA 510(k) · EU MDR IIb<em>* Health Canada licensed</em>'),
      dsRow(7,'Power / footprint',          '110 / 220 V · 1.2 kVA<em>* 0.9 m² floor</em>'),
      dsRow(8,'Service uptime',             '99.4 %<em>* 12-mo SLA · pilot fleet</em>')
    ]
  }]
};

// ── CTA (dark) ───────────────────────────────────────────────────────
const ctaSec = {
  id: P+'cta', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'180',right:'40',bottom:'180',left:'40',isLinked:false},
    padding_tablet: {unit:'px',top:'130',right:'32',bottom:'130',left:'32',isLinked:false},
    padding_mobile: {unit:'px',top:'96', right:'22',bottom:'96', left:'22',isLinked:false},
    background_background:'classic', background_color: INK
  },
  elements: [{
    id: P+'ctacol', elType:'column', settings:{ _column_size:100, space_between_widgets:{unit:'px',size:32} },
    elements: [
      heading('ctak', '05 — NEXT', 'ap-cta-eye', { h:'h6', set:{ _animation:'fadeInUp' } }),
      heading('ctah', 'See it run on your scan.', 'ap-cta-h', { h:'h2', set:{ _animation:'fadeInUp', _animation_delay:120 } }),
      text   ('ctab', '<p>Send an anonymised CBCT/STL pair. We plan a case on the live platform and walk you through trajectory, clearance, and surgical sequence on a 30-minute call.</p>', 'ap-body-dark', { set:{ _animation:'fadeInUp', _animation_delay:240 } }),
      { id: P+'ctabtn', elType:'widget', widgetType:'button',
        settings: { text:'Book a demo', link:{ url:'mailto:info@calldental.ai?subject=Apical%20Dental%20demo' },
                    background_color:'#B85C3C', button_text_color:BONE, hover_background_color:BONE, hover_color:INK,
                    border_radius:{unit:'px',top:'0',right:'0',bottom:'0',left:'0',isLinked:true},
                    text_padding:{unit:'px',top:'20',right:'32',bottom:'20',left:'32',isLinked:false},
                    selected_icon:{value:'fas fa-arrow-right',library:'fa-solid'}, icon_align:'right',
                    _animation:'fadeInUp', _animation_delay:360 } }
    ]
  }]
};

// ── FOOTER ───────────────────────────────────────────────────────────
const footer = {
  id: P+'foot', elType:'section', isInner:false,
  settings: {
    layout:'boxed', content_width:{unit:'px',size:1320},
    padding:        {unit:'px',top:'56',right:'40',bottom:'40',left:'40',isLinked:false},
    padding_mobile: {unit:'px',top:'40',right:'22',bottom:'28',left:'22',isLinked:false},
    background_background:'classic', background_color:'#111113'
  },
  elements: [{
    id: P+'fcol', elType:'column', settings:{ _column_size:100 },
    elements: [
      text('fbot', '<p><a class="brand" href="/apicaldental/">APICAL</a><span>© 2026 Apical Dental · <a href="mailto:info@calldental.ai">info@calldental.ai</a></span></p>', 'ap-foot')
    ]
  }]
};

// ── ASSEMBLE ─────────────────────────────────────────────────────────
const data = [nav, hero, specStrip, step1, step2, step3, step4, datasheet, ctaSec, footer];
writeFileSync(resolve(here, 'technology.json'), JSON.stringify(data));
console.log('technology →', JSON.stringify(data).length, 'bytes');
