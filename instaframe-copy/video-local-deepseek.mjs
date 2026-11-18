import {renderElementCreationLayout} from "./media-editor-deepseek.mjs";
import {localGenerated} from "./local-gallery-deepseek.mjs";
import { renderVideoCard } from "./current-rendering-helpers.mjs";
import { renderSkinCard, mountVideoSkin, trimVideoToMinute } from "./video-source-helpers.mjs";
import { renderGeneratedGallery, renderTextStyleMenus, renderCreationWorkspace } from "./generator-page-deepseek.mjs";
import { addLocalGenerated } from "./local-gallery-deepseek.mjs";
import { renderLocalUploadChooser } from "./upload-chooser-deepseek.mjs";
import { frenchTree } from "./translate-dom.mjs";

const retainedUrls=new Set();
const DRAFT = {
  textSize: 26,
  textFont: undefined,
  link: "",
  title: "",
  skin: "card",
  poster: "",
  videoLocalUrl: "",
  videoName: "",
  videoDuration: 0,
  pickedFile: null,
};

const NOTE_EN = "Local video preview. No upload or account save.";
const NOTE_FR = "Aperçu vidéo local. Aucun envoi ni sauvegarde de compte.";

function t(lang, fr, en) {
  return lang === "fr" ? fr : en;
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "text") node.textContent = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "dataset") Object.assign(node.dataset, v);
    else node.setAttribute(k, v === true ? "" : String(v));
  }
  const kids = Array.isArray(children) ? children : [children];
  for (const c of kids) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

function loadImg(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = () => resolve(null);
    im.src = src;
  });
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function readVideoMetadata(url) {
  return new Promise((resolve, reject) => {
    const v = document.createElement("video");
    v.preload = "auto";
    v.muted = true;
    v.src = url;
    const timer = window.setTimeout(() => reject(new Error("timeout")), 30000);
    v.onloadedmetadata = () => {
      window.clearTimeout(timer);
      resolve(v);
    };
    v.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("unreadable"));
    };
  });
}

function captureFrame(video) {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("timeout")), 15000);
    video.onseeked = () => {
      window.clearTimeout(timer);
      try {
        const c = document.createElement("canvas");
        c.width = video.videoWidth || 640;
        c.height = video.videoHeight || 360;
        c.getContext("2d").drawImage(video, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.85));
      } catch (e) {
        reject(e);
      }
    };
    video.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("unreadable"));
    };
    video.currentTime = Math.min(0.1, video.duration / 2);
  });
}

export function renderLocalVideoEditor({ lang = "en", onNavigate = () => {} } = {}) {
  const state = {
    ...DRAFT,
    preview: "",
    error: "",
    busy: false,
    playing: false,
    videoChooserOpen: false,
    phoneNoticeOpen: false,
    seq: 0,
    mountedSkin: null,
    root: null,
    connected: false,
    observer: null,
    gallerySnapshot: null,
  };

  const root = el("div", { class: "local-video-editor" });
  state.root = root;

  const note = el("p", {
    class: "note",
    role: "status",
    style: {
      background: "#fff7e0",
      border: "1px solid #e6c96a",
      padding: "8px 12px",
      borderRadius: "6px",
      margin: "0 0 12px",
      fontSize: "13px",
    },
    text: lang === "fr" ? NOTE_FR : NOTE_EN,
  });

  Object.assign(root.style,{display:'flex',flexDirection:'column',flex:'1',minHeight:'0'});
  const localStyles=el('style',{},'.local-video-editor__workspace{display:contents}.local-video-editor .creation-workspace{flex:1;min-height:0}.local-video-editor .video-preview-contents{display:contents}@media(max-width:1023px){.local-video-editor .creation-workspace{height:auto;overflow:visible}.local-video-editor .creation-preview{height:255px;min-height:255px;flex-shrink:0}.local-video-editor{overflow:auto}}');root.append(localStyles);
  const workspaceHost = el("div", { class: "local-video-editor__workspace" });
  const back=el("button",{class:"btn btn--white",text:t(lang,"Retour à Vidéo","Back to Video"),onclick:()=>onNavigate('/generator?type=Video')});note.append(' ',back);
  root.appendChild(note);
  root.appendChild(workspaceHost);

  const settingsPlaceholder = el("div");
  const previewPlaceholder = el("div",{class:"video-preview-contents"});
  const actionsPlaceholder = el("div");

  const workspace = renderElementCreationLayout({
    kind: "Video",
    title: "Video",
    settings: settingsPlaceholder,
    preview: previewPlaceholder,
    actions: actionsPlaceholder,
    lang,
  });

  workspaceHost.appendChild(workspace);

  function setError(msg) {
    state.error = msg || "";
    redrawSettings();
  }

  function redrawSettings() {
    if (!settingsPlaceholder) return;
    settingsPlaceholder.innerHTML = "";

    const switchRow = el("div", { class: "switch" }, [
      el("button", { class: "switch__on", type: "button", text: "Video" }),
    ]);

    const controls = el("div", { class: "controls element-controls" });

    const videoAction = el("div", { class: "video-poster-action" });
    const videoLabel = el("label", {}, [
      document.createTextNode(t(lang, "Fichier vidéo (moins d’une minute)", "Video file (under 1 minute)")),
    ]);
    videoAction.appendChild(videoLabel);

    const importBtn = el("button", {
      class: "btn btn--white",
      type: "button",
      disabled: state.busy,
      text: state.videoLocalUrl
        ? t(lang, "Changer la vidéo", "Change video")
        : t(lang, "Importer la vidéo", "Import video"),
      onclick: () => {
        if (state.busy) return;
        state.videoChooserOpen = true;
        openVideoChooser();
      },
    });
    videoAction.appendChild(importBtn);

    if (state.videoLocalUrl) {
      const removeBtn = el("button", {
        class: "btn btn--white",
        type: "button",
        text: t(lang, "Retirer la vidéo", "Remove video"),
        onclick: () => {
          revokeIfUnused(state.videoLocalUrl);
          state.videoLocalUrl = "";
          state.videoName = "";
          state.videoDuration = 0;
          state.pickedFile = null;
          redrawPreview();
          redrawSettings();
          redrawActions();
        },
      });
      videoAction.appendChild(removeBtn);

      const info = el("p", {
        class: "note",
        role: "status",
        text: `${state.videoName} (${state.videoDuration}s)`,
      });
      videoAction.appendChild(info);
    }
    controls.appendChild(videoAction);

    const coverAction = el("div", { class: "video-poster-action" });
    coverAction.appendChild(
      el("label", {}, [document.createTextNode(t(lang, "Image de couverture avant lecture", "Cover image shown before playback"))])
    );

    const coverInput = el("input", {
      type: "file",
      accept: "image/*",
      hidden: true,
      onchange: (e) => {
        const f = e.target.files && e.target.files[0];
        e.target.value = "";
        if (f) void handleImage(f);
      },
    });
    coverAction.appendChild(coverInput);

    coverAction.appendChild(
      el("button", {
        class: "btn btn--white",
        type: "button",
        text: state.poster
          ? t(lang, "Changer la couverture", "Change cover")
          : t(lang, "Choisir la couverture", "Choose cover"),
        onclick: () => coverInput.click(),
      })
    );

    coverAction.appendChild(
      el("button", {
        class: "btn btn--white",
        type: "button",
        text: "Phone",
        onclick: () => {
          state.phoneNoticeOpen = true;
          openPhoneNotice();
        },
      })
    );

    if (state.poster) {
      coverAction.appendChild(
        el("button", {
          class: "btn btn--white",
          type: "button",
          text: t(lang, "Réinitialiser l’affiche", "Reset poster"),
          onclick: () => {
            state.poster = "";
            schedulePreview();
            redrawSettings();
          },
        })
      );
    }
    controls.appendChild(coverAction);

    const titleLabel = el("label", {}, [document.createTextNode(t(lang, "Titre", "Title"))]);
    const titleInput = el("input", {
      type: "text",
      maxlength: "80",
      placeholder: "Video",
      value: state.title,
      oninput: (e) => {
        state.title = e.target.value;
        schedulePreview();
      },
    });
    titleLabel.appendChild(titleInput);
    controls.appendChild(titleLabel);

    const skinGroup = el("div", { class: "veskin", role: "group", "aria-label": "Habillage" });
    skinGroup.appendChild(el("span", { class: "veskin__label", text: "Habillage" }));
    const skinOpts = el("div", { class: "veskin__opts" });
    const skins = [
      ["card", "Carte"],
      ["film", "Pellicule"],
      ["vhs", "VHS"],
      ["cam", "Caméscope"],
    ];
    for (const [v, l] of skins) {
      const on = state.skin === v;
      skinOpts.appendChild(
        el("button", {
          type: "button",
          class: `veskin__opt${on ? " on" : ""}`,
          "aria-pressed": on ? "true" : "false",
          text: l,
          onclick: () => {
            state.skin = v;
            redrawPreview();
            redrawSettings();
          },
        })
      );
    }
    skinGroup.appendChild(skinOpts);
    controls.appendChild(skinGroup);

    const textStyleHost = el("div", { class: "text-style-host",style:{display:"contents"} });
    controls.appendChild(textStyleHost);
    try {
      const menus = renderTextStyleMenus({
        font: state.textFont,
        size: state.textSize,
        defaultFontLabel: "Arial (original)",
        minSize: 18,
        maxSize: 44,
        onFont: (f) => {
          state.textFont = f;
          schedulePreview();
          redrawSettings();
        },
        onSize: (s) => {
          state.textSize = s;
          schedulePreview();
          redrawSettings();
        },
        lang,
      });
      if (menus) textStyleHost.appendChild(menus);
    } catch {
      /* ignore */
    }

    if (state.error) {
      controls.appendChild(el("p", { role: "alert", class: "note", text: state.error }));
    }

    settingsPlaceholder.appendChild(switchRow);
    settingsPlaceholder.appendChild(controls);
  }

  function redrawPreview() {
    if (!previewPlaceholder) return;
    if (state.mountedSkin) {
      try {
        state.mountedSkin.unmount();
      } catch {
        /* ignore */
      }
      state.mountedSkin = null;
    }
    previewPlaceholder.innerHTML = "";

    const wrap = el("div", { class: "element-preview" });

    const hasVideo = !!state.videoLocalUrl;
    if (state.skin !== "card" && hasVideo) {
      const host = el("div", { class: "vs-skin-host" });
      wrap.appendChild(host);
      try {
        state.mountedSkin = mountVideoSkin(host, {
          skin: state.skin,
          src: state.videoLocalUrl,
          poster: state.poster || undefined,
          title: state.title,
          duration: state.videoDuration,
        });
      } catch {
        state.mountedSkin = null;
      }
    } else if (state.preview) {
      wrap.appendChild(
        el("img", {
          src: state.preview,
          alt: "Silver video card preview",
        })
      );
    }

    previewPlaceholder.appendChild(wrap);

    if (hasVideo) {
      previewPlaceholder.appendChild(
        el("button", {
          class: "btn btn--white btn--small",
          type: "button",
          text: t(lang, "Lire la vidéo", "Play video"),
          onclick: () => {
            state.playing = true;
            openPlayer();
          },
        })
      );
    }
  }

  function redrawActions() {
    if (!actionsPlaceholder) return;
    actionsPlaceholder.innerHTML = "";
    const row = el("div", { class: "row row--actions" });
    const canAdd = !state.busy && !!state.videoLocalUrl;
    row.appendChild(
      el("button", {
        class: "btn btn--rose",
        type: "button",
        disabled: !canAdd,
        text: t(lang, "Garder en galerie locale", "Keep in local gallery"),
        onclick: () => {
          if (!canAdd) return;
          void addToLocalGallery();
        },
      })
    );
    actionsPlaceholder.appendChild(row);
  }

  function schedulePreview() {
    const mySeq = ++state.seq;
    void (async () => {
      try {
        const src = await renderVideoCard(
          state.poster,
          state.title,
          "",
          state.textSize,
          state.textFont
        );
        if (mySeq !== state.seq) return;
        state.preview = src;
        redrawPreview();
      } catch {
        if (mySeq !== state.seq) return;
        state.error = "Could not create poster.";
        redrawSettings();
      }
    })();
  }

  async function handleImage(file) {
    if (!file) return false;
    if (!file.type.startsWith("image/") || file.size > 15 * 1024 * 1024) {
      setError(t(lang, "Choisissez une image de moins de 15 Mo.", "Choose an image smaller than 15 MB."));
      return false;
    }
    let timer;
    try {
      const src = await Promise.race([
        (async () => {
          const value = await readFileAsDataURL(file);
          const im = new Image();
          im.src = value;
          await im.decode();
          return value;
        })(),
        new Promise((_, reject) => {
          timer = window.setTimeout(() => reject(new Error("timeout")), 20000);
        }),
      ]);
      state.poster = src;
      state.error = "";
      schedulePreview();
      redrawSettings();
      return true;
    } catch {
      setError(t(lang, "Impossible de lire l’image.", "Could not read image."));
      return false;
    } finally {
      window.clearTimeout(timer);
    }
  }

  async function importVideo(file) {
    if (!file) return false;
    if (!["video/mp4", "video/quicktime", "video/webm"].includes(file.type)) {
      setError(t(lang, "Choisissez une vidéo MP4, MOV ou WebM.", "Choose an MP4, MOV or WebM video."));
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError(
        t(
          lang,
          "Cette vidéo est trop volumineuse (100 Mo maximum pour l’instant).",
          "This video is too large (100 MB maximum for now)."
        )
      );
      return false;
    }
    state.busy = true;
    redrawSettings();
    redrawActions();

    const url = URL.createObjectURL(file);
    let keepUrl = false;
    try {
      const v = await readVideoMetadata(url);
      if (!(v.duration > 0)) {
        setError(t(lang, "Impossible de lire cette vidéo. Essayez un autre fichier.", "Could not read this video. Try another file."));
        return false;
      }
      let duration = v.duration;
      let workingFile = file;

      if (duration >= 60) {
        try {
          workingFile = await trimVideoToMinute(file);
          const trimmedUrl = URL.createObjectURL(workingFile);
          try {
            const vt = await readVideoMetadata(trimmedUrl);
            duration = vt.duration;
          } finally {
            URL.revokeObjectURL(trimmedUrl);
          }
        } catch {
          setError(
            t(
              lang,
              "Impossible de raccourcir cette vidéo automatiquement. Essayez une vidéo de moins d’une minute.",
              "Could not shorten this video automatically. Try a video under 1 minute."
            )
          );
          return false;
        }
      }

      let frame;
      try {
        frame = await captureFrame(v);
      } catch {
        frame = "";
      }

      const shown = Math.max(1, Math.round(duration));

      if (state.videoLocalUrl) {
        revokeIfUnused(state.videoLocalUrl);
      }

      let finalUrl = url;
      if (workingFile !== file) {
        finalUrl = URL.createObjectURL(workingFile);
        URL.revokeObjectURL(url);
      } else {
        keepUrl = true;
      }

      state.videoLocalUrl = finalUrl;
      state.videoName = workingFile.name;
      state.videoDuration = shown;
      state.pickedFile = workingFile;
      if (frame) state.poster = frame;
      state.error = "";
      schedulePreview();
      redrawPreview();
      redrawSettings();
      redrawActions();
      return true;
    } catch {
      setError(t(lang, "Impossible de lire cette vidéo. Essayez un autre fichier.", "Could not read this video. Try another file."));
      return false;
    } finally {
      if (!keepUrl) {
        try {
          URL.revokeObjectURL(url);
        } catch {
          /* ignore */
        }
      }
      state.busy = false;
      redrawSettings();
      redrawActions();
    }
  }

  function revokeIfUnused(url) {
    if (!url) return;
    if (retainedUrls.has(url) || localGenerated.some(e=>e.videoLocalUrl===url)) return;
    try {
      URL.revokeObjectURL(url);
    } catch {
      /* ignore */
    }
  }

  async function addToLocalGallery() {
    if (state.busy) return;
    if (!state.videoLocalUrl) return;
    state.busy = true;
    redrawActions();
    try {
      let src;
      if (state.skin === "card") {
        src = await renderVideoCard(state.poster, state.title, "", state.textSize, state.textFont);
      } else {
        src = await renderSkinCard(state.skin, state.poster, state.title);
      }
      const snapshot = {
        kind: "Video",
        text: state.title,
        textSize: state.textSize,
        textFont: state.textFont,
        image: state.poster,
        link: "",
        videoLocalUrl: state.videoLocalUrl,
        videoDuration: state.videoDuration,
        videoSkin: state.skin !== "card" ? state.skin : undefined,
        src,
        width: 640,
        height: 480,
        id: (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
      };
      state.gallerySnapshot = snapshot;retainedUrls.add(snapshot.videoLocalUrl);
      try {
        addLocalGenerated(snapshot);
      } catch {
        /* ignore */
      }
      state.error = "";
      redrawGallery();
    } catch {
      setError(t(lang, "Impossible de créer la carte vidéo.", "Could not create video card."));
    } finally {
      state.busy = false;
      redrawActions();
    }
  }

  function redrawGallery() {}

  function openVideoChooser() {
    let chooser;function close(){chooser?.remove();state.videoChooserOpen=false;}
    const hiddenInput = el("input", {
      type: "file",
      accept: "video/mp4,video/quicktime,video/webm",
      hidden: true,
      onchange: (e) => {
        const f = e.target.files && e.target.files[0];
        e.target.value = "";
        close();hiddenInput.remove();
        if (f) void importVideo(f);
      },
    });
    root.appendChild(hiddenInput);

    try {
      chooser = renderLocalUploadChooser({
        lang,
        video: true,
        onClose: close,
        onComputer: () => {
          close();
          hiddenInput.click();
        },
        onPhone: () => {
          close();
          state.phoneNoticeOpen = true;
          openPhoneNotice();
        },
        onFiles: (files) => {
          const f = files && files[0];
          close();
          if (f) void importVideo(f);
        },
      });
      if (chooser) root.appendChild(chooser);
    } catch {
      /* ignore */
    }
  }

  function openPhoneNotice() {
    const overlay = el("div", {
      class: "ready",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": t(lang, "Import téléphone indisponible", "Phone import unavailable"),
      onclick: (e) => {
        if (e.target === overlay) close();
      },
    });
    const box = el("div", { class: "ready__box" });
    box.appendChild(
      el("p", {
        class: "note",
        text: t(
          lang,
          "L’import depuis le téléphone n’est pas disponible dans cette version locale. Utilisez « Ordinateur » pour choisir un fichier.",
          "Phone import is not available in this local version. Use “Computer” to choose a file."
        ),
      })
    );
    box.appendChild(
      el("div", { class: "ready__row" }, [
        el("button", {
          class: "btn btn--white",
          type: "button",
          text: t(lang, "Fermer", "Close"),
          onclick: () => close(),
        }),
      ])
    );
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    function close() {
      try {
        overlay.remove();
      } catch {
        /* ignore */
      }
      state.phoneNoticeOpen = false;
    }
  }

  function openPlayer() {
    if (!state.videoLocalUrl) return;
    const overlay = el("div", {
      class: "ready",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": t(lang, "Aperçu vidéo", "Video preview"),
      onclick: (e) => {
        if (e.target === overlay) close();
      },
    });
    const box = el("div", { class: "ready__box" });
    const video = el("video", {
      controls: true,
      autoplay: true,
      playsinline: true,
      poster: state.poster || undefined,
      src: state.videoLocalUrl,
      style: { width: "100%", borderRadius: "8px" },
    });
    box.appendChild(video);
    box.appendChild(
      el("div", { class: "ready__row" }, [
        el("button", {
          class: "btn btn--white",
          type: "button",
          text: t(lang, "Fermer", "Close"),
          onclick: () => close(),
        }),
      ])
    );
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    function close() {
      try {
        video.pause();
      } catch {
        /* ignore */
      }
      try {
        overlay.remove();
      } catch {
        /* ignore */
      }
      state.playing = false;
    }
  }

  function cleanup() {
    if (state.mountedSkin) {
      try {
        state.mountedSkin.unmount();
      } catch {
        /* ignore */
      }
      state.mountedSkin = null;
    }
    if (state.observer) {
      try {
        state.observer.disconnect();
      } catch {
        /* ignore */
      }
      state.observer = null;
    }
    Object.assign(DRAFT,{textSize:state.textSize,textFont:state.textFont,title:state.title,skin:state.skin,poster:state.poster,videoLocalUrl:state.videoLocalUrl,videoName:state.videoName,videoDuration:state.videoDuration,pickedFile:state.pickedFile});
  }

  redrawSettings();
  redrawPreview();
  redrawActions();
  redrawGallery();
  schedulePreview();

  if (typeof MutationObserver !== "undefined") {
    state.observer = new MutationObserver(() => {
      if (!root.isConnected && state.connected) {
        state.connected = false;
        cleanup();
      } else if (root.isConnected) {
        state.connected = true;
      }
    });
    state.observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  const css=document.createElement("link");css.rel="stylesheet";css.href="./video-source-helpers.css";root.prepend(css);
  return root;
}