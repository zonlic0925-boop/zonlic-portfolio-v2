import { PERSON, SHEET, content } from './content.js'
import { icon } from './icons.js'

/* ------------------------------------------------------------------ state */

const ZONES = [
  { key: 'a', id: 'zone-a' },
  { key: 'b', id: 'zone-b' },
  { key: 'c', id: 'zone-c' },
  { key: 'd', id: 'zone-d' },
  { key: 'e', id: 'zone-e' },
  { key: 'f', id: 'zone-f' },
]

const store = {
  read(key, fallback) {
    try {
      return localStorage.getItem(key) ?? fallback
    } catch {
      return fallback
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch {
      /* private mode: the session still works, it just will not be remembered */
    }
  },
}

const prefersDark =
  typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches

const state = {
  lang: store.read('zonlic.lang', /^zh/i.test(navigator.language || '') ? 'zh' : 'en'),
  theme: store.read('zonlic.theme', prefersDark ? 'night' : 'sheet'),
  tracedTimer: 0,
  lightboxTrigger: null,
}

const t = () => content[state.lang]

/* ---------------------------------------------------------------- helpers */

const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  )

const project = (file) => `assets/projects/${file}`
const portrait = 'assets/img/portrait.png'

const $ = (sel, root = document) => root.querySelector(sel)

/* --------------------------------------------------------------- renderers */

function renderStrip() {
  const copy = t()
  $('[data-bind="strip-name"]').textContent = `${PERSON.name}`
  $('[data-bind="strip-no"]').textContent = `${SHEET.drawingNo} · ${copy.titleBlock.fields.sheet} ${SHEET.sheet}`
  $('[data-bind="menu-label"]').textContent = copy.ui.menu
  $('[data-bind="foot-name"]').textContent = `${PERSON.name} (${PERSON.alias})`
  $('[data-bind="foot-meta"]').textContent = `${copy.titleBlock.fields.drawingNo} ${SHEET.drawingNo}   ${copy.titleBlock.fields.date} ${SHEET.date}`

  const links = ZONES.map(
    (zone) =>
      `<a href="#${zone.id}" data-zone="${zone.id}">${esc(copy.zones[zone.key])}</a>`,
  ).join('')
  $('#jump').innerHTML = links
  $('#menu').innerHTML = links

  $('#rail').innerHTML = ZONES.map(
    (zone) =>
      `<a class="rail__tick" href="#${zone.id}" data-zone="${zone.id}" aria-label="${esc(
        copy.zones[zone.key],
      )}">${zone.key.toUpperCase()}</a>`,
  ).join('')

  $('[data-bind="lang-group"]').innerHTML = [
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '繁中' },
  ]
    .map(
      (option) =>
        `<button type="button" class="lang-btn" data-lang="${option.code}" aria-pressed="${
          state.lang === option.code
        }" aria-label="${esc(copy.ui.language)}: ${option.label}">${option.label}</button>`,
    )
    .join('')
}

function renderZoneA() {
  const copy = t()
  const name = copy.general.nameLines
    .map((line, index) => `<span class="draw-in draw-in--${index + 1}">${esc(line)}</span>`)
    .join('')

  const fields = [
    { key: 'name', label: copy.titleBlock.fields.name, value: PERSON.name, mono: false },
    { key: 'location', label: copy.titleBlock.fields.location, value: copy.titleBlock.location, mono: false },
    { key: 'drawingNo', label: copy.titleBlock.fields.drawingNo, value: SHEET.drawingNo, mono: true },
    { key: 'date', label: copy.titleBlock.fields.date, value: SHEET.date, mono: true },
    { key: 'sheet', label: copy.titleBlock.fields.sheet, value: SHEET.sheet, mono: true },
  ]

  $('#zone-a').innerHTML = `
    <div class="general__view">
      <div class="part">
        <h1 class="part__name" id="zone-a-title">${name}</h1>
        <p class="part__alias">${esc(copy.general.alias)}</p>
        <p class="part__role draw-in draw-in--3">${esc(copy.titleBlock.role)}</p>
      </div>
      <span class="leader draw-in--2" aria-hidden="true"></span>
      <figure class="detail draw-in draw-in--2">
        <img class="detail__img" src="${portrait}" width="819" height="1024"
             alt="${esc(`${PERSON.name} (${PERSON.alias}), portrait photograph`)}"
             fetchpriority="high" decoding="async" />
        <figcaption class="detail__caption">
          <span class="field-label">${esc(copy.general.caption)}</span>
          <span class="field-label">${esc(PERSON.alias)}</span>
        </figcaption>
      </figure>
    </div>
    <div class="titleblock">
      <dl class="titleblock__fields">
        ${fields
          .map(
            (field) => `
          <div class="tb-field" data-field="${field.key}">
            <dt class="field-label">${esc(field.label)}</dt>
            <dd class="tb-field__value${field.mono ? ' tb-field__value--mono' : ''}">${esc(
              field.value,
            )}</dd>
          </div>`,
          )
          .join('')}
      </dl>
      <div class="titleblock__cta">
        <a class="btn" href="mailto:${PERSON.email}">${icon('envelopeSimple')}${esc(
          copy.titleBlock.cta,
        )}</a>
      </div>
    </div>
  `
}

function renderZoneB() {
  const copy = t()
  const record = copy.inspection

  $('#zone-b').innerHTML = `
    <div class="zone__head">
      <div class="zone__rule"><h2 class="sheet-title" id="zone-b-title">${esc(
        record.heading,
      )}</h2></div>
    </div>
    <table class="record">
      <caption class="visually-hidden">${esc(record.heading)}</caption>
      <colgroup>
        <col style="width: 64px" />
        <col style="width: 22%" />
        <col style="width: 30%" />
        <col style="width: 26%" />
        <col style="width: 96px" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">${esc(record.columns.item)}</th>
          <th scope="col">${esc(record.columns.characteristic)}</th>
          <th scope="col">${esc(record.columns.method)}</th>
          <th scope="col">${esc(record.columns.evidence)}</th>
          <th scope="col">${esc(record.columns.ref)}</th>
        </tr>
      </thead>
      <tbody>
        ${record.rows
          .map(
            (row) => `
          <tr id="rec-${row.balloon}" data-balloon="${row.balloon}">
            <td class="record__item">
              <button type="button" class="balloon" data-trace="${row.balloon}" aria-pressed="false"
                      aria-label="${esc(`${record.columns.item} ${row.balloon}: ${row.characteristic}`)}">${esc(
                        row.balloon,
                      )}</button>
            </td>
            <td class="record__characteristic">${esc(row.characteristic)}</td>
            <td class="record__cell record__cell--method" data-label="${esc(
              record.columns.method,
            )}">${esc(row.method)}</td>
            <td class="record__cell" data-label="${esc(record.columns.evidence)}">${esc(
              row.evidence,
            )}</td>
            <td class="record__ref" data-label="${esc(record.columns.ref)}">
              <a href="#${row.target}">${esc(row.ref)}</a>
            </td>
          </tr>`,
          )
          .join('')}
      </tbody>
    </table>
    <p class="table-note">${esc(copy.ui.balloonHint)}</p>
  `
}

function plateFigure(figure, index, copy) {
  return `
    <figure class="plate">
      <button type="button" class="plate__frame" data-plate="${project(figure.file)}"
              data-caption="${esc(figure.caption)}" aria-label="${esc(figure.alt)}">
        <img src="${project(figure.file)}" width="${figure.w}" height="${figure.h}"
             alt="${esc(figure.alt)}" loading="lazy" decoding="async" />
      </button>
      <figcaption class="plate__caption">
        <span class="plate__label">${esc(copy.ui.figure)} ${index + 1}</span>
        <span class="plate__text">${esc(figure.caption)}</span>
      </figcaption>
    </figure>`
}

function plateAttachment(item) {
  return `
    <figure class="plate">
      <button type="button" class="plate__frame plate__frame--tall" data-plate="${project(
        item.file,
      )}" data-caption="${esc(item.caption)}" aria-label="${esc(item.alt)}">
        <img src="${project(item.file)}" width="${item.w}" height="${item.h}"
             alt="${esc(item.alt)}" loading="lazy" decoding="async" />
      </button>
      <figcaption class="plate__caption">
        <span class="plate__text">${esc(item.caption)}</span>
      </figcaption>
    </figure>`
}

function plateDemo(demo, index, copy) {
  return `
    <figure class="plate">
      <button type="button" class="plate__frame" data-demo="${project(demo.file)}"
              data-title="${esc(demo.title)}" aria-label="${esc(`${copy.ui.play}: ${demo.title}`)}">
        <img src="${project(demo.poster)}" width="720" height="405"
             alt="${esc(demo.title)}" loading="lazy" decoding="async" />
        <span class="plate__play">${icon('play')}${esc(copy.ui.playShort)}</span>
      </button>
      <figcaption class="plate__caption">
        <span class="plate__label">${esc(copy.ui.figure)} ${index + 1}</span>
        <span class="plate__title">${esc(demo.title)}</span>
        <span class="plate__text">${esc(demo.description)}</span>

      </figcaption>
    </figure>`
}

function viewNotes(view, copy) {
  return `
    <div class="view__notes">
      <div class="notes-head">
        <span class="field-label">${esc(copy.views.highlightsLabel)}</span>
        <span class="notes-head__ref">
          <span class="field-label">${esc(copy.inspection.columns.ref)}</span>
          <button type="button" class="balloon balloon--dashed" data-trace="${view.trace}"
                  aria-pressed="false" aria-label="${esc(
                    `${copy.ui.balloonHint}: ${copy.inspection.columns.item} ${view.trace}`,
                  )}">${esc(view.trace)}</button>
        </span>
      </div>
      <ul class="note-lines">
        ${view.highlights
          .map(
            (line) => `
          <li class="note-line">
            <span class="note-line__mark" aria-hidden="true"></span>
            <span class="note-line__text">${esc(line)}</span>
          </li>`,
          )
          .join('')}
      </ul>
    </div>`
}

function viewLinks(view, copy) {
  if (!view.links) return ''
  return `
    <div class="links">
      ${view.links
        .map(
          (link) =>
            `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${esc(
              link.label,
            )}<span class="visually-hidden"> (${esc(copy.ui.external)})</span>${icon(
              'arrowUpRight',
            )}</a>`,
        )
        .join('')}
      ${
        view.qr
          ? `<figure class="qr">
               <img src="${project(view.qr.file)}" width="348" height="348"
                    alt="${esc(view.qr.alt)}" loading="lazy" decoding="async" />
               <figcaption>${esc(view.qr.caption)}</figcaption>
             </figure>`
          : ''
      }
    </div>`
}

function renderZoneC() {
  const copy = t()
  const views = copy.views

  const body = views.views
    .map((view) => {
      const summary = `
        <div class="view__summary">
          <p class="prose">${esc(view.description)}</p>
          ${viewNotes(view, copy)}
        </div>`

      let media = ''
      let variant = 'view'

      if (view.figures) {
        variant = 'view view--media-first'
        media = `
          <div class="plates plates--figures">
            ${view.figures.map((figure, index) => plateFigure(figure, index, copy)).join('')}
          </div>`
      }

      if (view.demos) {
        variant = 'view view--demos'
        const shipped = view.demos.filter((demo) => !demo.status)
        const pending = view.demos.filter((demo) => demo.status)
        media = `
          <div class="plates plates--demos">
            ${shipped.map((demo) => plateDemo(demo, view.demos.indexOf(demo), copy)).join('')}
          </div>
          ${pending
            .map(
              (demo) => `
          <div class="view__dev">
            <div class="plates plates--single">
              ${plateDemo(demo, view.demos.indexOf(demo), copy)}
            </div>
            <div class="view__dev-note">
              <span class="field-label">${esc(demo.status)}</span>
              <p>${esc(demo.description)}</p>
              <p>${esc(copy.views.devNote)}</p>
            </div>
          </div>`,
            )
            .join('')}
        `
      }

      if (view.id === 'view-vietnam') {
        media = `
          <div class="route">
            <div class="route__line">
              ${view.stops
                .map(
                  (stop, index) => `
                <div class="route__stop${index === view.stops.length - 1 ? ' route__stop--end' : ''}">
                  <span class="route__measure">${esc(view.stops[index].measure)}</span>
                  <span class="route__label">${esc(view.stops[index].label)}</span>
                </div>`,
                )
                .join('')}
            </div>
          </div>`
      }

      if (view.id === 'view-wuyi') {
        media = `
          <div class="papers">
            ${view.papers
              .map(
                (paper, index) => `
              <div class="paper">
                <span class="paper__index">${esc(`${copy.ui.figure} ${index + 1}`)}</span>
                <span class="paper__title">${esc(paper.title)}</span>
                <span class="paper__body">${esc(paper.body)}</span>
              </div>`,
              )
              .join('')}
          </div>
          <div class="instruments">
            ${view.instruments
              .map((item) => `<span class="instrument">${esc(item)}</span>`)
              .join('')}
          </div>`
      }

      // Vietnam and Wuyi carry no media, so their notes read as the whole record.
      const summaryForPlain = view.id === 'view-vietnam' || view.id === 'view-wuyi' ? '' : summary

      return `
        <article class="${variant}" id="${view.id}" data-trace="${view.trace}">
          <header class="view__head">
            <span class="view__label">${esc(view.label)}</span>
            <h3 class="view__name">${esc(view.name)}</h3>
            <span class="view__meta">${esc(view.category)}<br />${esc(view.period)}<br />${esc(
              view.place,
            )}</span>
          </header>
          <div class="view__body">
            ${summaryForPlain}
            ${media}
          </div>
          ${
            view.id === 'view-vietnam' || view.id === 'view-wuyi'
              ? `<div class="view__foot">${viewNotes(view, copy)}</div>`
              : ''
          }
          ${viewLinks(view, copy)}
        </article>`
    })
    .join('')

  $('#zone-c').innerHTML = `
    <div class="zone__head">
      <div class="zone__rule"><h2 class="sheet-title" id="zone-c-title">${esc(
        views.heading,
      )}</h2></div>
    </div>
    ${body}
  `
}

function renderZoneD() {
  const copy = t()
  const revisions = copy.revisions
  const attachments = revisions.rows.find((row) => row.media)

  $('#zone-d').innerHTML = `
    <div class="zone__head">
      <div class="zone__rule"><h2 class="sheet-title" id="zone-d-title">${esc(
        revisions.heading,
      )}</h2></div>
    </div>
    <table class="revisions">
      <caption class="visually-hidden">${esc(revisions.heading)}</caption>
      <colgroup>
        <col style="width: 56px" />
        <col style="width: 18%" />
        <col style="width: 60%" />
        <col style="width: 110px" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">${esc(revisions.columns.rev)}</th>
          <th scope="col">${esc(revisions.columns.period)}</th>
          <th scope="col">${esc(revisions.columns.entry)}</th>
          <th scope="col">${esc(revisions.columns.place)}</th>
        </tr>
      </thead>
      <tbody>
        ${revisions.rows
          .map(
            (row) => `
          <tr id="${row.id}" data-trace="${row.trace}">
            <td class="revisions__rev">
              <span class="revisions__letter" aria-hidden="true">${esc(row.rev)}</span>
              <a class="revisions__ref" href="#rec-${row.trace}">${esc(
                copy.inspection.columns.item,
              )} ${esc(row.trace)}</a>
            </td>
            <td class="revisions__period" data-label="${esc(revisions.columns.period)}">${esc(
              row.period,
            )}</td>
            <td>
              <span class="revisions__entry">${esc(row.entry)}</span>
              <ul class="revisions__details">
                ${row.details.map((detail) => `<li>${esc(detail)}</li>`).join('')}
              </ul>
            </td>
            <td class="revisions__place" data-label="${esc(revisions.columns.place)}">${esc(
              row.place,
            )}</td>
          </tr>`,
          )
          .join('')}
      </tbody>
    </table>
    ${
      attachments
        ? `<div class="attachments">
             <div class="zone__rule"><h3 class="sub-title">${esc(copy.views.attachmentsHeading)}</h3></div>
             <div class="plates plates--attachments">
               ${attachments.media.map((item) => plateAttachment(item)).join('')}
             </div>
           </div>`
        : ''
    }
  `
}

function renderZoneE() {
  const copy = t()
  const notes = copy.notes

  $('#zone-e').innerHTML = `
    <div class="zone__head">
      <div class="zone__rule"><h2 class="sheet-title" id="zone-e-title">${esc(
        notes.heading,
      )}</h2></div>
    </div>
    <ol class="notes">
      ${notes.items
        .map(
          (note, index) => `
        <li class="notes__item">
          <span class="notes__no">${String(index + 1).padStart(2, '0')}</span>
          <span class="notes__text"><span class="notes__label">${esc(note.label)}.</span> ${esc(
            note.text,
          )}</span>
        </li>`,
        )
        .join('')}
    </ol>
  `
}

function renderZoneF() {
  const copy = t()
  const signoff = copy.signoff

  const fields = [
    { label: signoff.fields.email, value: PERSON.email, href: `mailto:${PERSON.email}` },
    { label: signoff.fields.phone, value: PERSON.phone, href: `tel:${PERSON.phoneHref}` },
    {
      label: signoff.fields.linkedin,
      value: PERSON.linkedinLabel,
      href: PERSON.linkedin,
      external: true,
    },
    {
      label: signoff.fields.github,
      value: PERSON.githubLabel,
      href: PERSON.github,
      external: true,
    },
  ]

  $('#zone-f').innerHTML = `
    <div class="zone__head">
      <div class="zone__rule"><h2 class="sheet-title" id="zone-f-title">${esc(
        signoff.heading,
      )}</h2></div>
    </div>
    <div class="signoff">
      <dl class="signoff__fields">
        ${fields
          .map(
            (field) => `
          <div class="signoff__field">
            <dt class="field-label">${esc(field.label)}</dt>
            <dd class="signoff__value"><a href="${field.href}"${
              field.external ? ' target="_blank" rel="noopener noreferrer"' : ''
            }>${esc(field.value)}</a></dd>
          </div>`,
          )
          .join('')}
      </dl>
      <div class="signoff__aside">
        <p class="signoff__note">${esc(signoff.note)}</p>
        <a class="btn" href="mailto:${PERSON.email}">${icon('envelopeSimple')}${esc(
          signoff.cta,
        )}</a>
      </div>
      <div class="signoff__drawn">
        <span class="mono">${esc(signoff.drawnBy)} <span class="signoff__drawn-name">${esc(
          PERSON.name,
        )}</span></span>
        <span class="mono">${esc(SHEET.drawingNo)}  ${esc(SHEET.date)}</span>
      </div>
    </div>
  `
}

function renderAll() {
  renderStrip()
  renderZoneA()
  renderZoneB()
  renderZoneC()
  renderZoneD()
  renderZoneE()
  renderZoneF()
  observeZones()
  observeDrawings()
}

/* ------------------------------------------------------------- behaviour */

function applyTheme() {
  document.documentElement.dataset.theme = state.theme
  const button = $('#theme-btn')
  const night = state.theme === 'night'
  button.setAttribute('aria-pressed', String(night))
  button.setAttribute('aria-label', t().ui.theme)
  $('[data-bind="theme-icon"]').innerHTML = icon(night ? 'sun' : 'moon')
  $('[data-bind="theme-label"]').textContent = night ? t().ui.dayShort : t().ui.themeShort
  const meta = document.querySelector('meta[name="theme-color"]:not([media])')
  if (meta) meta.setAttribute('content', night ? '#13171a' : '#eef0ed')
}

function applyLang() {
  const copy = t()
  document.documentElement.lang = copy.lang
  document.title = copy.title
  document.querySelector('meta[name="description"]').setAttribute('content', copy.description)
  document.querySelector('.skip').textContent = copy.ui.skip
  renderAll()
  applyTheme()
  setZoneState()
}

let zoneObserver = null

function observeZones() {
  if (zoneObserver) zoneObserver.disconnect()
  const sections = ZONES.map((zone) => document.getElementById(zone.id)).filter(Boolean)
  const visible = new Map()

  zoneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visible.set(entry.target.id, entry.intersectionRatio))
      let best = null
      let bestRatio = 0
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio
          best = id
        }
      })
      if (best) currentZone = best
      setZoneState()
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
  )

  sections.forEach((section) => zoneObserver.observe(section))
}

let currentZone = ZONES[0].id

function setZoneState() {
  document.querySelectorAll('[data-zone]').forEach((link) => {
    const active = link.dataset.zone === currentZone
    if (active) link.setAttribute('aria-current', 'true')
    else link.removeAttribute('aria-current')
  })
}

let drawObserver = null

// Leaders extend once as their record arrives: the sheet's own motion, not a
// per-section entrance replay.
function observeDrawings() {
  if (drawObserver) drawObserver.disconnect()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  drawObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          drawObserver.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.2 },
  )

  document.querySelectorAll('.view').forEach((el) => drawObserver.observe(el))
}

function traceTo(targetId) {
  const target = document.getElementById(targetId)
  if (!target) return
  window.clearTimeout(state.tracedTimer)
  document.querySelectorAll('[data-traced]').forEach((el) => el.removeAttribute('data-traced'))
  target.setAttribute('data-traced', 'true')
  target.scrollIntoView({ block: 'center', behavior: 'smooth' })
  state.tracedTimer = window.setTimeout(() => target.removeAttribute('data-traced'), 2600)
}

function traceFrom(balloon) {
  const row = document.getElementById(`rec-${balloon}`)
  if (!row) return
  window.clearTimeout(state.tracedTimer)
  document.querySelectorAll('[data-traced]').forEach((el) => el.removeAttribute('data-traced'))
  document
    .querySelectorAll(`[data-trace="${balloon}"][aria-pressed]`)
    .forEach((btn) => btn.setAttribute('aria-pressed', 'true'))
  row.setAttribute('data-traced', 'true')
  row.scrollIntoView({ block: 'center', behavior: 'smooth' })
  state.tracedTimer = window.setTimeout(() => {
    row.removeAttribute('data-traced')
    document
      .querySelectorAll(`[data-trace="${balloon}"][aria-pressed]`)
      .forEach((btn) => btn.setAttribute('aria-pressed', 'false'))
  }, 2600)
}

function openLightbox(src, caption, trigger) {
  const dialog = $('#lightbox')
  state.lightboxTrigger = trigger
  dialog.innerHTML = `
    <div class="lightbox__inner">
      <img src="${src}" alt="" />
      <p class="lightbox__caption" id="lightbox-caption">${esc(caption)}</p>
    </div>
    <button type="button" class="lightbox__close" data-close>${icon('x')}${esc(t().ui.close)}</button>
  `
  if (typeof dialog.showModal === 'function') dialog.showModal()
  else dialog.setAttribute('open', '')
}

function closeLightbox() {
  const dialog = $('#lightbox')
  if (dialog.open && typeof dialog.close === 'function') dialog.close()
  else dialog.removeAttribute('open')
  if (state.lightboxTrigger) {
    state.lightboxTrigger.focus()
    state.lightboxTrigger = null
  }
}

function playDemo(frame, src, title) {
  document.querySelectorAll('video[data-inline]').forEach((video) => video.pause())
  const video = document.createElement('video')
  video.src = src
  video.controls = true
  video.autoplay = true
  video.playsInline = true
  video.preload = 'metadata'
  video.dataset.inline = 'true'
  video.setAttribute('aria-label', title)
  frame.replaceChildren(video)
  frame.dataset.playing = 'true'
  frame.setAttribute('aria-label', `${t().ui.playing}: ${title}`)
}

function closeMenu() {
  const menu = $('#menu')
  menu.hidden = true
  $('#menu-btn').setAttribute('aria-expanded', 'false')
}

/* --------------------------------------------------------------- wiring */

document.addEventListener('click', (event) => {
  const trace = event.target.closest('[data-trace]')
  if (trace && trace.tagName === 'BUTTON') {
    traceFrom(trace.dataset.trace)
    return
  }

  const recordBalloon = event.target.closest('[data-balloon] button[data-trace]')
  if (recordBalloon) return

  const plate = event.target.closest('[data-plate]')
  if (plate) {
    openLightbox(plate.dataset.plate, plate.dataset.caption, plate)
    return
  }

  const demo = event.target.closest('[data-demo]')
  if (demo && !demo.dataset.playing) {
    playDemo(demo, demo.dataset.demo, demo.dataset.title)
    return
  }

  if (event.target.closest('[data-close]') || event.target.id === 'lightbox') {
    closeLightbox()
    return
  }

  const lang = event.target.closest('[data-lang]')
  if (lang) {
    state.lang = lang.dataset.lang
    store.write('zonlic.lang', state.lang)
    applyLang()
    return
  }

  if (event.target.closest('#theme-btn')) {
    state.theme = state.theme === 'night' ? 'sheet' : 'night'
    store.write('zonlic.theme', state.theme)
    applyTheme()
    return
  }

  if (event.target.closest('#menu-btn')) {
    const menu = $('#menu')
    const open = menu.hidden
    menu.hidden = !open
    $('#menu-btn').setAttribute('aria-expanded', String(open))
    return
  }

  const jump = event.target.closest('[data-zone]')
  if (jump) closeMenu()
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu()
})

$('#lightbox').addEventListener('close', () => {
  if (state.lightboxTrigger) {
    state.lightboxTrigger.focus()
    state.lightboxTrigger = null
  }
})

document.documentElement.dataset.theme = state.theme
applyLang()
