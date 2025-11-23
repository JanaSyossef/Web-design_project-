let isArabic = false;
let originalTexts = new Map();
let lastTranslationDuration = 1500;

const spinner = document.createElement("div");
spinner.id = "loading-spinner";
spinner.innerHTML = `<div class="spinner"></div>`;
document.body.appendChild(spinner);

const spinnerStyle = document.createElement("style");
spinnerStyle.textContent = `
#loading-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.6); /* طبقة شفافة */
  backdrop-filter: blur(30px); /* ضباب خفيف يخفي التغييرات */
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  transition: opacity 0.3s ease;
}
.spinner {
  width: 60px;
  height: 60px;
  border: 6px solid #ddd;
  border-top: 6px solid #4f46e5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
#loading-spinner.active {
  display: flex;
  opacity: 1;
}
body.loading {
  pointer-events: none;
  user-select: none;
}
`;
document.head.appendChild(spinnerStyle);

async function translateText(text, targetLang = 'ar') {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data[0].map(item => item[0]).join('');
}

async function translateNode(node, targetLang) {
  if (node.nodeType === 3) {
    const original = node.textContent.trim();
    if (!original) return;

    if (!originalTexts.has(node)) {
      originalTexts.set(node, original);
    }

    if (targetLang === 'ar') {
      try {
        const translated = await translateText(original, 'ar');
        node.textContent = translated;
      } catch (e) {
        console.error("Translation failed for:", original);
      }
    } else {
      node.textContent = originalTexts.get(node);
    }
  } 
  else if (node.nodeType === 1) {
    const attrs = ['placeholder', 'title', 'alt', 'value'];
    for (let attr of attrs) {
      if (node.hasAttribute(attr)) {
        const originalAttr = node.getAttribute(attr).trim();
        if (originalAttr) {
          if (!originalTexts.has(`${attr}-${node}`)) {
            originalTexts.set(`${attr}-${node}`, originalAttr);
          }

          if (targetLang === 'ar') {
            try {
              const translated = await translateText(originalAttr, 'ar');
              node.setAttribute(attr, translated);
            } catch (e) {
              console.error(`Translation failed for ${attr}:`, originalAttr);
            }
          } else {
            node.setAttribute(attr, originalTexts.get(`${attr}-${node}`));
          }
        }
      }
    }

    for (let child of node.childNodes) {
      await translateNode(child, targetLang);
    }
  }
}

async function translatePage(targetLang) {
  await translateNode(document.body, targetLang);
}

document.getElementById("language-button").addEventListener("click", async () => {
  document.body.classList.add("loading");
  spinner.style.display = "flex";
  spinner.classList.add("active");

  const startTime = Date.now();

  if (!isArabic) {
    await translatePage('ar');
    const elapsed = Date.now() - startTime;
    lastTranslationDuration = elapsed;
  } else {
    await Promise.all([
      translatePage('en'),
      new Promise(resolve => setTimeout(resolve, lastTranslationDuration))
    ]);
  }

  spinner.style.opacity = "0";
  setTimeout(() => {
    spinner.style.display = "none";
    spinner.classList.remove("active");
    spinner.style.opacity = "1";
    document.body.classList.remove("loading");
  }, 300);

  isArabic = !isArabic;
});
