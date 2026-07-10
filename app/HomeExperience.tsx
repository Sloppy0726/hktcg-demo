"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Language = "en" | "zh";
type ExperienceMode = "pending" | "cinema" | "static";

type LocalizedText = {
  en: string;
  zh: string;
};

type CinemaCue = {
  id: string;
  marker: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  posterDesktop: string;
  posterMobile: string;
  alt: LocalizedText;
  align: "left" | "right";
  action?: LocalizedText;
  actionHref?: string;
};

const cinemaCues: CinemaCue[] = [
  {
    id: "entrance",
    marker: { en: "iSQUARE · Tsim Sha Tsui", zh: "iSQUARE · 尖沙咀" },
    title: {
      en: "Enter Hong Kong’s card destination.",
      zh: "走進香港的卡牌目的地。",
    },
    body: {
      en: "Cards to collect. Tables to play. People to meet. Step inside HKTCG.",
      zh: "有卡可收，有枱可打，有同好可識。走進 HKTCG。",
    },
    posterDesktop: "/media/cinematic/entrance-desktop.jpg",
    posterMobile: "/media/cinematic/entrance-mobile.jpg",
    alt: {
      en: "Visitors enter HKTCG through its red architectural frame.",
      zh: "訪客穿過紅色建築門框進入 HKTCG。",
    },
    align: "left",
  },
  {
    id: "trading",
    marker: { en: "At the centre", zh: "店舖中央" },
    title: {
      en: "The T stands for Trading.",
      zh: "T，代表 Trading——交易。",
    },
    body: {
      en: "Hundreds of suspended red plaques shift from pattern to letter. Find the angle, and the T appears.",
      zh: "數百塊紅色懸掛牌片，從圖案逐步拼成字母。走到對的角度，T 就會出現。",
    },
    posterDesktop: "/media/cinematic/trading-desktop.jpg",
    posterMobile: "/media/cinematic/trading-mobile.jpg",
    alt: {
      en: "Suspended red plaques align into a large T at the centre of HKTCG.",
      zh: "懸掛的紅色牌片在 HKTCG 中央拼成大型 T 字。",
    },
    align: "right",
  },
  {
    id: "collect",
    marker: { en: "Collect", zh: "收藏" },
    title: {
      en: "A museum for cards.",
      zh: "一座卡牌博物館。",
    },
    body: {
      en: "Rows of cards line the illuminated collection wall. Stop, compare and find the one that pulls you in.",
      zh: "一排排卡牌陳列在發光收藏牆上。停下來、比較一下，再找出吸引你的那一張。",
    },
    posterDesktop: "/media/cinematic/collect-desktop.jpg",
    posterMobile: "/media/cinematic/collect-mobile.jpg",
    alt: {
      en: "Trading cards line HKTCG’s illuminated collection wall.",
      zh: "卡牌排列在 HKTCG 的發光收藏牆上。",
    },
    align: "left",
    action: { en: "Browse cards", zh: "瀏覽卡牌" },
    actionHref: "https://www.hktcg.com/en",
  },
  {
    id: "services",
    marker: { en: "Trade · Grade · Consign", zh: "交易 · 評級 · 寄賣" },
    title: {
      en: "Your cards. Your next move.",
      zh: "你的卡。你的下一步。",
    },
    body: {
      en: "Bring your cards to the counter. Ask the team about trading, authentication, grading or consignment.",
      zh: "把卡帶到櫃檯，向團隊查詢交易、真偽鑑定、評級或寄賣。",
    },
    posterDesktop: "/media/cinematic/services-desktop.jpg",
    posterMobile: "/media/cinematic/services-mobile.jpg",
    alt: {
      en: "Visitors gather at the red HKTCG service counter.",
      zh: "訪客在紅色 HKTCG 服務櫃檯前聚集。",
    },
    align: "right",
    action: { en: "Explore card services", zh: "了解卡牌服務" },
    actionHref: "https://asset.hktcg.com",
  },
  {
    id: "community",
    marker: { en: "Play · Events · Community", zh: "對戰 · 活動 · 社群" },
    title: {
      en: "Bring a deck. Join the table.",
      zh: "帶副牌來。坐低開局。",
    },
    body: {
      en: "Practise, compete, meet other players—or sit down for your first game.",
      zh: "練習、比賽、認識其他玩家，或者開始你的第一局。",
    },
    posterDesktop: "/media/cinematic/community-desktop.jpg",
    posterMobile: "/media/cinematic/community-mobile.jpg",
    alt: {
      en: "Players sit across long tables in HKTCG’s red-and-white play area.",
      zh: "玩家坐在 HKTCG 紅白對戰區的長枱兩旁。",
    },
    align: "left",
    action: { en: "See what’s on", zh: "查看最新活動" },
    actionHref: "https://www.instagram.com/hktcg.isquare/",
  },
];

const cueRanges = [
  { start: 0, end: 0.18 },
  { start: 0.18, end: 0.43 },
  { start: 0.43, end: 0.64 },
  { start: 0.64, end: 0.82 },
  { start: 0.82, end: 1 },
] as const;

const filmMap = [
  { progress: 0, time: 0 },
  { progress: 0.18, time: 3.85 },
  { progress: 0.43, time: 11.49 },
  { progress: 0.64, time: 12.83 },
  { progress: 0.82, time: 15.05 },
  { progress: 1, time: 19.2 },
] as const;

const labels = {
  en: {
    visit: "Plan your visit",
    skip: "Skip walkthrough",
    scroll: "Scroll to walk through",
    loading: "Preparing the store",
    walkthrough: "Store walkthrough",
    menu: "Menu",
    nav: ["Walkthrough", "Visit", "Play & Events", "Card Services", "Shop"],
    endLabel: "You are inside",
    endTitle: "Now make it your visit.",
    endBody:
      "You have seen the route. Here is what you need to visit, join a game or bring a card to the counter.",
    visitTitle: "Come see it for real.",
    visitBody:
      "HKTCG is on 2/F of iSQUARE in Tsim Sha Tsui. Open every day from 11:30 to 23:30.",
    directions: "Get directions",
    addressLabel: "Address",
    address: "2/F, iSQUARE, 63 Nathan Road, Tsim Sha Tsui",
    hoursLabel: "Opening hours",
    hours: "Monday–Sunday, 11:30–23:30",
    playTitle: "Bring a deck. Find a game.",
    playBody:
      "The play area hosts practice, card battles and organised events. Check the latest schedule before you visit.",
    playAction: "Check the latest events",
    serviceTitle: "Your cards. Your next move.",
    serviceBody:
      "Ask the team about trading, authentication, grading or consignment. They will explain the options before you decide.",
    serviceAction: "Explore card services",
    storesTitle: "One floor. Different specialists.",
    storesBody:
      "Explore the card businesses alongside HKTCG at iSQUARE. Each brings a different focus and selection to the floor.",
    storesAction: "Explore the floor",
    shopTitle: "Know what you’re looking for?",
    shopBody:
      "Browse single cards and graded cards online, with delivery or free pickup from the iSQUARE store.",
    shopAction: "Shop cards",
    backTop: "Back to top",
  },
  zh: {
    visit: "計劃到訪",
    skip: "跳過導覽",
    scroll: "向下捲動，走進店內",
    loading: "正在準備店內導覽",
    walkthrough: "店內導覽",
    menu: "選單",
    nav: ["店內導覽", "到訪", "對戰及活動", "卡牌服務", "網店"],
    endLabel: "你已走進店內",
    endTitle: "接下來，輪到你親身來。",
    endBody: "路線看過了。以下是到訪、參加對戰或帶卡到櫃檯前需要知道的事。",
    visitTitle: "親身來看。",
    visitBody: "HKTCG 位於尖沙咀 iSQUARE 國際廣場2樓，每日 11:30 至 23:30 開放。",
    directions: "查看路線",
    addressLabel: "地址",
    address: "尖沙咀彌敦道63號 iSQUARE 國際廣場2樓",
    hoursLabel: "營業時間",
    hours: "星期一至日，11:30–23:30",
    playTitle: "帶副牌來，找一局打。",
    playBody: "對戰區會舉行練習、卡牌對戰及活動。到訪前先查看最新日程。",
    playAction: "查看最新活動",
    serviceTitle: "你的卡，下一步由你決定。",
    serviceBody: "向團隊查詢交易、真偽鑑定、評級或寄賣。團隊會先講解可選方案，再由你決定。",
    serviceAction: "了解卡牌服務",
    storesTitle: "同一層，不同專長。",
    storesBody: "到訪 iSQUARE 內與 HKTCG 同場的卡牌專門店。每間店都帶來不同專長與選品。",
    storesAction: "查看樓層",
    shopTitle: "知道自己要找甚麼？",
    shopBody: "網上瀏覽單卡及評級卡，可選擇送貨，或到 iSQUARE 門市免費自取。",
    shopAction: "選購卡牌",
    backTop: "返回頁首",
  },
} as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value: number) {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
}

function cueOpacity(progress: number, start: number, end: number, isLast: boolean) {
  const fade = Math.min(0.038, (end - start) * 0.24);
  if (progress < start || progress > end) return 0;
  if (start > 0 && progress < start + fade) return smoothstep((progress - start) / fade);
  if (!isLast && progress > end - fade) return smoothstep((end - progress) / fade);
  return 1;
}

function timeForProgress(progress: number, duration: number) {
  const bounded = clamp(progress);
  for (let index = 0; index < filmMap.length - 1; index += 1) {
    const current = filmMap[index];
    const next = filmMap[index + 1];
    if (bounded <= next.progress) {
      const local = (bounded - current.progress) / (next.progress - current.progress);
      const authoredTime = current.time + (next.time - current.time) * local;
      return (authoredTime / filmMap[filmMap.length - 1].time) * duration;
    }
  }
  return duration;
}

function CueTitle({ cue, language, heading = "h2" }: { cue: CinemaCue; language: Language; heading?: "h1" | "h2" }) {
  const Heading = heading;
  if (cue.id === "trading" && language === "en") {
    return (
      <Heading className="cinema-title cinema-title--trading">
        <span className="sr-only">The T stands for Trading.</span>
        <span aria-hidden="true">The T stands for</span>
        <strong aria-hidden="true">Trading.</strong>
      </Heading>
    );
  }
  return <Heading className="cinema-title">{cue.title[language]}</Heading>;
}

function CinematicWalkthrough({ language }: { language: Language }) {
  const [mode, setMode] = useState<ExperienceMode>("pending");
  const [videoSource, setVideoSource] = useState<string>();
  const [mobilePlaybackSource, setMobilePlaybackSource] = useState<{
    source: string;
    url: string;
  }>();
  const [readyPlaybackSource, setReadyPlaybackSource] = useState<string>();
  const [activeCue, setActiveCue] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const cueRefs = useRef<Array<HTMLElement | null>>([]);
  const renderFrameRef = useRef<(() => void) | null>(null);
  const activeCueRef = useRef(0);
  const metadataReadyRef = useRef(false);
  const latestTargetRef = useRef(0);
  const mobileObjectUrlRef = useRef<string>();
  const primedRef = useRef(false);
  const selectedSourceRef = useRef<string>();
  const l = labels[language];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const connection = (
      navigator as Navigator & {
        connection?: {
          saveData?: boolean;
          effectiveType?: string;
          addEventListener?: (type: string, listener: () => void) => void;
          removeEventListener?: (type: string, listener: () => void) => void;
        };
      }
    ).connection;

    const sync = () => {
      const constrained =
        Boolean(connection?.saveData) ||
        connection?.effectiveType === "slow-2g" ||
        connection?.effectiveType === "2g";

      if (reducedMotion.matches || constrained) {
        if (selectedSourceRef.current !== undefined) {
          selectedSourceRef.current = undefined;
          metadataReadyRef.current = false;
          primedRef.current = false;
          setReadyPlaybackSource(undefined);
        }
        setMode("static");
        setVideoSource(undefined);
        return;
      }

      const nextSource = mobile.matches
        ? "/media/cinematic/walkthrough-mobile.mp4"
        : "/media/cinematic/walkthrough-desktop.mp4";

      if (selectedSourceRef.current !== nextSource) {
        selectedSourceRef.current = nextSource;
        metadataReadyRef.current = false;
        primedRef.current = false;
        setReadyPlaybackSource(undefined);
      }

      setMode("cinema");
      setVideoSource(nextSource);
    };

    const listen = (query: MediaQueryList) => {
      if (typeof query.addEventListener === "function") query.addEventListener("change", sync);
      else query.addListener(sync);
    };

    const unlisten = (query: MediaQueryList) => {
      if (typeof query.removeEventListener === "function") query.removeEventListener("change", sync);
      else query.removeListener(sync);
    };

    sync();
    listen(reducedMotion);
    listen(mobile);
    connection?.addEventListener?.("change", sync);

    return () => {
      unlisten(reducedMotion);
      unlisten(mobile);
      connection?.removeEventListener?.("change", sync);
    };
  }, []);

  useEffect(() => {
    metadataReadyRef.current = false;
    if (!videoSource?.includes("walkthrough-mobile")) return;

    const controller = new AbortController();

    // Sites serves the private MP4 as one response, so stage it locally before Safari seeks.
    fetch(videoSource, {
      cache: "force-cache",
      credentials: "same-origin",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load mobile walkthrough: ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        if (controller.signal.aborted) return;
        const objectUrl = URL.createObjectURL(blob);
        if (mobileObjectUrlRef.current) URL.revokeObjectURL(mobileObjectUrlRef.current);
        mobileObjectUrlRef.current = objectUrl;
        setMobilePlaybackSource({ source: videoSource, url: objectUrl });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setVideoSource(undefined);
        setMode("static");
      });

    return () => {
      controller.abort();
    };
  }, [videoSource]);

  useEffect(
    () => () => {
      if (mobileObjectUrlRef.current) URL.revokeObjectURL(mobileObjectUrlRef.current);
    },
    [],
  );

  useEffect(() => {
    if (mode !== "cinema") return;
    const section = sectionRef.current;
    if (!section) return;

    let sectionTop = 0;
    let travel = 1;
    let frame = 0;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      travel = Math.max(1, section.offsetHeight - window.innerHeight);
    };

    const renderFrame = () => {
      frame = 0;
      const progress = clamp((window.scrollY - sectionTop) / travel);
      section.style.setProperty("--film-progress", progress.toFixed(5));

      if (progressRef.current) progressRef.current.value = progress;

      let nextActive = 0;
      cueRanges.forEach((range, index) => {
        if (progress >= range.start) nextActive = index;
        const opacity = cueOpacity(progress, range.start, range.end, index === cueRanges.length - 1);
        const node = cueRefs.current[index];
        if (!node) return;
        node.style.setProperty("--cue-opacity", opacity.toFixed(4));
        node.style.setProperty("--cue-shift", `${((1 - opacity) * 28).toFixed(2)}px`);
        node.style.setProperty("--cue-scale", (0.985 + opacity * 0.015).toFixed(4));
        node.style.pointerEvents = opacity > 0.72 ? "auto" : "none";
      });

      if (nextActive !== activeCueRef.current) {
        activeCueRef.current = nextActive;
        setActiveCue(nextActive);
      }

      const video = videoRef.current;
      if (video && metadataReadyRef.current && Number.isFinite(video.duration)) {
        const target = Math.min(video.duration - 0.025, timeForProgress(progress, video.duration));
        latestTargetRef.current = target;
        if (!video.seeking && Math.abs(video.currentTime - target) >= 1 / 30) {
          try {
            video.currentTime = target;
          } catch {
            // Safari can reject a seek until its first frame is decoded.
          }
        }
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(renderFrame);
    };

    const handleResize = () => {
      measure();
      schedule();
    };

    renderFrameRef.current = renderFrame;
    measure();
    renderFrame();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", handleResize);
    const observer = new ResizeObserver(() => {
      measure();
      schedule();
    });
    observer.observe(section);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      renderFrameRef.current = null;
    };
  }, [mode]);

  const playbackSource = videoSource?.includes("walkthrough-mobile")
    ? mobilePlaybackSource?.source === videoSource
      ? mobilePlaybackSource.url
      : undefined
    : videoSource;

  const handleMetadata = () => {
    primedRef.current = false;
    metadataReadyRef.current = true;
    renderFrameRef.current?.();
  };

  const handlePlayable = () => {
    const video = videoRef.current;
    if (!video || !playbackSource) return;
    renderFrameRef.current?.();
    if (!video.seeking) {
      setReadyPlaybackSource(playbackSource);
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video || !metadataReadyRef.current) return;

    const target = latestTargetRef.current;
    if (Math.abs(video.currentTime - target) >= 1 / 30) {
      try {
        video.currentTime = target;
        return;
      } catch {
        // The decoded frame below is still a valid fallback.
      }
    }

    video.pause();
    if (playbackSource) setReadyPlaybackSource(playbackSource);
  };

  const handlePlaying = () => {
    const video = videoRef.current;
    if (!video) return;
    primedRef.current = true;
    video.pause();
    renderFrameRef.current?.();
  };

  const primeVideo = () => {
    const video = videoRef.current;
    if (!video || !metadataReadyRef.current || primedRef.current || video.seeking) return;

    const playback = video.play();
    playback
      ?.then(() => {
        primedRef.current = true;
        video.pause();
        renderFrameRef.current?.();
      })
      .catch(() => {
        // The complete mobile Blob remains seekable even when autoplay is blocked.
      });
  };

  const handleVideoError = () => {
    metadataReadyRef.current = false;
    primedRef.current = false;
    setReadyPlaybackSource(undefined);
    setVideoSource(undefined);
    setMode("static");
  };

  const videoReady = Boolean(playbackSource && readyPlaybackSource === playbackSource);
  const activePoster = cinemaCues[activeCue];

  return (
    <section
      id="walkthrough"
      ref={sectionRef}
      className="cinema"
      data-mode={mode}
      data-active={activeCue}
      data-film-ready={videoReady}
      aria-label={l.walkthrough}
      onPointerDown={primeVideo}
    >
      <div className="cinema-stage">
        <picture className="cinema-poster">
          <source media="(max-width: 767px)" srcSet={activePoster.posterMobile} />
          <img src={activePoster.posterDesktop} alt="" width={1440} height={810} />
        </picture>
        {playbackSource ? (
          <video
            ref={videoRef}
            key={playbackSource}
            className={videoReady ? "cinema-film is-ready" : "cinema-film"}
            src={playbackSource}
            muted
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
            onLoadedMetadata={handleMetadata}
            onLoadedData={handlePlayable}
            onCanPlay={handlePlayable}
            onSeeked={handleSeeked}
            onPlaying={handlePlaying}
            onError={handleVideoError}
          />
        ) : null}
        <div className="cinema-vignette" aria-hidden="true" />
        <div className="cinema-overlays">
          {cinemaCues.map((cue, index) => (
            <article
              key={cue.id}
              ref={(node) => {
                cueRefs.current[index] = node;
              }}
              className={`cinema-cue cinema-cue--${cue.align} cinema-cue--${cue.id}`}
              aria-hidden={activeCue !== index}
            >
              <p className="cinema-marker">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {cue.marker[language]}
              </p>
              <CueTitle cue={cue} language={language} heading={index === 0 ? "h1" : "h2"} />
              <p className="cinema-body">{cue.body[language]}</p>
              <div className="cinema-actions">
                {index === 0 ? (
                  <>
                    <a className="button button--signal" href="#visit" tabIndex={activeCue === index ? 0 : -1}>
                      {l.visit} <span aria-hidden="true">↗</span>
                    </a>
                    <a className="text-link text-link--light" href="#visit" tabIndex={activeCue === index ? 0 : -1}>
                      {l.skip}
                    </a>
                  </>
                ) : cue.action && cue.actionHref ? (
                  <a
                    className="cinema-inline-link"
                    href={cue.actionHref}
                    tabIndex={activeCue === index ? 0 : -1}
                  >
                    {cue.action[language]} <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="cinema-status" aria-hidden="true">
          <span className="cinema-status__cue">
            {String(activeCue + 1).padStart(2, "0")} / {String(cinemaCues.length).padStart(2, "0")}
          </span>
          <progress ref={progressRef} max={1} value={0} />
          <span>{videoReady ? l.scroll : l.loading}</span>
        </div>
        <a className="cinema-skip" href="#visit">
          {l.skip} ↓
        </a>
      </div>

      <div className="cinema-static">
        {cinemaCues.map((cue, index) => (
          <article className="static-scene" key={cue.id} data-align={cue.align}>
            <picture>
              <source media="(max-width: 767px)" srcSet={cue.posterMobile} />
              <img
                src={cue.posterDesktop}
                alt={cue.alt[language]}
                width={1440}
                height={810}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </picture>
            <div className="static-scene__copy">
              <p className="cinema-marker">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {cue.marker[language]}
              </p>
              <CueTitle cue={cue} language={language} heading={index === 0 ? "h1" : "h2"} />
              <p className="cinema-body">{cue.body[language]}</p>
              {index === 0 ? (
                <div className="cinema-actions">
                  <a className="button button--signal" href="#visit">{l.visit} ↗</a>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HomeExperience() {
  const [language, setLanguage] = useState<Language>("en");
  const l = labels[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-HK" : "en";
  }, [language]);

  return (
    <>
      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="HKTCG home">
          <Image src="/brand/hktcg-logo.png" alt="HKTCG" width={126} height={45} priority unoptimized />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#walkthrough">{l.nav[0]}</a>
          <a href="#visit">{l.nav[1]}</a>
          <a href="#play">{l.nav[2]}</a>
          <a href="#services">{l.nav[3]}</a>
          <a href="https://www.hktcg.com/en">{l.nav[4]}</a>
        </nav>
        <div className="header-actions">
          <button
            className="language-toggle"
            type="button"
            onClick={() => setLanguage((current) => (current === "en" ? "zh" : "en"))}
            aria-label={language === "en" ? "Switch to Traditional Chinese" : "Switch to English"}
          >
            {language === "en" ? "繁" : "EN"}
          </button>
          <a className="header-visit" href="#visit">{l.visit}</a>
          <details className="mobile-menu">
            <summary>{l.menu}</summary>
            <nav aria-label="Mobile navigation">
              <a href="#walkthrough">{l.nav[0]}</a>
              <a href="#visit">{l.nav[1]}</a>
              <a href="#play">{l.nav[2]}</a>
              <a href="#services">{l.nav[3]}</a>
              <a href="https://www.hktcg.com/en">{l.nav[4]}</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="top" lang={language === "zh" ? "zh-HK" : "en"}>
        <CinematicWalkthrough language={language} />

        <section className="tour-end" aria-labelledby="tour-end-title">
          <p>{l.endLabel}</p>
          <h2 id="tour-end-title">{l.endTitle}</h2>
          <span>{l.endBody}</span>
        </section>

        <section id="visit" className="visit-section" aria-labelledby="visit-title">
          <div className="visit-copy">
            <p className="section-marker">HKTCG / iSQUARE</p>
            <h2 id="visit-title">{l.visitTitle}</h2>
            <p>{l.visitBody}</p>
            <a className="button button--dark" href="https://www.google.com/maps/search/?api=1&query=HKTCG+iSQUARE+Hong+Kong">
              {l.directions} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <dl className="visit-details">
            <div><dt>{l.addressLabel}</dt><dd>{l.address}</dd></div>
            <div><dt>{l.hoursLabel}</dt><dd>{l.hours}</dd></div>
          </dl>
        </section>

        <section id="play" className="experience-section">
          <div className="experience-media">
            <picture>
              <source media="(max-width: 767px)" srcSet="/media/cinematic/community-mobile.jpg" />
              <img src="/media/cinematic/community-desktop.jpg" alt={cinemaCues[4].alt[language]} width={1440} height={810} loading="lazy" />
            </picture>
          </div>
          <div className="experience-copy">
            <p className="section-marker">Play / Events / Community</p>
            <h2>{l.playTitle}</h2>
            <p>{l.playBody}</p>
            <a className="text-link text-link--light" href="https://www.instagram.com/hktcg.isquare/">
              {l.playAction} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section id="services" className="services-section" aria-labelledby="services-title">
          <div className="services-heading">
            <p className="section-marker">Trade / Authenticate / Grade / Consign</p>
            <h2 id="services-title">{l.serviceTitle}</h2>
            <p>{l.serviceBody}</p>
          </div>
          <div className="service-routes">
            <a href="https://asset.hktcg.com">
              <span>{language === "en" ? "Platform" : "平台"}</span><strong>{l.serviceAction}</strong><i aria-hidden="true">↗</i>
            </a>
            <a href="mailto:support@hktcg.com?subject=HKTCG%20card%20services">
              <span>{language === "en" ? "Team" : "團隊"}</span><strong>support@hktcg.com</strong><i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>

        <section className="stores-section" aria-labelledby="stores-title">
          <div>
            <p className="section-marker">The iSQUARE floor</p>
            <h2 id="stores-title">{l.storesTitle}</h2>
            <p>{l.storesBody}</p>
          </div>
          <a className="button button--signal" href="https://www.instagram.com/p/DaKmi2cjJ_K/">
            {l.storesAction} <span aria-hidden="true">↗</span>
          </a>
          <div className="store-name-rail" aria-hidden="true"><span>HKTCG</span><span>CARDS</span><span>SPORT</span><span>PLAY</span><span>TRADE</span></div>
        </section>

        <section className="shop-section" aria-labelledby="shop-title">
          <picture className="shop-media">
            <source media="(max-width: 767px)" srcSet="/media/cinematic/collect-mobile.jpg" />
            <img src="/media/cinematic/collect-desktop.jpg" alt={cinemaCues[2].alt[language]} width={1440} height={810} loading="lazy" />
          </picture>
          <div className="shop-copy">
            <p className="section-marker">Online / Pickup / Delivery</p>
            <h2 id="shop-title">{l.shopTitle}</h2>
            <p>{l.shopBody}</p>
            <a className="button button--light" href="https://www.hktcg.com/en">{l.shopAction} <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Image src="/brand/hktcg-logo.png" alt="HKTCG" width={160} height={57} unoptimized />
        <p>PLAY. COLLECT. CONNECT.</p>
        <nav aria-label="Footer navigation">
          <a href="https://www.instagram.com/hktcg.isquare/">Instagram</a>
          <a href="https://www.hktcg.com/en/pages/aboutus">About</a>
          <a href="mailto:support@hktcg.com">Contact</a>
          <a href="#top">{l.backTop} ↑</a>
        </nav>
      </footer>
    </>
  );
}
