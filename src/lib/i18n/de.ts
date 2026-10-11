import { siteConfig } from '#/lib/site-config'
import type { HomeFaqs, I18nMessages } from './types'

export const deMessages = {
  "layout": {
    get copyright() { return `Copyright ${new Date().getUTCFullYear()} ${siteConfig.SITE_NAME}` },
    get disclaimer() { return `Spielnamen, Bilder und Marken gehören ihren jeweiligen Rechteinhabern. Für Entfernungsanfragen kontaktiere ${siteConfig.SITE_EMAIL}.` },
    "games": "Startseite",
    "live": "Live",
    "explore": "Entdecken",
    "playMyRom": "Meine ROM spielen",
    "blog": "Blog",
    "about": "Über uns",
    "legal": "Rechtliches",
    "privacyPolicy": "Datenschutz",
    "termsOfService": "Nutzungsbedingungen",
    "copyrightRemoval": "Urheberrecht und Entfernung",
    "theme": "Design",
    "language": "Sprache",
    "tagline": "Retrospiele auf POKOPIE",
    "footer": "Entdecke klassische Spiele im Browser. Unterstützte Titel benötigen keine separate Installation."
  },
  "home": {
    "title": "Retrospiele online spielen",
    "subtitle": "Entdecke NES, SNES, GBA, PS1, Arcade und weitere Plattformen. Lies die Spielinformationen und starte unterstützte Titel im Browser.",
    "heroSearchHint": "Suche nach Titel, Plattform oder Spielreihe.",
    "browsePopular": "Beliebte Spiele ansehen",
    "discovery": "Mehr entdecken",
    "searchPlaceholder": "Titel, Plattform oder Spielreihe…",
    "search": "Suchen",
    "closeSearch": "Suche schließen",
    "reset": "Zurücksetzen",
    "allPlatforms": "Alle Plattformen",
    "allCategories": "Alle Genres",
    "newest": "Neueste",
    "popular": "Beliebt",
    "oldest": "Älteste",
    "nameAsc": "Name A–Z",
    "sortBy": "Sortieren nach",
    "empty": "Keine Spiele gefunden",
    "previous": "Zurück",
    "next": "Weiter",
    "page": "Seite {page} von {pages}",
    "totalGames": "{total} Spiele",
    "views": "Aufrufe",
    "plays": "Spielstarts",
    "details": "Details",
    "featured": "Retrospiele im Browser",
    "recentlyPlayed": "Zuletzt gespielt",
    "latestBlogPosts": "Neueste Beiträge",
    "latestBlogSubtitle": "Anleitungen und Tipps für klassische Spiele im Browser.",
    "viewAllBlog": "Alle Beiträge ansehen",
    "blogPostFallback": "Blogbeitrag",
    "loadError": "Spiele konnten nicht geladen werden. Prüfe deine Verbindung und versuche es erneut.",
    "loading": "Spiele werden geladen…",
    "retry": "Erneut versuchen"
  },
  "detail": {
    "home": "Spiele",
    "play": "Jetzt spielen",
    "playPage": "In neuem Tab spielen",
    "playPageHint": "Öffnet den Spieler in einem neuen Tab.",
    "install": "Installieren",
    "installUnavailable": "Installation noch nicht verfügbar. Lade die Seite neu und versuche es erneut.",
    "installDismissed": "Installation abgebrochen.",
    "installGuideTitle": "Spiel zum Startbildschirm hinzufügen",
    "installGuideIntro": "Falls keine Aufforderung erscheint, nutze das Browsermenü.",
    "installGuideIos": "Auf iPhone oder iPad: In Safari öffnen, Teilen und Zum Home-Bildschirm wählen.",
    "installGuideAndroid": "Auf Android: In Chrome öffnen und im Menü App installieren oder Zum Startbildschirm hinzufügen wählen.",
    "installGuideDesktop": "In Chrome oder Edge: Installationssymbol oder Browsermenü verwenden.",
    "installGuideClose": "Verstanden",
    "share": "Teilen",
    "copyFailed": "Kopieren fehlgeschlagen. Kopiere die Adresse oder den Code manuell.",
    "posterFailed": "Poster konnte nicht erstellt werden. Versuche es erneut.",
    "generatePoster": "Poster erstellen",
    "systemShare": "Mit Gerät teilen",
    "copyEmbedCode": "Einbettungscode kopieren",
    "embedCodeCopied": "Code kopiert.",
    "embedCardTitle": "Spiel einbetten",
    "embedCardDescription": "Bette den Spieler mit einem Link zu POKOPIE auf deiner Website ein.",
    "embedCodeLabel": "Iframe-Code",
    "posterTitle": "Poster zum Teilen",
    "downloadPoster": "Poster herunterladen",
    "posterScanCta": "Scannen, um das Spiel zu öffnen.",
    "shareUnavailableCopied": "Teilen nicht verfügbar. Der Link wurde kopiert.",
    "overview": "Übersicht",
    "keywords": "Schlüsselwörter",
    "howToPlay": "Spielanleitung",
    "details": "Spielinformationen",
    "platform": "Plattform",
    "developer": "Entwickler",
    "released": "Jahr",
    "players": "Spieler",
    "views": "Aufrufe",
    "plays": "Spielstarts",
    "categories": "Genres",
    "languages": "Sprachen",
    "noData": "Nicht verfügbar",
    "browserReady": "Im Browser spielbar",
    "noDownload": "Ohne separate Installation",
    "faq": "Häufige Fragen",
    "relatedGames": "Ähnliche Spiele"
  },
  "blog": {
    "title": "Anleitungen für Retrospiele",
    "description": "Entdecke POKOPIE-Anleitungen, Tipps und Beiträge über klassische Spiele und das Spielen im Browser.",
    "subtitle": "Lies Beiträge und entdecke dein nächstes Spiel.",
    "eyebrow": "Spielanleitungen",
    "empty": "Noch keine Beiträge",
    "total": "{total} Beiträge",
    "relatedPosts": "Ähnliche Beiträge"
  },
  "live": {
    "title": "Spiele live",
    "description": "Entdecke Retrospiel-Streams und aktive Räume auf POKOPIE. Öffne einen Raum, um das laufende Spiel anzusehen.",
    "subtitle": "Sieh dir aktuelle Spielübertragungen an.",
    "eyebrow": "Jetzt live",
    "empty": "Derzeit keine Liveübertragungen",
    "total": "{total} Live-Räume",
    "watchLive": "Ansehen",
    "playGame": "Spielen",
    "closePlayer": "Übertragung schließen",
    "previous": "Zurück",
    "next": "Weiter",
    "page": "Seite {page} von {pages}",
    "error": "Räume konnten nicht geladen werden. Versuche es später erneut.",
    "retry": "Erneut versuchen"
  },
  "homeSeo": {
    "title": "Retrospiele online — NES, SNES, GBA | POKOPIE",
    "description": "Entdecke NES, SNES, GBA, PS1, Arcade und weitere Plattformen. Lies die Spielinformationen und starte unterstützte Titel im Browser.",
    "keywords": "Retrospiele online, NES, SNES, GBA, PS1, Arcade"
  },
  "about": {
    "title": "Über uns",
    "description": "Lerne POKOPIE kennen, einen Katalog klassischer Spiele für den Browser."
  },
  "homeContent": {
    "whyTitle": "Klassiker wiederentdecken",
    "whyBody": "Durchsuche Plattformen und Genres und öffne eine Spielseite für Informationen, Steuerung und ähnliche Titel. Die Kompatibilität hängt vom Spiel und deinem Gerät ab. Die Website-Sprache ändert die Sprache im Spiel nicht automatisch.",
    "howTitle": "Spielanleitung",
    "howSteps": [
      {
        "title": "Spiel auswählen",
        "body": "Suche nach Titel, Plattform oder Spielreihe."
      },
      {
        "title": "Spielseite lesen",
        "body": "Lies die Beschreibung und Steuerung vor dem Spielen."
      },
      {
        "title": "Spieler starten",
        "body": "Klicke auf Jetzt spielen. Nutze die vom Spieler unterstützte Steuerung."
      }
    ]
  }
} satisfies I18nMessages

export const deHomeFaqs = {
  "title": "Häufige Fragen",
  "subtitle": "Informationen zum Spielen im Browser.",
  "items": [
    {
      "question": "Wie starte ich ein Spiel?",
      "answer": "Klicke auf Jetzt spielen. Nutze die vom Spieler unterstützte Steuerung."
    },
    {
      "question": "Ist das Spiel übersetzt?",
      "answer": "Die Website-Sprache betrifft die Oberfläche. Die Spielsprachen hängen von der verfügbaren Version ab."
    },
    {
      "question": "Welche Geräte werden unterstützt?",
      "answer": "Die Kompatibilität variiert je nach Spiel. Prüfe Steuerung und Hinweise des Spielers auf deinem Gerät."
    }
  ]
} satisfies HomeFaqs
