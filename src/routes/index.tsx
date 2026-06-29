import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Menu as MenuIcon,
  X,
  Phone,
  Instagram,
  MapPin,
  Clock,
  QrCode,
  Download,
  Coffee,
  Sparkles,
  Leaf,
  Flame,
  Smartphone,
  Tag,
  ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import burgerImg from "@/assets/burger.jpg";
import latteImg from "@/assets/latte.jpg";
import cheesecakeImg from "@/assets/cheesecake.jpg";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mira Bistro — QR Menü & Güncel Fiyatlar" },
      { name: "description", content: "Mira Bistro'nun QR menüsü: kahveler, burgerler, kahvaltı, tatlılar ve daha fazlası. Mobil uyumlu, güncel fiyatlar." },
      { property: "og:title", content: "Mira Bistro — QR Menü" },
      { property: "og:description", content: "Kahveden burgerlere, tatlılardan ana yemeklere kadar Mira Bistro menüsü." },
    ],
  }),
  component: Index,
});

const WHATSAPP_NUMBER = "905550000000";
const WHATSAPP_MSG = encodeURIComponent(
  "Merhaba, Mira Bistro menüsü hakkında bilgi almak istiyorum.",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

type Tag = "Popüler" | "Yeni" | "Acılı" | "Vejetaryen";
type Item = { name: string; desc: string; price: number; tags?: Tag[] };

const menu: Record<string, Item[]> = {
  Popüler: [
    { name: "Signature Burger", desc: "Dana köfte, cheddar, karamelize soğan, özel sos", price: 285, tags: ["Popüler"] },
    { name: "Tavuk Schnitzel", desc: "Panelenmiş tavuk, patates kızartması, özel sos", price: 260, tags: ["Popüler"] },
    { name: "Iced Caramel Latte", desc: "Espresso, süt, karamel ve buz", price: 145, tags: ["Popüler"] },
    { name: "Lotus Cheesecake", desc: "Lotus kreması ve bisküvi tabanı", price: 175, tags: ["Yeni"] },
  ],
  "Sıcak İçecekler": [
    { name: "Espresso", desc: "Yoğun aromalı klasik espresso", price: 85 },
    { name: "Americano", desc: "Espresso ve sıcak su", price: 95 },
    { name: "Latte", desc: "Espresso ve buharda ısıtılmış süt", price: 120 },
    { name: "Cappuccino", desc: "Espresso, süt ve süt köpüğü", price: 120 },
    { name: "Türk Kahvesi", desc: "Geleneksel sunumuyla", price: 95 },
    { name: "Çay", desc: "Demleme çay", price: 45 },
  ],
  "Soğuk İçecekler": [
    { name: "Iced Americano", desc: "Espresso, su ve buz", price: 115 },
    { name: "Iced Latte", desc: "Espresso, süt ve buz", price: 130 },
    { name: "Iced Caramel Latte", desc: "Espresso, süt, karamel ve buz", price: 145, tags: ["Popüler"] },
    { name: "Limonata", desc: "Ev yapımı ferah limonata", price: 110, tags: ["Vejetaryen"] },
    { name: "Berry Cooler", desc: "Orman meyveli soğuk içecek", price: 135, tags: ["Yeni"] },
    { name: "Ice Tea", desc: "Şeftali veya limon seçenekleriyle", price: 95 },
  ],
  Kahvaltı: [
    { name: "Serpme Kahvaltı", desc: "Peynir çeşitleri, zeytin, reçel, bal, yumurta, sıcaklar", price: 390, tags: ["Popüler"] },
    { name: "Kruvasan Sandviç", desc: "Hindi füme, kaşar, yeşillik", price: 185 },
    { name: "Avokadolu Tost", desc: "Avokado, yumurta, ekşi maya ekmeği", price: 210, tags: ["Vejetaryen"] },
    { name: "Menemen", desc: "Domates, biber, yumurta", price: 175, tags: ["Vejetaryen"] },
    { name: "Peynirli Omlet", desc: "Üç yumurta, peynir ve yeşillik", price: 165 },
  ],
  Burgerler: [
    { name: "Classic Burger", desc: "Dana köfte, cheddar, marul, domates, özel sos", price: 255 },
    { name: "Signature Burger", desc: "Dana köfte, cheddar, karamelize soğan, özel sos", price: 285, tags: ["Popüler"] },
    { name: "Chicken Burger", desc: "Çıtır tavuk, coleslaw, özel sos", price: 245 },
    { name: "BBQ Burger", desc: "Dana köfte, cheddar, BBQ sos, soğan halkası", price: 295, tags: ["Yeni"] },
    { name: "Veggie Burger", desc: "Sebze köftesi, yeşillik, özel sos", price: 235, tags: ["Vejetaryen"] },
  ],
  "Ana Yemekler": [
    { name: "Tavuk Schnitzel", desc: "Panelenmiş tavuk, patates kızartması, özel sos", price: 260 },
    { name: "Izgara Tavuk", desc: "Izgara tavuk göğsü, sebze ve pilav", price: 275 },
    { name: "Köri Soslu Tavuk", desc: "Tavuk parçaları, köri sos, pilav", price: 265, tags: ["Acılı"] },
    { name: "Izgara Köfte", desc: "Köfte, patates, pilav ve köz biber", price: 310 },
    { name: "Cafe Bowl", desc: "Tavuk, yeşillik, tahıl, özel sos", price: 250, tags: ["Yeni"] },
  ],
  Makarnalar: [
    { name: "Penne Arrabbiata", desc: "Acılı domates sos, parmesan", price: 220, tags: ["Acılı", "Vejetaryen"] },
    { name: "Fettuccine Alfredo", desc: "Krema, mantar, tavuk", price: 255 },
    { name: "Spaghetti Bolognese", desc: "Kıymalı domates sos", price: 245 },
    { name: "Pesto Makarna", desc: "Fesleğen pesto, parmesan", price: 235, tags: ["Vejetaryen"] },
  ],
  Salatalar: [
    { name: "Sezar Salata", desc: "Izgara tavuk, marul, kruton, parmesan", price: 230 },
    { name: "Ton Balıklı Salata", desc: "Ton balığı, yeşillik, mısır, zeytin", price: 240 },
    { name: "Akdeniz Salata", desc: "Beyaz peynir, zeytin, domates, salatalık", price: 210, tags: ["Vejetaryen"] },
    { name: "Avokadolu Salata", desc: "Avokado, yeşillik, tahıl ve limon sos", price: 250, tags: ["Vejetaryen", "Yeni"] },
  ],
  Tatlılar: [
    { name: "San Sebastian Cheesecake", desc: "Akışkan çikolata sos ile", price: 190, tags: ["Popüler"] },
    { name: "Lotus Cheesecake", desc: "Lotus kreması ve bisküvi tabanı", price: 175 },
    { name: "Tiramisu", desc: "Kahveli klasik İtalyan tatlısı", price: 165 },
    { name: "Brownie", desc: "Sıcak çikolatalı brownie", price: 155 },
    { name: "Profiterol", desc: "Çikolata soslu profiterol", price: 150 },
  ],
  Atıştırmalıklar: [
    { name: "Patates Kızartması", desc: "Baharatlı çıtır patates", price: 125, tags: ["Vejetaryen"] },
    { name: "Soğan Halkası", desc: "Dip sos ile", price: 135, tags: ["Vejetaryen"] },
    { name: "Mozzarella Stick", desc: "Eritilmiş mozzarella, çıtır kaplama", price: 160, tags: ["Vejetaryen"] },
    { name: "Tavuk Sepeti", desc: "Çıtır tavuk parçaları ve soslar", price: 210 },
    { name: "Nachos", desc: "Cheddar sos, jalapeno ve salsa", price: 190, tags: ["Acılı"] },
  ],
};

const categories = Object.keys(menu);

const tagStyles: Record<Tag, string> = {
  Popüler: "bg-accent/20 text-[color:var(--espresso)] border-accent/40",
  Yeni: "bg-primary/10 text-primary border-primary/30",
  Acılı: "bg-destructive/10 text-destructive border-destructive/30",
  Vejetaryen: "bg-[oklch(0.92_0.06_140)] text-[oklch(0.35_0.08_140)] border-[oklch(0.78_0.1_140)]",
};

function formatPrice(p: number) {
  return `₺${p}`;
}

function Index() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(categories[0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = useMemo(() => menu[active] ?? [], [active]);

  const navLinks = [
    { href: "#anasayfa", label: "Anasayfa" },
    { href: "#menu", label: "Menü" },
    { href: "#hakkimizda", label: "Hakkımızda" },
    { href: "#iletisim", label: "İletişim" },
  ];

  return (
    <div id="anasayfa" className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md shadow-[0_4px_24px_-12px_rgba(60,30,10,0.18)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#anasayfa" className="group flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <Coffee className="h-4 w-4" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              Mira <span className="text-accent">Bistro</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-[color:var(--whatsapp)] px-4 py-2 text-sm font-semibold text-[color:var(--whatsapp-foreground)] shadow-sm transition-colors hover:bg-[color:var(--whatsapp-hover)]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </nav>

          <button
            type="button"
            aria-label="Menü"
            onClick={() => setNavOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground md:hidden"
          >
            {navOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden">
            <div className="mx-4 mb-3 rounded-2xl border border-border bg-card p-3 shadow-lg">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setNavOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-foreground/90 hover:bg-secondary"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setNavOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-[color:var(--whatsapp)] px-4 py-3 font-semibold text-[color:var(--whatsapp-foreground)] hover:bg-[color:var(--whatsapp-hover)]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp'tan Ulaş
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-20">
        <img
          src={heroImg}
          alt="Mira Bistro iç mekan"
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.18_0.04_40/0.55)] via-[oklch(0.18_0.04_40/0.45)] to-[oklch(0.18_0.04_40/0.75)]" />

        <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
          <div className="max-w-2xl text-[color:var(--cream)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              QR Menü · Mira Bistro
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
              Günün her anına <span className="text-accent">lezzetli</span> bir mola.
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              Kahveden burgerlere, tatlılardan ana yemeklere kadar güncel menümüzü kolayca inceleyin.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[color:var(--espresso)] shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
              >
                Menüyü İncele <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--whatsapp)] px-6 py-3 text-sm font-semibold text-[color:var(--whatsapp-foreground)] shadow-lg shadow-black/20 transition-colors hover:bg-[color:var(--whatsapp-hover)]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp'tan Ulaş
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { icon: QrCode, label: "QR Menü" },
                { icon: Tag, label: "Güncel Fiyatlar" },
                { icon: Smartphone, label: "Mobil Uyumlu" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur"
                >
                  <b.icon className="h-3.5 w-3.5" /> {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QR INTRO */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Dijital Menü
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              QR Menümüze Hoş Geldiniz
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Kategoriler arasında gezerek ürünlerimizi, açıklamalarını ve güncel
              fiyatlarımızı kolayca inceleyebilirsiniz.
            </p>
            <p className="mt-3 text-sm italic text-muted-foreground/80">
              Menü içerikleri demo amaçlıdır.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Menüye Git <ChevronRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                <Download className="h-4 w-4" />
                Yazdırılabilir Menü
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-xs rotate-[-2deg] rounded-3xl border border-border bg-card p-6 shadow-[0_24px_60px_-30px_rgba(80,40,10,0.45)]">
              <div className="grid place-items-center rounded-2xl bg-[color:var(--cream)] p-6">
                <div className="grid h-40 w-40 place-items-center rounded-2xl bg-[color:var(--espresso)] text-[color:var(--cream)]">
                  <QrCode className="h-24 w-24" strokeWidth={1.2} />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-display text-lg font-semibold">Masalar için QR Menü</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Telefonunuzla okutarak menüye anında ulaşın.
                </p>
              </div>
              <div className="pointer-events-none absolute -right-3 -top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-[color:var(--espresso)] shadow">
                Demo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-secondary/40 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Şefin Önerileri
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Mutlaka Deneyin
              </h2>
            </div>
            <a
              href="#menu"
              className="hidden text-sm font-semibold text-primary hover:underline sm:inline-flex sm:items-center sm:gap-1"
            >
              Tüm menüyü gör <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { img: burgerImg, name: "Signature Burger", desc: "Dana köfte, cheddar, karamelize soğan, özel sos", price: 285 },
              { img: latteImg, name: "Iced Caramel Latte", desc: "Espresso, süt, karamel ve buz", price: 145 },
              { img: cheesecakeImg, name: "Lotus Cheesecake", desc: "Lotus kreması ve bisküvi tabanı", price: 175 },
            ].map((p) => (
              <article
                key={p.name}
                className="group overflow-hidden rounded-3xl border border-border bg-card shadow-[0_10px_40px_-20px_rgba(80,40,10,0.25)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(80,40,10,0.35)]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={896}
                    height={896}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                    <span className="shrink-0 rounded-full bg-accent/20 px-3 py-1 text-sm font-bold text-[color:var(--espresso)]">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Menümüz
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Tüm Lezzetler Tek Yerde
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Kategori seçerek aradığınız ürüne hızlıca ulaşın. Tüm fiyatlar günceldir.
            </p>
          </div>

          {/* Tabs */}
          <div className="sticky top-16 z-30 -mx-5 mt-8 sm:mx-0">
            <div className="bg-background/85 px-5 py-3 backdrop-blur-md sm:rounded-2xl sm:px-3 sm:py-2 sm:shadow-[0_8px_24px_-16px_rgba(80,40,10,0.25)]">
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categories.map((c) => {
                  const isActive = c === active;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setActive(c)}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow"
                          : "bg-secondary text-foreground/80 hover:bg-secondary/70"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((it) => (
              <article
                key={it.name + it.price}
                className="group rounded-2xl border border-border bg-card p-5 shadow-[0_6px_24px_-18px_rgba(80,40,10,0.3)] transition hover:border-accent/50 hover:shadow-[0_12px_30px_-18px_rgba(80,40,10,0.4)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold leading-tight">
                      {it.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {it.desc}
                    </p>
                    {it.tags && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {it.tags.map((t) => (
                          <span
                            key={t}
                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${tagStyles[t]}`}
                          >
                            {t === "Acılı" && <Flame className="h-3 w-3" />}
                            {t === "Vejetaryen" && <Leaf className="h-3 w-3" />}
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="rounded-full bg-[color:var(--espresso)] px-3 py-1.5 text-sm font-bold text-[color:var(--cream)]">
                      {formatPrice(it.price)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="hakkimizda" className="bg-secondary/40 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Hikayemiz
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Mira Bistro Hakkında
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Mira Bistro, kahvenin sakinliğini ve iyi yemeğin keyfini aynı masada
              buluşturan samimi bir lezzet noktasıdır. Günlük hazırlanan ürünlerimiz,
              özenle seçilen kahvelerimiz ve rahat atmosferimizle günün her saatinde
              keyifli bir mola sunarız.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              { icon: Leaf, title: "Günlük Taze Ürünler", desc: "Mutfağımızda her gün taze hazırlanan menü." },
              { icon: Coffee, title: "Samimi Atmosfer", desc: "Rahatça vakit geçirebileceğiniz sıcak bir alan." },
              { icon: Sparkles, title: "Özenli Sunum", desc: "Lezzeti tamamlayan, detaylara önem veren sunum." },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-[0_8px_24px_-18px_rgba(80,40,10,0.3)]"
              >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent/20 text-[color:var(--espresso)]">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Atmosfer
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Lezzet kadar atmosfer de önemli.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {[gallery1, gallery2, gallery3, gallery4].map((src, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl ${
                  i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
                }`}
              >
                <img
                  src={src}
                  alt="Mira Bistro atmosfer"
                  loading="lazy"
                  width={800}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="iletisim" className="bg-[color:var(--espresso)] py-20 text-[color:var(--cream)] sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                İletişim
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Bize Ulaşın
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--cream)]/75">
                Rezervasyon, sipariş veya merak ettikleriniz için WhatsApp üzerinden
                bize hızlıca ulaşabilirsiniz.
              </p>

              <div className="mt-7 space-y-3">
                <a
                  href="tel:+905550000000"
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  +90 555 000 00 00
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-[color:var(--whatsapp)] px-4 py-3 text-sm font-semibold text-[color:var(--whatsapp-foreground)] transition hover:bg-[color:var(--whatsapp-hover)]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp'tan Yaz
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
                >
                  <Instagram className="h-4 w-4 text-accent" />
                  @mirabistro
                </a>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
                >
                  <MapPin className="h-4 w-4 text-accent" />
                  Google Maps'te Aç
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/20 text-accent">
                  <Clock className="h-4 w-4" />
                </span>
                <h3 className="font-display text-xl font-semibold">Çalışma Saatleri</h3>
              </div>
              <dl className="mt-5 divide-y divide-white/10 text-sm">
                <div className="flex items-center justify-between py-3">
                  <dt className="text-[color:var(--cream)]/75">Pazartesi – Cuma</dt>
                  <dd className="font-semibold">09:00 – 23:00</dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-[color:var(--cream)]/75">Cumartesi – Pazar</dt>
                  <dd className="font-semibold">10:00 – 00:00</dd>
                </div>
              </dl>

              <div className="mt-6 rounded-2xl bg-white/5 p-4 text-xs leading-relaxed text-[color:var(--cream)]/70">
                Mira Bistro QR menüsü mobil cihazlar için optimize edilmiştir.
                Fiyatlar değişiklik gösterebilir.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[color:var(--espresso)] pb-10 text-[color:var(--cream)]/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 px-5 pt-6 text-xs sm:flex-row sm:px-8">
          <p>© 2026 Mira Bistro. Tüm hakları saklıdır.</p>
          <p className="font-display italic tracking-wide text-[color:var(--cream)]/45">
            Website by Leony
          </p>
        </div>
      </footer>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.11 4.91A10.05 10.05 0 0 0 12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.77.46 3.5 1.35 5.02L2 22l5.13-1.34A9.95 9.95 0 0 0 12.02 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.91-7.09Zm-7.09 15.42a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.04.8.81-2.96-.2-.31a8.32 8.32 0 1 1 15.46-4.52 8.33 8.33 0 0 1-8.5 8.33Zm4.56-6.23c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.13s-.65.81-.79.98c-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.45.06-.68.32-.23.25-.89.87-.89 2.12s.91 2.46 1.04 2.63c.13.17 1.79 2.74 4.34 3.84.61.26 1.08.42 1.45.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3Z" />
    </svg>
  );
}
