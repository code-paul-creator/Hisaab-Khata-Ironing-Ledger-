// ============================================================
// Hisaab Khata — Ironing Ledger
// All data lives in localStorage on the device. No server, no
// account, works fully offline. Designed for fast one-handed
// entry: big tap targets, minimal typing, Hindi-first.
// ============================================================

const STORAGE_KEY = "hisaab_khata_tickets_v1";
const LANG_KEY = "hisaab_khata_lang_v1";

// ---------- i18n ----------

const STRINGS = {
  hi: {
    brandName: "हिसाब खाता",
    searchPlaceholder: "नाम या फ़ोन नंबर खोजें…",
    installPrompt: "इसे होम स्क्रीन पर लगाएं — ऐप जैसा खुलेगा",
    installBtn: "लगाएं",
    summaryOwed: "पैसे बाकी",
    summaryPending: "कपड़े बाकी",
    summaryDoneToday: "आज पूरा हुआ",
    sectionPending: "बाकी काम",
    sectionDone: "पूरा हुआ",
    newEntryTitle: "नई एंट्री",
    editEntryTitle: "एंट्री बदलें",
    fieldName: "ग्राहक का नाम",
    fieldNamePlaceholder: "जैसे: शर्मा जी",
    fieldPhone: "फ़ोन नंबर",
    fieldItems: "कपड़े (गिनती)",
    fieldNote: "पहचान के लिए नोट (वैकल्पिक)",
    fieldNotePlaceholder: "जैसे: नीली पट्टी वाली सफ़ेद शर्ट",
    fieldPayment: "पैसे की स्थिति",
    paymentPending: "बाकी है",
    paymentPaid: "मिल गया",
    fieldAmountPlaceholder: "₹ राशि (वैकल्पिक)",
    saveBtn: "सेव करें",
    cancelBtn: "रद्द करें",
    emptyPending: "अभी कोई काम बाकी नहीं है",
    emptyPendingSub: "+ दबाकर नई एंट्री जोड़ें",
    emptyDone: "अभी तक कुछ पूरा नहीं हुआ",
    itemShirt: "शर्ट",
    itemPant: "पैंट",
    itemSaree: "साड़ी",
    itemKurta: "कुर्ता",
    itemOther: "अन्य",
    markDone: "तैयार / दे दिया",
    markUndone: "वापस बाकी में",
    markPaid: "पैसे मिल गए",
    deleteEntry: "एंट्री हटाएं",
    confirmDelete: "क्या आप वाकई इस एंट्री को हटाना चाहते हैं?",
    yes: "हाँ",
    no: "नहीं",
    saved: "सेव हो गया ✓",
    deleted: "हटा दिया गया",
    markedDone: "तैयार के रूप में चिह्नित ✓",
    markedPaid: "पैसे मिल गए ✓ चिह्नित",
    nameRequired: "कृपया नाम लिखें",
    itemsTotal: "कुल",
    pieces: "कपड़े",
    today: "आज",
    yesterday: "कल",
    noResults: "कुछ नहीं मिला",
    call: "कॉल करें",
    lockTitle: "PIN डालें",
    lockSub: "फ़ोन नंबर और राशि देखने के लिए",
    forgotPin: "PIN भूल गए?",
    setupTitle: "PIN सेट करें",
    setupExplain: "यह PIN फ़ोन नंबर और पैसों की जानकारी को सुरक्षित रखेगा। इसे याद रखें।",
    setupConfirmTitle: "PIN दोबारा डालें",
    skipPinSetup: "अभी के लिए छोड़ें",
    exportNow: "रिकॉर्ड डाउनलोड करें",
    lockNow: "लॉक करें",
    pinMismatch: "PIN मेल नहीं खाया, फिर से कोशिश करें",
    pinWrong: "गलत PIN",
    pinLockedOut: "बहुत बार गलत PIN। 30 सेकंड बाद कोशिश करें।",
    resetPinConfirm: "PIN रीसेट करने से सुरक्षा हट जाएगी (आपका डेटा सुरक्षित रहेगा)। जारी रखें?",
    pinReset: "PIN हटा दिया गया",
    exportSuccess: "रिकॉर्ड डाउनलोड हो गया ✓",
    exportEmpty: "अभी कोई पूरा हुआ काम नहीं है",
    tapToReveal: "देखने के लिए दबाएं",
    autoExportNotice: "यह एंट्री रिकॉर्ड में सेव होकर सूची से हट जाएगी",
  },
  en: {
    brandName: "Hisaab Khata",
    searchPlaceholder: "Search name or phone…",
    installPrompt: "Add to home screen — opens like an app",
    installBtn: "Add",
    summaryOwed: "Money pending",
    summaryPending: "Clothes pending",
    summaryDoneToday: "Done today",
    sectionPending: "Pending",
    sectionDone: "Done",
    newEntryTitle: "New Entry",
    editEntryTitle: "Edit Entry",
    fieldName: "Customer name",
    fieldNamePlaceholder: "e.g. Sharma ji",
    fieldPhone: "Phone number",
    fieldItems: "Clothes (count)",
    fieldNote: "Note to identify (optional)",
    fieldNotePlaceholder: "e.g. white shirt with blue stripes",
    fieldPayment: "Payment status",
    paymentPending: "Pending",
    paymentPaid: "Paid",
    fieldAmountPlaceholder: "₹ Amount (optional)",
    saveBtn: "Save",
    cancelBtn: "Cancel",
    emptyPending: "No pending work right now",
    emptyPendingSub: "Tap + to add a new entry",
    emptyDone: "Nothing marked done yet",
    itemShirt: "Shirt",
    itemPant: "Pant",
    itemSaree: "Saree",
    itemKurta: "Kurta",
    itemOther: "Other",
    markDone: "Mark ready / delivered",
    markUndone: "Move back to pending",
    markPaid: "Mark paid",
    deleteEntry: "Delete entry",
    confirmDelete: "Are you sure you want to delete this entry?",
    yes: "Yes",
    no: "No",
    saved: "Saved ✓",
    deleted: "Deleted",
    markedDone: "Marked as done ✓",
    markedPaid: "Marked as paid ✓",
    nameRequired: "Please enter a name",
    itemsTotal: "Total",
    pieces: "pieces",
    today: "Today",
    yesterday: "Yesterday",
    noResults: "No results",
    call: "Call",
    lockTitle: "Enter PIN",
    lockSub: "to view phone numbers and amounts",
    forgotPin: "Forgot PIN?",
    setupTitle: "Set a PIN",
    setupExplain: "This PIN keeps phone numbers and money details private. Remember it.",
    setupConfirmTitle: "Re-enter PIN",
    skipPinSetup: "Skip for now",
    exportNow: "Download record",
    lockNow: "Lock now",
    pinMismatch: "PINs didn't match, try again",
    pinWrong: "Wrong PIN",
    pinLockedOut: "Too many wrong tries. Wait 30 seconds.",
    resetPinConfirm: "Resetting will remove PIN protection (your data stays safe). Continue?",
    pinReset: "PIN removed",
    exportSuccess: "Record downloaded ✓",
    exportEmpty: "No completed work yet",
    tapToReveal: "Tap to reveal",
    autoExportNotice: "This entry will be saved to your records and removed from the list",
  },
};

const ITEM_TYPES = [
  { key: "shirt", labelKey: "itemShirt" },
  { key: "pant", labelKey: "itemPant" },
  { key: "saree", labelKey: "itemSaree" },
  { key: "kurta", labelKey: "itemKurta" },
  { key: "other", labelKey: "itemOther" },
];

let currentLang = localStorage.getItem(LANG_KEY) || "hi";
let currentItemCounts = {};
let editingTicketId = null;
let detailTicketId = null;

function t(key) {
  return STRINGS[currentLang][key] || STRINGS.en[key] || key;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.documentElement.lang = currentLang;
  renderItemStepper();
  renderTickets();
}

document.getElementById("langHi").addEventListener("click", () => setLang("hi"));
document.getElementById("langEn").addEventListener("click", () => setLang("en"));

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.getElementById("langHi").classList.toggle("active", lang === "hi");
  document.getElementById("langEn").classList.toggle("active", lang === "en");
  applyI18n();
}

// ---------- data layer ----------

function loadTickets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load tickets", e);
    return [];
  }
}

function saveTickets(tickets) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    return true;
  } catch (e) {
    console.error("Failed to save tickets", e);
    showToast(currentLang === "hi" ? "सेव नहीं हो पाया — फ़ोन की मेमोरी भरी है?" : "Could not save — device storage full?");
    return false;
  }
}

let tickets = loadTickets();

function genId() {
  return "t_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
}

// ============================================================
// PIN security layer
// ------------------------------------------------------------
// Threat model (documented honestly, see README for full version):
//   - Protects against: a third party who picks up the unlocked phone
//     casually browsing customer phone numbers and amounts owed.
//   - Does NOT protect against: someone with deep technical access to
//     the device (e.g. browser dev tools, root access) — that's outside
//     what any client-side-only, no-backend app can guarantee. The PIN
//     hash and salt live in localStorage like everything else; this is
//     a privacy speed-bump for casual access, not encryption-grade
//     security. This is stated plainly in the README.
//   - The PIN itself is never stored in plaintext — only a salted
//     SHA-256 hash, via the browser's built-in Web Crypto API.
// ============================================================

const PIN_HASH_KEY = "hisaab_khata_pin_hash_v1";
const PIN_SALT_KEY = "hisaab_khata_pin_salt_v1";
const LOCK_TIMEOUT_MS = 2 * 60 * 1000; // re-lock sensitive data after 2 min idle
const MAX_PIN_ATTEMPTS = 5;
const LOCKOUT_MS = 30 * 1000;

let sensitivesUnlocked = false;
let lockTimer = null;
let pinAttemptBuffer = "";
let pinSetupBuffer = "";
let pinSetupStage = "create"; // "create" -> "confirm"
let pinSetupFirstEntry = "";
let pinAttemptCount = 0;
let pinLockedUntil = 0;
let pinUnlockResolver = null; // resolves the promise returned by requireUnlock()

function bufToHex(buf) {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hashPin(pin, salt) {
  const enc = new TextEncoder();
  const data = enc.encode(salt + ":" + pin);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return bufToHex(digest);
}

function genSalt() {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return bufToHex(arr);
}

function hasPinSet() {
  return !!localStorage.getItem(PIN_HASH_KEY);
}

async function setPin(pin) {
  const salt = genSalt();
  const hash = await hashPin(pin, salt);
  localStorage.setItem(PIN_HASH_KEY, hash);
  localStorage.setItem(PIN_SALT_KEY, salt);
}

async function verifyPin(pin) {
  const salt = localStorage.getItem(PIN_SALT_KEY);
  const storedHash = localStorage.getItem(PIN_HASH_KEY);
  if (!salt || !storedHash) return false;
  const hash = await hashPin(pin, salt);
  return hash === storedHash;
}

function clearPin() {
  localStorage.removeItem(PIN_HASH_KEY);
  localStorage.removeItem(PIN_SALT_KEY);
  sensitivesUnlocked = true; // no PIN means nothing to gate
}

function scheduleAutoLock() {
  clearTimeout(lockTimer);
  if (!hasPinSet()) return;
  lockTimer = setTimeout(() => {
    sensitivesUnlocked = false;
    renderTickets();
  }, LOCK_TIMEOUT_MS);
}

// Resets the idle timer on any interaction, so actively using the app
// doesn't get auto-locked mid-task.
["click", "touchstart", "keydown"].forEach((evt) => {
  document.addEventListener(evt, () => {
    if (sensitivesUnlocked) scheduleAutoLock();
  });
});

/**
 * Returns a Promise<boolean> — resolves true once the correct PIN is
 * entered, false if the user dismisses without unlocking. Used by any
 * action that needs sensitive data revealed first.
 */
function requireUnlock() {
  if (!hasPinSet() || sensitivesUnlocked) return Promise.resolve(true);
  return new Promise((resolve) => {
    pinUnlockResolver = resolve;
    openLockScreen();
  });
}

function openLockScreen() {
  pinAttemptBuffer = "";
  document.getElementById("pinErrorMsg").textContent = "";
  renderPinDots("pinDots", 0);
  renderKeypad("pinKeypad", handlePinKeyPress);
  document.getElementById("lockOverlay").classList.remove("hidden");
}

function closeLockScreen() {
  document.getElementById("lockOverlay").classList.add("hidden");
}

function renderPinDots(containerId, filledCount) {
  const dots = document.querySelectorAll(`#${containerId} .pin-dot`);
  dots.forEach((dot, i) => dot.classList.toggle("filled", i < filledCount));
}

function shakePinDots(containerId) {
  const container = document.getElementById(containerId);
  container.classList.add("shake-error");
  setTimeout(() => container.classList.remove("shake-error"), 400);
}

function renderKeypad(containerId, onPress) {
  const container = document.getElementById(containerId);
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];
  container.innerHTML = keys.map((k) => {
    if (k === "") return `<button class="pin-key empty"></button>`;
    return `<button class="pin-key" data-key="${k}">${k}</button>`;
  }).join("");
  container.querySelectorAll(".pin-key:not(.empty)").forEach((btn) => {
    btn.addEventListener("click", () => onPress(btn.dataset.key));
  });
}

async function handlePinKeyPress(key) {
  const now = Date.now();
  if (pinLockedUntil > now) {
    document.getElementById("pinErrorMsg").textContent = t("pinLockedOut");
    return;
  }

  if (key === "⌫") {
    pinAttemptBuffer = pinAttemptBuffer.slice(0, -1);
  } else if (pinAttemptBuffer.length < 4) {
    pinAttemptBuffer += key;
  }
  renderPinDots("pinDots", pinAttemptBuffer.length);

  if (pinAttemptBuffer.length === 4) {
    const ok = await verifyPin(pinAttemptBuffer);
    if (ok) {
      pinAttemptCount = 0;
      sensitivesUnlocked = true;
      closeLockScreen();
      scheduleAutoLock();
      if (pinUnlockResolver) { pinUnlockResolver(true); pinUnlockResolver = null; }
      renderTickets();
    } else {
      pinAttemptCount += 1;
      shakePinDots("pinDots");
      pinAttemptBuffer = "";
      renderPinDots("pinDots", 0);
      if (pinAttemptCount >= MAX_PIN_ATTEMPTS) {
        pinLockedUntil = Date.now() + LOCKOUT_MS;
        document.getElementById("pinErrorMsg").textContent = t("pinLockedOut");
        setTimeout(() => {
          pinAttemptCount = 0;
          document.getElementById("pinErrorMsg").textContent = "";
        }, LOCKOUT_MS);
      } else {
        document.getElementById("pinErrorMsg").textContent = t("pinWrong");
      }
    }
  }
}

document.getElementById("forgotPinBtn").addEventListener("click", () => {
  if (!confirm(t("resetPinConfirm"))) return;
  clearPin();
  closeLockScreen();
  if (pinUnlockResolver) { pinUnlockResolver(true); pinUnlockResolver = null; }
  showToast(t("pinReset"));
  renderTickets();
});

document.getElementById("lockNowBtn").addEventListener("click", () => {
  if (!hasPinSet()) {
    showToast(currentLang === "hi" ? "पहले PIN सेट करें" : "Set a PIN first");
    openPinSetup();
    return;
  }
  sensitivesUnlocked = false;
  renderTickets();
  showToast(currentLang === "hi" ? "लॉक हो गया 🔒" : "Locked 🔒");
});

// ---------- first-run PIN setup ----------

const setupOverlay = document.getElementById("setupOverlay");

function openPinSetup() {
  pinSetupStage = "create";
  pinSetupBuffer = "";
  pinSetupFirstEntry = "";
  document.querySelector("#setupOverlay .sheet-title").textContent = t("setupTitle");
  document.getElementById("setupErrorMsg").textContent = "";
  renderPinDots("setupPinDots", 0);
  renderKeypad("setupKeypad", handleSetupKeyPress);
  setupOverlay.classList.add("open");
}

function closePinSetup() {
  setupOverlay.classList.remove("open");
}

async function handleSetupKeyPress(key) {
  if (key === "⌫") {
    pinSetupBuffer = pinSetupBuffer.slice(0, -1);
  } else if (pinSetupBuffer.length < 4) {
    pinSetupBuffer += key;
  }
  renderPinDots("setupPinDots", pinSetupBuffer.length);

  if (pinSetupBuffer.length === 4) {
    if (pinSetupStage === "create") {
      pinSetupFirstEntry = pinSetupBuffer;
      pinSetupBuffer = "";
      pinSetupStage = "confirm";
      document.querySelector("#setupOverlay .sheet-title").textContent = t("setupConfirmTitle");
      setTimeout(() => renderPinDots("setupPinDots", 0), 150);
    } else {
      if (pinSetupBuffer === pinSetupFirstEntry) {
        await setPin(pinSetupBuffer);
        sensitivesUnlocked = true;
        scheduleAutoLock();
        closePinSetup();
        showToast(currentLang === "hi" ? "PIN सेट हो गया ✓" : "PIN set ✓");
        renderTickets();
      } else {
        shakePinDots("setupPinDots");
        document.getElementById("setupErrorMsg").textContent = t("pinMismatch");
        pinSetupBuffer = "";
        pinSetupStage = "create";
        pinSetupFirstEntry = "";
        document.querySelector("#setupOverlay .sheet-title").textContent = t("setupTitle");
        setTimeout(() => renderPinDots("setupPinDots", 0), 400);
      }
    }
  }
}

document.getElementById("skipPinSetupBtn").addEventListener("click", () => {
  sensitivesUnlocked = true; // no PIN set, so nothing to gate
  closePinSetup();
  renderTickets();
});

// ---------- rendering ----------

function formatTime(ts) {
  const d = new Date(ts);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = d.toDateString() === yesterday.toDateString();

  const timeStr = d.toLocaleTimeString(currentLang === "hi" ? "hi-IN" : "en-IN", {
    hour: "2-digit", minute: "2-digit",
  });

  if (isToday) return `${t("today")}, ${timeStr}`;
  if (isYesterday) return `${t("yesterday")}, ${timeStr}`;
  return d.toLocaleDateString(currentLang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short" }) + ", " + timeStr;
}

function itemsSummary(items) {
  const parts = Object.entries(items || {})
    .filter(([, count]) => count > 0)
    .map(([key, count]) => {
      const type = ITEM_TYPES.find((i) => i.key === key);
      const label = type ? t(type.labelKey) : key;
      return `${count} ${label}`;
    });
  return parts.join(", ");
}

function totalItemCount(items) {
  return Object.values(items || {}).reduce((sum, c) => sum + (c || 0), 0);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

let recentlyChangedTicketId = null;

function renderTickets() {
  const query = (document.getElementById("searchInput").value || "").trim().toLowerCase();

  let filtered = tickets.filter((tk) => {
    if (!query) return true;
    return (
      tk.name.toLowerCase().includes(query) ||
      (tk.phone || "").includes(query)
    );
  });

  filtered.sort((a, b) => b.createdAt - a.createdAt);

  const pending = filtered.filter((tk) => tk.status !== "done");
  const done = filtered.filter((tk) => tk.status === "done");

  document.getElementById("pendingList").innerHTML = pending.length
    ? pending.map(renderTicketCard).join("")
    : `<div class="empty-state"><div class="big">${query ? t("noResults") : t("emptyPending")}</div>${query ? "" : `<div>${t("emptyPendingSub")}</div>`}</div>`;

  document.getElementById("doneList").innerHTML = done.length
    ? done.map(renderTicketCard).join("")
    : `<div class="empty-state">${t("emptyDone")}</div>`;

  // Play the card-settle animation only on the ticket that just changed
  // state (not on every render - e.g. not while typing in search).
  if (recentlyChangedTicketId) {
    const el = document.querySelector(`.ticket[data-id="${recentlyChangedTicketId}"]`);
    if (el) el.classList.add("settling");
    recentlyChangedTicketId = null;
  }

  document.querySelectorAll(".ticket").forEach((el) => {
    el.addEventListener("click", (e) => {
      const sensitiveEl = e.target.closest(".sensitive.blurred");
      if (sensitiveEl) {
        e.stopPropagation();
        requireUnlock();
        return;
      }
      openDetail(el.dataset.id);
    });
  });

  updateSummary();
}

function renderTicketCard(tk) {
  const itemsText = itemsSummary(tk.items);
  const total = totalItemCount(tk.items);
  const isDone = tk.status === "done";
  const locked = hasPinSet() && !sensitivesUnlocked;

  let paymentPillHtml = "";
  if (tk.paymentStatus === "paid") {
    paymentPillHtml = `<span class="pill paid">✓ ${t("paymentPaid")}</span>`;
  } else {
    paymentPillHtml = `<span class="pill owed">${t("paymentPending")}</span>`;
  }

  const phoneHtml = tk.phone
    ? `<div class="ticket-phone sensitive ${locked ? "blurred" : ""}" data-reveal="phone" data-id="${tk.id}">📞 ${escapeHtml(tk.phone)}</div>`
    : "";

  const amountHtml = tk.amount
    ? `<div class="ticket-amount sensitive ${locked ? "blurred" : ""}" data-reveal="amount" data-id="${tk.id}">₹${escapeHtml(String(tk.amount))}</div>`
    : "";

  return `
    <div class="ticket ${isDone ? "done" : ""}" data-id="${tk.id}">
      <div class="ticket-top">
        <div>
          <div class="ticket-name">${escapeHtml(tk.name)}</div>
          ${phoneHtml}
        </div>
        ${amountHtml}
      </div>
      ${itemsText ? `<div class="ticket-items">🧺 ${escapeHtml(itemsText)}${total ? ` · ${total} ${t("pieces")}` : ""}</div>` : ""}
      ${tk.note ? `<div class="ticket-note">"${escapeHtml(tk.note)}"</div>` : ""}
      <div class="ticket-bottom">
        <div style="display:flex; gap:6px; align-items:center;">
          ${paymentPillHtml}
          ${isDone ? `<span class="pill done-status">✓ ${t("sectionDone")}</span>` : ""}
        </div>
        <div class="ticket-time">${formatTime(tk.createdAt)}</div>
      </div>
    </div>
  `;
}

function updateSummary() {
  const owedCount = tickets.filter((tk) => tk.paymentStatus !== "paid").length;
  const pendingCount = tickets.filter((tk) => tk.status !== "done").length;
  const today = new Date().toDateString();
  const doneToday = tickets.filter(
    (tk) => tk.status === "done" && tk.doneAt && new Date(tk.doneAt).toDateString() === today
  ).length;

  document.getElementById("summaryOwedCount").textContent = owedCount;
  document.getElementById("summaryPendingCount").textContent = pendingCount;
  document.getElementById("summaryDoneCount").textContent = doneToday;
}

// ---------- item stepper (in add/edit sheet) ----------

function renderItemStepper() {
  const container = document.getElementById("itemStepperList");
  container.innerHTML = ITEM_TYPES.map((item) => {
    const count = currentItemCounts[item.key] || 0;
    return `
      <div class="item-row">
        <div class="item-row-label">${t(item.labelKey)}</div>
        <div class="stepper">
          <button type="button" data-action="dec" data-key="${item.key}" aria-label="decrease">−</button>
          <div class="count" id="count-${item.key}">${count}</div>
          <button type="button" data-action="inc" data-key="${item.key}" aria-label="increase">+</button>
        </div>
      </div>
    `;
  }).join("");

  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      const action = btn.dataset.action;
      const cur = currentItemCounts[key] || 0;
      currentItemCounts[key] = action === "inc" ? cur + 1 : Math.max(0, cur - 1);
      document.getElementById(`count-${key}`).textContent = currentItemCounts[key];
    });
  });
}

// ---------- add/edit sheet ----------

const sheetOverlay = document.getElementById("sheetOverlay");
const detailOverlay = document.getElementById("detailOverlay");

function openAddSheet(existingTicket) {
  editingTicketId = existingTicket ? existingTicket.id : null;
  currentItemCounts = existingTicket ? { ...existingTicket.items } : {};

  document.getElementById("sheetTitle").textContent = existingTicket ? t("editEntryTitle") : t("newEntryTitle");
  document.getElementById("inputName").value = existingTicket ? existingTicket.name : "";
  document.getElementById("inputPhone").value = existingTicket ? existingTicket.phone || "" : "";
  document.getElementById("inputNote").value = existingTicket ? existingTicket.note || "" : "";
  document.getElementById("inputAmount").value = existingTicket && existingTicket.amount ? existingTicket.amount : "";

  const isPaid = existingTicket && existingTicket.paymentStatus === "paid";
  setPaymentToggle(isPaid ? "paid" : "pending");

  renderItemStepper();
  sheetOverlay.classList.add("open");
  setTimeout(() => document.getElementById("inputName").focus(), 250);
}

function closeAddSheet() {
  sheetOverlay.classList.remove("open");
  editingTicketId = null;
}

document.getElementById("fabAdd").addEventListener("click", () => openAddSheet(null));
document.getElementById("cancelSheetBtn").addEventListener("click", closeAddSheet);
sheetOverlay.addEventListener("click", (e) => {
  if (e.target === sheetOverlay) closeAddSheet();
});

let selectedPaymentStatus = "pending";

function setPaymentToggle(status) {
  selectedPaymentStatus = status;
  document.getElementById("paymentPendingBtn").classList.toggle("selected", status === "pending");
  document.getElementById("paymentPaidBtn").classList.toggle("selected", status === "paid");
  document.getElementById("amountField").classList.toggle("visible", status === "pending");
}

document.getElementById("paymentPendingBtn").addEventListener("click", () => setPaymentToggle("pending"));
document.getElementById("paymentPaidBtn").addEventListener("click", () => setPaymentToggle("paid"));

document.getElementById("saveTicketBtn").addEventListener("click", () => {
  const name = document.getElementById("inputName").value.trim();
  if (!name) {
    showToast(t("nameRequired"));
    document.getElementById("inputName").focus();
    return;
  }

  const phone = document.getElementById("inputPhone").value.trim();
  const note = document.getElementById("inputNote").value.trim();
  const amountRaw = document.getElementById("inputAmount").value.trim();
  const amount = amountRaw ? parseInt(amountRaw, 10) : null;

  if (editingTicketId) {
    const idx = tickets.findIndex((tk) => tk.id === editingTicketId);
    if (idx >= 0) {
      tickets[idx] = {
        ...tickets[idx],
        name, phone, note,
        items: { ...currentItemCounts },
        paymentStatus: selectedPaymentStatus,
        amount: selectedPaymentStatus === "pending" ? amount : null,
      };
    }
  } else {
    tickets.push({
      id: genId(),
      name, phone, note,
      items: { ...currentItemCounts },
      paymentStatus: selectedPaymentStatus,
      amount: selectedPaymentStatus === "pending" ? amount : null,
      status: "pending",
      createdAt: Date.now(),
      doneAt: null,
    });
  }

  saveTickets(tickets);
  closeAddSheet();
  renderTickets();
  showToast(t("saved"));
});

// ---------- detail sheet ----------

function openDetail(id) {
  detailTicketId = id;
  const tk = tickets.find((t2) => t2.id === id);
  if (!tk) return;

  const itemsText = itemsSummary(tk.items);
  const total = totalItemCount(tk.items);
  const isDone = tk.status === "done";
  const isPaid = tk.paymentStatus === "paid";
  const locked = hasPinSet() && !sensitivesUnlocked;

  const phoneDetailHtml = tk.phone
    ? `<div class="ticket-phone sensitive ${locked ? "blurred" : ""}" data-reveal="phone" id="detailPhone" style="font-size:14px; margin-bottom:10px;">📞 ${escapeHtml(tk.phone)}</div>`
    : "";

  const amountDetailHtml = tk.amount
    ? `<span class="ticket-amount sensitive ${locked ? "blurred" : ""}" id="detailAmount">₹${escapeHtml(String(tk.amount))}</span>`
    : "";

  document.getElementById("detailContent").innerHTML = `
    <div class="sheet-title">${escapeHtml(tk.name)}</div>
    ${phoneDetailHtml}
    ${itemsText ? `<div class="ticket-items" style="font-size:15px; margin-bottom:8px;">🧺 ${escapeHtml(itemsText)}${total ? ` · ${t("itemsTotal")}: ${total} ${t("pieces")}` : ""}</div>` : ""}
    ${tk.note ? `<div class="ticket-note" style="font-size:14px; margin-bottom:8px;">"${escapeHtml(tk.note)}"</div>` : ""}
    <div style="display:flex; gap:8px; margin: 12px 0;">
      <span class="pill ${isPaid ? "paid" : "owed"}">${isPaid ? "✓ " + t("paymentPaid") : t("paymentPending")}</span>
      ${amountDetailHtml}
    </div>
    <div class="ticket-time" style="margin-bottom: 16px;">${formatTime(tk.createdAt)}</div>

    <div class="action-row">
      ${tk.phone ? `<button id="callBtn" style="width:100%;">📞 ${t("call")}</button>` : ""}
      <button class="${isDone ? "undone-state" : "mark-done"}" id="toggleDoneBtn">${isDone ? t("markUndone") : "✓ " + t("markDone")}</button>
    </div>
    ${!isPaid ? `<div class="action-row"><button class="mark-paid" id="markPaidBtn">₹ ${t("markPaid")}</button></div>` : ""}
    <div class="action-row">
      <button id="editTicketBtn">${currentLang === "hi" ? "बदलें" : "Edit"}</button>
      <button class="btn-danger" id="deleteTicketBtn">${t("deleteEntry")}</button>
    </div>
  `;

  // Sensitive fields in the detail view: tapping while locked asks for the
  // PIN instead of immediately revealing the data.
  document.querySelectorAll("#detailContent .sensitive.blurred").forEach((el) => {
    el.addEventListener("click", async (e) => {
      e.stopPropagation();
      const ok = await requireUnlock();
      if (ok) openDetail(id); // re-render now unlocked
    });
  });

  if (document.getElementById("callBtn")) {
    document.getElementById("callBtn").addEventListener("click", async () => {
      const ok = await requireUnlock();
      if (ok) window.location.href = `tel:${tk.phone}`;
    });
  }

  document.getElementById("toggleDoneBtn").addEventListener("click", (e) => {
    e.currentTarget.classList.add("stamp-hit");
    setTimeout(() => toggleDone(tk.id), 160); // let the stamp animation read before the sheet closes
  });
  if (document.getElementById("markPaidBtn")) {
    document.getElementById("markPaidBtn").addEventListener("click", (e) => {
      e.currentTarget.classList.add("stamp-hit");
      setTimeout(() => markPaid(tk.id), 160);
    });
  }
  document.getElementById("editTicketBtn").addEventListener("click", () => {
    closeDetail();
    openAddSheet(tk);
  });
  document.getElementById("deleteTicketBtn").addEventListener("click", () => deleteTicket(tk.id));

  detailOverlay.classList.add("open");
}

function closeDetail() {
  detailOverlay.classList.remove("open");
  detailTicketId = null;
}

detailOverlay.addEventListener("click", (e) => {
  if (e.target === detailOverlay) closeDetail();
});

function toggleDone(id) {
  const idx = tickets.findIndex((tk) => tk.id === id);
  if (idx < 0) return;
  const nowDone = tickets[idx].status !== "done";
  tickets[idx].status = nowDone ? "done" : "pending";
  tickets[idx].doneAt = nowDone ? Date.now() : null;
  saveTickets(tickets);

  const archived = checkAndArchiveIfComplete(id);
  closeDetail();
  if (!archived) recentlyChangedTicketId = id; // archived tickets vanish, nothing to animate
  renderTickets();
  if (archived) {
    showToast(t("exportSuccess"));
  } else {
    showToast(nowDone ? t("markedDone") : t("saved"));
  }
}

function markPaid(id) {
  const idx = tickets.findIndex((tk) => tk.id === id);
  if (idx < 0) return;
  tickets[idx].paymentStatus = "paid";
  saveTickets(tickets);

  const archived = checkAndArchiveIfComplete(id);
  closeDetail();
  if (!archived) recentlyChangedTicketId = id;
  renderTickets();
  if (archived) {
    showToast(t("exportSuccess"));
  } else {
    showToast(t("markedPaid"));
  }
}

function deleteTicket(id) {
  if (!confirm(t("confirmDelete"))) return;
  tickets = tickets.filter((tk) => tk.id !== id);
  saveTickets(tickets);
  closeDetail();
  renderTickets();
  showToast(t("deleted"));
}

// ============================================================
// Excel export — completed-job record keeping
// ------------------------------------------------------------
// When an entry becomes BOTH done (delivered) AND paid, it's treated as
// finished: it gets appended to a downloadable Excel record (acting as
// a permanent paper-trail / proof of completed work) and is then removed
// from the active list, so the working list only ever shows what's still
// in progress.
//
// Browser security note: a website cannot silently append to a file
// already on disk — only the user's own device/OS can do that, and
// browsers intentionally block scripts from writing to arbitrary files
// without an explicit save dialog (otherwise any website could secretly
// edit your files). So "auto export" here means: the moment an entry is
// completed, a fresh Excel file containing all completed records is
// generated and downloaded automatically — no extra tap needed, it just
// lands in Downloads. This is documented in the README.
// ============================================================

const COMPLETED_LOG_KEY = "hisaab_khata_completed_log_v1";

function loadCompletedLog() {
  try {
    const raw = localStorage.getItem(COMPLETED_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCompletedLog(log) {
  try {
    localStorage.setItem(COMPLETED_LOG_KEY, JSON.stringify(log));
  } catch (e) {
    console.error("Failed to save completed log", e);
  }
}

function exportCompletedToExcel(silent) {
  const log = loadCompletedLog();
  if (!log.length) {
    if (!silent) showToast(t("exportEmpty"));
    return;
  }

  const rows = log.map((entry) => ({
    [currentLang === "hi" ? "नाम" : "Name"]: entry.name,
    [currentLang === "hi" ? "फ़ोन" : "Phone"]: entry.phone || "",
    [currentLang === "hi" ? "कपड़े" : "Items"]: entry.itemsSummary || "",
    [currentLang === "hi" ? "कुल टुकड़े" : "Total pieces"]: entry.totalItems || 0,
    [currentLang === "hi" ? "नोट" : "Note"]: entry.note || "",
    [currentLang === "hi" ? "राशि (₹)" : "Amount (₹)"]: entry.amount || "",
    [currentLang === "hi" ? "लिया गया" : "Received"]: formatExportDate(entry.createdAt),
    [currentLang === "hi" ? "पूरा हुआ" : "Completed"]: formatExportDate(entry.completedAt),
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = [
    { wch: 18 }, { wch: 16 }, { wch: 26 }, { wch: 10 },
    { wch: 26 }, { wch: 12 }, { wch: 16 }, { wch: 16 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, currentLang === "hi" ? "रिकॉर्ड" : "Records");

  const dateStamp = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `hisaab-khata-record-${dateStamp}.xlsx`);

  if (!silent) showToast(t("exportSuccess"));
}

function formatExportDate(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleString(currentLang === "hi" ? "hi-IN" : "en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

/**
 * Called whenever a ticket's done/paid state changes. If the ticket is
 * now both done AND paid, archive it: log it for the Excel export,
 * trigger the download, and remove it from the active tickets list.
 */
function checkAndArchiveIfComplete(ticketId) {
  const idx = tickets.findIndex((tk) => tk.id === ticketId);
  if (idx < 0) return false;
  const tk = tickets[idx];

  if (tk.status === "done" && tk.paymentStatus === "paid") {
    const log = loadCompletedLog();
    log.push({
      name: tk.name,
      phone: tk.phone || "",
      itemsSummary: itemsSummary(tk.items),
      totalItems: totalItemCount(tk.items),
      note: tk.note || "",
      amount: tk.amount || "",
      createdAt: tk.createdAt,
      completedAt: Date.now(),
    });
    saveCompletedLog(log);

    tickets.splice(idx, 1);
    saveTickets(tickets);

    exportCompletedToExcel(true);
    return true;
  }
  return false;
}

document.getElementById("exportNowBtn").addEventListener("click", () => exportCompletedToExcel(false));

// ---------- search ----------

document.getElementById("searchInput").addEventListener("input", renderTickets);

// ---------- toast ----------

let toastTimeout;
function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.classList.remove("show"), 2200);
}

// ---------- PWA install prompt ----------

let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  document.getElementById("installBanner").classList.add("show");
});

document.getElementById("installBtn").addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  document.getElementById("installBanner").classList.remove("show");
});

window.addEventListener("appinstalled", () => {
  document.getElementById("installBanner").classList.remove("show");
});

// ---------- service worker registration (offline support) ----------

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.warn("Service worker registration failed (app still works without offline cache):", err);
    });
  });
}

// ---------- startup integrity check ----------
// If the app is opened from inside an unextracted .zip (common on
// Windows: double-clicking the zip opens a virtual folder view, and
// browsers can't load JS/asset files from inside it), the page renders
// but every button silently does nothing because app.js's dependencies
// never loaded. Detect that here and show a clear, visible fix instead
// of failing silently.
function checkFilesLoadedCorrectly() {
  const xlsxLoaded = typeof XLSX !== "undefined";
  const isFileProtocol = window.location.protocol === "file:";

  if (!xlsxLoaded) {
    const banner = document.createElement("div");
    banner.style.cssText = `
      position: fixed; inset: 0; background: #FBF7F0; z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      padding: 30px; font-family: sans-serif; text-align: center;
    `;
    banner.innerHTML = `
      <div style="max-width: 360px;">
        <div style="font-size: 40px; margin-bottom: 12px;">⚠️</div>
        <div style="font-size: 20px; font-weight: 700; color: #2B2118; margin-bottom: 10px;">
          Files didn't load correctly
        </div>
        <div style="font-size: 14px; color: #5C4F3F; line-height: 1.6; margin-bottom: 16px;">
          ${isFileProtocol
            ? "This usually means the folder wasn't extracted from the .zip first. On Windows: right-click the .zip → <b>Extract All</b> → open <b>index.html</b> from the new extracted folder (not from inside the zip)."
            : "Some required files failed to load. Try refreshing the page, or re-downloading the app files."}
        </div>
        <button onclick="this.closest('div').parentElement.remove()" style="
          background: #C75D3C; color: white; border: none; padding: 10px 20px;
          border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;
        ">Dismiss anyway</button>
      </div>
    `;
    document.body.appendChild(banner);
    return false;
  }
  return true;
}

// ---------- boot ----------

checkFilesLoadedCorrectly();

document.getElementById("langHi").classList.toggle("active", currentLang === "hi");
document.getElementById("langEn").classList.toggle("active", currentLang === "en");

if (!hasPinSet()) {
  // No PIN ever set: nothing to gate, sensitive fields show normally.
  sensitivesUnlocked = true;
} else {
  // A PIN exists from a previous session: start locked. The user taps
  // any blurred field (or "Lock now" was used) to re-enter it.
  sensitivesUnlocked = false;
}

applyI18n();

if (!hasPinSet() && tickets.length === 0 && !localStorage.getItem("hisaab_khata_setup_seen_v1")) {
  // First-ever open with no data yet: offer PIN setup once. If they've
  // already added entries before without a PIN, don't interrupt them
  // unprompted on every load — they can still set one anytime via
  // "Lock now".
  localStorage.setItem("hisaab_khata_setup_seen_v1", "1");
  setTimeout(() => openPinSetup(), 600);
}
