"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Language = "en" | "zh";

type LocalizedText = {
  en: string;
  zh: string;
};

type TourScene = {
  id: string;
  rail: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  posterDesktop: string;
  posterMobile: string;
  clipDesktop?: string;
  clipMobile?: string;
  layout: "threshold" | "full" | "portrait";
  align: "left" | "right";
  alt: LocalizedText;
  action?: LocalizedText;
  actionHref?: string;
};

const tourScenes: TourScene[] = [
  {
    id: "entrance",
    rail: { en: "Entrance", zh: "入口" },
    title: {
      en: "Enter\nHong Kong’s\ncard destination.",
      zh: "走進香港的\n卡牌目的地。",
    },
    body: {
      en: "Cards to collect. Tables to play. People to meet. Step inside HKTCG at iSQUARE.",
      zh: "有卡可收，有枱可打，有同好可識。走進 iSQUARE 的 HKTCG。",
    },
    posterDesktop: "/media/store-tour/hero-desktop.webp",
    posterMobile: "/media/store-tour/hero-mobile.webp",
    clipDesktop: "/media/store-tour/entrance-desktop.mp4",
    clipMobile: "/media/store-tour/entrance-mobile.mp4",
    layout: "threshold",
    align: "left",
    alt: {
      en: "Visitors enter HKTCG through a red frame, with illuminated card displays on both sides.",
      zh: "訪客穿過紅色門框進入 HKTCG，兩旁是發光卡牌展櫃。",
    },
  },
  {
    id: "the-t",
    rail: { en: "The T", zh: "T 字" },
    title: {
      en: "The T stands\nfor Trading.",
      zh: "T，代表 Trading\n——交易。",
    },
    body: {
      en: "At the centre of the store, suspended red plaques shift from pattern to letter. Find the angle, and the T appears.",
      zh: "店舖中央的紅色懸掛牌片，從圖案逐步拼成字母。走到對的角度，T 就會出現。",
    },
    posterDesktop: "/media/store-tour/t-desktop.webp",
    posterMobile: "/media/store-tour/t-mobile.webp",
    clipDesktop: "/media/store-tour/t-desktop.mp4",
    clipMobile: "/media/store-tour/t-mobile.mp4",
    layout: "full",
    align: "left",
    alt: {
      en: "Suspended red plaques align into a large T at the centre of HKTCG.",
      zh: "懸掛的紅色牌片在 HKTCG 中央拼成大型 T 字。",
    },
  },
  {
    id: "collect",
    rail: { en: "Collect", zh: "收藏" },
    title: {
      en: "Stop at the\ncollection wall.",
      zh: "在收藏卡牆前\n停一停。",
    },
    body: {
      en: "The owner calls this “the museum”: rows of cards displayed for a slower look. Stop, compare and find the one that pulls you in.",
      zh: "店主叫這裡做「博物館」：一排排卡牌，讓你慢慢細看。停下來、比較一下，再找出吸引你的那一張。",
    },
    posterDesktop: "/media/store-tour/collect-desktop.webp",
    posterMobile: "/media/store-tour/collect-mobile.webp",
    clipDesktop: "/media/store-tour/collect-desktop.mp4",
    clipMobile: "/media/store-tour/collect-mobile.mp4",
    layout: "full",
    align: "right",
    alt: {
      en: "Rows of trading cards fill illuminated wall cases around white display plinths.",
      zh: "一排排卡牌陳列在發光牆櫃內，前方設有白色展台。",
    },
    action: { en: "Browse cards", zh: "瀏覽卡牌" },
    actionHref: "https://www.hktcg.com/en",
  },
  {
    id: "auction",
    rail: { en: "Auction", zh: "拍賣" },
    title: {
      en: "The floor changes\nwith the crowd.",
      zh: "人一到，\n場地就變。",
    },
    body: {
      en: "On event days, the open floor becomes a room for auctions, tournaments and collector gatherings.",
      zh: "活動日，開放空間會變成拍賣、比賽與收藏家聚會的場地。",
    },
    posterDesktop: "/media/store-tour/auction-mobile.webp",
    posterMobile: "/media/store-tour/auction-mobile.webp",
    layout: "portrait",
    align: "left",
    alt: {
      en: "The open white event floor faces the red HKTCG counter.",
      zh: "開放式白色活動空間面向 HKTCG 的紅色櫃檯。",
    },
    action: { en: "See what’s on", zh: "查看最新活動" },
    actionHref: "https://www.instagram.com/hktcg.isquare/",
  },
  {
    id: "vending",
    rail: { en: "Vending", zh: "販賣機" },
    title: {
      en: "A storefront\ninside the store.",
      zh: "店內的一個\n小型據點。",
    },
    body: {
      en: "Crossover vending machines give specialist sellers a compact place on the floor. Browse them—or ask about renting one by the month.",
      zh: "Crossover 販賣機讓專門賣家在店內設立小型據點。逐部逛，或向團隊查詢月租安排。",
    },
    posterDesktop: "/media/store-tour/vending-mobile.webp",
    posterMobile: "/media/store-tour/vending-mobile.webp",
    layout: "portrait",
    align: "right",
    alt: {
      en: "White vending machines line one side of the open event area.",
      zh: "一排白色販賣機沿著開放式活動空間排列。",
    },
    action: { en: "Ask the team", zh: "聯絡團隊" },
    actionHref: "mailto:support@hktcg.com?subject=Crossover%20vending%20machine",
  },
  {
    id: "community",
    rail: { en: "Community", zh: "社群" },
    title: {
      en: "Bring a deck.\nJoin the table.",
      zh: "帶副牌來，\n坐低開局。",
    },
    body: {
      en: "Here, cards move from display to table. Practise, compete, meet other players—or sit down for your first game.",
      zh: "在這裡，卡牌會從展櫃來到桌上。練習、比賽、認識其他玩家，或者開始你的第一局。",
    },
    posterDesktop: "/media/store-tour/community-desktop.webp",
    posterMobile: "/media/store-tour/community-mobile.webp",
    clipDesktop: "/media/store-tour/community-desktop.mp4",
    clipMobile: "/media/store-tour/community-mobile.mp4",
    layout: "full",
    align: "left",
    alt: {
      en: "Players sit across long white tables in the red-and-white play area.",
      zh: "玩家坐在紅白對戰區的長形白桌兩旁。",
    },
    action: { en: "Explore play & events", zh: "查看對戰及活動" },
    actionHref: "https://www.instagram.com/hktcg.isquare/",
  },
];

const labels = {
  en: {
    location: "iSQUARE · TSIM SHA TSUI",
    open: "NOW OPEN · DAILY 11:30–23:30",
    visit: "Plan your visit",
    skip: "Skip walkthrough",
    scroll: "Scroll to enter",
    walkthrough: "Store walkthrough progress",
    pause: "Pause motion",
    resume: "Resume motion",
    menu: "Menu",
    closeMenu: "Close menu",
    nav: ["Walkthrough", "Visit", "Play & Events", "Card Services", "Shop"],
    endLabel: "End of walkthrough",
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
    location: "iSQUARE · 尖沙咀",
    open: "現已開放 · 每日 11:30–23:30",
    visit: "計劃到訪",
    skip: "跳過導覽",
    scroll: "向下捲動，進入店內",
    walkthrough: "店內導覽進度",
    pause: "暫停動態",
    resume: "繼續動態",
    menu: "選單",
    closeMenu: "關閉選單",
    nav: ["店內導覽", "到訪", "對戰及活動", "卡牌服務", "網店"],
    endLabel: "導覽完畢",
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

function SceneMedia({
  scene,
  playMotion,
}: {
  scene: TourScene;
  playMotion: boolean;
}) {
  const [videoReady, setVideoReady] = useState(false);
  const canPlay = playMotion && scene.clipDesktop && scene.clipMobile;

  return (
    <div className={`scene-media scene-media--${scene.layout}`}>
      <picture className="scene-poster">
        <source media="(max-width: 767px)" srcSet={scene.posterMobile} />
        <img
          src={scene.posterDesktop}
          alt=""
          width={1600}
          height={1200}
          decoding="async"
        />
      </picture>
      {canPlay ? (
        <video
          className={videoReady ? "scene-video is-ready" : "scene-video"}
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster={scene.posterDesktop}
          onCanPlay={() => setVideoReady(true)}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source media="(max-width: 767px)" src={scene.clipMobile} type="video/mp4" />
          <source src={scene.clipDesktop} type="video/mp4" />
        </video>
      ) : null}
      {scene.id === "the-t" ? (
        <picture className="scene-highlight">
          <source media="(max-width: 767px)" srcSet={scene.posterMobile} />
          <img src={scene.posterDesktop} alt="" width={1600} height={1200} decoding="async" />
        </picture>
      ) : null}
    </div>
  );
}

export function HomeExperience() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const rootRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const l = labels[language];

  const selectScene = useCallback((index: number) => {
    const current = activeIndexRef.current;
    if (current === index) return;
    setPreviousIndex(current);
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-HK" : "en";
  }, [language]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    const syncPreferences = () => {
      const reduced = reducedMotion.matches;
      const constrained =
        Boolean(connection?.saveData) ||
        connection?.effectiveType === "slow-2g" ||
        connection?.effectiveType === "2g";
      setEnhanced(!reduced);
      setMotionAllowed(!reduced && !constrained);
    };

    syncPreferences();
    reducedMotion.addEventListener("change", syncPreferences);
    return () => reducedMotion.removeEventListener("change", syncPreferences);
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    const nodes = stepRefs.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (Number.isFinite(index)) selectScene(index);
      },
      {
        rootMargin: "-38% 0px -38% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [enhanced, selectScene]);

  useEffect(() => {
    if (previousIndex === null) return;
    const timeout = window.setTimeout(() => setPreviousIndex(null), 700);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, previousIndex]);

  const goToScene = (sceneId: string) => {
    document.getElementById(`chapter-${sceneId}`)?.scrollIntoView({
      behavior: motionAllowed && !motionPaused ? "smooth" : "auto",
      block: "start",
    });
  };

  const renderSceneCopy = (scene: TourScene, index: number) => (
    <div className="chapter-copy">
      {index === 0 ? (
        <>
          <p className="hero-location">{l.location}</p>
          <p className="hero-status">{l.open}</p>
        </>
      ) : (
        <p className="chapter-position">
          {String(index + 1).padStart(2, "0")} / {String(tourScenes.length).padStart(2, "0")}
        </p>
      )}
      {index === 0 ? (
        <h1 className="hero-title">{scene.title[language]}</h1>
      ) : (
        <h2 className="chapter-title">{scene.title[language]}</h2>
      )}
      <p className="chapter-body">{scene.body[language]}</p>
      <div className="chapter-actions">
        {index === 0 ? (
          <>
            <a className="button button--signal" href="#visit">
              {l.visit} <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link text-link--light" href="#visit">
              {l.skip}
            </a>
          </>
        ) : scene.action && scene.actionHref ? (
          <a className="button button--light" href={scene.actionHref}>
            {scene.action[language]} <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="HKTCG home">
          <Image
            src="/brand/hktcg-logo.png"
            alt="HKTCG"
            width={126}
            height={45}
            priority
            unoptimized
          />
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
          <a className="header-visit" href="#visit">
            {l.visit}
          </a>
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
        <section
          id="walkthrough"
          ref={rootRef}
          className="walkthrough"
          data-enhanced={enhanced ? "true" : "false"}
          data-active={activeIndex}
          aria-label={l.nav[0]}
        >
          <div className="walkthrough-stage">
            {previousIndex !== null ? (
              <div className="scene-layer scene-layer--leaving" aria-hidden="true">
                <SceneMedia scene={tourScenes[previousIndex]} playMotion={false} />
              </div>
            ) : null}
            <div
              className="scene-layer scene-layer--active"
              key={tourScenes[activeIndex].id}
              aria-hidden="true"
            >
              <SceneMedia
                scene={tourScenes[activeIndex]}
                playMotion={motionAllowed && !motionPaused}
              />
            </div>
            <div className="stage-scrim" />
            <div className="threshold-gate" />
            <nav className="chapter-rail" aria-label={l.walkthrough}>
              <span className="rail-cue">{l.scroll}</span>
              <progress
                className="rail-track"
                max={tourScenes.length}
                value={activeIndex + 1}
                aria-label={`${activeIndex + 1} / ${tourScenes.length}`}
              />
              <div className="rail-buttons">
                {tourScenes.map((scene, index) => (
                  <button
                    type="button"
                    key={scene.id}
                    className={index === activeIndex ? "is-active" : ""}
                    aria-current={index === activeIndex ? "step" : undefined}
                    aria-label={`${index + 1}. ${scene.rail[language]}`}
                    onClick={() => goToScene(scene.id)}
                  >
                    {scene.rail[language]}
                  </button>
                ))}
              </div>
              {motionAllowed ? (
                <button
                  className="motion-toggle"
                  type="button"
                  onClick={() => setMotionPaused((current) => !current)}
                >
                  {motionPaused ? l.resume : l.pause}
                </button>
              ) : null}
            </nav>
          </div>

          <div className="walkthrough-steps">
            {tourScenes.map((scene, index) => (
              <article
                id={`chapter-${scene.id}`}
                key={scene.id}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                data-index={index}
                data-layout={scene.layout}
                data-align={scene.align}
                className={index === activeIndex ? "walkthrough-step is-active" : "walkthrough-step"}
              >
                <figure className="step-fallback">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={scene.posterMobile} />
                    <img
                      src={scene.posterDesktop}
                      alt={scene.alt[language]}
                      width={1600}
                      height={1200}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </picture>
                </figure>
                {renderSceneCopy(scene, index)}
              </article>
            ))}
          </div>
        </section>

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
            <a
              className="button button--dark"
              href="https://www.google.com/maps/search/?api=1&query=HKTCG+iSQUARE+Hong+Kong"
            >
              {l.directions} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <dl className="visit-details">
            <div>
              <dt>{l.addressLabel}</dt>
              <dd>{l.address}</dd>
            </div>
            <div>
              <dt>{l.hoursLabel}</dt>
              <dd>{l.hours}</dd>
            </div>
          </dl>
        </section>

        <section id="play" className="experience-section experience-section--dark">
          <div className="experience-media">
            <picture>
              <source media="(max-width: 767px)" srcSet="/media/store-tour/community-mobile.webp" />
              <img
                src="/media/store-tour/community-desktop.webp"
                alt={tourScenes[5].alt[language]}
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
              />
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
              <span>{language === "en" ? "Platform" : "平台"}</span>
              <strong>{l.serviceAction}</strong>
              <i aria-hidden="true">↗</i>
            </a>
            <a href="mailto:support@hktcg.com?subject=HKTCG%20card%20services">
              <span>{language === "en" ? "Team" : "團隊"}</span>
              <strong>support@hktcg.com</strong>
              <i aria-hidden="true">↗</i>
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
          <div className="store-name-rail" aria-hidden="true">
            <span>HKTCG</span>
            <span>CARDS</span>
            <span>SPORT</span>
            <span>PLAY</span>
            <span>TRADE</span>
          </div>
        </section>

        <section className="shop-section" aria-labelledby="shop-title">
          <picture className="shop-media">
            <source media="(max-width: 767px)" srcSet="/media/store-tour/collect-mobile.webp" />
            <img
              src="/media/store-tour/collect-desktop.webp"
              alt={tourScenes[2].alt[language]}
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className="shop-copy">
            <p className="section-marker">Online / Pickup / Delivery</p>
            <h2 id="shop-title">{l.shopTitle}</h2>
            <p>{l.shopBody}</p>
            <a className="button button--light" href="https://www.hktcg.com/en">
              {l.shopAction} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Image
          src="/brand/hktcg-logo.png"
          alt="HKTCG"
          width={160}
          height={57}
          unoptimized
        />
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
