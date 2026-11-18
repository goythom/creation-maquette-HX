import { pixel } from './pixel-dom.mjs'
import { frenchTree } from './translate-dom.mjs'

function pastedImages(clipboardData) {
  const files = []
  if (!clipboardData) return files
  const items = clipboardData.items
  if (!items) return files
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.kind === 'file' && item.type && item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) files.push(file)
    }
  }
  return files
}

export function renderLocalUploadChooser({
  lang = 'en',
  onClose,
  onComputer,
  onPhone,
  onFiles,
  pasteOnly = false,
  video = false,
  onReuse,
  existingPhotoCount = 0,
} = {}) {
  const fr = lang === 'fr'

  if (!pasteOnly && !onPhone && !onReuse) {
    queueMicrotask(() => { onComputer() })
    return null
  }

  const previousActive = document.activeElement
  const scrollY = window.scrollY
  const prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'

  let openedFile = false
  let busy = false
  let error = ''
  let attached = false
  let firstAttach = true
  let disposed = false

  const root = document.createElement('div')
  root.className = 'ready'

  const box = document.createElement('div')
  box.className = 'ready__box upload-chooser creation-modal'
  box.setAttribute('role', 'dialog')
  box.setAttribute('aria-modal', 'true')
  box.setAttribute('aria-label', pasteOnly ? 'Paste music cover' : 'Upload photos')
  root.appendChild(box)

  root.addEventListener('click', () => { onClose() })
  box.addEventListener('click', (e) => { e.stopPropagation() })

  function buildHeader() {
    const header = document.createElement('header')
    header.className = 'creation-modal__head'

    const iconSpan = document.createElement('span')
    iconSpan.className = 'creation-modal__icon'
    iconSpan.setAttribute('aria-hidden', 'true')
    iconSpan.appendChild(pixel('importer', 20))
    header.appendChild(iconSpan)

    const textWrap = document.createElement('div')
    const h2 = document.createElement('h2')
    h2.textContent = pasteOnly
      ? 'Paste music cover'
      : video
        ? (fr ? 'Importer une vidéo' : 'Import video')
        : (fr ? 'Importer des photos' : 'Upload photos')
    textWrap.appendChild(h2)

    const descText = pasteOnly
      ? 'Copy the image itself, for example from Google Images, then paste it here.'
      : video
        ? (fr ? 'Choisis un fichier sur cet appareil ou utilise ton téléphone.' : 'Choose a file on this device or use your phone.')
        : (fr ? 'Choisis un fichier, utilise ton téléphone ou colle une image copiée.' : 'Choose a file, use your phone, or paste a copied image.')
    const p = document.createElement('p')
    p.textContent = descText
    textWrap.appendChild(p)
    header.appendChild(textWrap)

    const closeBtn = document.createElement('button')
    closeBtn.className = 'creation-modal__close'
    closeBtn.type = 'button'
    closeBtn.setAttribute('aria-label', 'Close')
    closeBtn.textContent = '×'
    closeBtn.addEventListener('click', () => { onClose() })
    header.appendChild(closeBtn)

    return header
  }

  function buildChoices() {
    const wrap = document.createElement('div')
    wrap.className = 'creation-modal__choices'

    if (onReuse && existingPhotoCount > 0) {
      const btn = document.createElement('button')
      btn.className = 'btn btn--white creation-modal__choice'
      btn.appendChild(pixel('dossier', 28))
      const span = document.createElement('span')
      const strong = document.createElement('strong')
      strong.setAttribute('data-no-i18n', '')
      strong.textContent = fr ? 'Photos disponibles' : 'Available photos'
      span.appendChild(strong)
      const small = document.createElement('small')
      small.setAttribute('data-no-i18n', '')
      small.textContent = `${existingPhotoCount} ${fr ? 'photos disponibles, sans réimporter' : 'photos available, no new upload'}`
      span.appendChild(small)
      btn.appendChild(span)
      const b = document.createElement('b')
      b.setAttribute('aria-hidden', 'true')
      b.textContent = '›'
      btn.appendChild(b)
      btn.addEventListener('click', () => { onReuse() })
      wrap.appendChild(btn)
    }

    const compBtn = document.createElement('button')
    compBtn.className = 'btn btn--white creation-modal__choice'
    compBtn.appendChild(pixel('dossier', 28))
    const compSpan = document.createElement('span')
    const compStrong = document.createElement('strong')
    compStrong.textContent = 'Computer'
    compSpan.appendChild(compStrong)
    const compSmall = document.createElement('small')
    compSmall.textContent = fr ? 'Choisis un fichier sur cet appareil' : 'Choose a file on this device'
    compSpan.appendChild(compSmall)
    compBtn.appendChild(compSpan)
    const compB = document.createElement('b')
    compB.setAttribute('aria-hidden', 'true')
    compB.textContent = '›'
    compBtn.appendChild(compB)
    compBtn.addEventListener('click', () => {
      openedFile = true
      onComputer()
    })
    wrap.appendChild(compBtn)

    if (onPhone) {
      const phoneBtn = document.createElement('button')
      phoneBtn.className = 'btn btn--white creation-modal__choice'
      phoneBtn.appendChild(pixel('telephone', 28))
      const phoneSpan = document.createElement('span')
      const phoneStrong = document.createElement('strong')
      phoneStrong.textContent = 'Phone (QR code)'
      phoneSpan.appendChild(phoneStrong)
      const phoneSmall = document.createElement('small')
      phoneSmall.textContent = video
        ? (fr ? 'Scanne un code, choisis une vidéo sur ton téléphone' : 'Scan a code and choose a video on your phone')
        : (fr ? 'Scanne un code, choisis tes photos sur ton téléphone' : 'Scan a code and choose photos on your phone')
      phoneSpan.appendChild(phoneSmall)
      phoneBtn.appendChild(phoneSpan)
      const phoneB = document.createElement('b')
      phoneB.setAttribute('aria-hidden', 'true')
      phoneB.textContent = '›'
      phoneBtn.appendChild(phoneB)
      phoneBtn.addEventListener('click', () => { onPhone() })
      wrap.appendChild(phoneBtn)
    }

    return wrap
  }

  function buildClipboard() {
    const wrap = document.createElement('div')
    wrap.className = 'upload-clipboard'

    const paste = document.createElement('div')
    paste.className = 'upload-paste'
    paste.setAttribute('role', 'group')
    paste.setAttribute('aria-label', fr ? 'Coller une image' : 'Paste image')
    paste.addEventListener('click', (e) => {
      if (e.target === paste) {
        const field = paste.querySelector('.upload-paste__field')
        if (field) field.focus()
      }
    })

    const field = document.createElement('div')
    field.className = 'upload-paste__field'
    field.setAttribute('role', 'textbox')
    field.setAttribute('aria-label', fr ? 'Zone de collage de l’image' : 'Image paste area')
    field.setAttribute('contenteditable', 'true')
    field.setAttribute('tabindex', '0')
    field.addEventListener('paste', (e) => {
      e.preventDefault()
      e.stopPropagation()
      field.textContent = ''
      void importFiles(pastedImages(e.clipboardData))
    })
    field.addEventListener('input', () => { field.textContent = '' })
    paste.appendChild(field)

    const pasteBtn = document.createElement('button')
    pasteBtn.type = 'button'
    pasteBtn.disabled = busy
    pasteBtn.textContent = fr ? 'Coller l’image copiée' : 'Paste copied image'
    pasteBtn.addEventListener('click', () => { void readClipboard() })
    paste.appendChild(pasteBtn)

    const small = document.createElement('small')
    small.textContent = fr ? 'Ctrl/Cmd + V dans cette fenêtre' : 'Ctrl/Cmd + V in this window'
    paste.appendChild(small)

    wrap.appendChild(paste)

    if (busy) {
      const status = document.createElement('p')
      status.setAttribute('role', 'status')
      status.textContent = 'Importing image…'
      wrap.appendChild(status)
    }
    if (error) {
      const alert = document.createElement('p')
      alert.setAttribute('role', 'alert')
      alert.textContent = error
      wrap.appendChild(alert)
    }

    return wrap
  }

  function buildFooter() {
    const footer = document.createElement('div')
    footer.className = 'creation-modal__footer'
    const spacer = document.createElement('span')
    footer.appendChild(spacer)
    const cancel = document.createElement('button')
    cancel.className = 'btn btn--white'
    cancel.style.minHeight = '44px'
    cancel.style.minWidth = '124px'
    cancel.style.padding = '10px 24px'
    cancel.style.borderRadius = '8px'
    cancel.style.fontSize = '14px'
    cancel.textContent = 'Cancel'
    cancel.addEventListener('click', () => { onClose() })
    footer.appendChild(cancel)
    return footer
  }

  function renderInner() {
    box.innerHTML = ''
    box.appendChild(buildHeader())
    if (!pasteOnly) box.appendChild(buildChoices())
    if (onFiles) box.appendChild(buildClipboard())
    box.appendChild(buildFooter())
    if(fr)frenchTree(box)
  }

  async function importFiles(files) {
    if (busy || !onFiles) return
    const images = files.filter((file) => file.type.startsWith('image/'))
    if (!images.length) {
      error = 'Copy an image, not a link, then paste it here.'
      renderInner()
      return
    }
    busy = true
    error = ''
    renderInner()
    try {
      if (await onFiles(images)) {
        onClose()
      } else {
        error = pasteOnly
          ? 'Could not import this image. Copy another image and try again.'
          : 'Could not import this image. Try another image or a file.'
      }
    } catch {
      error = pasteOnly
        ? 'Could not import this image. Copy another image and try again.'
        : 'Could not import this image. Try another image or a file.'
    } finally {
      busy = false
      if (!disposed) renderInner()
    }
  }

  async function readClipboard() {
    error = ''
    try {
      if (!navigator.clipboard || !navigator.clipboard.read) throw new Error()
      const items = await navigator.clipboard.read()
      const files = []
      for (const item of items) {
        const type = item.types.find((t) => t.startsWith('image/'))
        if (type) {
          const blob = await item.getType(type)
          files.push(new File([blob], 'copied-image', { type }))
        }
      }
      await importFiles(files)
    } catch {
      error = pasteOnly
        ? 'Use Paste in the box below, or Ctrl/Cmd + V.'
        : 'Use Paste in the box below, or Ctrl/Cmd + V. You can also choose a file.'
      renderInner()
      const field = box.querySelector('.upload-paste__field')
      if (field) field.focus()
    }
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') onClose()
    if (event.key === 'Tab') {
      const buttons = box.querySelectorAll('button:not(:disabled),[tabindex="0"]')
      if (!buttons.length) return
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  function onPaste(event) {
    const images = pastedImages(event.clipboardData)
    if (!onFiles || !images.length) return
    event.preventDefault()
    void importFiles(images)
  }

  renderInner()

  function cleanup(){
    if(disposed)return
    disposed=true;observer.disconnect();document.removeEventListener('keydown',onKeyDown);document.removeEventListener('paste',onPaste)
    document.body.style.overflow=prevOverflow
    if(!openedFile&&previousActive?.isConnected)previousActive.focus({preventScroll:true})
  }
  const observer=new MutationObserver(()=>{
    if(root.isConnected&&!attached){attached=true;document.addEventListener('keydown',onKeyDown);document.addEventListener('paste',onPaste);(pasteOnly?box.querySelector('.upload-paste__field'):box.querySelector('button'))?.focus()}
    else if(attached&&!root.isConnected)cleanup()
  })
  observer.observe(document.documentElement,{childList:true,subtree:true})
  return root
}
