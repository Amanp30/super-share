class SuperShare {
  #url;
  #text;
  #hashtags;
  #links = {};

  constructor({
    url = typeof window !== "undefined" ? window.location.href : "",
    text = typeof document !== "undefined" ? document.title : "",
    hashtags = "",
  } = {}) {
    this.#url = encodeURIComponent(url);
    this.#text = encodeURIComponent(text);
    this.#hashtags = encodeURIComponent(hashtags);

    this.#buildShareUrls();
  }

  // Private method to create share URLs for all platforms
  #buildShareUrls() {
    const u = this.#url;
    const t = this.#text;
    const h = this.#hashtags;

    this.#links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      twitter: `https://twitter.com/intent/tweet?url=${u}&text=${t}&hashtags=${h}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      whatsapp: `https://api.whatsapp.com/send?text=${t}%20${u}`,
      telegram: `https://t.me/share/url?url=${u}&text=${t}`,
      reddit: `https://www.reddit.com/submit?url=${u}&title=${t}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${u}&description=${t}`,
      email: `mailto:?subject=${t}&body=${u}`,
      tumblr: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${u}&title=${t}`,
      buffer: `https://buffer.com/add?url=${u}&text=${t}`,
      vk: `https://vk.com/share.php?url=${u}&title=${t}`,
      xing: `https://www.xing.com/spi/shares/new?url=${u}`,
      sms: `sms:?body=${t}%20${u}`,
      pocket: `https://getpocket.com/save?url=${u}&title=${t}`,
      flipboard: `https://share.flipboard.com/bookmarklet/popout?v=2&title=${t}&url=${u}`,
      instapaper: `https://www.instapaper.com/edit?url=${u}&title=${t}&description=${t}`,
      skype: `https://web.skype.com/share?url=${u}&text=${t}`,
      line: `https://social-plugins.line.me/lineit/share?url=${u}`,
      mix: `https://mix.com/add?url=${u}`,
      digg: `https://digg.com/submit?url=${u}&title=${t}`,
      weibo: `https://service.weibo.com/share/share.php?url=${u}&title=${t}`,
      snapchat: `https://www.snapchat.com/scan?attachmentUrl=${u}`,
    };
  }

  // Bind click handlers to elements matching the selector or with data-share attribute
  attachShareHandlers(selector = "[data-share]") {
    if (typeof document === "undefined") return;

    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      const platform = element.getAttribute("data-share")?.toLowerCase();
      const url = this.#links[platform];

      if (url) {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          window.open(url, "_blank", "width=600,height=400");
        });
      }
    });
  }

  // Retrieve share URL for a specific platform
  getShareUrl(platform) {
    return this.#links[platform.toLowerCase()] || null;
  }

  // Get all generated share URLs
  getAllShareUrls() {
    return { ...this.#links };
  }
}

// Universal export
if (typeof module !== "undefined" && module.exports) {
  module.exports = SuperShare;
} else if (typeof window !== "undefined") {
  window.SuperShare = SuperShare;
}
