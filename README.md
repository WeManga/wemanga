# WeManga - Plateforme de Streaming Anime

## Comment ajouter de nouveaux animes

### Méthode simple et rapide

Pour ajouter un nouvel anime, il suffit de modifier le fichier `src/data/animes.ts` et d'ajouter une nouvelle configuration dans le tableau `animeConfigs`.

### Format d'ajout

```javascript
{
  title: "Nom de votre anime",
  description: "Description de votre anime",
  poster: "URL de l'image poster",
  banner: "URL de l'image banner (optionnel)", // Si pas fourni, utilise le poster
  genre: ["Genre1", "Genre2", "Genre3"],
  year: 2023,
  rating: 8.5,
  type: "serie", // ou "film"
  status: "En cours", // ou "Terminé"
  episodes: [
    { title: "Épisode 1", videoUrl: "URL_VIDEO_1" },
    { title: "Épisode 2", videoUrl: "URL_VIDEO_2" },
    { title: "Épisode 3", videoUrl: "URL_VIDEO_3" },
    // ... plus d'épisodes
  ]
}
```

### Exemple concret

```javascript
{
  title: "Attack on Titan",
  description: "L'humanité vit retranchée dans une cité cernée de hautes murailles à cause des Titans, des géants mangeurs d'hommes.",
  poster: "https://example.com/aot-poster.jpg",
  banner: "https://example.com/aot-banner.jpg",
  genre: ["Action", "Drame", "Fantastique"],
  year: 2013,
  rating: 9.0,
  type: "serie",
  status: "Terminé",
  episodes: [
    { title: "Épisode 1 - À toi, dans 2000 ans", videoUrl: "https://video.sibnet.ru/shell.php?videoid=123456" },
    { title: "Épisode 2 - Ce jour-là", videoUrl: "https://video.sibnet.ru/shell.php?videoid=123457" },
    // ... plus d'épisodes
  ]
}
```

### Avantages de ce système

1. **Simple** : Ajoutez juste un objet dans le tableau
2. **Automatique** : Les IDs, thumbnails, et structure sont générés automatiquement
3. **Flexible** : Fonctionne pour les séries et les films
4. **Maintenable** : Code plus propre et facile à gérer

### Types de vidéos supportés

- **Sibnet** : `https://video.sibnet.ru/shell.php?videoid=XXXXX`
- **YouTube** : `https://www.youtube.com/watch?v=XXXXX`
- **Vimeo** : `https://vimeo.com/XXXXX`
- **Fichiers vidéo directs** : `.mp4`, `.webm`, `.ogg`

### Notes importantes

- Les titres d'épisodes sont optionnels (générés automatiquement si non fournis)
- La durée par défaut est "23:40" si non spécifiée
- Les thumbnails utilisent automatiquement l'image poster
- Les descriptions d'épisodes sont générées automatiquement

### Déploiement

Après avoir ajouté vos animes, le site se met à jour automatiquement. Aucune configuration supplémentaire n'est nécessaire !