/**
 * Landing-page translations for Legacai (FR / PL / ES).
 * English lives in legacai-tokens.ts and app/page.tsx as the source of truth.
 * This file mirrors the shape of what the landing page renders so the page
 * can look up strings by key without changing its layout.
 */

"use client";

import { useEffect, useState } from "react";
import {
  PLANS,
  ASSET_SOURCES,
  VAULT_TYPES,
  CHANNELS,
  AGENT_QA,
  type Plan,
} from "./legacai-tokens";

export type Locale = "en" | "fr" | "pl" | "es";
export const LOCALES: Locale[] = ["en", "fr", "pl", "es"];
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  pl: "PL",
  es: "ES",
};

type NavLabels = { how: string; vaults: string; sources: string; agent: string; pricing: string };
type HowStep = { n: string; t: string; d: string };
type AssetSource = { title: string; subtitle: string; desc: string; formats: string[] };
type VaultType = { title: string; line: string; desc: string };
type Channel = { label: string };
type Qa = { q: string; a: string };
type PlanCopy = { name: string; period: string; desc: string; features: string[]; cta: string };

type Dict = {
  nav: NavLabels;
  cta: { openLegacai: string; meetAgent: string; howItWorks: string; myVault: string; pricingLink: string };
  hero: { label: string; title1: string; title2: string; body: string };
  sources: { label: string; title: string; sub: string; items: AssetSource[] };
  vaults: { label: string; title: string; sub: string; items: VaultType[] };
  how: { label: string; title: string; sub: string; steps: HowStep[] };
  agent: { label: string; title: string; sub: string; liveTag: string; ownerName: string; qa: Qa[]; channels: Channel[] };
  pricing: { label: string; title: string; sub: string; mostPopular: string; yrSuffix: string; plans: PlanCopy[] };
  footer: { tagline: string; copyright: string };
};

const EN_HOW: HowStep[] = [
  { n: "01", t: "Capture", d: "Connect every source of you — documents, photos, voice, journals, and your AI conversations." },
  { n: "02", t: "Curate", d: "Tag each item Private, Family, Legacy or Public — and add the story only you can tell." },
  { n: "03", t: "Converse", d: "Your Legacai Agent answers your family with citations to real vault items. Never invented." },
  { n: "04", t: "Continue", d: "Release plans decide who receives what, and when. Your agent persists for your vault's horizon." },
];

const EN: Dict = {
  nav: { how: "How It Works", vaults: "Vaults", sources: "Sources", agent: "Agent", pricing: "Pricing" },
  cta: { openLegacai: "OPEN LEGACAI", meetAgent: "MEET YOUR AGENT", howItWorks: "How It Works ↓", myVault: "My Vault", pricingLink: "Pricing" },
  hero: {
    label: "Your Legacy AI Agent",
    title1: "Storage keeps your files.",
    title2: "Legacai keeps you.",
    body: "An AI agent trained on everything you choose to leave behind — documents, photographs, voice, journals, even your ChatGPT and Claude conversations. For you, for the ones that matter, for now, for the future — and to be remembered by it.",
  },
  sources: {
    label: "Asset Sources",
    title: "Everything that makes you, ingestible",
    sub: "Eight sources feed one vault — including the first legacy importer for your ChatGPT, Claude and Gemini conversations.",
    items: ASSET_SOURCES.map((s) => ({ title: s.title, subtitle: s.subtitle, desc: s.desc, formats: [...s.formats] })),
  },
  vaults: {
    label: "The Vault Principle",
    title: "One principle. Three vaults.",
    sub: "Everything worth keeping lives in a vault with an owner, a circle, and a horizon.",
    items: VAULT_TYPES.map((v) => ({ title: v.title, line: v.line, desc: v.desc })),
  },
  how: {
    label: "How It Works",
    title: "Capture · Curate · Converse · Continue",
    sub: "Most tools store your life. Legacai lets the people you love ask it questions — today, and long after.",
    steps: EN_HOW,
  },
  agent: {
    label: "The Legacai Agent",
    title: "Your family asks. You answer — always.",
    sub: "Trained only on your curated vault. Every reply cites real items.",
    liveTag: "● Live · cites every answer",
    ownerName: "Mat's Legacai",
    qa: AGENT_QA.map((q) => ({ q: q.q, a: q.a })),
    channels: CHANNELS.map((c) => ({ label: c.label })),
  },
  pricing: {
    label: "Pricing",
    title: "Pay for time, not features",
    sub: "Every plan is the full platform. You choose how long your vault is guaranteed to survive.",
    mostPopular: "MOST POPULAR",
    yrSuffix: "yr",
    plans: PLANS.map((p) => ({ name: p.name, period: p.period, desc: p.desc, features: [...p.features], cta: p.cta })),
  },
  footer: { tagline: "Your legacy, alive.", copyright: "© 2026 Legacai" },
};

const FR: Dict = {
  nav: { how: "Comment ça marche", vaults: "Coffres", sources: "Sources", agent: "Agent", pricing: "Tarifs" },
  cta: { openLegacai: "OUVRIR LEGACAI", meetAgent: "RENCONTREZ VOTRE AGENT", howItWorks: "Comment ça marche ↓", myVault: "Mon coffre", pricingLink: "Tarifs" },
  hero: {
    label: "Votre agent IA d'héritage",
    title1: "Le stockage garde vos fichiers.",
    title2: "Legacai vous garde, vous.",
    body: "Un agent IA formé sur tout ce que vous choisissez de laisser derrière vous — documents, photographies, voix, journaux intimes, et même vos conversations ChatGPT et Claude. Pour vous, pour ceux qui comptent, pour maintenant, pour l'avenir — et pour qu'il se souvienne de vous.",
  },
  sources: {
    label: "Sources de contenu",
    title: "Tout ce qui vous compose, assimilable",
    sub: "Huit sources alimentent un seul coffre — y compris le premier importateur d'héritage pour vos conversations ChatGPT, Claude et Gemini.",
    items: [
      { title: "Documents", subtitle: "Actes, testaments, contrats", desc: "PDF, scans, certificats — la trace papier d'une vie, chiffrée et retrouvable.", formats: ["PDF", "Scan", "DOCX"] },
      { title: "Photos & Images", subtitle: "La mémoire visuelle", desc: "Pellicules, albums, vieux scans — chaque photo peut porter son histoire.", formats: ["JPG", "HEIC", "Album"] },
      { title: "Audio & Voix", subtitle: "Votre voix, conservée", desc: "Mémos vocaux, dernières volontés, histoires racontées à voix haute. Certaines choses ne se tapent pas.", formats: ["Mémo", "Volontés", "Récits"] },
      { title: "Vidéo", subtitle: "Les instants en mouvement", desc: "Films de famille, messages pour l'avenir, ces dimanches que personne n'a filmés exprès.", formats: ["MP4", "MOV", "Message"] },
      { title: "Conversations IA", subtitle: "Votre façon de penser", desc: "Exports ChatGPT, Claude & Gemini — des années de votre pensée, importées en un clic.", formats: ["ChatGPT", "Claude", "Gemini"] },
      { title: "Journaux & Lettres", subtitle: "Avec vos propres mots", desc: "Journaux intimes, lettres à vos proches, fragments de notes — la mémoire écrite.", formats: ["Journal", "Lettre", "Note"] },
      { title: "Livres & Listes", subtitle: "Ce qui vous a façonné", desc: "Listes de lecture, recettes, films préférés — le canon de vous.", formats: ["Goodreads", "Recette", "Liste"] },
      { title: "Applis & Comptes", subtitle: "Le patrimoine numérique", desc: "Où vit chaque compte et comment y accéder — des pointeurs, jamais les mots de passe en clair.", formats: ["Compte", "Abo", "Domaine"] },
    ],
  },
  vaults: {
    label: "Le principe du coffre",
    title: "Un principe. Trois coffres.",
    sub: "Tout ce qui mérite d'être gardé vit dans un coffre avec un propriétaire, un cercle et un horizon.",
    items: [
      { title: "Coffre personnel", line: "Pour vous", desc: "Votre archive privée et votre agent — journaux, volontés de santé, ce que vous seul savez. La visibilité démarre en Privé ; vous décidez de ce qui en sort." },
      { title: "Coffre familial", line: "Pour ceux qui comptent", desc: "Chaque membre construit son propre coffre dans un cercle partagé. Gardiens, permissions par catégorie, et un agent que toute la famille peut interroger." },
      { title: "Coffre d'entreprise", line: "Pour ce que vous avez bâti", desc: "Savoir du fondateur, contacts clés, notes de succession, pointeurs d'identifiants. Le manuel que votre successeur aurait aimé avoir — déjà écrit." },
    ],
  },
  how: {
    label: "Comment ça marche",
    title: "Capturer · Organiser · Converser · Continuer",
    sub: "La plupart des outils stockent votre vie. Legacai permet à ceux que vous aimez de lui poser des questions — aujourd'hui, et bien après.",
    steps: [
      { n: "01", t: "Capturer", d: "Connectez toutes vos sources — documents, photos, voix, journaux, et vos conversations avec l'IA." },
      { n: "02", t: "Organiser", d: "Marquez chaque élément Privé, Famille, Héritage ou Public — et ajoutez l'histoire que vous seul pouvez raconter." },
      { n: "03", t: "Converser", d: "Votre agent Legacai répond à votre famille avec des citations d'éléments réels du coffre. Jamais inventées." },
      { n: "04", t: "Continuer", d: "Les plans de transmission décident qui reçoit quoi, et quand. Votre agent perdure pour l'horizon de votre coffre." },
    ],
  },
  agent: {
    label: "L'agent Legacai",
    title: "Votre famille demande. Vous répondez — toujours.",
    sub: "Entraîné uniquement sur votre coffre organisé. Chaque réponse cite des éléments réels.",
    liveTag: "● En ligne · cite chaque réponse",
    ownerName: "Le Legacai de Mat",
    qa: [
      { q: "Où est l'acte de propriété de l'appartement de Cracovie ?", a: "L'acte se trouve dans Documents → Essentiels, téléchargé par Mat le 3 juillet. Note d'histoire : « Original détenu par le notaire A. Nowak, ul. Floriańska — copie ici. Numéro du registre foncier dans le même dossier. »" },
      { q: "Parle-moi du mariage de Maman et Papa", a: "D'après le récit vocal de Maria et 48 photos taguées : ils se sont mariés en juin 1981 à Sainte-Anne. Maria dit que l'orchestre a joué jusqu'à 4h et que Pawel « dansait comme si le parquet lui devait de l'argent ». Trois photos montrent la première danse." },
      { q: "Que pensait Mat de la création de l'entreprise ?", a: "À travers 62 conversations IA importées de 2024–25, une idée revient sans cesse : « construire des choses qui ressemblent à des collègues, pas à des outils ». Le fil le plus clair se trouve dans les séances de mars 2025 sur son modèle d'agent — cela se lit comme un manifeste." },
      { q: "Qui appelle-t-on si quelque chose arrive ?", a: "Personnes & Contacts liste : le notaire A. Nowak (Essentiels), le Dr Wiśniewska (Santé), et Karolina & Pawel détiennent le mandat de Gardien avec accès au plan de transmission. Fiche de contact complète jointe." },
    ],
    channels: [
      { label: "Web" }, { label: "iOS & Android" }, { label: "TV connectée" },
      { label: "Objets connectés" }, { label: "Passerelle messagerie" }, { label: "Assistants vocaux" },
    ],
  },
  pricing: {
    label: "Tarifs",
    title: "Payez pour le temps, pas pour des options",
    sub: "Chaque formule est la plateforme complète. Vous choisissez la durée pendant laquelle votre coffre est garanti.",
    mostPopular: "LE PLUS POPULAIRE",
    yrSuffix: "an",
    plans: [
      {
        name: "Coffre 1 an",
        period: "/an",
        desc: "Tout, renouvelé chaque année",
        features: [
          "Les 8 sources de contenu",
          "100 Go de coffre chiffré",
          "Agent Legacai · Chercheur + Narrateur",
          "6 membres de la famille",
          "Importateurs de conversations IA",
          "Rappels hebdomadaires respectueux",
          "Partage professionnel en lecture seule",
        ],
        cta: "Commencer 1 an",
      },
      {
        name: "Coffre 10 ans",
        period: "paiement unique",
        desc: "Réglez-le une fois. Une décennie, faite.",
        features: [
          "Tout du 1 an",
          "500 Go · 10 ans garantis",
          "Agent à réponse vocale",
          "Rituel annuel de révision du coffre",
          "Modèles de lettres d'héritage",
          "Plans et déclencheurs de transmission",
          "Économies vs. annuel",
        ],
        cta: "Sécuriser 10 ans",
      },
      {
        name: "Coffre du siècle",
        period: "paiement unique",
        desc: "Cent ans de vous",
        features: [
          "Tout du 10 ans",
          "1 To · adossé à une dotation",
          "Multi-région + médias d'archives",
          "Gardiens sur plusieurs générations",
          "Charte de persistance de l'agent",
          "Résumé imprimé chaque décennie",
          "Engagement d'export à tout moment",
        ],
        cta: "Commencer le siècle",
      },
    ],
  },
  footer: { tagline: "Votre héritage, vivant.", copyright: "© 2026 Legacai" },
};

const PL: Dict = {
  nav: { how: "Jak to działa", vaults: "Sejfy", sources: "Źródła", agent: "Agent", pricing: "Cennik" },
  cta: { openLegacai: "OTWÓRZ LEGACAI", meetAgent: "POZNAJ SWOJEGO AGENTA", howItWorks: "Jak to działa ↓", myVault: "Mój sejf", pricingLink: "Cennik" },
  hero: {
    label: "Twój agent AI dziedzictwa",
    title1: "Dysk przechowuje twoje pliki.",
    title2: "Legacai przechowuje ciebie.",
    body: "Agent AI wytrenowany na wszystkim, co zdecydujesz się zostawić — dokumentach, fotografiach, głosie, dziennikach, a nawet twoich rozmowach z ChatGPT i Claude. Dla ciebie, dla tych, którzy mają znaczenie, na teraz, na przyszłość — i by być zapamiętanym przez nią.",
  },
  sources: {
    label: "Źródła treści",
    title: "Wszystko, co cię tworzy — możliwe do zapisania",
    sub: "Osiem źródeł zasila jeden sejf — w tym pierwszy importer dziedzictwa dla twoich rozmów z ChatGPT, Claude i Gemini.",
    items: [
      { title: "Dokumenty", subtitle: "Akty, testamenty, polisy", desc: "PDF-y, skany, certyfikaty — papierowy ślad życia, zaszyfrowany i wyszukiwalny.", formats: ["PDF", "Skan", "DOCX"] },
      { title: "Zdjęcia i obrazy", subtitle: "Zapis wizualny", desc: "Rolki aparatu, albumy, stare skany — każde zdjęcie może nieść swoją historię.", formats: ["JPG", "HEIC", "Album"] },
      { title: "Audio i głos", subtitle: "Twój głos, zachowany", desc: "Notatki głosowe, nagrane życzenia, historie opowiedziane na głos. Niektórych rzeczy nie da się wystukać na klawiaturze.", formats: ["Notatka", "Życzenia", "Historie"] },
      { title: "Wideo", subtitle: "Chwile w ruchu", desc: "Filmy domowe, wiadomości do przyszłości, te niedzielne obiady, których nikt specjalnie nie nagrywał.", formats: ["MP4", "MOV", "Wiadomość"] },
      { title: "Rozmowy z AI", subtitle: "Jak myślałeś", desc: "Eksporty z ChatGPT, Claude i Gemini — lata twojego myślenia, zaimportowane jednym kliknięciem.", formats: ["ChatGPT", "Claude", "Gemini"] },
      { title: "Dzienniki i listy", subtitle: "Twoimi słowami", desc: "Dzienniki, listy do bliskich, fragmenty notatek — pamięć zapisana.", formats: ["Dziennik", "List", "Notatka"] },
      { title: "Książki i listy", subtitle: "Co cię ukształtowało", desc: "Listy lektur, przepisy, ulubione filmy — kanon ciebie.", formats: ["Goodreads", "Przepis", "Lista"] },
      { title: "Aplikacje i konta", subtitle: "Cyfrowy majątek", desc: "Gdzie żyje każde konto i jak do niego dotrzeć — wskaźniki, nigdy hasła w postaci jawnej.", formats: ["Konto", "Subskrypcja", "Domena"] },
    ],
  },
  vaults: {
    label: "Zasada sejfu",
    title: "Jedna zasada. Trzy sejfy.",
    sub: "Wszystko, co warte zachowania, żyje w sejfie z właścicielem, kręgiem i horyzontem.",
    items: [
      { title: "Sejf osobisty", line: "Dla ciebie", desc: "Twoje prywatne archiwum i agent — dzienniki, życzenia zdrowotne, rzeczy, które wiesz tylko ty. Widoczność zaczyna się od Prywatne; ty decydujesz, co kiedykolwiek to opuszcza." },
      { title: "Sejf rodzinny", line: "Dla tych, którzy mają znaczenie", desc: "Każdy członek buduje własny sejf we wspólnym kręgu. Opiekunowie, uprawnienia na kategorię i jeden agent, którego cała rodzina może zapytać." },
      { title: "Sejf firmowy", line: "Dla tego, co zbudowałeś", desc: "Wiedza założyciela, kluczowe kontakty, notatki sukcesyjne, wskaźniki do danych logowania. Podręcznik, który twój następca będzie chciał mieć — już napisany." },
    ],
  },
  how: {
    label: "Jak to działa",
    title: "Zbieraj · Kuratuj · Rozmawiaj · Kontynuuj",
    sub: "Większość narzędzi przechowuje twoje życie. Legacai pozwala ludziom, których kochasz, zadawać mu pytania — dziś i długo potem.",
    steps: [
      { n: "01", t: "Zbieraj", d: "Połącz każde źródło ciebie — dokumenty, zdjęcia, głos, dzienniki i rozmowy z AI." },
      { n: "02", t: "Kuratuj", d: "Oznacz każdy element jako Prywatny, Rodzinny, Dziedzictwo lub Publiczny — i dodaj historię, którą tylko ty możesz opowiedzieć." },
      { n: "03", t: "Rozmawiaj", d: "Twój agent Legacai odpowiada rodzinie z cytatami z prawdziwych pozycji sejfu. Nigdy nie zmyślonymi." },
      { n: "04", t: "Kontynuuj", d: "Plany przekazania decydują, kto co i kiedy otrzymuje. Twój agent trwa przez horyzont twojego sejfu." },
    ],
  },
  agent: {
    label: "Agent Legacai",
    title: "Twoja rodzina pyta. Ty odpowiadasz — zawsze.",
    sub: "Trenowany wyłącznie na twoim wykuratorowanym sejfie. Każda odpowiedź cytuje prawdziwe pozycje.",
    liveTag: "● Na żywo · cytuje każdą odpowiedź",
    ownerName: "Legacai Mata",
    qa: [
      { q: "Gdzie jest akt własności mieszkania w Krakowie?", a: "Akt znajduje się w Dokumenty → Podstawowe, przesłany przez Mata 3 lipca. Notatka historyczna: „Oryginał u mecenasa A. Nowaka, ul. Floriańska — kopia tutaj. Numer księgi wieczystej w tym samym folderze.”" },
      { q: "Opowiedz mi o ślubie Mamy i Taty", a: "Z historii głosowej Marii i 48 otagowanych zdjęć: pobrali się w czerwcu 1981 roku w Kościele Świętej Anny. Maria mówi, że orkiestra grała do 4 nad ranem, a Paweł „tańczył, jakby parkiet był mu winien pieniądze”. Trzy zdjęcia pokazują pierwszy taniec." },
      { q: "Co Mat myślał o założeniu firmy?", a: "Z 62 zaimportowanych rozmów z AI z lat 2024–25 jedna myśl wraca nieustannie: „budować rzeczy, które wydają się być współpracownikami, a nie narzędziami”. Najwyraźniejszy wątek znajduje się w sesjach z marca 2025 o jego modelu agenta — czyta się jak manifest." },
      { q: "Do kogo dzwonić, jeśli coś się stanie?", a: "Osoby i kontakty listują: mecenasa A. Nowaka (Podstawowe), dr Wiśniewską (Zdrowie), a Karolina i Paweł mają mandat Opiekuna z dostępem do planu przekazania. Pełen arkusz kontaktowy w załączniku." },
    ],
    channels: [
      { label: "Web" }, { label: "iOS i Android" }, { label: "Smart TV" },
      { label: "Urządzenia noszone" }, { label: "Most komunikatorów" }, { label: "Asystenci głosowi" },
    ],
  },
  pricing: {
    label: "Cennik",
    title: "Płać za czas, nie za funkcje",
    sub: "Każdy plan to pełna platforma. Ty wybierasz, jak długo twój sejf ma gwarantowany byt.",
    mostPopular: "NAJPOPULARNIEJSZY",
    yrSuffix: "rok",
    plans: [
      {
        name: "Sejf 1-roczny",
        period: "/rok",
        desc: "Wszystko, odnawiane co roku",
        features: [
          "Wszystkie 8 źródeł treści",
          "100 GB zaszyfrowanego sejfu",
          "Agent Legacai · Wyszukiwacz + Narrator",
          "6 członków rodziny",
          "Importery czatów AI",
          "Delikatne cotygodniowe podpowiedzi",
          "Profesjonalne udostępnianie tylko do odczytu",
        ],
        cta: "Zacznij 1-roczny",
      },
      {
        name: "Sejf 10-letni",
        period: "jednorazowo",
        desc: "Ogarnij raz. Dekada, załatwione.",
        features: [
          "Wszystko z 1-rocznego",
          "500 GB · 10 lat gwarancji",
          "Agent z odpowiedzią głosową",
          "Doroczny rytuał przeglądu sejfu",
          "Szablony listów dziedzictwa",
          "Plany i wyzwalacze przekazania",
          "Oszczędność vs. rocznie",
        ],
        cta: "Zabezpiecz 10 lat",
      },
      {
        name: "Sejf stulecia",
        period: "jednorazowo",
        desc: "Sto lat ciebie",
        features: [
          "Wszystko z 10-letniego",
          "1 TB · zabezpieczone kapitałem",
          "Wielo-regionowy + nośniki archiwalne",
          "Opiekunowie przez pokolenia",
          "Karta trwałości agenta",
          "Wydrukowane podsumowanie co dekadę",
          "Zobowiązanie eksportu w każdej chwili",
        ],
        cta: "Rozpocznij stulecie",
      },
    ],
  },
  footer: { tagline: "Twoje dziedzictwo, żywe.", copyright: "© 2026 Legacai" },
};

const ES: Dict = {
  nav: { how: "Cómo funciona", vaults: "Bóvedas", sources: "Fuentes", agent: "Agente", pricing: "Precios" },
  cta: { openLegacai: "ABRIR LEGACAI", meetAgent: "CONOCE TU AGENTE", howItWorks: "Cómo funciona ↓", myVault: "Mi bóveda", pricingLink: "Precios" },
  hero: {
    label: "Tu agente de IA de legado",
    title1: "El almacenamiento guarda tus archivos.",
    title2: "Legacai te guarda a ti.",
    body: "Un agente de IA entrenado en todo lo que elijas dejar atrás — documentos, fotografías, voz, diarios, e incluso tus conversaciones de ChatGPT y Claude. Para ti, para quienes importan, para ahora, para el futuro — y para ser recordado por él.",
  },
  sources: {
    label: "Fuentes de contenido",
    title: "Todo lo que te forma, ingerible",
    sub: "Ocho fuentes alimentan una sola bóveda — incluido el primer importador de legado para tus conversaciones de ChatGPT, Claude y Gemini.",
    items: [
      { title: "Documentos", subtitle: "Escrituras, testamentos, pólizas", desc: "PDFs, escaneos, certificados — el rastro en papel de una vida, cifrado y localizable.", formats: ["PDF", "Escaneo", "DOCX"] },
      { title: "Fotos e imágenes", subtitle: "El registro visual", desc: "Rollos de cámara, álbumes, escaneos antiguos — cada foto puede llevar su historia.", formats: ["JPG", "HEIC", "Álbum"] },
      { title: "Audio y voz", subtitle: "Tu voz, conservada", desc: "Notas de voz, deseos grabados, historias contadas en voz alta. Hay cosas que no pueden escribirse.", formats: ["Nota", "Deseos", "Historias"] },
      { title: "Vídeo", subtitle: "Momentos en movimiento", desc: "Vídeos caseros, mensajes al futuro, esas comidas dominicales que nadie grabó a propósito.", formats: ["MP4", "MOV", "Mensaje"] },
      { title: "Conversaciones con IA", subtitle: "Cómo pensabas", desc: "Exportaciones de ChatGPT, Claude y Gemini — años de tu pensamiento, importados en un clic.", formats: ["ChatGPT", "Claude", "Gemini"] },
      { title: "Diarios y cartas", subtitle: "Con tus propias palabras", desc: "Diarios, cartas a tus seres queridos, fragmentos de notas — memoria escrita.", formats: ["Diario", "Carta", "Nota"] },
      { title: "Libros y listas", subtitle: "Lo que te formó", desc: "Listas de lectura, recetas, películas favoritas — el canon de ti.", formats: ["Goodreads", "Receta", "Lista"] },
      { title: "Apps y cuentas", subtitle: "El patrimonio digital", desc: "Dónde vive cada cuenta y cómo acceder a ella — punteros, nunca contraseñas en texto plano.", formats: ["Cuenta", "Sub", "Dominio"] },
    ],
  },
  vaults: {
    label: "El principio de la bóveda",
    title: "Un principio. Tres bóvedas.",
    sub: "Todo lo que merece guardarse vive en una bóveda con dueño, círculo y horizonte.",
    items: [
      { title: "Bóveda personal", line: "Para ti", desc: "Tu archivo privado y tu agente — diarios, deseos de salud, las cosas que solo tú conoces. La visibilidad empieza en Privado; tú decides qué llega a salir." },
      { title: "Bóveda familiar", line: "Para quienes importan", desc: "Cada miembro construye su propia bóveda dentro de un círculo compartido. Guardianes, permisos por categoría y un solo agente al que toda la familia puede preguntar." },
      { title: "Bóveda de empresa", line: "Para lo que construiste", desc: "Conocimiento del fundador, contactos clave, notas de sucesión, punteros de credenciales. El manual que tu sucesor habría deseado tener — ya escrito." },
    ],
  },
  how: {
    label: "Cómo funciona",
    title: "Capturar · Curar · Conversar · Continuar",
    sub: "La mayoría de las herramientas almacenan tu vida. Legacai deja que las personas que amas le hagan preguntas — hoy, y mucho después.",
    steps: [
      { n: "01", t: "Capturar", d: "Conecta cada fuente de ti — documentos, fotos, voz, diarios y tus conversaciones con IA." },
      { n: "02", t: "Curar", d: "Etiqueta cada elemento como Privado, Familia, Legado o Público — y añade la historia que solo tú puedes contar." },
      { n: "03", t: "Conversar", d: "Tu agente Legacai responde a tu familia con citas de elementos reales de la bóveda. Nunca inventadas." },
      { n: "04", t: "Continuar", d: "Los planes de entrega deciden quién recibe qué, y cuándo. Tu agente persiste durante el horizonte de tu bóveda." },
    ],
  },
  agent: {
    label: "El agente Legacai",
    title: "Tu familia pregunta. Tú respondes — siempre.",
    sub: "Entrenado únicamente en tu bóveda curada. Cada respuesta cita elementos reales.",
    liveTag: "● En directo · cita cada respuesta",
    ownerName: "Legacai de Mat",
    qa: [
      { q: "¿Dónde está la escritura del piso de Cracovia?", a: "La escritura está en Documentos → Esenciales, subida por Mat el 3 de julio. Nota de historia: «Original en poder del abogado A. Nowak, ul. Floriańska — copia aquí. Número del registro de la propiedad en la misma carpeta.»" },
      { q: "Cuéntame sobre la boda de Mamá y Papá", a: "De la historia hablada de Maria y 48 fotos etiquetadas: se casaron en junio de 1981 en Santa Ana. Maria dice que la banda tocó hasta las 4 de la mañana y que Pawel «bailaba como si el suelo le debiera dinero». Tres fotos muestran el primer baile." },
      { q: "¿Qué pensaba Mat sobre montar la empresa?", a: "A lo largo de 62 conversaciones con IA importadas de 2024–25, una idea vuelve una y otra vez: «construir cosas que se sientan como colegas, no como herramientas». El hilo más claro está en las sesiones de marzo de 2025 sobre su modelo de agente — se lee como un manifiesto." },
      { q: "¿A quién llamamos si pasa algo?", a: "Personas y contactos lista: el abogado A. Nowak (Esenciales), la doctora Wiśniewska (Salud), y Karolina y Pawel tienen el mandato de Guardián con acceso al plan de entrega. Ficha de contacto completa adjunta." },
    ],
    channels: [
      { label: "Web" }, { label: "iOS y Android" }, { label: "Smart TV" },
      { label: "Wearables" }, { label: "Puente de mensajería" }, { label: "Asistentes de voz" },
    ],
  },
  pricing: {
    label: "Precios",
    title: "Paga por tiempo, no por funciones",
    sub: "Cada plan es la plataforma completa. Tú eliges cuánto tiempo tu bóveda tiene garantizada la supervivencia.",
    mostPopular: "MÁS POPULAR",
    yrSuffix: "año",
    plans: [
      {
        name: "Bóveda 1 año",
        period: "/año",
        desc: "Todo, renovado cada año",
        features: [
          "Las 8 fuentes de contenido",
          "100 GB de bóveda cifrada",
          "Agente Legacai · Buscador + Narrador",
          "6 miembros de la familia",
          "Importadores de chats de IA",
          "Recordatorios semanales respetuosos",
          "Compartir profesional en solo lectura",
        ],
        cta: "Empezar 1 año",
      },
      {
        name: "Bóveda 10 años",
        period: "pago único",
        desc: "Resuélvelo una vez. Una década, hecha.",
        features: [
          "Todo lo del plan 1 año",
          "500 GB · 10 años garantizados",
          "Agente con respuesta por voz",
          "Ritual anual de revisión de bóveda",
          "Plantillas de cartas de legado",
          "Planes y disparadores de entrega",
          "Ahorro frente a anual",
        ],
        cta: "Asegurar 10 años",
      },
      {
        name: "Bóveda del siglo",
        period: "pago único",
        desc: "Cien años de ti",
        features: [
          "Todo lo del plan 10 años",
          "1 TB · respaldado por dotación",
          "Multirregión + soportes de archivo",
          "Guardianes a lo largo de generaciones",
          "Carta de persistencia del agente",
          "Resumen impreso cada década",
          "Compromiso de exportación siempre",
        ],
        cta: "Comenzar el siglo",
      },
    ],
  },
  footer: { tagline: "Tu legado, vivo.", copyright: "© 2026 Legacai" },
};

export const TRANSLATIONS: Record<Locale, Dict> = { en: EN, fr: FR, pl: PL, es: ES };

const STORAGE_KEY = "legacai_locale";

function readInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const params = new URLSearchParams(window.location.search);
  const q = params.get("lang");
  if (q && (LOCALES as string[]).includes(q)) return q as Locale;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && (LOCALES as string[]).includes(stored)) return stored as Locale;
  return "en";
}

export function useLocale(): [Locale, (l: Locale) => void] {
  const [locale, setLocaleState] = useState<Locale>("en");
  useEffect(() => {
    setLocaleState(readInitialLocale());
  }, []);
  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      const url = new URL(window.location.href);
      if (l === "en") url.searchParams.delete("lang");
      else url.searchParams.set("lang", l);
      window.history.replaceState(null, "", url.toString());
    }
  };
  return [locale, setLocale];
}

/**
 * Combine the immutable Plan structure (slug, price, years, highlight) from
 * legacai-tokens with translated name/period/desc/features/cta.
 */
export function localizedPlans(locale: Locale): (Plan & PlanCopy)[] {
  const copy = TRANSLATIONS[locale].pricing.plans;
  return PLANS.map((p, i) => ({ ...p, ...copy[i] }));
}
