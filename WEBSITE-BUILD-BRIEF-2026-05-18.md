# Website Build Brief — Ted Lewis / OptiDental Solutions

_Compiled 2026-05-18 from 12 consultations (2026-01-30 → 2026-05-15) plus per-meeting v2 LLM extractions in `Joshua_brain/` and `Jason_brain/` and verbatim transcripts._

**Audience for this document:** Mohammad / engineering team about to build pages and copy. Quote-cited; no synthesis without an evidence tag.

**Status header (1-line):** Website draft has been **approved in direction** by Ted on 2026-05-01 with a short list of named edits. Offer + lead magnet + pricing are **still vapor** as of 2026-05-15. GHL automation layer is blocked on Ted finishing his GHL onboarding (currently "two-thirds through"). The clone/avatar layer is blocked on Ted's self-recording psychological barrier; an Arizona studio shoot with Julia is the standing unblock.

## TL;DR for engineers about to start tomorrow

If you read nothing else, read this:

1. **Don't redesign.** Ted approved the layout direction on 2026-05-01. Your job is the copy-edit pass (§6) + adding the blog page + scaffolding the calculator + filling the dual-domain Apical Robotics routing.
2. **Tesla / Optimus / Fourier / Unitree — NEVER NAME THEM IN COPY.** Use "robotic manufacturer" or "robotics company". This is a legal landmine (§7 #4). Even alt-text and footer microcopy.
3. **"prosthodontics" not "prosthetics" — and never "prosthodontist".** Replace globally (§6 #1).
4. **No specific production-time / unit-economics numbers anywhere.** Qualitative language only until pilot data exists (§6 #3).
5. **Lead magnet = interactive savings calculator, NOT a PDF.** Inputs: lab spend, cleaning spend, inventory spend, patient comms spend. Output: annual $ savings (§5).
6. **Blog page → Authority Booster auto-publish → repurpose to LinkedIn.** Add to site this week (§5).
7. **Pricing pages are blocked.** Don't build a sales page for the paid deep-dive or subscription until Ted commits prices (Open Q in §8).
8. **Clone video block stays placeholder** until the Arizona / Julia studio shoot lands or Ted records on iPhone (Risk 1 in §7).
9. **Real headshot of Ted is still pending** — placeholder in the Authority section.
10. **Two domains, one stack:** OptiDental for dental-practice-owner audience, Apical Robotics for robotics-industry audience. Cloudflare routes both to same WordPress + Elementor install.
11. **Preview link delivery format = Loom walkthrough (captioned)**, not live screen-share. Ted is hard-of-hearing and reads lips (Risk 8).
12. **Independence framing is positioning gold.** No affiliate links, no sponsored copy, no manufacturer badges. Ted refuses comp from manufacturers and that's the prescriber thesis (§4d, §6 #7).

---

## 1. Business Context

OptiDental Solutions is **not Ted's dental practice**. It is a humanoid-robot-for-dentistry venture in which Ted positions himself as the **independent expert** who researches, evaluates, and "prescribes" humanoid robots (Tesla Optimus, Fourier, Unitree, Chinese models) to **other established dental practice owners** — recommending the best robot for their lab and selling ongoing subscription/support.

Ted's day job is a 40+ year reconstructive dental surgery practice ("largest single-doctor Medicaid provider in his state," trains all DSO doctors). The website serves the **side venture**, not the practice. Quote setting the business shape: `[2026-05-01 09:45]` `Ted Lewis: "I would plan to either lease it to them and then have them on a subscription. So I could monitor it because every office is gonna be different... that's a monthly income stream."` Plus the trademarked tagline he repeats: `[2026-05-01 12:32]` `Ted Lewis: "the trademark bought our ex prescribing the perfect robot."` ("Rx — prescribing the perfect bot" is the verbal mark Ted uses.)

Ted is also actively pursuing humanoid-robot partnerships across **three+ manufacturers simultaneously** — Tesla, Fourier, Unitree (G1, GR2 specifically), plus ~30 Chinese vendors. `[2026-05-01 10:49]` `Ted Lewis: "Well, I'm gonna I'm immediately. There's the Fourier and the unit tree and Two other ones. I'm gonna work on all of them."` `[2026-05-01 16:08]` Ted: `"in Fourier right now. I'm in the in the process of getting three of them, a unit 3g1, a free agr2,"` `[2026-05-01 25:21]` Ted: `"whether it's like unitary or there's about 30 of them in China. And right now, they've got the price Win."` Why this matters for the website: Ted cannot publicly affiliate with any one of them yet (Risk 4) AND the offer is platform-agnostic prescribing, not a single-vendor reseller pitch — copy must reflect that breadth without naming any specific manufacturer.

- **Ted's tagline-direction for the umbrella brand:** "Human expertise, robotic precision" `[2026-03-27 11:21]` `Joshua Cazoe: "this is apical, robotics April dental, but it said Human expertise robotic precision. So you're covering the bases. I'm impressed."`
- **Trademark family (filed/pending):** Apical Robotics, Apical Dental, OptiDental, OptiHospital, OptiHomeCare, OptiCareNursing, "RX — prescribing the perfect bot" `[2026-03-16 46:31]` `Ted Lewis: "if you think we need to add more of those like opti, Home care, optional care, whatever, so forth as trademarks before someone jumps in there and tries to scoop it up"`.
- **Dual-brand routing decision:** `[2026-04-10 33:42]` `Ted Lewis: "if you're talking to the robot people, it's, it's apical robotics, if you're talking to the To your clients dentists that you're gonna do this. It's probably gonna be optical dental or apical dental. Which will make sense to them and you can have you can have a double landing page and website and it will divert into the right spots"`. Joshua concurred. Apical Robotics = robotics-industry audience; OptiDental/Apical Dental = dental-practice-owner audience.
- **Decision-maker dynamic (asymmetric):** Ted is the named client + brand + sole decision-maker. His **wife** Melissa Saad (a licensed clinician / hygienist) is the operational executor (notes in OneNote, summarizes for hearing-impaired Ted, runs LinkedIn posts, will be the "licensed-oversight" layer on the future offer). Melissa explicitly does not have a defined task list yet: `[2026-05-08 48:57]` `Melissa Saad: "you said that Daddy's help with these tasks. I just made like some notes for myself... I just needed to find like what those tasks are and make a workflow for myself. You know, I try and help where I can but I'm not. No, I don't have a clear direction of where Like where I need to fit in and help."`
  - **Caveat on Melissa's identity:** 2026-04-10 / 2026-04-17 extractions consistently call Melissa "Ted's daughter"; later meetings (2026-05-15 Jason_brain TL;DR) call her his "wife." Both vaults are inconsistent. Joshua/Jake should confirm next call. For build purposes she is the operational executor + licensed clinical mirror, regardless of relationship label.
- **Target audience for OptiDental site (NOT Ted himself):** established dental practice owners considering lab automation. Ted explicitly states he is anti-signal as a design mirror: `[2026-05-15 20:11]` `Ted Lewis: "If I look at something, I think it's really cool and neat. That's exactly the reason not to use that. There are no clients out there, wander around that think like I do. So if I if I think it's really cool it's like You'll have no responses to this. So I use my staff as mirrors and I say pitch this pitch, same idea, but pitch it to them in 12 different ways"`. Build copy / lead magnet against the dental practice owner persona, not against Ted's aesthetic preferences.
- **DSO leverage / TAM signal:** `[2026-05-01 20:19]` `Ted Lewis: "their laboratory systems, or virtually identical to what I have in there so I can build it. I know what's gonna work in there immediately."` — robots trained in Ted's lab are immediately deployable across his DSO. Use this as a credibility anchor on a Case Studies / Why Us section once Tesla disclosure clears.
- **Independence framing (load-bearing for authority):** `[2026-05-15 10:53]` `Ted Lewis: "I'm not taking any compensation for many of them. I'm gonna research them all"` — Ted is positioning himself as the unbiased prescriber. **No affiliate/sponsorship/manufacturer-paid framing on the site** — collapses the authority thesis (see Risk 7).
- **Ted is hearing-impaired and reads lips when audio fails** `[2026-03-20 23:51]` `Ted Lewis: "I can read lives pretty well because I don't hear that. Well, So, you learn to learn."` This affects how we deliver the build to him (Loom walkthroughs > live screen-share) but not site copy directly.
- **Ted's email volume jumped 4x in April:** `[2026-05-01 27:57]` `Ted Lewis: "my emails gone from usually, 250 to over a thousand a day now. You go, how did they? Find out. I don't"` — visibility is outpacing back-end systems. Argues for getting the lead magnet + nurture sequence live FAST.

### 1a. Audience persona for the OptiDental landing page (built from quotes, not assumption)

**Primary persona — "Practice owner Pete":**
- Established dental practice owner with an on-site or contracted lab.
- 5–25 years in practice, owns vs employed at corporate.
- Already aware of lab automation discussions; has heard about humanoid robots but doesn't know which is the right fit for HIS practice.
- Skeptical of vendor pitches that name a specific manufacturer (he'll assume affiliation = bias).
- Cost-sensitive: looking at overhead %, willing to invest if math pencils out. Per `[2026-05-15 17:36]` Ted's framing: practices run 30% overhead without lab, 50–55% with lab — savings argument is the entry point.
- Time-poor — interactive calculator > whitepaper.
- Trusts other practicing dentists more than business people.

**Secondary persona — "DSO acquisition lead":**
- Buyer at a multi-office DSO evaluating systematic automation deployment.
- Sees Ted's DSO scale as proof of repeatable deployment.
- Larger contract size, longer sales cycle.
- Per `[2026-05-01 23:46]` Joshua: `"changes here like if they're DSO. Right. It adjusts to Who your ideally targeting?"` — ESSO segmentation logic adjusts the funnel for DSO segment.

**Tertiary (Apical Robotics page) — "Robotics partnership BD lead":**
- Person inside Tesla / Fourier / Unitree / Chinese manufacturer who's evaluating dental as a vertical.
- Different page, different framing — "the dental specialist your humanoid platform needs to validate against."
- Per `[2026-04-10 33:42]` Ted: dual-landing-page strategy.

### 1b. Ted's positioning vs. his clinical practice (DO NOT mix the two)

Ted is two businesses:

1. **Reconstructive dental surgery practice** (his main job — runs in his own surgery center, ~10–12 operations/day, 120 patients, training all new DSO doctors). His income source. NOT what the website is about.
2. **OptiDental Solutions / Apical Robotics** (the side venture — humanoid robot prescription + automation consulting for other practices). The website is about THIS.

Per `[2026-03-27 16:30]` Ted: `"about February 20th Through the end of April. I am hammered in other words, running as hard as I can. From daylight to dark in my business."` His practice is his main thing; the website is his future-pivot infrastructure.

**Implication for copy:** Don't describe his surgery practice. Describe his accumulated knowledge + lab systems + DSO scale as the credibility foundation for the prescription/automation business he's building.

---

## 2. Accepted UI/UX — what is LOCKED, do NOT re-litigate

**Approval moment:** 2026-05-01 weekly call. Joshua screen-shared the OptiDental website draft section by section. Ted approved overall design + direction. Approval was **conditional on the named edits in §6** but the **overall design is locked**.

**Approval quotes — verbatim, in call order:**

- `[2026-05-01 02:38]` `Ted Lewis: "Hey, that looks great."` (color scheme / hero, after Joshua walks through opening)
- `[2026-05-01 06:11]` `Ted Lewis: "This looks great. This really looks really great. Good work."` (right after Joshua walks through the "what the robot handles" section: prosthetic fabrication / AI diagnostics / sterilization / inventory & supply / patient communication)
- `[2026-05-01 20:35]` `Ted Lewis: "This looks good. Yeah, looks really good."` (after the "fewer remakes / faster production" section — Ted said "looks good" but Joshua then flagged the unvalidated numbers concern, see edit #3 in §6)
- `[2026-05-01 21:17]` `Ted Lewis: "Yep. Looks good."` (HIPAA / data security section)
- `[2026-05-01 21:33]` `Ted Lewis: "Yeah, that looks good. Yeah."` (Required-standards-as-dentist section)
- `[2026-05-01 22:22]` `Ted Lewis: "It's not your first rodeo, is it?"` (overall craftsmanship reaction)
- `[2026-05-01 29:38]` `Ted Lewis: "Oh, new world for me. I appreciate you opening the doors. I love it."`

**Color scheme approval — explicitly locked away from "dental industry blue/white":**

- `[2026-05-01 02:40]` `Joshua Cazoe: "we had all this and we had these different colors schemes but you know we went to this one. We know generally... be like the health space. And everything people like to use their blues or their greens, or whatever. But we know it's gonna it because it's gonna be a little bit more than that."` → Ted: `[03:13] "Okay."` (acceptance).
- Original 2026-02-27 brand direction is consistent: `[2026-02-27 19:37]` `Ted Lewis: "Yeah, I want to use like a moss green or brown or something like that."` (away from lab-coat blue/white). Confirm the current draft palette respects that preference.

**Sections Ted walked through and approved on 2026-05-01 (use this as the locked sitemap for the main OptiDental landing page):**

1. **Hero / core thesis** — "implant industry still bottlenecked by a handful of surgeons" framing — `[2026-05-01 03:43]` Joshua: `"the core thesis of which your brand is you know, major problem, implanted industries, still bottleneck by a handful of surgeons"`. Approved.
2. **What the robot handles (5 pillars)** — Prosthetic Fabrication, AI Diagnostics, Sterilization, Inventory and Supply, Patient Communication — `[2026-05-01 05:52–06:11]` Joshua reads list, Ted: `"This looks great. This really looks really great. Good work."` Approved.
3. **Stages / Tiered Entry / "If they want to taste it for a little while and they realize they like…"** — `[2026-05-01 06:14–06:33]` Approved as a structural device, but the **specific tier names + pricing are still vapor** (see §4).
4. **Authority / About Ted block + "40 plus in prosthodontics"** — `[2026-05-01 06:44–07:00]` Joshua: `"we have the authority being you here... I think it would be nice if you could get like a good headshot of you."` Approved structurally; missing real headshot (still using a placeholder; Ted's iPhone clone footage planned to feed this).
5. **Pricing / leasing section** — Joshua flagged it's still TBD; both agreed to defer specific numbers ("we call that math"). Section exists in the design but copy is qualitative-only — see §4 + §6.
6. **Trust & Safety / HIPAA** — `[2026-05-01 20:47–21:33]` light-touch Ted approval ("Yep. Looks good.") — flagged as **only a surface review**, not an audit. See Open Q #5 (§8).
7. **Background / "Through the years"** — `[2026-05-01 21:35]` Joshua: `"some background history on. The whole. I guess like space itself."` → Ted: `[22:10] "Excellent."` Approved.
8. **ESSOs / call-to-action loop with email gate** — `[2026-05-01 23:21]` Joshua: `"if you go on our request, the demo everything kind of gets them to put their email in and depend on who they are."` Approved structurally; the actual lead magnet inside this gate has changed since 2026-05-15 (calculator, not PDF — see §5).
9. **"I'm from Tesla" / Sender-message section** — `[2026-05-01 24:12–25:07]` flagged for edit (`#1` in §6); structurally OK but copy needs to swap to generic-robotics-manufacturer language before publish.

**Constraints Ted enforced during the approval call (carry into §6 verbatim rules):**

- Terminology: "prosthodontics" not "prosthetics" not "prosthodontist".
- No Tesla / Optimus brand-name references in copy.
- No specific production/precision numbers — directional / goal-language only.
- Headshot of Ted required in Authority section (he is "right in the middle" of getting one — `[06:55]`).

---

## 3. Pages to Build

| Page name | URL slug | Purpose | Status | Source / quote | Open questions |
|---|---|---|---|---|---|
| **OptiDental main landing** | `/` (apex of the OptiDental domain) | Hero + thesis + 5-pillar what-the-robot-handles + Authority + Tiered entry + Trust/HIPAA + lead-magnet gate. Targets **dental practice owners**. | **Draft approved direction 2026-05-01**, pending §6 edit pass + lead-magnet swap + missing headshot | `[2026-05-01 06:11]` `Ted Lewis: "This looks great. This really looks really great. Good work."` | None blocking design; copy edits in §6 |
| **Apical Robotics landing (dual brand)** | TBD (separate from OptiDental) | Same business, but framed for the **robotics-industry audience** (manufacturers, distributors, Tesla/Fourier/Unitree contacts). Routes via dual-landing-page strategy. | **Not started** — concept agreed 2026-04-10, no design yet | `[2026-04-10 33:42]` `Ted Lewis: "if you're talking to the robot people, it's, it's apical robotics, if you're talking to the To your clients dentists that you're gonna do this. It's probably gonna be optical dental or apical dental. Which will make sense to them and you can have you can have a double landing page and website and it will divert into the right spots"` | Domain assignment: which Apical/Opti domains are pointed where? Ted has Porkbun; FM is setting Cloudflare in front (per 2026-02-27 [25:22]) — confirm DNS state before build |
| **About Ted (with clone video block)** | `/about` (or in-page Authority section) | Authority panel. Real headshot + clone video segment. Embedded within the main landing page in current draft, but may grow to own page if clone video is long. | **Draft approved** as embedded Authority block; clone video **blocked** on Ted's recording barrier (see §7 Risk 1) — Arizona Julia studio shoot is the unblock | `[2026-05-01 06:44]` `Joshua Cazoe: "we have the authority being you here... I think it would be nice if you could get like a good headshot of you."` `[2026-05-08 25:47]` `Ted Lewis: "Don't do that. I do that in heartbeat. Sure. Hi. I've flown all over the country... I dragged Melissa with me most of the time."` | When Julia/Arizona studio shoot lands; until then placeholder photo |
| **Blog / "Authority Booster" content hub** | `/blog` | Auto-published from Authority Booster system → repurpose into LinkedIn articles + social. | **Decided 2026-05-01, not yet built.** Action item assigned to Mohammad. | `[2026-05-01 26:28]` `Jason Alberti: "I would have the ball on the page, I definitely. And then we can repurpose You can repurpose content from a blog article into LinkedIn articles into social"` `[2026-05-01 27:03]` `Joshua Cazoe: "we'll talk to the team. We need to have a blog page"` | Ted's preferred cadence + topical scope `[2026-05-01 open question, Joshua-raised]` |
| **Lead magnet — Savings Calculator** | TBD (could be `/calculator` or modal on main landing) | Interactive ROI/cost-savings calculator: "how much time and money will a humanoid robot save your dental practice." Replaces the previously-imagined PDF lead magnet. Entry point into the funnel. | **Decided 2026-05-15, scope undefined.** No build started. | `[2026-05-15 17:03]` `Jason Alberti: "the industry right now is kind of shifting, it used to be just like, you know, you send out pdfs, templates, things like that. People are now kind of shifting into more of like, an interactive type of lead bandit. So, for example, um, we could do like a like, some sort of calculator"` `[2026-05-15 17:19]` Jason: `"some sort of calculator, right? Like in your case, it could be something along the lines of like, okay, how much time and money will you save by having a humanoid robot"` `[2026-05-15 17:46–18:11]` Jason: input fields = "How much do you spend on cleaning your laboratory? How much do you spend on this and that..." output = annual savings dollar figure | What input fields? What output framing? Which industry benchmarks back the math? — see Open Q in §8 |
| **Free initial info-gathering link** | "already coded" per Ted [still vapor — confirm what he means] | First entry point — Ted said he has "already coded" a free click link that drags people in and collects "all their vital data" before they hit the paid deep-dive tier. May overlap with calculator or be a precursor. | `[still vapor]` — Ted said it's built but FM has not seen it | `[2026-05-15 09:28]` `Ted Lewis: "Obviously, a free and I've already coded it free. Click a link on the website and it's gonna be initial information, gatherings on so forth"` `[2026-05-15 09:50]` `"it gives us all their vital data"` | Where is the existing link? What does it collect? Does it conflict with the new calculator, or do they nest? |
| **Paid Deep-Dive Research / Sales page** | TBD | Sells the **paid deep-dive research package** — Ted scours the world's humanoid robot offerings and returns the top 3 contenders for the buyer's practice, plus what they'd pay for. | **Cannot be built** until Ted finalizes (a) what the deliverable actually is and (b) the price | `[2026-05-15 09:50]` `Ted Lewis: "The second thing would be a paid for deal that goes for deep dive. That really gets down to the point that will give me the information research and say, Okay, I've scoured the whole world and out of the whole world. Here's the three top contenders And this is what they'd pay for. I don't don't know what the fee would be, yet"` | **Pricing.** Hard blocker — see §8 Open Q. |
| **Subscription / "Rx — Prescribing the Perfect Bot" / Tiered ongoing-support page** | TBD | After paid deep-dive, customers progress to daily/weekly/monthly/yearly subscription, rental, lease, or purchase agreement. Includes ongoing support, integration of additional modules (e.g. sterilization), licensed-clinician (Melissa-tier) review of escalations. | `[still vapor]` — model verbally sketched, no tier names, no pricing, no GHL product wiring | `[2026-05-15 11:21]` `Ted Lewis: "actually a prescription that's going to be fit for you. It has several different tiers of what you want me to do a subscription so that you can pick up the phone is to have a problem."` `[2026-05-15 11:52]` `"a monthly prescription or subscription... that would go from a Daily. Weekly monthly. Yearly rental lease or purchase agreement."` | What goes in each tier? Pricing? Does support subscription bundle with purchase, or is it a separate SKU? Membership-vs-subscription distinction (Open Q in §8) |
| **Contact / Book a Call / Demo Request** | TBD | Demo / consultation request — gets email + segments by audience (DSO vs solo practice vs robotics company). Already present in draft as the ESSOs section. | **Draft approved structurally 2026-05-01** | `[2026-05-01 23:21]` `Joshua Cazoe: "this actually so for the Essos, you know, this is It again, it some of it is it loops back to some pages? All right, so if you go on our request, the demo everything kind of gets them to put their email in and depend on who they are."` | None blocking |
| **(Maybe) Case Studies / Robotics Partners** | TBD | Showcase pilot results / robotics-partner logos. **Cannot exist until Tesla / Fourier / Unitree contracts are signed** (see Risk 4). Until then, Ted's DSO scale + 40 yrs + Medicaid volume is the only credible authority asset. | **Not started — blocked on Tesla legal** | `[2026-05-01 17:56]` `Ted Lewis: "I don't want them to come back and they're saying, Well, are you representing us? No. No. I don't want him to To jump on that until I've got it written on the ground."` | When/if Tesla deal closes; whether Fourier or Unitree go first |
| **(Maybe — labs-style) Community / Membership** | TBD | If Ted goes the labs/community route on top of subscription. Jason flagged this is a **different GHL build** (community + course access) than recurring billing — Ted conflated them. | `[still vapor]` — Jason coached Ted that membership ≠ subscription | `[2026-05-15 23:50]` `Jason Alberti: "that would be more of a, that would be more of a newsletter or, or like a subscription. Like whether it's paid or not a membership is more like a like a community type of thing... for us our labs is what you would consider membership. So someone pays a monthly fee to get access to courses community, things like that."` | Does Ted want a true Labs-style community? Or just a paid subscription with newsletter? — Open Q in §8 |

**Pages Joshua has NOT mentioned and should not exist yet:**
- A pricing page with hard numbers (defer per §6).
- A "partners" / "investors" page (Tesla legal blocker).
- A patient-facing page (this is B2B, sold to dentists, not consumers).

### 3a. Expanded page detail — what each page must contain

The table above is dense; here's an expanded per-page spec with verbatim source.

**Page 1 — OptiDental main landing (`/`)**

*Sections (locked from 2026-05-01 review):*

- **Hero:** Brand mark + tagline. Core thesis = "implant industry still bottlenecked by a handful of surgeons." Approved structurally. Hero subtitle should NOT name any specific manufacturer.
- **5-pillar "What the robot handles":** Prosthetic Fabrication / AI Diagnostics / Sterilization / Inventory and Supply / Patient Communication. `[2026-05-01 05:52–06:11]` Joshua reads list, Ted endorses: `"This looks great. This really looks really great. Good work."` Each pillar should have **directional outcomes** (not specific numbers per §6 rule #3).
- **Staged entry / "Try it for a little while" tier-funnel preview:** Approved as structural device `[2026-05-01 06:14–06:33]`. Specific tier names are still TBD (§4).
- **Authority section ("40+ years in prosthodontics"):** Approved `[2026-05-01 06:44]`. Needs real headshot. Will host the clone video block (currently placeholder).
- **Pricing / leasing block:** Qualitative only, not numeric, per §6 rule #3. `[2026-05-01 09:18]` Joshua: `"in terms of pricing here, you're not sure like what you're like offering in terms of price range would look like You know, but yeah, I know you have to sit down with us and we call that math."`
- **Trust & Safety / HIPAA block:** Approved on light-touch review `[2026-05-01 20:47–21:33]`. Open Q #5: real compliance review needed?
- **"Through the years" / company history:** Approved `[2026-05-01 21:35–22:10]`.
- **ESSOs (Email-Segmented Specific Offers) / Demo request gate:** Email capture that segments by audience type (DSO vs solo practice vs robotics company). `[2026-05-01 23:21]` Joshua: `"if you go on our request, the demo everything kind of gets them to put their email in and depend on who they are."` Approved structurally. Implementation: GHL form with segmentation logic.
- **"I'm from [robotic manufacturer]" sender-message section:** Approved with copy edit to swap "Tesla" → generic. `[2026-05-01 25:07]` Joshua.

**Page 2 — Apical Robotics landing**

Decided as concept on 2026-04-10, no design yet. Same business, different audience framing:

- Audience = robot manufacturers, distributors, robotics-industry buyers.
- Ted's quote: `[2026-04-10 33:42]` `"if you're talking to the robot people, it's, it's apical robotics, if you're talking to the To your clients dentists that you're gonna do this. It's probably gonna be optical dental or apical dental."`
- Implementation: Sub-domain or separate domain pointed at Apical-themed Elementor variant. Cloudflare routes both to the same WordPress installation. Use same brand-colors and core-thesis structure, swap audience-targeting copy.

**Page 3 — About Ted (Authority + clone)**

Current state: embedded as a section on the main landing page. May grow to its own page if clone video > ~2 minutes.

- Real headshot (pending Ted recording / Arizona shoot).
- Body copy: 40+ years in prosthodontics, DSO scale, "I've been doing implants since 1981" `[2026-05-01 04:01]`.
- Independence framing: Ted is not paid by manufacturers — anchor the prescriber thesis.
- Quote block — consider using `[2026-05-15 20:11]` "staff as mirrors" anecdote as a "how Ted thinks" pull-quote.
- Authority Booster blog feed at the bottom.

**Page 4 — Blog (`/blog`)**

- Authority Booster auto-publish.
- Repurpose into LinkedIn articles + social posts. Per `[2026-05-01 26:28]` Jason.
- Cadence TBD (Open Q #8).
- Per `[2026-05-01 26:45]` Ted: `"financially, as I go through all this, you know, things would hurt me and I will Creative. In other words, add more Several times a week likely that this is specific thing that I can't run across here and here's more specific. Idea."` — Ted intends to feed prompt ideas into the engine "several times a week."

**Page 5 — Savings Calculator (lead magnet)**

- Per `[2026-05-15 17:19]` Jason: `"some sort of calculator, right? Like in your case, it could be something along the lines of like, okay, how much time and money will you save by having a humanoid robot in your home"`.
- Inputs per `[2026-05-15 17:59]` Jason: `"How much do you spend on cleaning your laboratory? How much do you spend on this and that and they can kind of put in their own numbers and then you get calculate and it shows them. Okay. You specifically you spend this much this is all that stuff. You're gonna save a hundred thousand dollars, you're gonna save eighty thousand dollars or whatever that number is"`.
- Math anchors from Ted: 30% overhead savings without lab, 50–55% with lab `[2026-05-15 17:36–17:46]`.
- Output flow: result → "Get custom report" / "Talk to Ted" CTA → email capture → into GHL funnel.
- Implementation: Elementor + custom HTML widget OR small React component depending on math complexity.

**Page 6 — Free Initial Info-Gathering Link**

Per `[2026-05-15 09:28–09:50]` Ted said he "already coded" this. Confirm what it is. Likely a typeform/form that collects:
- Practice size
- Current lab setup
- Preferences for robot (language, voice tone, capabilities desired)
- Email + practice details

If it overlaps with the calculator, consolidate. If they're separate (calculator = top-of-funnel + math anchor, info-gather = mid-funnel preference capture for the paid deep-dive), they nest in sequence.

**Page 7 — Paid Deep-Dive Research / Sales page**

Locked: cannot build until Q3/Q4 in §8 are answered.

When unblocked, structure should be:
- Hero: "What you get from a custom robot-prescription report"
- Deliverable spec (PDF? consult? video? combination?)
- Sample output (anonymized excerpt of a "top 3 contenders for X practice" report)
- Pricing block (number → checkout)
- Testimonials placeholder (none yet — Ted hasn't done a paid deep-dive yet)
- FAQ
- Wired to Stripe via GHL.

**Page 8 — Subscription / Rx ladder**

Locked: cannot build until Q9 in §8 is answered (which 3 tiers Ted wants to surface).

When unblocked, structure should be:
- 3-tier comparison table (e.g. Basic Support / Standard Subscription / Full Lease+Support — names TBD)
- Per-tier inclusions
- Pricing per tier (TBD)
- "Upgrade later" / "Add modules" framing — per `[2026-05-15 11:52]` Ted: `"If they say, Okay, now I wanted to do the sterilization, and by the sterilization machine, or I've got that handled, this is what we do if they're on the subscription."`
- Wired to recurring billing in GHL.

**Page 9 — Contact / Demo Request**

Already part of the ESSOs flow on the main landing. May graduate to a dedicated page if call-volume warrants.

**Page 10 — Community / Membership (if Ted commits to labs-style)**

`[still vapor]` — depends on Q7 in §8. If yes, build a labs-equivalent membership area: courses, community access, gated content. If no, skip — subscription tier already covers ongoing-support recurring billing.

---

## 4. Offers — what gets sold on the site

**Status (2026-05-15):** Ted is on "third iteration with Claude" of the offer structure. He verbally sketched the architecture but **none of it is written down, priced, or delivery-defined**. Jason explicitly said he cannot build GHL automations until the offer is committed.

### 4a. The offer skeleton Ted has verbally described

Three-tier funnel:

1. **Free initial info-gathering link** (Ted: "already coded") → collects buyer's vital data and preferences (language preference for robot UI, voice tone, capabilities desired). `[2026-05-15 09:28–09:50]`
2. **Paid deep-dive research package** → Ted personally researches the world's humanoid robots and returns the top 3 contenders for the buyer's specific practice, with a "this is what they'd pay for" breakdown. `[2026-05-15 09:50]` `Ted Lewis: "Here's the three top contenders And this is what they'd pay for. I don't don't know what the fee would be, yet"`. **Pricing TBD** — hard blocker for the funnel.
3. **Tiered subscription / lease / purchase agreement** for ongoing support. Tier choices: daily / weekly / monthly / yearly / rental / lease / purchase. May or may not include the support subscription. Adding modules (e.g. sterilization) is an upsell handled via subscription or one-shot purchase. `[2026-05-15 11:52]` `Ted Lewis: "Daily. Weekly monthly. Yearly rental lease or purchase agreement. So that at a certain point, they want to pay to this and then they would purchase from from that point and could or could not include the subscription for support."`

### 4b. Jason's coaching on the offer structure (2026-05-15) — these are the rules the build team should design against

- **Lead magnets > free PDFs.** Industry has moved past PDFs to interactive lead magnets (calculator). `[2026-05-15 17:03]` Jason quote.
- **"Membership" ≠ "subscription".** Membership = community/courses (labs-style). Subscription = recurring billing for a paid service. Ted conflated them; Jason corrected. `[2026-05-15 23:50]` Jason quote. Ted accepted: `[2026-05-15 24:03]` Jason: `"for us our labs is what you would consider membership."`
- **Newsletter is a separate animal** — Ted asked if newsletter = membership. Jason: no, newsletter is its own track (free OR paid).
- **Ted is NOT the target audience — use staff-as-mirrors.** `[2026-05-15 20:11]` `Ted Lewis: "I use my staff as mirrors and I say pitch this pitch, same idea, but pitch it to them in 12 different ways"`. Joshua proposed encoding this as a Claude skill `[2026-05-15 20:53]` so Ted can iterate offer angles faster. This is build-relevant: every offer-page headline candidate should run against the "staff mirrors" framing before publish.
- **Welcome + nurture sequences are required** before any paid funnel works: `[2026-05-15 15:22]` Jason: `"somebody fills out that form... we have a welcome email that goes out. As soon as somebody fills out that form."`
- **GHL chatbot widget with human handoff to licensed pro (Melissa-tier)** is part of the offer infrastructure: `[2026-05-15 16:06]` Jason: `"there's a chatbot feature of it... it can interact. So somebody can jump on your website and they can click on the little widget inside the corner and talk to this AI conversational agent and... if we need to hand it off to a professional. We can have that we can build that in as well."`
- **Independence framing must be preserved.** Ted refuses comp from robot manufacturers: `[2026-05-15 10:53]` `Ted Lewis: "I'm not taking any compensation for many of them. I'm gonna research them all"`. No sponsored content or affiliate framing — would collapse the prescriber thesis.

### 4c. What MUST exist on the site before any offer page is buildable

A **concrete entry point** — currently scoped as the **savings calculator** (see §5). Without it, the funnel has no top-of-funnel and GHL automations have nothing to trigger on.

Per Jason's framing `[2026-05-15 19:11]`: `"if you're doing like a membership site or like a subscription or something like that, we want to make sure that we build all the automations to support that. So that when somebody comes in, not only do, they get the information delivered to them. But there's also a nurture sequence where we're kind of guiding them towards preferably one of your paid services"`.

### 4d-pre. Historical offer evolution — for context, do not re-litigate

The offer architecture has evolved across the engagement. Useful to know how we got here so you don't over-index on an old framing:

- **2026-01-30 (sales call):** Ted bought "automation outcomes" — `[2026-01-30, restated 2026-05-01 30:42]` Ted: `"the idea of automation is actually what brought me to you and says Okay, Pay the box and let's get you guys to help me get from here to there."` No specific offer yet — Ted himself wasn't building a product, FM was building infrastructure for his eventual product.
- **2026-03-16:** First articulation of "membership model mirrors Julia's" — `[2026-03-16 20:41]` Ted: `"I probably duplicate something like Julia. Has for the most part, someone comes in you give them enough information, you bait the hook and you hook them a little bit, let them be part of your informational stream."` **This 2026-03-16 framing was Ted's first verbal sketch — Jason later refined the membership/subscription/newsletter distinction on 2026-05-15. The 2026-05-15 version overrides.**
- **2026-05-01:** Joshua flagged that the site contained specific production-time/remake-rate numbers Ted hadn't validated. Joshua: `[2026-05-01 20:37]` `"Yeah, just want to be super clear. Don't want to be giving people. Selling people direct numbers and then it's not no idea yet."` Both agreed to soften to qualitative claims. Subscription pricing deferred ("we call that math" `[09:18]`).
- **2026-05-15:** Ted on Claude iteration ~3 of the offer; verbally sketched the free → paid deep-dive → tiered subscription model. Jason laid down the GHL/automation lane and the savings-calculator decision. Pricing still TBD.

### 4d. What is LOCKED vs still in Ted's head

| Element | Status | Evidence |
|---|---|---|
| Three-tier shape (free → paid research → subscription) | **Locked verbally** | `[2026-05-15 09:28–11:52]` Ted's sketch |
| Independence positioning (no manufacturer comp) | **Locked, load-bearing** | `[2026-05-15 10:53]` Ted |
| Tier names (daily/weekly/monthly/yearly/lease/purchase) | **Verbally sketched, not committed** | `[2026-05-15 11:52]` Ted |
| Pricing for paid deep-dive | **Not set** — `"I don't don't know what the fee would be, yet"` | `[2026-05-15 09:50]` Ted |
| Pricing for subscription tiers | **Not set** — Joshua deferred "we call that math" | `[2026-05-01 09:18]` Joshua |
| Lead magnet = calculator (over PDF) | **Locked 2026-05-15** | `[2026-05-15 17:03]` Jason |
| Subscription model is "subscription" not "membership" (in Jason's strict sense) | **Locked 2026-05-15** | `[2026-05-15 23:50]` Jason |
| Newsletter as a separate top-of-funnel track | **Decided 2026-05-15 verbally**; needs Ted to commit cadence | `[2026-05-15 13:43]` Jason |
| Whether labs-style community exists | **Open** | Jason raised, Ted noncommittal |
| GHL chatbot widget with licensed-pro handoff | **Decided 2026-05-15 verbally** | `[2026-05-15 16:06–16:32]` Jason |
| Tesla / Optimus brand-naming permitted? | **NO until contract signed** | `[2026-05-01 17:56]` Ted |

---

## 5. Lead Magnets + Automation Hooks (GHL / Authority Booster layer)

### 5a. Decided

- **Interactive savings calculator** as the primary lead magnet `[2026-05-15 17:03]` Jason. Industry has moved past PDFs. Inputs: practice spend on lab + cleaning + inventory + (TBD additional). Output: annual savings figure with the humanoid robot. Frames the value before any paid funnel pitch.
- **Welcome email** on calculator form-fill `[2026-05-15 15:22]` Jason.
- **Newsletter** as a separate parallel top-of-funnel — visitor opts in via a form, receives weekly (or chosen cadence) updates `[2026-05-15 13:43]`.
- **Nurture sequence** post-calculator/newsletter signup that guides toward the paid deep-dive offer `[2026-05-15 19:11]` Jason.
- **GHL native chatbot widget** on the site with hand-off to a licensed professional (Melissa-tier) `[2026-05-15 16:06–16:32]` Jason.
- **Authority Booster blog auto-poster** on the site, with content repurposed to LinkedIn articles + social `[2026-05-01 26:28]` Jason.
- **LinkedIn repurposing flow** — Ted has 2,000+ followers organically and is getting inbound; he doesn't know why people are finding him. Blog → LinkedIn is the lever. `[2026-05-01 29:10]` `Ted Lewis: "I've got over 2000 followers, and I don't even know why."`

### 5b. Rejected

- **Static PDF lead magnet.** Jason explicitly: `[2026-05-15 17:03]` `"used to be just like, you know, you send out pdfs, templates, things like that. People are now kind of shifting into more of like, an interactive type of lead bandit."`

### 5c. Welcome / nurture sequences scoped

Not yet drafted. Sequence needs to know which offer it's nurturing toward — blocked on §4 pricing/structure commitment.

### 5d. Newsletter vs paid subscription distinction (Jason's correction)

- **Newsletter** = top-of-funnel content delivery (free or paid)
- **Subscription** = recurring billing for ongoing support service
- **Membership** = community + courses (labs-style)

Ted's "first you start free → membership → first shot at new information" framing `[2026-05-15 23:24]` was corrected to a newsletter/subscription structure `[2026-05-15 23:50]`.

### 5e. Authority Booster blog automation

- **Decision date:** 2026-05-01.
- **Action item:** "Mohammad/team add OptiDental blog page so auto-poster can deploy" (`action_items.md` from 2026-05-01 extraction).
- **Why:** Ted is generating prompt-driven blog ideas "several times a week" `[2026-05-01 26:45]` Ted.
- **Cadence:** TBD — Joshua raised it as an open question on 2026-05-01.

### 5e-bonus. The Authority Booster blog → LinkedIn flow

Per `[2026-05-01 26:28]` Jason: `"Yeah, yeah we do. So I would have the ball on the page, I definitely. And then we can repurpose You can repurpose content from a blog article into LinkedIn articles into social"`.

The pattern (from prior FM client work — Julia's playbook):

1. Ted (or staff) dumps a topic / idea into the OptiDental Claude project.
2. Authority Booster generates a blog draft using Ted's voice (Claude project has his transcripts baked in for sentence-structure fidelity).
3. Blog auto-publishes on `/blog`.
4. Repurpose module slices the blog into LinkedIn article + 3–5 social posts.
5. LinkedIn posts go to Ted's profile (FM has the credentials from 2026-03-27).

**Caveat:** the 2026-03-27 LinkedIn credential handoff was verbal-on-call — credential rotation needed after FM's work completes. Per Risk #note.

**State today:** Ted has 2,000+ LinkedIn followers organically growing without effort `[2026-05-01 29:10]` `Ted Lewis: "I've got over 2000 followers, and I don't even know why."` Inbound activity exists. The blog → LinkedIn flow captures that audience properly.

### 5e-newsletter. Newsletter mechanic

Per `[2026-05-15 13:43]` Jason: `"like a form on the site where people join, and then they join your newsletter. And then you're gonna send a newsletter on every week or every whatever time period."`

Per `[2026-05-15 13:52–13:58]` Ted/Jason exchange:
- Ted: `"you can automate all that and most the questions in the description"`
- Jason: `"Yeah. That's what we want to automate that exactly. We want to."`

Pattern: form-fill → welcome email → ongoing weekly send → guides toward paid offers in Ted's funnel.

Open Q in §8: cadence + topical scope. Joshua raised this on 2026-05-01.

### 5e-chatbot. GHL chatbot widget with licensed-pro handoff

Per `[2026-05-15 16:06]` Jason: `"there's a chatbot feature of it. We will kind of build, like, we'll have you, give us some information about like the product offer the services things like that. And it can, it can interact. So somebody can jump on your website and they can click on the little widget inside the corner and talk to this AI conversational agent and... we need to hand it off to a professional. We can have that we can build that in as well."`

Ted's response `[2026-05-15 16:30]`: `"Huh, right? Exactly."` + `[2026-05-15 14:02]` Ted: `"probably just a handful of professionals like Melissa or someone else that's licensed and they know they would just review when someone had a question and the automation or the answered it when it just To make sure that it's someone with the license to practice to oversee that that fits in the grand scheme of things."`

**Implementation:**
- GHL native chatbot widget on each page.
- Knowledge base: product/service info, FAQ, robot comparison logic.
- Hand-off trigger: when chatbot detects a clinical or licensed-decision question, route to Melissa (or other licensed clinician) for human reply.
- Ted's quote `[2026-05-15 14:24]`: `"automation will mostly handle it. Is that what you're talking about?"` — confirms he understands the human-in-the-loop pattern.

### 5f. GHL automation status — gating factor

GHL onboarding is the chokepoint. Ted has been "two-thirds through" for weeks `[2026-04-24 12:54]` Ted. GHL support routes him to upsells instead of finishing the flow `[2026-05-08 02:25]`. The plan for next call (per 2026-05-08 deferred decision): Jason joins, drives GHL setup in real time. Until that lands, **no GHL automations can be built**, so the calculator/newsletter/nurture stack lives in design-only state.

---

## 6. Brand Voice + Copy Rules — verbatim, Ted-enforced

These are NOT judgment calls. Every rule below has a Ted quote behind it.

1. **"prosthodontics" — not "prosthetics", not "prosthodontist"** `[2026-05-01 07:46]` `Ted Lewis: "you would say press the donics is the Correct way to say it, you follow, if you say prosthodontist, some people would say, Well, you're 40 years in prosthodontics, well, all dentists due prosodontics, they put a crown anything in there."` Also `[2026-05-01 07:21]` `Ted Lewis: "actually has more than one meeting, but if you say prosthodontist, Then that means that's a doctor that's trained and all this look under stuff but they have restricted their practice to one exact specially. They can't do it [a] filling they can't do it. This they can't do a cleaning, they can't have any part of orthodontics."` Same rule applies for orthodontics (plural form, not orthodontist). Dental peer audience is hyper-precise — single missing 'd' undermines authority.

2. **"robotic manufacturer" / "robotic manufacturer or distributor" / "robotics company" — NOT "Tesla" or "Optimus"** in any sender-message, hero, partner section, or testimonial copy until Tesla contract is signed. `[2026-05-01 24:44]` Joshua: `"A robotics company that wants."` → Ted: `[24:47]` `"A robotic manufacturer or distributor or whatever may want to say."` Joshua codified: `[25:07]` `"we'll change this on the sender message. I'm from Tesla should be changed to something a little bit more open to, I'm from a robotics company."` Ted is **simultaneously courting Tesla AND Fourier AND Unitree AND ~30 Chinese options**; any one of them seeing "I'm from Tesla" copy could blow the deal. **Hard rule — applies sitewide.**

3. **No specific production-time or unit-economics numbers — directional / goal language only.** `[2026-05-01 19:47]` Ted talked through "fewer remakes will be for sure, faster production..." but Joshua flagged at `[20:37]`: `"Yeah, just want to be super clear. Don't want to be giving people. Selling people direct numbers and then it's not no idea yet."` Ted agreed. Until pilot data exists, copy must be qualitative ("faster production, fewer remakes, more consistent output") not numeric ("3x faster, 90% fewer remakes").

4. **Authority block requires real Ted headshot.** `[2026-05-01 06:44]` `Joshua Cazoe: "I think it would be nice if you could get like a good headshot of you."` Ted: `[06:55] "okay, I'm actually Right in the middle that?"` Headshot is pending. Until then, placeholder, with the photo swap planned post-iPhone-self-recording or Arizona-Julia studio shoot.

5. **"40+ years in prosthodontics"** — directional language for Ted's credibility line. Confirmed structure `[2026-05-01 07:00]` Ted: `"if you were sewer says 40 plus in prosodontics"` — note Ted is correcting "prosthetics" → "prosthodontics" inline; use the corrected form.

6. **Brand colors away from health-industry blue/white** — moss green / brown / earth-tone direction `[2026-02-27 19:37]` Ted. Confirm current draft palette respects this.

7. **Independence positioning preserved.** No "powered by Tesla", no "in partnership with…", no affiliate-link framing. Ted is the unbiased prescriber. `[2026-05-15 10:53]` `Ted Lewis: "I'm not taking any compensation for many of them. I'm gonna research them all"`. This is a positioning rule, not just a copy rule — applies to testimonials, CTAs, footer disclosures.

8. **DSO context as credibility anchor (Joshua's framing, Ted-endorsed):** Ted's DSO has "virtually identical" lab systems across offices → robots trained in his lab deploy across the DSO immediately. `[2026-05-01 20:19]` Ted. Use as a "Why Ted" / authority paragraph — does NOT name specific DSOs/brands.

9. **Tone match: practical, feet-on-the-ground expert — NOT "rockstar dental genius".** Brand-voice direction locked in onboarding: `[2026-02-27 39:38]` Joshua: `"Probably a lot like Julia in that. He's practical. Got her feet on the ground."` Ted explicitly rejected the "Super Rockstar Dental Genius" framing in earlier discussion.

10. **Compliance / HIPAA language must read clearly for the medical-field audience.** `[2026-05-01 20:47]` Joshua: `"you're in the medical field. um, In terms of like HIPAA compliance. So like data security. I know you will have your measures in place for that."` Ted reviewed and said `[21:33] "Yeah, that looks good. Yeah."` — but this was a light-touch review (see Open Q #5 in §8).

11. **Don't over-claim regulatory positioning.** Ted's business model leverages the unregulated-laboratory-side of dental robotics `[2026-03-16 35:30]` Ted: `"There are no legal requirements for the, the dental prosthetic that you use on humans... the responsibility belongs to the doctor that actually deploys."` Copy must accurately reflect this without making it sound like a regulatory loophole. Authority depends on credibility with dental professionals.

12. **The dental specialist audience is hyper-precise.** Ted explained why terminology accuracy is identity-defining: `[2026-05-01 08:04]` `Ted Lewis: "They're part of the only group. That I would want not want a public speak in front of and I have done a lot, but There's always some guy that there's one example on a far planet in another universe. That says that what you just said isn't true on that one planet way over there? We're talking about Earth here. You know, on the ground here. They're kind of that way."` Plus `[2026-05-01 09:16]` Ted: `"They're really Picky about that kind of."` The site copy is read by **prosthodontists, periodontists, and dental practice owners** — they will pattern-match-fail on a single misused term. Defer to Ted's edits without negotiating.

13. **The prescriber metaphor is the brand center.** Don't drop "Rx", "prescribing", or "prescription" framing from copy unless Ted explicitly says to. The "RX — prescribing the perfect bot" is a trademark Ted is filing `[2026-04-03 31:35]`, `[2026-05-01 12:32]` Ted: `"the trademark bought our ex prescribing the perfect robot."` Build the headlines around this metaphor — it differentiates from a robotics-reseller positioning.

14. **The "right-sizing" / "not over-buying" argument** is Ted's commercial honesty pitch. `[2026-05-01 17:20]` Ted: `"you send one in to take care of really healthy grandpa and Grandma. It's not going to be a has to be a rocket science robot. It just needs to be able to do this and this and this and that's the whole point we're trying to bought our ex, prescribing the ideal Robot. Is it they can price point, get it for a whole lot cheaper. If it doesn't have to do so much more."` Use this as a paragraph in the "Why Use Us" section — buyers shouldn't pay for capabilities they won't use.

15. **The "monitor + adjust over time" framing** for the subscription model. `[2026-05-01 09:45]` Ted: `"I would plan to either lease it to them and then have them on a subscription. So I could monitor it because every office is gonna be different. It's like if you send one to a home, every home is going to be different... So there's going to need to be monitoring and adjustment for it. And that's a monthly income stream."` This is the *why* behind the subscription tier — every practice's robot setup needs ongoing calibration, not just a one-time deploy. Use to anchor subscription value-prop.

16. **The Authority section's headline anchor is the "40+ years" + DSO scale + "since 1981" claim, not Tesla/Optimus.** `[2026-05-01 04:01]` Ted: `"I've been doing implants since 1981."` `[2026-05-01 20:19]` Ted: `"all of their laboratory systems, or virtually identical to what I have in there so I can build it. I know what's gonna work in there immediately."` The DSO-scale claim is anonymized — don't name the DSO unless Ted explicitly approves.

---

## 6.5 Verbatim copy reference — Ted-language safe to use on the site

These are quotes Ted has said in the calls that are clean enough (after light editing) to seed body copy, hero subtitles, About-page paragraphs, and blog hooks. Use them as **source material**, not as final copy — Ted is verbose and often mid-sentence. The strength is they're authentically his voice.

**On the core thesis (implant industry bottleneck):**
- `[2026-05-01 04:01]` Ted: `"I've been doing implants since 1981."` — credibility anchor for hero / About.
- `[2026-05-01 04:42]` Ted: `"I am exceptionally experienced in and that I need no regulation, no oversight, no, nothing through the laboratory door and the instruments are virtually the same. So once the robot learns how to do it... you say, okay, I've got Five years worth of 15,000, patients, wearing appliances built. By this robot."` — the data-moat argument; rewrite into a confidence-building paragraph for the Why-Ted section, but DO NOT use "no regulation" verbatim (regulatory-exposure risk per §7 #12).

**On the prescription / fit-for-practice framing:**
- `[2026-05-01 11:00]` Ted: `"the reason I talk about Optimus all the time because I've evaluated other robots ultimates has clearly The best possible skill set and the best way to learn... you will say this robot can do 12 out of 27 things."` — rewrite as **the unbiased prescriber thesis** without naming Optimus.
- `[2026-05-01 12:32]` Ted: `"tell them This is exactly what you're going to get for this money. Don't expect it to do that because it it's not capable."` — straight-talk transparency tone for the deep-dive sales page.
- `[2026-05-01 17:20]` Ted: `"you send one in to take care of really healthy grandpa and Grandma. It's not going to be a has to be a rocket science robot. It just needs to be able to do this and this and this and that's the whole point we're trying to bought our ex, prescribing the ideal Robot. Is it they can price point, get it for a whole lot cheaper. If it doesn't have to do so much more."` — the **right-sizing argument**: don't oversell, prescribe to fit.

**On the subscription model + ongoing relationship:**
- `[2026-05-01 09:45]` Ted: `"I would plan to either lease it to them and then have them on a subscription. So I could monitor it because every office is gonna be different... every home is going to be different. Every gamble and grandma's gonna be different. And so there's going to need to be monitoring and adjustment for it. And that's a monthly income stream."` — explains the ongoing subscription value-prop in Ted's own words.

**On the buying motivation (useful for landing-page subhead):**
- `[2026-05-01 30:42]` Ted: `"if only so the idea of automation is actually what brought me to you and says Okay, Pay the box and let's get you guys to help me get from here to there."` — Ted as customer of FM; can also be turned into a "from here to there" hero subtitle for OptiDental's own buyers.

**On the audience / "build reputation before product is finished" coaching philosophy (which Ted has internalized from Julia):**
- `[2026-05-01 28:29]` Ted: `"I was watching one of the deals that Julia put on there and she says, Don't wait till you've got your product. Finished, Don't wait till it's all know whatever. Go out there and start making reputation and start making that influence first and you'll get it in there."` — directly explains the blog/LinkedIn strategy as a public statement of intent.

**On the trademark / brand line:**
- `[2026-03-27 11:21]` Joshua/Ted: `"Apical Robotics + Apical Dental, tagline 'Human expertise, robotic precision.'"`
- `[2026-05-01 12:32]` Ted: `"the trademark bought our ex prescribing the perfect robot."` — "Rx — prescribing the perfect bot" pillar.

**On Ted's surgical bedside-manner / authority block (NLP-rich material from 2026-04-24):**
- `[2026-04-24 — Ted's surgical NLP digression]` Per topic synthesis in the cross-vault thread: Ted reframes "I'm going to cut you open" as "pressure right here", stretching bone like a green tree branch, perception-as-reality. This material lives in the 2026-04-24 transcript (lines roughly opening) and is rich source material for blog posts about Ted's clinician philosophy — feed it to the Authority Booster prompt as character-context for blog voice.

**On the staff-as-mirrors principle (NOT for site copy, but for Authority/About-page philosophy quote):**
- `[2026-05-15 20:11]` Ted: `"I use my staff as mirrors and I say pitch this pitch, same idea, but pitch it to them in 12 different ways and they go, Oh, they like that one."` — can become a quoted-block "How Ted thinks" anecdote on the Why-OptiDental page.

**Off-limits language (don't quote, don't paraphrase):**
- Anything naming Tesla, Optimus, Fourier (by brand), Unitree (by brand), G1, GR2 — until contracts.
- Any specific percentage / time / cost claim that isn't anchored to Ted's existing practice data.
- Anything that brags about "no regulation" or "bypassing dental boards" (regulatory exposure).
- The Julia LinkedIn login Ted volunteered on 2026-03-27 — a credential leak; rotate after work completes.

---

## 7. Constraints + Risks — what could blow up the build

1. **Ted's self-recording psychological barrier** (HIGH). `[2026-05-08 01:37]` `Ted Lewis: "when I'm talking to the air, it's like Who is this guy? I don't even know this guy. He looks like the guy is in the mirror and he never talks to me."` Gates the entire avatar/clone deliverable. Self-service won't unblock it. **Unblock = Arizona studio shoot with Julia** (Ted: "Don't do that. I do that in heartbeat. Sure. Hi. I've flown all over the country... I dragged Melissa with me most of the time." `[2026-05-08 25:47]`). Until then, the About / Authority section must work with **photo + body copy + maybe Melissa-led LinkedIn snippets**, not Ted's clone.

2. **Offer remains theoretical after 14 weeks of engagement** (HIGH). Ted is on "third iteration with Claude" of the offer. No pricing, no committed tier names, no written deliverable for the paid research package. **Blocks GHL automation layer entirely.** Jason: `[2026-05-15 19:11]` `"we want to make sure that we build all the automations to support that... but there's also a nurture sequence where we're kind of guiding them towards preferably one of your paid services."`

3. **Decision-maker bottleneck** (HIGH). Ted is the sole decision-maker. `[2026-05-15 25:02]` `Ted Lewis: "I'm not real fast at it yet, but I'll get that up so I can fly through this really pretty quick to me."` Melissa is constrained (laryngitis, multiple jobs, role undefined) `[2026-05-08 48:57]`. No team to delegate inputs to. Every page-copy decision waits on Ted personally.

4. **Tesla NDA / IP exposure** (HIGH — legal landmine). Multiple quotes from the 2026-05-01 review of the website draft:
   - `[2026-05-01 17:56]` `Ted Lewis: "I don't want them to come back and they're saying, Well, are you representing us? No. No. I don't want him to To jump on that until I've got it written on the ground. I've got it, written, and I've took hand and talk to these guys in person. Then I can say Yes, here's the paperwork."`
   - `[2026-05-01 15:04]` Ted: `"have to protect their technology"`
   - `[2026-05-01 15:09]` Ted: `"They may work their Tesla and they know a whole lot about it and so forth. They be true maybe trying to run a scam on the side I think you tell him just being paranoid maybe but I'm being careful, you follow."` — Ted suspects internal Tesla contacts may be running side-scams; this is why he won't move publicly until contract.
   - `[2026-05-01 16:35]` Ted (when Joshua asked if Tesla-specific copy should be removed): `"Yeah, yeah, until the secure. And I have a secure contract and I understand what it that way because there's some type of risk that I ain't seen, you know?"`
   - `[2026-05-01 16:50]` Ted: `"So, I don't want to upset the apple cart before, the apple cart full apples."`
   - `[2026-05-01 17:05]` Ted: `"robotic engineering knowledge, but what you can make it up, whatever, so that I could use it to unitary, or Fourier, or any of the other ones because I'll be dealing in all of them"` — confirms the brand-agnostic copy direction.
   - **Carry this into ALL copy** — including footer microcopy, alt text, blog posts, LinkedIn repurposed content, calculator output text. Even a "designed for the Optimus generation" line is risky.

5. **HIPAA email scrubber on Ted's office system** (MED). `[2026-04-03 30:11]` `Ted Lewis: "I go sand. That are going to the send folder or the anyway, and it's like it evaporated. Until it decides then it'll come back and say I did not send or I did sand"`. Filter holds outbound 30–40min and silently drops attachments. Has already cost the team the LLC/credentials document. **Workaround pending — cellular tether / sideline VPN / separate device.** Affects any deliverable that requires Ted to send credentials, headshots, or page-feedback docs from his clinic.

6. **GHL onboarding plateau** (MED). `[2026-04-24 12:54]` Ted is "two-thirds through" GHL onboarding; needs 1.5hr uninterrupted block he can't carve from his surgery schedule. Repeated GHL-support attempts route him to upsells `[2026-05-08 02:25]`. **Gates Jason's automation work.** Plan: Jason joins next call to drive GHL setup in real time.

7. **Independence framing fragility.** Any monetization that suggests manufacturer alignment breaks the prescriber thesis. `[2026-02-27 08:05]` `Ted Lewis: "I really am not looking for them to hire me or to pay me per se. In that if I did someone's going to say, Well they're paying you to say that."` Build team: do NOT add affiliate links, sponsored sections, or partner badges from robot manufacturers.

8. **Tech-friction on calls** (MED). `[2026-05-08]` Google Meet audio dropped + screen-share crashed mid-demo. Ted is hard-of-hearing and reads lips when audio fails — he loses comprehension when video freezes. Joshua decided to move future calls to Zoom. **Affects how we deliver design walkthroughs to Ted.** Use Loom walkthroughs (captioned) and async preview links over live screen-share where possible.

9. **Site-visibility-outpacing-back-end** (MED). `[2026-05-01 27:57]` Ted's email volume jumped from 250/day to 1,000+/day in April. LinkedIn followers at 2,000+ growing organically `[2026-05-01 29:10]`. The lead magnet + nurture sequence + chatbot need to deploy SOON to capture this attention without quality loss.

10. **Ted's discursive / digressive call pattern** (LOW-MED, ops risk). Multiple meetings flagged: Ted self-admits `[2026-03-16 31:03]` `"All right, I digress I get off topic my bad."` Action items occasionally get lost mid-tangent. Build team should treat written PR comments / approved Loom annotations as the only durable spec — not verbal "okay, that looks great" without specifics.

11. **Cross-origin embed gotchas** (LOW, technical). Per CLAUDE.md project rule #14, GHL forms on `link.firstmovers.ai` are cross-origin — use fixed `height: 1500px` + `scrolling="yes"` pattern. Applies to GHL form/calendar embeds on the OptiDental site.

12. **Dental specialty regulatory positioning** (LOW). Ted's business model rests on dental laboratories being unregulated for prosthetic fabrication `[2026-03-16 35:30]`. Copy must accurately reflect this — but **must not crow about it** in a way that draws regulatory attention.

---

## 8. Open questions for next call — concrete asks for Ted

Joshua / Jake — phrase these to Ted one at a time. Each one blocks build work.

1. **Lead-magnet calculator scope:** What input fields go in the calculator? (Confirm Jason's draft list: cleaning spend, lab spend, inventory spend, plus what else?) What output format — annual $ savings, payback period, both? Is there a "claim my custom report" gate after the calc result, or does the user just see a number? `[blocks calculator build]`
2. **Calculator math:** What industry benchmarks back the math? "30% of overhead" and "50–55% of overhead with the lab work" `[2026-05-15 17:36–17:46]` are Ted's numbers — are those the calculator constants, or just example anchors? Where does he want us to source the per-input averages (BLS data? ADA reports? his own DSO numbers)? `[blocks calculator build]`
3. **Paid deep-dive research package — what does the deliverable look like?** Is it a PDF report? A 1-hour consult? A custom-recorded video? How many robots compared per report? What's the turnaround time? `[blocks paid funnel sales page]`
4. **Paid deep-dive — price?** Ted: `[2026-05-15 09:50]` `"I don't don't know what the fee would be, yet."` We can't wire Stripe/GHL products without this. `[blocks paid funnel + GHL automation]`
5. **HIPAA / compliance language on the medical-field-facing pages — do we get a real review** or is Ted's "Yeah, that looks good" `[2026-05-01 21:33]` the final sign-off? If he wants real review, who reviews — Melissa (clinician), Ted's office's compliance counsel, or external? `[blocks publish readiness]`
6. **"Free initial info-gathering link" Ted said he "already coded"** `[2026-05-15 09:28]` — where is it? Can we see it? Does it conflict with our new calculator or do they sit at different funnel stages? `[blocks lead-magnet sequencing]`
7. **Membership vs subscription decision:** Does Ted want a true labs-style community (paid monthly access + courses + group chat) on top of the support subscription, or is the support subscription enough? Determines whether we need community access control in GHL. `[blocks GHL build pattern]` `[2026-05-15 23:50]` open per Jason.
8. **Newsletter cadence + topical scope?** `[2026-05-01 27:03 — open question]`. Weekly? Biweekly? Authority/research-update style or storytelling style? `[blocks blog auto-poster activation]`
9. **Specific tier names for the subscription/lease/purchase ladder.** Ted's verbal sketch has "Daily/Weekly/Monthly/Yearly/Rental/Lease/Purchase" — but a customer-facing pricing page needs ~3 named tiers, not 7. Which 3 does Ted want to surface, and what's in each? `[blocks subscription page]`
10. **Headshot:** When does Ted get the professional headshot? Joshua said in April that Ted shouldn't spend money on a separate photographer `[2026-04-03 20:48]` — has he done a self-iPhone shot? `[blocks Authority section finalization]`
11. **Clone video for the Authority block:** Arizona studio with Julia, OR iPhone self-recording this weekend? If Arizona, when? `[blocks About / Authority video block]`
12. **Apical Robotics dual landing page** — does Ted want us to build the Apical Robotics audience-facing site in parallel with OptiDental, or does that wait until after OptiDental is live? `[blocks dual-brand routing build]`
13. **Domain assignment:** Confirm which Porkbun domain → which page. Ted owns apicaldental, apicalrobotics, apexofthecraft, OptiDental Solutions per `[2026-04-03 35:51]`. Where does the OptiDental main site live? Where does Apical Robotics? `[blocks DNS setup, Cloudflare config]`
14. **Tesla deal status check-in.** Ted is pursuing Tesla + Fourier + Unitree + ~30 Chinese mfrs `[2026-05-01 25:21]`. If/when a deal signs, ALL copy needs a re-pass to introduce that specific manufacturer. Light tracking question, not a blocker — but a checkpoint Joshua should hit on every call.

---

## 9. Recommended build order — Arham team's punch list

**Working assumption:** Build everything that does NOT require Ted's pricing / offer-definition / Tesla-status / GHL access to be unblocked. Run the offer/pricing track on its own thread with Ted while the design+blog+calculator scaffolding ships.

### Phase A — Ship now, no Ted dependency

1. **Apply §6 copy rules pass on the existing approved draft.**
   - Replace all "prosthetics" / "prosthodontist" → "prosthodontics" / "orthodontics" globally (case-insensitive, preserve plural).
   - Replace all "Tesla" / "Optimus" / "I'm from Tesla" → "robotic manufacturer", "robotics company", "robotic manufacturer or distributor" depending on grammatical context.
   - Strip any specific production-time / remake-rate / "X%-faster" numbers; rewrite as directional ("faster production, fewer remakes, more consistent output").
   - Confirm palette is moss-green/brown family, not health-industry blue/white.
   - **No dependency** — Ted has approved direction.

2. **Add blog page wired to Authority Booster.**
   - Static page exists from Authority Booster template; just add to the OptiDental site nav.
   - Repurposing flow to LinkedIn comes later (Phase C).
   - **No dependency** — decided 2026-05-01, action item assigned to Mohammad.

3. **Build the savings-calculator UI scaffold** (just the form + result component, with placeholder constants).
   - Inputs: laboratory spend, cleaning spend, inventory spend, patient-communication spend (per Jason's `[2026-05-15 17:46]` framing). Use placeholder $-values for the math.
   - Output: annual savings figure with a "Get my custom report" CTA.
   - Wire the form submission to a placeholder endpoint until GHL is unblocked.
   - **Dependency:** Q1 + Q2 in §8 to finalize the math, but the UI can ship now with placeholder constants.

4. **Headshot placeholder + clone-video placeholder block** in the Authority section.
   - Use a stylized vector placeholder until Ted's real headshot lands.
   - Build the clone-video container with a still-image fallback (so we can drop in Arizona-studio footage when it arrives).
   - **No dependency**, but improves visual quality of the current draft.

5. **HIPAA / Compliance copy block** — add a short, defensible paragraph that covers "data handling for dental-practice operators" without making medical-grade claims FM hasn't validated.
   - Flag for Joshua to re-review before publish.
   - **Soft dependency on Q5 in §8.**

6. **Apical Robotics audience-routing concept page** — a simple wireframe / page stub at the Apical Robotics URL that explains "this is the robotics-industry-facing site, OptiDental for dental practices is at X" — minimal effort, lets us validate the dual-domain Cloudflare routing.
   - **Dependency on Q13 — domain assignment.**

### Phase B — Ship after one focused call with Ted

7. **Calculator math finalized + wired.** Once Q1+Q2 answered, plug real constants and benchmark sources into the calculator. Validate output for 3 sample practice sizes.
8. **About Ted / Authority section finalized** — real headshot + iPhone clone footage if Ted records this weekend, OR placeholder + "see our clone video soon" if he doesn't.
9. **Newsletter signup form + Welcome email template.** Build the form on the site, but route to GHL (or a temporary Mailchimp/Resend) until Jason gets GHL unblocked. Decided per Jason `[2026-05-15 13:43]`.

### Phase C — Blocked on §8 open questions / Ted commitments

10. **Paid Deep-Dive Research sales page** — blocked on Q3 + Q4 (deliverable spec + pricing).
11. **Subscription / "Rx — Prescribing the Perfect Bot" page** — blocked on Q9 (specific tier names + what's in each).
12. **GHL chatbot widget with licensed-pro handoff** — blocked on GHL onboarding (Risk 6) + Q7 (membership vs subscription decision).
13. **Full nurture sequence + welcome automation** — blocked on Q3, Q4, Q9 (need the offer skeleton committed) AND GHL onboarding (Risk 6).
14. **Case Studies / Robotics Partners page** — blocked on Tesla NDA / contract status (Risk 4, Q14).
15. **LinkedIn auto-repurpose flow** — depends on blog being live (#2) plus Authority Booster LinkedIn integration validated.

### Phase D — Quality / preview cycle

16. **Preview link to Ted + Melissa with named edits highlighted.** Per `[2026-04-24 14:31]`, Joshua wants to share preview link once team feedback comes in. Build a Vercel preview off `feat/optidental-website-v2`.
17. **Loom walkthrough of the preview** (NOT a live screen-share) — Ted is hard-of-hearing + tech-friction has cost ~10 min/call recently. A captioned Loom is the highest-confidence delivery format. Per Joshua `[2026-05-08 46:42]`.
18. **NitroPack purge after every publish push.** Per CLAUDE.md project rule.

### Implicit dependencies summary

```
Phase A (no Ted dep)
 ├─→ Phase B (one focused call: Q1,Q2 → calculator math; clone-video shoot)
 │    └─→ Phase C (offer/pricing commitment + GHL access)
 │         └─→ Phase D (preview + ship)
 └─→ Phase D (preview the Phase A scope to Ted immediately for tighter feedback loops)
```

**Recommendation:** ship Phase A scope to a Vercel preview within 5–7 days. Send Joshua a Loom walkthrough of just-the-edits applied vs the prior approved draft. That triggers Ted's next round of approvals on the items that **don't** require him to make the big offer/pricing decision — and gives Jason the maximum surface area to wire whatever GHL access he gets unblocked on.

---

## 10. Per-meeting timeline — what each call decided about the website

This is the chronological build-history with date-and-timestamp evidence. Use it when an engineer asks "why did we decide X?" or when Ted contradicts himself across meetings — fall back to the chronologically-later decision.

### 2026-01-30 — Sales call (Joshua only)

- **What was sold:** A custom proposal bundling website build + Marketing Automation Plus, with website priced separately from the $25K/$60K MA packages. `[2026-01-30 34:54]` Joshua: `"we have access to that expertise to build a website... but this will be separated the 60k as well."`
- **Out of scope (Joshua explicitly drew the line):** FM is NOT building the AI system that trains the dental laboratory robot. `[2026-01-30 45:09]` Joshua: `"just want to be super clear, you know, if it's a matter of setting up an AI system in the back end of the robots, you know, making sense of of lab work. That's not something we're doing right now."` **This is load-bearing for site copy** — the OptiDental site is the marketing infrastructure, not the robot-training AI itself.
- **Greenfield warning:** Ted had no website, no published content, no LinkedIn presence. `[2026-01-30 09:00]` Ted: `"I've I've just got the names and so forth and I haven't put it on a platform."` Joshua flagged that Marketing Automation Plus assumes an established website; Ted's path is greenfield.
- **Unique B-roll asset:** Ted has a 13-person filming team and HoverAir XT Pro drone footage that follows him in the lab. `[2026-01-30 43:04]` Ted: `"I've actually have 13 people that are well trained and I use you ever heard about the hover XT pro... It's a it's a flying drone... it follows me around the office follows me when I'm doing inside the laboratory."` — important for the About / Authority section's B-roll.

### 2026-02-27 — Onboarding (Joshua + Jason)

- **Brand colors — moss green / brown** (not health-industry blue/white). `[2026-02-27 19:37]` Ted.
- **Logo simplification** — Ted's daughter's 4-strap optimist-on-oval draft was "busy"; FM design team to simplify. `[2026-02-27 18:38]` Joshua.
- **Positioning locked = "practical solid expert with feet on the ground, like Julia"** — Ted explicitly rejected "Super Rockstar Dental Genius" framing. `[2026-02-27 39:38]` Joshua.
- **Domain + DNS strategy:** Porkbun for ownership, Cloudflare in front for security; FM controls nameservers. `[2026-02-27 25:22]` Jason.
- **Authority-building / "world expert in 3 years"** is the positioning thesis for content. `[2026-02-27 40:20]` Joshua: `"Authority building."`
- **Independence framing (load-bearing):** Ted refuses to be paid by manufacturers. `[2026-02-27 08:05]` Ted: `"I really am not looking for them to hire me or to pay me per se. In that if I did someone's going to say, Well they're paying you to say that they're they're paying you to say We're good?"`
- **Sole-decision-maker flag (early warning of bottleneck):** `[2026-02-27 10:55]` Ted: `"I've got a I call them a bottleneck. I've got a bottleneck but that works not flowing through there and so forth, say it and I will pick choose higher."`

### 2026-03-16 — OptiDental Solutions (Joshua + Jason)

- **Customer journey mirrors Julia's:** content → low-friction membership site (videos) → ascend to robot purchase/lease + ongoing service contracts. `[2026-03-16 20:41]` Ted: `"I probably duplicate something like Julia. Has for the most part, someone comes in you give them enough information, you bait the hook and you hook them a little bit, let them be part of your informational stream."` — **note:** this is the framing Jason later refined on 2026-05-15 (newsletter/subscription/membership distinction). Ted's mental model has evolved; the 2026-05-15 version overrides.
- **Trademark sweep:** Opti-Dental, OptiHospital, OptiHomeCare, OptiCareNursing — all to be filed preemptively. `[2026-03-16 46:31]` Ted.
- **Recurring meeting cadence:** Friday 11am Eastern (moved up from 10am). `[2026-03-16 46:59]` Jason.
- **Editor hire from Philippines** with passion in dental/robotics, not generic editor. `[2026-03-16 28:35]` Joshua.
- **Risk flagged: regulatory exposure** — Ted's strategy routes through unregulated dental laboratories first. `[2026-03-16 35:30]` Ted: `"There are no legal requirements for the, the dental prosthetic that you use on humans... the responsibility belongs to the doctor that actually deploys."` Marketing copy must not over-claim this advantage.

### 2026-03-20 — FM Consultation (Joshua + Jason)

- **Tesla-Optimus-first positioning was Ted's initial preference:** `[2026-03-20 19:43]` Ted: `"once I have the hardware in hand and they're okay with it. Everything else is gonna be focused where the hardware is gonna finally be placed."` (This shifted on 2026-05-01 — see Tesla edit.)
- **Multiple environment backgrounds for content pillars** — leather jacket, scuba gear, school bus, dental setting. `[2026-03-20 30:23]` Joshua/Ted decision.
- **Use Chrome, not Edge** for FM platforms (Ted's GHL signup was failing on Edge). `[2026-03-20 33:41]` Jason. Affects QA test browsers.
- **Communication channel:** all FM emails route through `projects@firstmovers.ai`. `[2026-03-20 45:36]` Joshua.

### 2026-03-27 — FM Consultation (Joshua + Jason)

- **Brand direction CONFIRMED:** "Apical" as the umbrella name spanning **Apical Robotics + Apical Dental** with tagline **"Human expertise, robotic precision"**. `[2026-03-27 11:21]` Joshua: `"Where you send another one. This is apical, robotics April dental, but it said Human expertise robotic precision. So you're covering the bases."`
- **Ted will assign an internal admin/champion** (Kelly, his Office Manager) plus 2–3 'high cognitive speed' staff as FM-side counterparts. `[2026-03-27 18:15]` Ted. (Status: never fully landed — see Risk 3.)
- **LinkedIn credentials handed over verbatim on call** — credential rotation needed (per Risk #note). `[2026-03-27 15:15]` Joshua.
- **Ted's peak surgical season** Feb 20 – end of April: working "daylight to dark." `[2026-03-27 16:30]` Ted. This explains the delivery velocity slowdown across April.
- **HIPAA email scrubber problem first surfaced** — domain/password packet never arrived. `[2026-03-27 19:50]` Ted: `"If it doesn't go right out on land with the system because I've got a full HIPAA compliance system."` (Becomes recurring issue — see 2026-04-03.)
- **Risk noted:** Ted hasn't touched a computer in close to 20 years. `[2026-03-27 01:27]` Ted: `"I'm in the office. I don't remember, it's been probably. 20 years since I actually touched. A computer."`

### 2026-04-03 — FM Consultation (Joshua + Jason)

- **Scope sprawl flagged:** apical robotics, apex of the craft, OptiDental, Optimus, RX subscriptions — Jason called it `[2026-04-03 31:35]`. Risk of overbuilding before dental-business priority lands.
- **High Level AI Assistant Claude project** becomes the standard self-service support pack for all FM clients. `[2026-04-03 12:41]` Jason. **Reusable across other clients.**
- **Photo session DEPRIORITIZED** — Joshua told Ted not to spend money. `[2026-04-03 20:48]` Joshua: `"honestly don't fuss too much about it. It's not like absolutely necessary. I would see put that money back."`
- **HIPAA email scrubber confirmed as silent send-failures:** `[2026-04-03 30:11]` Ted: `"I go sand. That are going to the send folder or the anyway, and it's like it evaporated. Until it decides then it'll come back and say I did not send or I did sand."` Affects every credential / asset Ted tries to email from his clinic.
- **Build wireframe asynchronously** while Ted finishes voice/clone — `[2026-04-03 36:28]` Joshua: `"we could get things moving on, like, villain out like a wireframe... let's be running asynchronously while you'll get in your clone and everything set up"`. This is the seed of the "Phase A — no Ted dependency" build pattern.

### 2026-04-10 — FM Consultation (Joshua + Jason)

- **Dual-landing-page strategy LOCKED.** `[2026-04-10 33:42]` Ted: `"if you're talking to the robot people, it's, it's apical robotics, if you're talking to the To your clients dentists that you're gonna do this. It's probably gonna be optical dental or apical dental. Which will make sense to them and you can have you can have a double landing page and website and it will divert into the right spots"`. **Authoritative source for the Apical Robotics + OptiDental dual-page architecture.**
- **First Movers gets admin access to Ted's OptiDental Claude account** so the team can directly tweak the copywriting engine. `[2026-04-10 32:41]` Joshua.
- **Anthropic upsell emails are noise** — Ted should ignore unsolicited Anthropic emails about "team to help build websites." `[2026-04-10 36:33]` Ted/Joshua.
- **Async-friendly delivery is mandatory** — Ted's surgery interruptions mean any 8-hour continuous-block onboarding fails. `[2026-04-10 20:31]` Ted.

### 2026-04-17 — FM Consultation (Joshua + Jason)

- **3-week miscommunication resolved:** Ted thought he had to email actual audio files of his voice; team only needed transcripts ("voice" = sentence-structure-essence, not literal audio). `[2026-04-17 03:45]` Joshua took ownership of unclear lingo. Project velocity recovers post-clarification.
- **Clone-creation kit handed over:** questionnaire + Google Drive upload link + HeyGen + ElevenLabs SOPs sent EOD Friday. `[2026-04-17 20:04]` Joshua.
- **Video clone specs locked:** 1080p minimum, 2-minute minimum per segment, multiple emotional states + outfits, face-tracking disabled, stable tripod. `[2026-04-17 13:54]` Joshua.
- **ElevenLabs audio specs:** 30 min minimum, 1 hr ideal, 2 hr best. `[2026-04-17 19:04]` Joshua.
- **Ted hiring Melissa onto the project** to leave a hygienist job and join full-time. `[2026-04-17 24:10]` Ted: `"I'm hiring up Melissa to make her quit one of her other jobs, so she's here with this every Friday or whenever we're meeting and so forth."`

### 2026-04-24 — FM Consultation (Joshua + Jason + Miles introduced)

- **Miles Tan introduced as new PM** sitting in on meetings going forward. `[2026-04-24]` Casual intro.
- **Website preview link queued** — `[2026-04-24 14:31]` Joshua: `"if anything, I could just send you a link so you could go through the website design and see, you know, give us some feedback on that."` This previews the 2026-05-01 review session.
- **Ted's GHL plateau hardens:** Two-thirds through onboarding, needs 1.5hr block, can't carve from surgery schedule. `[2026-04-24 12:54]` Ted: `"I'm two thirds through that and they said to Recontact and I've contacted them back and they said Well we're gonna need about an hour and a half, I don't have that."` Blocks Jason's automation work.
- **Voice clone recording method coached** — solo monologues sound like reading; route the conversation over internet with a real person + headset. `[2026-04-24 04:48]` Joshua. Best topic = something Ted is passionately animated about (chasing his runaway dog).

### 2026-05-01 — FM Consultation (Joshua + Jason — WEBSITE REVIEW)

**THIS IS THE APPROVAL MEETING.** All section-by-section approval quotes are in §2. Plus:

- Joshua's screen-share walks through 9+ sections (see §2 sitemap).
- Edit list captured in §6 (5 named edits, all flagged by Ted or Joshua).
- Blog page + Authority Booster decision logged `[26:28]`.
- GHL access confirmed by Jason `[27:43]`.
- LinkedIn organic following at 2,000+ disclosed `[29:10]`.

### 2026-05-08 — FM Consultation (Joshua + Miles; Jason absent — traveling)

- **HeyGen + ElevenLabs full walkthrough** — Joshua screen-shared the entire pipeline. Ted's recording barrier surfaced `[01:37]`.
- **In-person Arizona studio offer with Julia** — Ted commits to flying out `[25:47]`.
- **Tech-friction precedent:** Google Meet audio dropped + screen-share crashed mid-demo, forcing repeats. Recommendation: move future calls to Zoom.
- **Melissa explicitly asks for her own task list** `[48:57]`. **Open thread — not resolved on call.**

### 2026-05-15 — FM Consultation (Joshua + Jason; Melissa with laryngitis)

**This is the offer-architecture + lead-magnet meeting.** All decisions in §4 and §5.

- Free → paid deep-dive → tiered subscription architecture verbally sketched `[09:28–11:52]`.
- Calculator > PDF decision `[17:03]`.
- Subscription ≠ membership correction `[23:50]`.
- Staff-as-mirrors principle articulated by Ted `[20:11]`, encoded as Claude skill action `[20:53]`.
- HeyGen upload workaround (Google Drive link) `[02:18]`.
- Pricing for paid deep-dive still TBD `[09:50]` — **biggest remaining offer-blocker**.

---

## 11. Asset inventory — what we have, what we need

**Owned by Ted (delivered or pending delivery):**

| Asset | State | Evidence |
|---|---|---|
| Porkbun domains (apicaldental, apicalrobotics, apexofthecraft, OptiDental Solutions, GoDaddy logins) | Existence confirmed; delivery to `projects@firstmovers.ai` has had HIPAA-scrubber issues `[2026-04-03 30:11]` | Confirm domain assignment per Open Q #13 |
| LinkedIn account (`ted.lewis41@yahoo.com`) — 2,000+ followers | FM has live login per `[2026-03-27 14:49]` — **rotate after work completes** | Risk note |
| Claude project (`9487indianapolis@gmail.com`) tied to apicaldental | FM has admin access per `[2026-04-10 32:41]` | Used for Authority Booster |
| HoverAir XT Pro drone footage from Ted's lab | Existing footage — original B-roll source | `[2026-01-30 43:04]` |
| Ted's iPhone 16 Pro clone-recording attempts | Pending; blocked on self-recording barrier (Risk 1) | `[2026-05-01 33:14]` |
| ElevenLabs voice clone (Creator plan + API key with full perms) | Recording captured; API key on Joshua's side | `[2026-05-08 14:48]` |
| HeyGen avatar imagery | In progress; >1GB files moved via Google Drive link `[2026-05-15 02:18]` | Avatar 5 update may force a reshoot per Julia |
| ~13-person filming team | Existing | `[2026-01-30 43:04]` |
| Trademark filings (Opti-prefix family + RX prescribing the perfect bot) | Pending — was on track for "the 27th" | `[2026-03-16 46:31]` |
| GHL account | Two-thirds onboarded, stuck — Jason needs to take over | `[2026-04-24 12:54]`, `[2026-05-08 02:25]` |
| Trial property-tax appeal letter (Claude-drafted, attorney-approved) | Internal proof-point Ted carries; not a website asset but a credibility moment | `[2026-05-15 05:36]` |

**Owned by FM:**

| Asset | State | Location |
|---|---|---|
| OptiDental website draft (Elementor / WP) | Approved direction 2026-05-01; edit-pass pending | Where? — confirm with Mohammad |
| Authority Booster + Claude OptiDental project | FM admin access | `9487indianapolis@gmail.com` Claude account |
| Brand-asset deck | Established 2026-02-27 | Google Drive |
| Copywriting Engine assets | Populated `[2026-04-10 31:53]` | OptiDental Claude project |
| Clone-creation kit (SOPs + questionnaire + phoneme paragraph) | Sent 2026-04-17 | Google Drive |
| High Level AI Assistant Claude project (reusable) | Built and reused across clients `[2026-04-03 12:41]` | Standing FM asset |
| GHL access for Jason (`projects@firstmovers.ai`) | Established `[2026-05-01 27:43]` | GHL |
| Recurring Friday 11am Eastern meeting cadence | Confirmed `[2026-03-16 46:59]` | Meeting calendar |

**Still needed from Ted (asks for next call):**

- See §8 Open Questions #1–14.
- Plus: domain DNS confirmation, real headshot, calculator input/output spec, finalized pricing, finalized tier names, GHL onboarding completion, clone recording (iPhone or Arizona).

**Still needed from FM internally:**

- Confirm where the website draft lives (which WP install / hosting environment) and produce a Vercel preview URL.
- Build the savings calculator UI scaffold with placeholder constants.
- Generate the §6 copy-edit diff against the approved 2026-05-01 draft.
- Schedule the Jason GHL onboarding pickup (next call after 2026-05-15).
- Coordinate Julia's calendar for the Arizona studio shoot (per 2026-05-08 Joshua commit).

## 12. Brand identity quick-reference

Quick visual-language reference for the engineer who's never read the brand calls:

- **Colors:** Moss green / brown earth-tones. NOT dental-industry blue/white. `[2026-02-27 19:37]` Ted.
- **Logo direction:** Simplified from Ted's draughter's draft (4-strap optimist-on-oval was "busy"). Iconography-driven. `[2026-02-27 18:38]` Joshua.
- **Tagline:** "Human expertise, robotic precision." `[2026-03-27 11:21]` confirmed.
- **Submark / pillar:** "Rx — prescribing the perfect bot." `[2026-04-03 31:35]`, `[2026-05-01 12:32]` Ted.
- **Voice:** Practical, feet-on-the-ground expert. NOT "rockstar dental genius." `[2026-02-27 39:38]` Joshua.
- **Brand-family naming convention:** "Apical" as umbrella (Apical Robotics + Apical Dental); "Opti" as the dental-vertical family (OptiDental, OptiHospital, OptiHomeCare, OptiCareNursing). `[2026-03-16 46:31]`, `[2026-03-27 11:21]`.

## Appendix — meeting-date index (for re-fetching evidence)

| Date | Meeting name | Vault coverage |
|---|---|---|
| 2026-01-30 | First Movers AI Consultation — Dr. Ted Lewis (initial sales) | Joshua_brain only |
| 2026-02-27 | Ted Lewis and First Movers — Onboarding Call | both |
| 2026-03-06 | FM Consultation — Ted Lewis (OptiDental Solutions) | both |
| 2026-03-16 | OptiDental Solutions — Ted Lewis | both |
| 2026-03-20 | FM Consultation — OptiDental | both |
| 2026-03-27 | FM Consultation — OptiDental | both |
| 2026-04-03 | FM Consultation — OptiDental | both |
| 2026-04-10 | FM Consultation — OptiDental (apical branding split) | both |
| 2026-04-17 | FM Consultation — OptiDental (voice-vs-audio confusion resolved) | both |
| 2026-04-24 | FM Consultation — OptiDental (Miles introduced; preview link queued) | both |
| 2026-05-01 | FM Consultation — OptiDental (**website draft approved**) | both |
| 2026-05-08 | FM Consultation — OptiDental (HeyGen + ElevenLabs walkthrough) | both |
| 2026-05-15 | FM Consultation — OptiDental (**lead magnet + offer architecture; calculator decided**) | both |

Per-meeting JSON extractions at:
- `/Users/mohammadarhamansari/Code/firstmover.ai/Joshua_brain/First Movers AI/data/extractions/`
- `/Users/mohammadarhamansari/Code/firstmover.ai/Jason_brain/First Movers AI/data/extractions/`

Verbatim transcripts at:
- `/Users/mohammadarhamansari/Code/firstmover.ai/Joshua_brain/First Movers AI/transcripts/`
- `/Users/mohammadarhamansari/Code/firstmover.ai/Jason_brain/First Movers AI/transcripts/`

Cross-vault thread (canonical aggregator):
- `/Users/mohammadarhamansari/Code/firstmover.ai/tldv-threads/ted-lewis-optidental.md`

Pre-existing structured outputs:
- `/Users/mohammadarhamansari/Code/firstmover.ai/firstmover/clients/ted-lewis-optidental/`
