// src/components/AudioRecorder.mjs
import { recordingHasSignal } from './current-rendering-helpers.mjs'
import { frenchTree } from './translate-dom.mjs'

const STRINGS = {
  en: {
    stopRecording: 'Stop recording',
    openingMic: 'Opening microphone…',
    recordAudio: 'Record audio',
    recordingStatus: (s) => `${s}s · Recording`,
    idleStatus: 'Audio saved here only. No transcription or upload.',
    downloadRecording: 'Download recording',
    errUnsupported: 'Audio recording is not supported in this browser. Upload an audio file instead.',
    errNoSignal: 'No sound was captured. Your existing audio was kept. Check your microphone before recording again.',
    errVerify: 'Could not verify the recording. Your existing audio was kept. Download this recording before trying again.',
    errFailed: 'Recording failed. Try again.',
    errNotAllowed: 'Microphone blocked. Allow microphone access in your browser and device settings, or upload an audio file.',
    errNotFound: 'No microphone found. Connect one and try again, or upload an audio file.',
    errNotReadable: 'The microphone is busy in another app. Close it and try again.',
    errUnavailable: 'Microphone unavailable. Allow microphone access or upload an audio file.',
  },

}

function t(lang, key, ...args) {
  const dict = STRINGS.en
  const v = dict[key] ?? STRINGS.en[key]
  return typeof v === 'function' ? v(...args) : v
}

export function renderLocalAudioRecorder({ onRecorded, onBusyChange, lang = 'en' } = {}) {
  const root = document.createElement('div')
  root.className = 'audio-recorder'

  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'audio-record-button'
  button.innerHTML = '<svg width="14" height="16" viewBox="0 0 16 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="5" y="1" width="6" height="11" rx="3"/><path d="M2 8v2a6 6 0 0 0 12 0V8M8 16v3M5 19h6"/></svg>'

  const status = document.createElement('small')
  status.setAttribute('role', 'status')

  const errorEl = document.createElement('p')
  errorEl.setAttribute('role', 'alert')
  errorEl.style.display = 'none'

  const downloadLink = document.createElement('a')
  downloadLink.style.display = 'none'

  root.appendChild(button)
  root.appendChild(status)
  root.appendChild(errorEl)
  root.appendChild(downloadLink)

  // State
  let recording = false
  let starting = false
  let error = ''
  let seconds = 0
  let recoveryFile = null // { url, name }
  let recorder = null
  let stream = null
  let alive = true
  let connected = false
  let timer = null
  let lastBusy = null

  function applyFrench() {
    if (lang !== 'fr') return
    try { frenchTree(root) } catch {}
  }

  function setError(msg) {
    error = msg || ''
    if (error) {
      errorEl.textContent = error
      errorEl.style.display = ''
    } else {
      errorEl.textContent = ''
      errorEl.style.display = 'none'
    }
    applyFrench()
  }

  function setRecovery(file) {
    if (recoveryFile) {
      try { URL.revokeObjectURL(recoveryFile.url) } catch {}
      recoveryFile = null
    }
    if (file) {
      recoveryFile = { url: URL.createObjectURL(file), name: file.name }
      downloadLink.href = recoveryFile.url
      downloadLink.download = recoveryFile.name
      downloadLink.textContent = t(lang, 'downloadRecording')
      downloadLink.style.display = ''
    } else {
      downloadLink.removeAttribute('href')
      downloadLink.removeAttribute('download')
      downloadLink.textContent = ''
      downloadLink.style.display = 'none'
    }
    applyFrench()
  }

  function updateBusy() {
    const busy = starting || recording
    if (busy !== lastBusy) {
      lastBusy = busy
      try { onBusyChange?.(busy) } catch {}
    }
  }

  function render() {
    button.classList.toggle('audio-record-button--active', recording)
    const ariaLabel = recording
      ? t(lang, 'stopRecording')
      : starting
        ? t(lang, 'openingMic')
        : t(lang, 'recordAudio')
    button.setAttribute('aria-label', ariaLabel)
    button.title = recording ? t(lang, 'stopRecording') : t(lang, 'recordAudio')
    button.disabled = starting
    status.textContent = recording
      ? `${seconds}s · ${lang==='fr'?'Enregistrement':'Recording'}`
      : t(lang, 'idleStatus')
    applyFrench()
    updateBusy()
  }

  function startTimer() {
    stopTimer()
    timer = setInterval(() => {
      if (!alive) return
      seconds += 1
      render()
    }, 1000)
  }

  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null }
  }

  function stopTracks() {
    if (stream) {
      try { stream.getTracks().forEach((tr) => tr.stop()) } catch {}
      stream = null
    }
  }

  async function start() {
    if (starting || recording) return
    setError('')
    starting = true
    render()
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        throw new Error(t(lang, 'errUnsupported'))
      }
      const media = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (!alive) {
        try { media.getTracks().forEach((tr) => tr.stop()) } catch {}
        return
      }
      stream = media
      const type = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus']
        .find((tp) => MediaRecorder.isTypeSupported(tp))
      const rec = new MediaRecorder(media, type ? { mimeType: type } : undefined)
      const chunks = []
      rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data) }
      rec.onstop = () => {
        try { media.getTracks().forEach((tr) => tr.stop()) } catch {}
        stream = null
        if (!alive) return
        recording = false
        starting = true
        stopTimer()
        render()
        const blob = new Blob(chunks, { type: rec.mimeType })
        const ext = rec.mimeType.includes('mp4') ? 'm4a' : rec.mimeType.includes('ogg') ? 'ogg' : 'webm'
        const file = new File([blob], `recording-${Date.now()}.${ext}`, { type: rec.mimeType })
        void (async () => {
          try {
            if (!blob.size) throw new Error(t(lang, 'errFailed'))
            const hasSignal = await recordingHasSignal(blob)
            if (!alive) return
            if (!hasSignal) {
              setRecovery(file)
              setError(t(lang, 'errNoSignal'))
              return
            }
            setRecovery(null)
            await onRecorded?.(file)
          } catch {
            if (alive) {
              setRecovery(file)
              setError(t(lang, 'errVerify'))
            }
          } finally {
            if (alive) {
              starting = false
              render()
            }
          }
        })()
      }
      rec.onerror = () => {
        try { media.getTracks().forEach((tr) => tr.stop()) } catch {}
        if (alive) {
          recording = false
          stopTimer()
          setError(t(lang, 'errFailed'))
          render()
        }
      }
      recorder = rec
      seconds = 0
      rec.start()
      recording = true
      starting = false
      startTimer()
      render()
    } catch (e) {
      stopTracks()
      recorder = null
      const n = e && e.name
      let msg
      if (n === 'NotAllowedError') msg = t(lang, 'errNotAllowed')
      else if (n === 'NotFoundError') msg = t(lang, 'errNotFound')
      else if (n === 'NotReadableError') msg = t(lang, 'errNotReadable')
      else msg = (e && e.message) || t(lang, 'errUnavailable')
      setError(msg)
    } finally {
      if (alive) {
        starting = false
        render()
      }
    }
  }

  function stop() {
    if (recorder && recorder.state === 'recording') {
      starting = true
      render()
      try { recorder.stop() } catch {}
    }
  }

  button.addEventListener('click', () => {
    if (recording) stop()
    else void start()
  })

  // Initial render
  render()

  // Cleanup on detach (only after connected)
  const observer = new MutationObserver(() => {
    if (!root.isConnected && connected) {
      cleanup()
    }
  })

  function cleanup() {
    if (!alive) return
    alive = false
    observer.disconnect()
    stopTimer()
    if (recorder && recorder.state === 'recording') {
      try { recorder.stop() } catch {}
    }
    recorder = null
    stopTracks()
    if (recoveryFile) {
      try { URL.revokeObjectURL(recoveryFile.url) } catch {}
      recoveryFile = null
    }
  }

  // Mark connected once attached
  queueMicrotask(() => {
    if (root.isConnected) {
      connected = true
      observer.observe(document.documentElement, { childList: true, subtree: true })
    } else {
      // If not yet connected, wait for connection
      const wait = new MutationObserver(() => {
        if (root.isConnected) {
          connected = true
          wait.disconnect()
          observer.observe(document.documentElement, { childList: true, subtree: true })
        }
      })
      wait.observe(document.documentElement, { childList: true, subtree: true })
    }
  })

  root.__cleanup = cleanup
  return root
}