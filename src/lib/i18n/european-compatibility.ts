export const europeanCompatibilityPage = {
  "fr": {
    "title": "Compatibilité PS1 du navigateur — POKOPIE",
    "hero": "Compatibilité PS1 du navigateur",
    "description": "Vérifiez WebAssembly, WebGL 2, le stockage, les manettes, le plein écran et la mémoire utilisés par les émulateurs PS1 dans votre navigateur.",
    "intro": "Vérifiez les fonctions du navigateur avant de lancer un jeu PlayStation 1 ou votre fichier ROM.",
    "run": "Vérifier la compatibilité",
    "browse": "Voir les jeux PS1",
    "results": "Résultats des fonctions",
    "local": "Les résultats sont calculés dans ce navigateur. Aucun détail de l’appareil ni fichier ROM n’est envoyé.",
    "scoreTitle": "Comment le score est calculé",
    "improveTitle": "Améliorer la compatibilité",
    "scopeTitle": "Portée et limites du test",
    "ownTitle": "Tester votre fichier",
    "ownDescription": "Utilisez le lecteur POKOPIE avec un fichier ROM que vous avez le droit d’utiliser.",
    "openRom": "Ouvrir ma ROM",
    "guide": [
      "Mettez à jour votre navigateur.",
      "Activez l’accélération matérielle et redémarrez.",
      "Connectez la manette avant d’ouvrir le lecteur.",
      "Fermez les onglets consommant beaucoup de mémoire."
    ]
  },
  "de": {
    "title": "PS1-Browserkompatibilität — POKOPIE",
    "hero": "PS1-Browserkompatibilität",
    "description": "Prüfe WebAssembly, WebGL 2, Speicher, Gamepads, Vollbild und gemeinsamen Speicher für PS1-Emulatoren in deinem Browser.",
    "intro": "Prüfe die Browserfunktionen vor dem Start eines PlayStation-1-Spiels oder deiner ROM-Datei.",
    "run": "Kompatibilität prüfen",
    "browse": "PS1-Spiele ansehen",
    "results": "Ergebnisse der Funktionsprüfung",
    "local": "Die Ergebnisse werden in diesem Browser berechnet. Gerätedaten und ROM-Dateien werden nicht hochgeladen.",
    "scoreTitle": "So wird die Punktzahl berechnet",
    "improveTitle": "Kompatibilität verbessern",
    "scopeTitle": "Umfang und Grenzen des Tests",
    "ownTitle": "Eigene Datei testen",
    "ownDescription": "Nutze den POKOPIE-Spieler mit einer ROM-Datei, zu deren Nutzung du berechtigt bist.",
    "openRom": "Meine ROM öffnen",
    "guide": [
      "Aktualisiere deinen Browser.",
      "Aktiviere Hardwarebeschleunigung und starte neu.",
      "Verbinde das Gamepad vor dem Öffnen des Spielers.",
      "Schließe Tabs mit hohem Speicherverbrauch."
    ]
  }
}

export const europeanCompatibilityDetails = {
  "fr": {
    "update": "Méthode mise à jour : août 2026",
    "capability": "Fonction",
    "priority": "Priorité",
    "why": "Utilité",
    "result": "Résultat",
    "score": "WebAssembly et WebGL 2 sont essentiels. Le stockage, la mémoire partagée, les manettes et le plein écran améliorent les sauvegardes, les performances ou l’utilisation. Ce test vérifie les API disponibles, pas la vitesse d’un jeu.",
    "scope": "Le test utilise les API du navigateur. Il ne mesure pas la vitesse du processeur ou de la carte graphique, ne vérifie pas toutes les manettes et ne garantit pas que chaque jeu PS1 fonctionne à pleine vitesse.",
    "variability": "Les résultats réels dépendent de l’émulateur, du jeu, de la température, de la mémoire, des extensions et des réglages d’énergie. Testez ensuite le jeu souhaité."
  },
  "de": {
    "update": "Prüfmethode zuletzt aktualisiert: August 2026",
    "capability": "Funktion",
    "priority": "Priorität",
    "why": "Zweck",
    "result": "Ergebnis",
    "score": "WebAssembly und WebGL 2 sind grundlegend. Speicher, gemeinsamer Speicher, Gamepads und Vollbild verbessern Speichern, Leistung oder Bedienung. Der Test prüft verfügbare APIs, nicht die Geschwindigkeit eines Spiels.",
    "scope": "Der Test nutzt Browser-APIs. Er misst weder CPU- noch GPU-Geschwindigkeit, prüft nicht jedes Gamepad und garantiert nicht die volle Geschwindigkeit aller PS1-Spiele.",
    "variability": "Die tatsächlichen Ergebnisse hängen von Emulator, Spiel, Temperatur, Speicher, Erweiterungen und Energiespareinstellungen ab. Teste anschließend das gewünschte Spiel."
  }
}

export const europeanCompatibilityReadiness = {
  "fr": {
    "checking": "Vérification",
    "limited": "Compatibilité partielle",
    "ready": "Prêt",
    "notReady": "Non compatible",
    "browser": "État du navigateur",
    "score": "Ce test vérifie les fonctions. Les performances dépendent de l’appareil et de l’émulateur."
  },
  "de": {
    "checking": "Prüfung läuft",
    "limited": "Teilweise kompatibel",
    "ready": "Bereit",
    "notReady": "Nicht bereit",
    "browser": "Browserbereitschaft",
    "score": "Der Test prüft Funktionen. Die Leistung hängt von Gerät und Emulator ab."
  }
}

export const europeanCompatibilityStatus = {
  "fr": {
    "checking": "Vérification",
    "available": "Disponible",
    "unavailable": "Indisponible"
  },
  "de": {
    "checking": "Prüfung läuft",
    "available": "Verfügbar",
    "unavailable": "Nicht verfügbar"
  }
}

export const europeanCompatibilityCapabilities = {
  "fr": {
    "wasm": {
      "label": "WebAssembly",
      "description": "Exécute le cœur de l’émulateur.",
      "requirement": "Essentiel"
    },
    "webgl2": {
      "label": "WebGL 2",
      "description": "Permet les graphiques accélérés par le matériel.",
      "requirement": "Essentiel"
    },
    "indexedDb": {
      "label": "IndexedDB",
      "description": "Permet le stockage local et les sauvegardes dans les lecteurs compatibles.",
      "requirement": "Recommandé"
    },
    "gamepad": {
      "label": "API des manettes",
      "description": "Permet les commandes avec une manette compatible.",
      "requirement": "Facultatif"
    },
    "fullscreen": {
      "label": "API plein écran",
      "description": "Permet l’affichage du lecteur en plein écran.",
      "requirement": "Facultatif"
    },
    "sharedArrayBuffer": {
      "label": "Mémoire partagée",
      "description": "Peut aider les cœurs d’émulation utilisant plusieurs threads.",
      "requirement": "Recommandé"
    }
  },
  "de": {
    "wasm": {
      "label": "WebAssembly",
      "description": "Führt den Emulatorkern aus.",
      "requirement": "Grundlegend"
    },
    "webgl2": {
      "label": "WebGL 2",
      "description": "Ermöglicht hardwarebeschleunigte Grafik.",
      "requirement": "Grundlegend"
    },
    "indexedDb": {
      "label": "IndexedDB",
      "description": "Ermöglicht lokalen Speicher und Spielstände in unterstützten Spielern.",
      "requirement": "Empfohlen"
    },
    "gamepad": {
      "label": "Gamepad-API",
      "description": "Ermöglicht die Steuerung mit einem kompatiblen Gamepad.",
      "requirement": "Optional"
    },
    "fullscreen": {
      "label": "Vollbild-API",
      "description": "Ermöglicht die Vollbildanzeige des Spielers.",
      "requirement": "Optional"
    },
    "sharedArrayBuffer": {
      "label": "Gemeinsamer Speicher",
      "description": "Kann Emulatorkerne mit mehreren Threads unterstützen.",
      "requirement": "Empfohlen"
    }
  }
}
