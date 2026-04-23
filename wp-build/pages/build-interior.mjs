import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sectionsDir = resolve(here, '..', 'sections');
const nav = JSON.parse(readFileSync(resolve(sectionsDir, '00-navbar.json'), 'utf-8'));
const cta = JSON.parse(readFileSync(resolve(sectionsDir, '07-cta.json'), 'utf-8'));

const makeHero = (idPrefix, eyebrow, headline, subhead) => ({
  id: idPrefix + 'hero',
  elType: 'section',
  isInner: false,
  settings: {
    layout: 'boxed',
    content_width: { unit: 'px', size: 1320 },
    padding:        { unit: 'px', top: '200', right: '40', bottom: '120', left: '40', isLinked: false },
    padding_tablet: { unit: 'px', top: '160', right: '32', bottom: '96',  left: '32', isLinked: false },
    padding_mobile: { unit: 'px', top: '120', right: '22', bottom: '72',  left: '22', isLinked: false },
    background_background: 'classic',
    background_color: '#F3EEE5'
  },
  elements: [
    {
      id: idPrefix + 'col', elType: 'column',
      settings: { _column_size: 100, space_between_widgets: { unit: 'px', size: 28 } },
      elements: [
        {
          id: idPrefix + 'eye', elType: 'widget', widgetType: 'heading',
          settings: {
            title: eyebrow, header_size: 'h6',
            typography_typography: 'custom', typography_font_family: 'Inter',
            typography_font_size: { unit: 'px', size: 12 }, typography_font_weight: '500',
            typography_letter_spacing: { unit: 'px', size: 2 }, typography_text_transform: 'uppercase',
            title_color: '#1A1A1C', _animation: 'fadeInUp'
          }
        },
        {
          id: idPrefix + 'h1', elType: 'widget', widgetType: 'heading',
          settings: {
            title: headline, header_size: 'h1',
            typography_typography: 'custom', typography_font_family: 'Fraunces',
            typography_font_size:        { unit: 'rem', size: 5 },
            typography_font_size_tablet: { unit: 'rem', size: 3.25 },
            typography_font_size_mobile: { unit: 'rem', size: 2.25 },
            typography_font_weight: '300', typography_line_height: { unit: 'em', size: 1.05 },
            typography_letter_spacing:        { unit: 'px', size: -2 },
            typography_letter_spacing_mobile: { unit: 'px', size: -0.5 },
            title_color: '#1A1A1C', _animation: 'fadeInUp', _animation_delay: 120,
            _element_custom_width: { unit: '%', size: 75 },
            _element_custom_width_tablet: { unit: '%', size: 100 }
          }
        },
        {
          id: idPrefix + 'sub', elType: 'widget', widgetType: 'text-editor',
          settings: {
            editor: '<p>' + subhead + '</p>',
            typography_typography: 'custom', typography_font_family: 'Inter',
            typography_font_size: { unit: 'rem', size: 1.125 },
            typography_font_size_mobile: { unit: 'rem', size: 1 },
            typography_line_height: { unit: 'em', size: 1.55 },
            text_color: 'rgba(26,26,28,0.75)',
            _element_custom_width: { unit: '%', size: 55 },
            _element_custom_width_tablet: { unit: '%', size: 100 },
            _animation: 'fadeInUp', _animation_delay: 240
          }
        }
      ]
    }
  ]
});

const makeBody = (idPrefix, blocks) => ({
  id: idPrefix + 'body',
  elType: 'section',
  isInner: false,
  settings: {
    layout: 'boxed',
    content_width: { unit: 'px', size: 1320 },
    padding:        { unit: 'px', top: '100', right: '40', bottom: '140', left: '40', isLinked: false },
    padding_tablet: { unit: 'px', top: '72',  right: '32', bottom: '96',  left: '32', isLinked: false },
    padding_mobile: { unit: 'px', top: '48',  right: '22', bottom: '72',  left: '22', isLinked: false },
    background_background: 'classic',
    background_color: '#F3EEE5'
  },
  elements: [
    {
      id: idPrefix + 'bcol', elType: 'column',
      settings: {
        _column_size: 100,
        max_width: { unit: 'px', size: 800 },
        space_between_widgets: { unit: 'px', size: 48 }
      },
      elements: blocks.map((b, i) => ({
        id: idPrefix + 'blk' + i,
        elType: 'widget',
        widgetType: 'text-editor',
        settings: {
          editor: '<div style=\"font-family:Inter;max-width:720px;margin:0 auto\"><div style=\"font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:rgba(26,26,28,0.5);margin-bottom:16px\">' + b.kicker + '</div><h3 style=\"font-family:Fraunces;font-size:1.85rem;font-weight:400;letter-spacing:-0.5px;color:#1A1A1C;margin:0 0 18px;line-height:1.15\">' + b.title + '</h3><p style=\"font-size:1rem;line-height:1.7;color:rgba(26,26,28,0.8);margin:0\">' + b.body + '</p></div>',
          _animation: 'fadeInUp', _animation_delay: 100 + i * 80
        }
      }))
    }
  ]
});

const makeFooter = () => ({
  id: 'secfoot',
  elType: 'section',
  isInner: false,
  settings: {
    layout: 'boxed', content_width: { unit: 'px', size: 1320 },
    padding: { unit: 'px', top: '56', right: '40', bottom: '40', left: '40', isLinked: false },
    padding_mobile: { unit: 'px', top: '40', right: '22', bottom: '28', left: '22', isLinked: false },
    background_background: 'classic', background_color: '#111113'
  },
  elements: [{
    id: 'fcol', elType: 'column', settings: { _column_size: 100 },
    elements: [{
      id: 'fbot', elType: 'widget', widgetType: 'text-editor',
      settings: {
        editor: '<div style=\"display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;font-family:Inter;font-size:12px;color:rgba(243,238,229,0.5);letter-spacing:0.3px\"><a href=\"/\" style=\"font-family:Fraunces;font-size:18px;font-weight:500;letter-spacing:2px;color:#F3EEE5;text-decoration:none\">APICAL</a><span>© 2026 Apical Dental · <a href=\"mailto:info@calldental.ai\" style=\"color:rgba(243,238,229,0.7);text-decoration:none\">info@calldental.ai</a></span></div>'
      }
    }]
  }]
});

const pages = {
  technology: {
    eyebrow: 'TECHNOLOGY',
    headline: 'A supervised robotic platform — not an autonomous one.',
    subhead: 'Apical pairs a haptic-feedback surgical arm with remote specialist oversight. The robot handles precision; the human handles judgement.',
    blocks: [
      { kicker: '01 — PLANNING AI', title: 'From scan to surgical trajectory in five minutes.', body: 'We ingest an intraoral scan and a cone-beam CT, auto-segment the mandible, and generate an optimal implant trajectory with clearance checks against the inferior alveolar nerve. The planning surgeon approves or adjusts; the robot never chooses the path itself.' },
      { kicker: '02 — HAPTIC ARM', title: 'Sub-millimetre placement with active drift correction.', body: 'A six-axis haptic arm tracks the patient in real time via fiducial markers. The arm constrains the drill to the planned trajectory — if the surgeon tries to deviate, the arm applies counter-force. Typical placement deviation: 0.3mm / 1.2°.' },
      { kicker: '03 — REMOTE SUPERVISION', title: 'A specialist is always on the loop.', body: 'Every case is supervised in real time by a board-certified periodontist or oral surgeon on our panel, via ultra-low-latency video. They can pause, reroute, or take over at any moment. Think air-traffic control for implant surgery.' },
      { kicker: '04 — RESTORATION', title: 'Same-day temporary crown, milled chairside.', body: 'As soon as the implant is placed and torque-tested, we mill the temporary crown from a pre-planned STL in your in-clinic mill. Patient walks out with a tooth. Final restoration fitted at week 12.' }
    ]
  },
  proof: {
    eyebrow: 'PROOF',
    headline: 'Results from live DSO deployments.',
    subhead: 'Three representative case studies from our first cohort of DSO partners. Full numbers, with the asterisks.',
    blocks: [
      { kicker: 'CASE STUDY 01 — PACIFIC DENTAL GROUP', title: '112 locations · +$2.4M net new revenue in year one.', body: 'Pacific Dental Group deployed Apical in 12 flagship locations in Q2, then expanded to 38 by year-end. They moved from referring out 42% of implant cases to retaining 89% in-house within a single quarter. Net new implant revenue, year one: $2.41M. Average case margin: 61%.' },
      { kicker: 'CASE STUDY 02 — HEARTLAND', title: '3.2x implant cases per day per chair.', body: 'Across 28 pilot locations, Heartland measured a 3.2x increase in implant cases completed per day per equipped chair — from 1.1 to 3.6. Surgical time dropped from 84 to 47 minutes average. Patient NPS for the procedure climbed from 72 to 91.' },
      { kicker: 'CASE STUDY 03 — GREAT EXPRESSIONS', title: 'From 0 implants to 420/month in six months.', body: 'Great Expressions had never offered in-house implants. With Apical, their general dentists completed 420 implants in month six across 19 locations. Zero nerve injuries. Two minor post-op infections (1.2% rate, vs industry average 2.8%).' }
    ]
  },
  'for-dsos': {
    eyebrow: 'FOR DSOS',
    headline: 'The economics work at ten locations and at a thousand.',
    subhead: 'Apical is sold per-case, not per-chair. Capex is zero. Your specialist cost is zero. Your chairs become specialty chairs overnight.',
    blocks: [
      { kicker: 'THE MODEL', title: 'Per-case pricing, bundled with the specialist.', body: 'You pay a single per-case fee that includes the robotic arm lease, the remote specialist time, the planning AI, the consumables, and the malpractice umbrella. No capex. No specialist hires. No separate licensing.' },
      { kicker: 'THE MATH', title: 'Break-even at one case per week per chair.', body: 'At typical DSO reimbursement and our per-case price, you break even when a chair does one Apical case per week. Most pilot chairs reach three per week within 60 days. Full unit economics available under NDA.' },
      { kicker: 'THE ROLLOUT', title: 'Flagship → cluster → network in three quarters.', body: 'We ship and install one flagship chair per region in week one. Your clinicians shadow-supervise for four weeks. Cluster expansion (5–10 chairs) begins month two. Full network rollout targets month nine. Apical deployment lead embedded on-site throughout.' },
      { kicker: 'THE CONTRACT', title: 'Cancellable annually, no equipment buyback.', body: 'No multi-year lock-ins. You can cancel at each annual renewal with 90 days notice. We take the hardware back — you owe nothing. We stay honest; you stay flexible.' }
    ]
  },
  contact: {
    eyebrow: 'CONTACT',
    headline: 'Let’s put a robot in your chair.',
    subhead: 'Email is fastest. Include your DSO name, number of locations, and how quickly you want to move. We reply within one business day.',
    blocks: [
      { kicker: 'EMAIL', title: '<a href=\"mailto:info@calldental.ai\" style=\"color:#1A1A1C;text-decoration:none;border-bottom:1px solid #1A1A1C;padding-bottom:2px\">info@calldental.ai</a>', body: 'Deepest inbox, fastest routing. For partnership inquiries, clinical questions, press, or anything else.' },
      { kicker: 'BOOK A DEMO', title: '<a href=\"mailto:info@calldental.ai?subject=Apical%20Dental%20demo\" style=\"color:#B85C3C;text-decoration:none;border-bottom:1px solid #B85C3C;padding-bottom:2px\">30-minute call with your clinical director and CFO &rarr;</a>', body: 'We bring the simulator, the case-by-case economics for your network size, and a provisional deployment plan. You bring questions. If a partnership makes sense, we’ll have a pilot agreement ready within a week.' },
      { kicker: 'ADDRESS', title: 'Palo Alto, CA', body: 'Apical Dental, Inc. · 2010 El Camino Real · Palo Alto, CA 94306 · United States' }
    ]
  }
};

for (const [slug, page] of Object.entries(pages)) {
  const prefix = 'p' + slug.replace(/-/g, '') + '_';
  const data = [
    nav,
    makeHero(prefix, page.eyebrow, page.headline, page.subhead),
    makeBody(prefix, page.blocks),
    { ...cta, id: prefix + 'cta' },
    makeFooter()
  ];
  // Remap CTA inner ids to avoid collision
  data[3] = JSON.parse(JSON.stringify(data[3]).replace(/\"col07\"/g, `"${prefix}c07"`).replace(/\"w07a(\d+)\"/g, `"${prefix}w07$1"`));
  writeFileSync(resolve(here, slug + '.json'), JSON.stringify(data));
  console.log(slug, '→', JSON.stringify(data).length, 'bytes');
}
