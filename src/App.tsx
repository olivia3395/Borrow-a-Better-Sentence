import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  User,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Send,
  Shuffle,
  Quote,
  BookOpen,
  PenTool,
  Globe,
  Info,
  X,
  Download,
} from "lucide-react";
import * as htmlToImage from "html-to-image";
import { Writer, WRITERS } from "./data/writers";
import { rewriteSentence, RewriteResult } from "./services/ai";

const EXAMPLE_INPUTS = [
  "我好菜啊",
  "我又搞砸了",
  "我不想上班",
  "我今天特别累",
  "我是不是不够好",
  "我有点想他",
  "波士顿今天好冷",
  "我不知道自己在干嘛",
  "我想回家",
];

const I18N = {
  en: {
    homeTitleLine1: "Say It Like",
    homeTitleLine2: "A Classic",
    homeSubtitle:
      "You type one messy sentence.\nWe find a famous writer to say it beautifully for you.",
    tryIt: "Enter the Archive",
    examplesTitle: "Examples",
    backToHome: "Back to home",
    step1: "Step 01: Your Messy Thought",
    placeholder: "Type one messy sentence...",
    chars: "CHARS",
    random: "Random",
    step2: "Step 02: Pick Your Ghostwriter",
    recast: "Recast Sentence",
    waiting: "Waiting for transmission...",
    summoning: "Summoning",
    version: "Version",
    copy: "Copy",
    save: "Save",
    saved: "Saved",
    yourLine: "Your line",
    tag: "Tag",
    viewing: "Viewing:",
    authorsAvailable: "Authors Available",
    footer: "Designed for literary misfits © 2026",
    archiveTag: "MVP_v1.0.0 // 2026 Archive",
    engineTag: "Vocal Persona Reconstruction Engine",
    appTitleLine1: "Say It Like",
    appTitleLine2: "A Classic",
    appSubtitle: "Borrow a writer's voice",
    exampleSentence: "I just wanna go home and sleep.",
    exampleTranslation:
      "I have always refused to waste life on being awake; after all, bed is the only sanctuary for modern mankind.",
    exampleTag: "Stylish Incompetence",
    genModel: "GEN_MODEL",
    aboutThisWriter: "About",
    dossierLabel: "WRITER DOSSIER",
    closeDialog: "Close",
    lifespanLabel: "LIFESPAN",
    signatureQuote: "SIGNATURE QUOTE",
    bioLabel: "BIO",
    exportPoster: "EXPORT POSTER",
    exporting: "EXPORTING...",
  },
  zh: {
    homeTitleLine1: "作家小嘴替",
    homeTitleLine2: "实验室",
    homeSubtitle: "把你心里的碎碎念，\n交给大作家替你大做文章。",
    tryIt: "开启灵感档案",
    examplesTitle: "随便看看",
    backToHome: "返回首页",
    step1: "第一步：输入你的心里话",
    placeholder: "输入一句你想说的大白话...",
    chars: "字",
    random: "随便来一句",
    step2: "第二步：挑个代笔作家",
    recast: "让作家替你说",
    waiting: "等待灵感降临...",
    summoning: "正在召唤",
    version: "版",
    copy: "复制",
    save: "收藏",
    saved: "已收藏",
    yourLine: "你的原话",
    tag: "标签",
    viewing: "当前浏览：",
    authorsAvailable: "位作家待命",
    footer: "为文学神经病们设计 © 2026",
    archiveTag: "初代机 // 2026 档案",
    engineTag: "作家灵魂重构引擎",
    appTitleLine1: "作家",
    appTitleLine2: "小嘴替",
    appSubtitle: "把废话交给文学",
    exampleSentence: "我不想上班。",
    exampleTranslation:
      "去自然也可以去，不过无非仍旧坐在那里，把活人做成零件罢了。",
    exampleTag: "Cold truth, office edition.",
    genModel: "生成模型",
    aboutThisWriter: "档案",
    dossierLabel: "作家私密档案",
    closeDialog: "关闭",
    lifespanLabel: "生卒",
    signatureQuote: "代表语录",
    bioLabel: "侧写",
    exportPoster: "导出语录卡",
    exporting: "生成中...",
  },
};

const TypewriterText = ({
  text,
  delay = 40,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);
  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse">_</span>
      )}
    </span>
  );
};

type Lang = "en" | "zh";

function LanguageToggle({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="absolute top-6 right-6 z-50 flex items-center gap-2 px-3 py-1.5 border border-[var(--color-ink)] rounded-full text-xs font-mono uppercase hover:bg-[var(--color-ink)] hover:text-white transition-colors bg-[var(--color-paper)]"
    >
      <Globe className="w-3 h-3" />
      {lang === "en" ? "中文" : "EN"}
    </button>
  );
}

function Home({ onStart, lang }: { onStart: () => void; lang: Lang }) {
  const t = I18N[lang];
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center bg-[var(--color-paper)] select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto space-y-12"
      >
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tight leading-none uppercase text-[var(--color-ink)]">
            {t.homeTitleLine1}
            <br />
            {t.homeTitleLine2}
          </h1>
          <p className="text-sm font-medium tracking-widest text-[var(--color-ink)]/60 uppercase whitespace-pre-wrap">
            {t.homeSubtitle}
          </p>
        </div>

        <button
          onClick={onStart}
          className="bg-[var(--color-ink)] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity mx-auto inline-block border hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] border-[var(--color-ink)]"
        >
          {t.tryIt}
        </button>
      </motion.div>
    </div>
  );
}

function MainApp({ onBack, lang }: { onBack: () => void; lang: Lang }) {
  const t = I18N[lang];
  const [inputText, setInputText] = useState("");
  const [selectedWriter, setSelectedWriter] = useState<Writer>(WRITERS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<RewriteResult | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Writer | null>(null);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  const [resultsCache, setResultsCache] = useState<
    Record<string, RewriteResult>
  >({});
  const resultCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % 3);
      }, 1500);
    } else {
      setLoadingMsgIdx(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleRandomExample = () => {
    const random =
      EXAMPLE_INPUTS[Math.floor(Math.random() * EXAMPLE_INPUTS.length)];
    setInputText(random);
    setResult(null);
    setResultsCache({});
  };

  const handleGenerate = async (writerToUse = selectedWriter) => {
    if (!inputText.trim()) return;

    const cacheKey = `${inputText.trim()}-${writerToUse.id}`;
    if (resultsCache[cacheKey]) {
      setResult(resultsCache[cacheKey]);
      setSaved(false);
      return;
    }

    setIsGenerating(true);
    setError("");
    setSaved(false);
    try {
      const res = await rewriteSentence(inputText, writerToUse);
      setResult(res);
      setResultsCache((prev) => ({ ...prev, [cacheKey]: res }));
    } catch (err: any) {
      setError(err.message || "Failed to contact the dead writer.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWriterSelect = (writer: Writer) => {
    setSelectedWriter(writer);
    if (result && inputText.trim()) {
      handleGenerate(writer);
    }
  };

  const handleExportImage = async () => {
    if (!resultCardRef.current) return;
    setIsExporting(true);
    try {
      await new Promise((r) => setTimeout(r, 100)); // wait for styles
      const dataUrl = await htmlToImage.toPng(resultCardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#F9F7F5",
      });
      const link = document.createElement("a");
      link.download = `Writer-Mouthpiece-${selectedWriter.id}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setSaved(true);
    } catch (err) {
      console.error("Failed to export image", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[var(--color-paper)] text-[var(--color-ink)] font-sans flex flex-col overflow-hidden select-none relative">
      {/* Header Section */}
      <header className="border-b border-[var(--color-ink)] p-4 md:p-6 flex justify-between items-end shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="pb-1 hover:opacity-60 transition-opacity"
            title={t.backToHome}
          >
            <ArrowLeft className="w-6 h-6 text-[var(--color-ink)]" />
          </button>
          <div>
            <h1 className="text-2xl md:text-4xl font-serif font-black tracking-tight leading-none uppercase">
              {t.appTitleLine1}
              <br />
              {t.appTitleLine2}
            </h1>
            <p className="mt-1 md:mt-2 text-[10px] md:text-sm font-medium tracking-widest text-gray-500 uppercase">
              {t.appSubtitle}
            </p>
          </div>
        </div>
        <div className="text-right hidden sm:block pr-24">
          <div className="text-xs font-mono uppercase tracking-tighter border border-[var(--color-ink)] px-2 py-1">
            {t.archiveTag}
          </div>
          <div className="mt-1 text-[10px] text-gray-400">{t.engineTag}</div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:grid md:grid-cols-12 overflow-hidden">
        {/* Left Panel: Input & Selection */}
        <section className="col-span-1 md:col-span-5 border-b md:border-b-0 md:border-r border-[var(--color-ink)] p-6 md:p-8 flex flex-col overflow-y-auto hidden-scrollbar">
          <div className="mb-8 shrink-0">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block text-gray-400 italic">
              {t.step1}
            </label>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder={t.placeholder}
                className="w-full bg-transparent border-none text-xl md:text-2xl font-serif italic focus:ring-0 p-0 resize-none h-24 overflow-hidden focus:outline-none placeholder:text-[var(--color-ink)]/30"
                maxLength={80}
              />
              <div className="absolute bottom-0 right-0 text-[10px] text-gray-400 font-mono">
                [{inputText.length}/80 {t.chars}]
              </div>
            </div>

            {/* Random triggers */}
            <div className="flex flex-wrap gap-2 pt-2 mt-2 border-t border-dashed border-[var(--color-ink)]/20">
              <button
                onClick={handleRandomExample}
                className="text-[10px] mt-2 flex items-center gap-1 px-2 py-1 border border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white transition-colors uppercase tracking-wider font-bold"
              >
                <Shuffle className="w-3 h-3" /> {t.random}
              </button>
            </div>
          </div>

          <div className="flex-1 mb-8 shrink-0">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block text-gray-400">
              {t.step2}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
              {WRITERS.map((writer) => {
                const isSelected = selectedWriter.id === writer.id;
                return (
                  <button
                    key={writer.id}
                    onClick={() => handleWriterSelect(writer)}
                    className={`border border-[var(--color-ink)] p-3 text-left transition-colors group relative flex gap-3 ${
                      isSelected
                        ? "bg-[var(--color-ink)] text-white"
                        : "hover:bg-[var(--color-ink)] hover:text-white opacity-60 hover:opacity-100"
                    }`}
                  >
                    {writer.avatarUrl && (
                      <div className="w-10 h-10 shrink-0 border border-current p-0.5 overflow-hidden">
                        <img
                          src={writer.avatarUrl}
                          alt=""
                          className="w-full h-full object-cover grayscale mix-blend-multiply"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start w-full relative">
                        <div className="font-serif font-bold truncate pr-6">
                          {writer.name}
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProfile(writer);
                          }}
                          className={`absolute right-0 top-0 transition-opacity p-0.5 hover:scale-110 active:scale-95 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100 z-10"}`}
                          title={t.aboutThisWriter}
                        >
                          <Info className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-[9px] uppercase tracking-tighter opacity-60 mt-1 line-clamp-1">
                        {lang === "en"
                          ? writer.tagline.split("For ")[1] || writer.tagline
                          : writer.keywords.split(" / ")[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto flex gap-2 shrink-0">
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !inputText.trim()}
              className="flex-1 bg-[var(--color-ink)] text-white py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50 flex justify-center items-center gap-2 border border-[var(--color-ink)]"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                t.recast
              )}
            </button>
          </div>
        </section>

        {/* Right Panel: The Output Card */}
        <section className="col-span-1 md:col-span-7 bg-[var(--color-paper-alt)] p-6 md:p-12 flex items-center justify-center relative overflow-y-auto hidden-scrollbar">
          <div className="absolute top-4 left-4 md:top-8 md:left-12 text-[10px] font-mono text-[var(--color-ink)]/50 z-20">
            {result
              ? `OUT_ID: ${Math.floor(Math.random() * 9000) + 1000}-${selectedWriter.id.toUpperCase()}`
              : "WAITING_FOR_INPUT"}
          </div>

          <AnimatePresence mode="wait">
            {!result && !isGenerating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-6 max-w-sm opacity-30"
              >
                <div className="w-20 h-20 border-2 border-[var(--color-ink)] rounded-full flex items-center justify-center mx-auto bg-transparent">
                  <PenTool className="w-8 h-8 text-[var(--color-ink)]" />
                </div>
                <p
                  className="text-xl text-[var(--color-ink)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                  }}
                >
                  "{t.waiting}"
                </p>
              </motion.div>
            ) : isGenerating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center space-y-4 text-[var(--color-ink)]"
              >
                <BookOpen className="w-12 h-12 animate-pulse text-[var(--color-ink)]" />
                <p className="text-[10px] font-mono uppercase tracking-widest animate-pulse">
                  {selectedWriter.loadingMessages[lang][loadingMsgIdx] ||
                    t.summoning}{" "}
                  {selectedWriter.name}...
                </p>
              </motion.div>
            ) : result ? (
              <motion.div
                key={result.rewritten}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-lg relative z-10 mx-auto"
              >
                {/* The "Poster" div - this is what gets exported to image */}
                <div
                  ref={resultCardRef}
                  className="w-full bg-[#F9F7F5] result-card p-8 md:p-12 flex flex-col items-center text-center relative border border-[var(--color-ink)] shadow-[15px_15px_0px_#1A1A1A]"
                >
                  <div className="absolute top-4 left-4 opacity-10">
                    <Quote size={48} />
                  </div>

                  <div className="w-12 h-1 bg-[var(--color-ink)] mb-8"></div>

                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-ink)]/50 mb-6 font-mono">
                    {selectedWriter.name} {t.version}
                  </p>

                  <h2 className="text-2xl md:text-3xl font-serif leading-relaxed mb-8 text-[var(--color-ink)]">
                    “<TypewriterText text={result.rewritten} delay={40} />”
                  </h2>

                  <div className="inline-block px-4 py-1 border border-[var(--color-ink)] rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 bg-[var(--color-paper)]">
                    {result.toneTag}
                  </div>

                  <div className="w-full pt-6 md:pt-8 border-t border-dashed border-gray-300 flex justify-between items-center text-[var(--color-ink)] gap-4 flex-wrap">
                    <div className="text-[10px] font-mono text-[var(--color-ink)]/50 uppercase">
                      {t.genModel}: {selectedWriter.id.toUpperCase()}
                    </div>
                    <div className="flex gap-2 text-[9px] uppercase font-mono tracking-widest opacity-30">
                      SAY IT LIKE A CLASSIC
                    </div>
                  </div>
                </div>

                {/* Action Buttons (Not in the exported image) */}
                <div className="flex justify-between mt-6 px-2">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(result.rewritten)
                    }
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#dd4a38] transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    {t.copy}
                  </button>
                  <button
                    onClick={handleExportImage}
                    disabled={isExporting}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#c4a984] transition-colors disabled:opacity-50"
                  >
                    {saved ? (
                      <BookmarkCheck className="w-3.5 h-3.5" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    {isExporting
                      ? t.exporting
                      : saved
                        ? t.saved
                        : t.exportPoster}
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Aesthetic Flourish */}
          <div className="absolute bottom-8 right-12 w-24 h-24 opacity-5 pointer-events-none hidden md:block">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" />
            </svg>
          </div>
        </section>
      </main>

      {/* Bottom Rail */}
      <footer className="border-t border-[var(--color-ink)] px-4 md:px-6 py-2 md:py-3 flex flex-wrap justify-between text-[10px] font-mono shrink-0 bg-[var(--color-paper)] z-20">
        <div className="flex gap-4 md:gap-6 uppercase">
          <span>
            {t.viewing} {selectedWriter.name}
          </span>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <span className="hidden sm:inline">
            {WRITERS.length} {t.authorsAvailable}
          </span>
        </div>
        <div className="uppercase tracking-widest text-[var(--color-ink)]/50 border-none">
          {t.footer}
        </div>
      </footer>

      {/* Profile Modal Overlay */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-[var(--color-ink)]/20"
            onClick={() => setSelectedProfile(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: 20, rotate: 2 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-[var(--color-paper)] border border-[var(--color-ink)] shadow-[15px_15px_0px_#1A1A1A] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-[var(--color-ink)] p-3 flex justify-between items-center bg-[var(--color-ink)] text-[var(--color-paper)]">
                <span className="text-[10px] font-mono uppercase tracking-widest">
                  {t.dossierLabel} // {selectedProfile.id.toUpperCase()}
                </span>
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="hover:opacity-70"
                  title={t.closeDialog}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  {selectedProfile.avatarUrl && (
                    <div className="w-20 h-24 shrink-0 border border-[var(--color-ink)] p-1 bg-white overflow-hidden shadow-[2px_2px_0px_rgba(26,26,26,1)] rotate-[-2deg]">
                      <img
                        src={selectedProfile.avatarUrl}
                        alt={selectedProfile.name}
                        className="w-full h-full object-cover grayscale opacity-90 contrast-125 mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-3xl font-serif font-black text-[var(--color-ink)]">
                      {selectedProfile.name}
                    </h2>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink)]/50 mt-2 flex flex-col gap-1 items-start">
                      <span className="bg-[var(--color-ink)]/5 px-2 py-0.5 border border-[var(--color-ink)]/10">
                        {t.lifespanLabel}
                      </span>
                      {selectedProfile.lifespan}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-bold font-mono tracking-widest uppercase border-b border-dashed border-[var(--color-ink)]/30 pb-1 flex items-center gap-2 text-[var(--color-ink)]/60">
                    <User className="w-3 h-3" /> {t.bioLabel}
                  </div>
                  <p
                    className="text-sm leading-relaxed text-[var(--color-ink)]/80"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {selectedProfile.bio[lang]}
                  </p>
                </div>

                <div className="space-y-2 bg-white/50 p-4 border border-[var(--color-ink)]/10 relative">
                  <Quote className="w-6 h-6 text-[var(--color-primary)]/10 absolute top-2 right-2" />
                  <div className="text-[10px] font-bold font-mono tracking-widest uppercase text-[var(--color-primary)] mb-2">
                    {t.signatureQuote}
                  </div>
                  <p className="text-base font-serif italic text-[var(--color-ink)] leading-relaxed">
                    "{selectedProfile.quote[lang]}"
                  </p>
                </div>
              </div>

              <div className="bg-[var(--color-ink)]/5 px-6 py-3 border-t border-[var(--color-ink)]/10 text-[9px] font-mono text-center uppercase tracking-widest text-[var(--color-ink)]/40">
                End of record
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<"home" | "app">("home");
  const [lang, setLang] = useState<Lang>("zh");

  return (
    <div className="bg-[var(--color-paper)] min-h-screen text-[var(--color-ink)] relative">
      <LanguageToggle lang={lang} setLang={setLang} />
      {screen === "home" ? (
        <Home onStart={() => setScreen("app")} lang={lang} />
      ) : (
        <MainApp onBack={() => setScreen("home")} lang={lang} />
      )}
    </div>
  );
}
