# Lyzard.ai — UI/UX Design Specifications

> **Document de référence officiel** pour l'ensemble des interfaces de la plateforme Lyzard.ai.
> **Audience :** Équipes Frontend, Design, et QA.
> **Version :** 2.0 — Mise à jour le 06/04/2026
>
> **Esthétique :** Dark Premium — glassmorphism sobre, accents ambre/or, typographie nette Inter.
> **Approche :** Desktop-first. Adaptations responsive intégrées dans chaque section.
> **Langue de l'UI :** Anglais (interface) — Le produit supporte l'input en FR, EN et Darija.

---

## 🎨 Design System Global

```
COULEURS :
  - bg-base          : #050508   (fond principal, quasi-noir profond)
  - bg-card          : #0C0C12   (surface des cartes)
  - bg-input         : #111118   (champs de saisie)
  - bg-elevated      : #161620   (surfaces surélevées, modals)
  - border-subtle    : rgba(255, 255, 255, 0.06)
  - border-hover     : rgba(255, 255, 255, 0.12)
  - accent-primary   : #F5A623   (ambre/or — boutons, liens, focus)
  - accent-glow      : rgba(245, 166, 35, 0.25)  (halo derrière les boutons)
  - accent-secondary : #E08E10   (hover du primary)
  - success          : #34D399   (statut publié, validations)
  - danger           : #EF4444   (suppression, erreurs)
  - warning          : #FACC15   (draft, attention)
  - text-primary     : #F0F0F0   (texte principal)
  - text-secondary   : #8A8A9A   (labels, descriptions)
  - text-muted       : #4A4A5A   (hints, placeholders)

TYPOGRAPHIE :
  - Titres       : "Inter", weight 700-800, tracking -0.02em
  - Corps        : "Inter", weight 400-500
  - Monospace    : "JetBrains Mono" (code, identifiants)
  - Taille h1    : 32px / taille body : 14px / taille small : 12px

COMPOSANTS RÉCURRENTS :
  - Bouton primary  : bg accent-primary, texte #050508 (noir), font-weight 600,
                      border-radius 12px, padding 12px 28px,
                      box-shadow: 0 0 20px rgba(245,166,35,0.2),
                      hover: bg accent-secondary, shadow plus large
  - Bouton secondary: bg transparent, border 1px border-subtle, texte text-primary,
                      hover: bg white/5, border-hover
  - Bouton danger   : bg transparent, texte danger, hover: bg danger/10
  - Input           : bg bg-input, border 1px border-subtle, border-radius 10px,
                      padding 14px 16px, texte text-primary, placeholder text-muted,
                      focus: border accent-primary, ring 2px accent-glow
  - Card            : bg bg-card, border 1px border-subtle, border-radius 16px,
                      hover: border-hover, translateY(-2px), shadow-xl
  - Glass panel     : bg bg-card/80, backdrop-blur 24px, border 1px border-subtle
  - Badge           : px 10px, py 4px, border-radius 20px, font 11px weight 600
  - Avatar          : 36px cercle, border 2px accent-primary/30

ESPACEMENTS :
  - Page padding   : 32px horizontal, 24px vertical
  - Gap cartes     : 24px
  - Section spacing: 48px entre sections
  - Card padding   : 24px

ANIMATIONS :
  - Transitions    : 200ms ease sur hover, 300ms ease sur apparition
  - Cards hover    : translateY(-2px) + ombre plus profonde
  - Page enter     : fade-in de 0 à 1 en 400ms + translateY(12px → 0)
  - Loading        : spinner cercle ambre qui tourne (2s loop)
```

---

## 🌐 Écran 1 : Landing Page

```
URL      : /
Accès    : Public — redirige vers /dashboard si déjà authentifié
Objectif : Convertir les visiteurs en comptes créés via un message clair,
           une démonstration visuelle du produit, et une proposition de valeur sans friction.

─── NAVBAR (sticky, h: 64px) ────────────────────────────────────────
  - Fond     : bg-base/90 + backdrop-blur 16px
  - Gauche   : Logo "Lyzard.ai" — icône reptile stylisé (ambre) + texte "Lyzard"
               en Inter 700, 20px, blanc. Le ".ai" en accent-primary.
  - Droite   : Liens textuels "Features" "Pricing" "FAQ" en text-secondary,
               hover text-primary.
               Bouton "Log In" (secondary, petit).
               Bouton "Get Started Free" (primary).
  - Mobile   : Hamburger menu → slide-in panel depuis la droite

─── HERO SECTION (min-h: 90vh, centré verticalement) ────────────────
  - Background : bg-base avec un gradient radial subtil :
                 centre = accent-glow à 5% opacité, bords = transparent
  - Badge      : Pill d'annonce en haut du hero :
                 "✨ Now in Beta — Join 500+ builders"
                 bg white/5, border border-subtle, texte text-secondary, 12px
                 Hover : border-hover, légère glow ambre

  - Titre (h1) : "Build Stunning Websites"
                 Ligne 2 : "With Just a Prompt."
                 Inter 800, 56–64px (responsive via clamp), text-primary, line-height 1.08
                 Le mot "Prompt" porte un gradient text : accent-primary → #FFD580
                 Tracking : -0.03em pour impact visuel maximal

  - Sous-titre : "Describe your vision in French, English, or Darija.
                  Lyzard generates a production-ready page in under 30 seconds."
                 Inter 400, 18px, text-secondary, max-width 520px, centré
                 Margin-top 20px

  - CTAs       : [Bouton Primary] "Start Building — It's Free"
                 h: 54px, px: 36px, font 16px 600, shadow glow
                 [Texte sous le bouton] "No credit card required  ·  3 free credits included"
                 text-muted, 12px, mt 12px

  - Illustration Hero :
                 Browser frame (border border-subtle, radius 16px, shadow 0 32px 80px rgba(0,0,0,0.6))
                 Contient un screenshot haute fidélité du Builder en action.
                 Légère inclinaison perspective (perspective: 1200px, rotateX: 4deg)
                 Animation : fade-in + translateY(24px→0) en 800ms ease-out, delay 300ms

                 Bulle de chat flottante superposée en bas-gauche du frame :
                   bg bg-elevated, border border-subtle, radius 12px, padding 12px 16px
                   shadow-xl
                   Texte : "Crée un site pour mon restaurant marocain 🍽️"
                   Inter 400, 14px, text-primary
                   Curseur clignotant animé (opacity 0→1, 1s ease infinite)

─── FEATURES (3 colonnes) ───────────────────────────────────────────
  - Section label : "WHY LYZARD" — Inter 500, 11px, letter-spacing 0.12em,
                    text accent-primary, uppercase, centré, mb 12px
  - Titre section : "The fastest path from idea to live website."
                    Inter 700, 32px, text-primary, centré
  - Sous-titre    : "No designers. No developers. No deadlines missed."
                    text-secondary, 16px, centré, mt 8px

  3 cartes Feature (Card style, padding 32px) :
  ┌─────────────────────────────────────────────────────┐
  │ ⚡ "Instant Generation"                             │
  │ "From prompt to published page in 30 seconds.       │
  │  Real content, real design, production-ready code." │
  ├─────────────────────────────────────────────────────┤
  │ 💬 "Refine With Conversation"                       │
  │ "Not satisfied with the hero? Just say so.          │
  │  Adjust colors, copy, and layout through natural    │
  │  dialogue — no technical knowledge required."       │
  ├─────────────────────────────────────────────────────┤
  │ 📦 "Own Your Code"                                  │
  │ "Export clean, semantic HTML + CSS as a ZIP.        │
  │  Deploy anywhere. No subscriptions, no lock-in,     │
  │  no ongoing fees for your clients."                 │
  └─────────────────────────────────────────────────────┘
  - Icône    : 44px dans un cercle 56×56px, bg accent-primary/10, radius 14px
  - Hover    : card lift + barre gauche 3px accent-primary animate en slide-in
  - Responsive : 1 colonne sur mobile, gap 16px

─── HOW IT WORKS (3 étapes horizontales) ─────────────────────────────
  - Section label : "THE PROCESS" — même style que label Features
  - Titre         : "Three steps. One powerful result."
                    Inter 700, 32px, text-primary

  3 étapes reliées par une ligne pointillée accent-primary/20 :
  ┌──────────────┬──────────────────┬───────────────────┐
  │ 01           │ 02               │ 03                │
  │ Describe     │ Generate         │ Own It            │
  │              │                  │                   │
  │ "Tell Lyzard │ "Watch your      │ "Download a clean │
  │ what you     │ website take     │ ZIP. Deploy to    │
  │ need, in any │ shape,           │ any host. Share   │
  │ language."   │ in real-time."   │ a live link."     │
  └──────────────┴──────────────────┴───────────────────┘
  - Numéros  : "01"/"02"/"03" — Inter 800, 52px, accent-primary, opacity 60%
  - Icône    : 48px au dessus du numéro, text-primary
  - Responsive : vertical stack sur mobile, ligne devient verticale

─── PRICING (2 cards côte à côte) ───────────────────────────────────
  - Section label : "PRICING" — même style
  - Titre         : "Straightforward pricing. No surprises."
                    Inter 700, 32px, text-primary
  - Sous-titre    : "Start free. Scale when you're ready."
                    text-secondary, 16px

  Carte Free (Card standard) :
  ┌──────────────────────────────────────────┐
  │ Starter                                  │
  │ "Perfect for exploring"                  │
  │ $0 /month                                │
  │ ─────────────────────────────            │
  │ ✓ 3 AI generations / month               │
  │ ✓ ZIP export of all pages                │
  │ ✓ Unlimited chat refinements             │
  │ ✓ Access to all templates                │
  │ [Get Started — Free]                     │
  └──────────────────────────────────────────┘

  Carte Pro (border 1.5px accent-primary, glow, badge "Most Popular") :
  ┌──────────────────────────────────────────┐
  │ ✦ Pro                                    │
  │ "For professionals who ship daily"        │
  │ $9 /month  (billed monthly)              │
  │ ─────────────────────────────            │
  │ ✓ 50 AI generations / month              │
  │ ✓ Priority AI model (faster, smarter)    │
  │ ✓ Custom domain publishing               │
  │ ✓ Analytics dashboard                    │
  │ ✓ Dedicated support                      │
  │ [Upgrade to Pro →]                       │
  └──────────────────────────────────────────┘
  - Responsive : stack verticalement sur mobile, Pro card en premier

─── SOCIAL PROOF (bande au-dessus du Footer) ────────────────────────
  - bg bg-card, py 32px
  - Texte centré : "Trusted by builders across Morocco, France, and beyond."
    Inter 400, 15px, text-secondary
  - En dessous : rangée d'avatars (6 overlapping) + texte "500+ websites created"
    Inter 600, 14px, text-primary

─── FOOTER ──────────────────────────────────────────────────────────
  - bg bg-card, border-top 1px border-subtle, py 48px
  - Layout grid 4 colonnes sur desktop :
    Col 1 : Logo + tagline "The AI website builder for every language."
             text-muted, 13px. Copyright "© 2026 Lyzard.ai"
    Col 2 : "Product" — Features | Pricing | Changelog | Roadmap
    Col 3 : "Company" — About | Blog | Privacy | Terms
    Col 4 : "Connect" — GitHub, Twitter/X, Discord icons
  - Responsive : 2 colonnes tablette, 1 colonne mobile
```

---

## 🔐 Écran 2 : Login

```
URL      : /login
Accès    : Public — redirige vers /dashboard si la session est active
Objectif : Permettre une connexion rapide et sécurisée avec un UX frictionless.

─── LAYOUT ──────────────────────────────────────────────────────────
  - Plein écran, centré verticalement et horizontalement
  - Background : bg-base + gradient radial subtil (accent-glow 3% au centre)

─── LOGO (au dessus de la carte) ────────────────────────────────────
  - Icône Lyzard (48px, ambre) + "Lyzard.ai" Inter 700, 24px
  - Espacement : 32px sous le logo

─── CARTE (max-width: 420px, centré) ───────────────────────────────
  - Style   : Glass panel, padding 40px, border-radius 20px
  - En-tête : "Welcome back." Inter 700, 24px, text-primary
              "Sign in to continue building the web." Inter 400, 14px, text-secondary
              Gap 8px entre les deux, margin-bottom 32px

  FORMULAIRE :
  - Champ Email :
    - Label : "Email" Inter 500, 13px, text-secondary, mb 6px
    - Input : placeholder "you@example.com", icône Mail à gauche (text-muted)
  - Champ Password :
    - Label : "Password" Inter 500, 13px, text-secondary, mb 6px
    - Input : placeholder "••••••••", icône Lock à gauche
    - Bouton œil à droite pour afficher/masquer (text-muted, hover text-primary)
    - En dessous à droite : "Forgot password?" lien text accent-primary, 12px
  - Gap entre champs : 20px
  - Bouton "Sign In" : primary, full-width, h 48px, mt 28px
  - Séparateur : ligne horizontale avec texte "or" au milieu, text-muted, my 24px
  - Bouton "Continue with Google" : secondary, full-width, h 48px
    Icône Google (colorée) à gauche du texte

  PIED DE CARTE :
  - "Don't have an account?" text-secondary + "Sign up" lien accent-primary
  - Centré, mt 24px, 14px

─── ÉTATS ────────────────────────────────────────────────────────────
  - Loading : Bouton "Sign In" désactivé, spinner ambre à la place du texte
  - Erreur  : Message "Invalid email or password" en danger rouge au dessus du bouton,
              bg danger/10, border danger/20, padding 12px, radius 10px, 13px
  - Success : Redirect immédiat vers /dashboard
```

---

## 📝 Écran 3 : Signup

```
URL      : /signup
Accès    : Public — redirige vers /dashboard si session active
Objectif : Minimiser la friction à l'inscription pour maximiser le taux de conversion.

─── LAYOUT : Identique au Login ─────────────────────────────────────

─── CARTE (max-width: 420px) ───────────────────────────────────────
  - En-tête : "Create your free account." Inter 700, 24px
              "Start building in under 60 seconds." Inter 400, 14px, text-secondary
              Petit badge "🎁 3 free credits" — bg accent-primary/10, texte accent-primary,
              border accent-primary/20, 11px, radius full, px 10px py 4px

  FORMULAIRE :
  - Champ Full Name :
    - Label : "Full name"
    - Input : placeholder "John Doe", icône User à gauche
  - Champ Email :
    - Input : placeholder "you@example.com", icône Mail à gauche
  - Champ Password :
    - Input : placeholder "Min. 8 characters", icône Lock à gauche, toggle œil
    - Indicateur de force en dessous :
      4 barres horizontales (w: 25% chacune, gap 4px, h: 3px, radius full)
      Vide = bg white/10
      Faible = 1 barre danger
      Moyen = 2 barres warning
      Fort = 3 barres success
      Très fort = 4 barres success
      Label à droite : "Weak" / "Medium" / "Strong" (couleur correspondante, 11px)
  - Gap entre champs : 20px
  - Bouton "Create Account" : primary, full-width, h 48px, mt 28px
  - Séparateur "or" + Bouton Google (identique au login)

  PIED DE CARTE :
  - "Already have an account?" + "Sign in" lien accent-primary
  - Petit texte : "By creating an account, you agree to our Terms and Privacy Policy"
    text-muted, 11px, mt 16px, liens soulignés
```

---

## 🔑 Écran 4 : Forgot Password

```
URL      : /forgot-password
Accès    : Public (accès via le lien "Forgot password?" de la page Login)
Objectif : Guider l'utilisateur à travers la récupération de compte sans ambiguïté.

─── LAYOUT : Identique au Login ─────────────────────────────────────

─── CARTE (max-width: 420px) ───────────────────────────────────────
  - Icône : Grand cadenas ouvert (48px) dans un cercle bg accent-primary/10,
            couleur accent-primary, centré au dessus du titre
  - En-tête : "Forgot your password?" Inter 700, 22px, centré
              "No problem. Enter your email and we'll send a 6-digit code
               to get you back in."
              Inter 400, 14px, text-secondary, centré, max-width 340px

  FORMULAIRE :
  - Champ Email :
    - Label : "Email address"
    - Input : placeholder "you@example.com", icône Mail
  - Bouton "Send Reset Code" : primary, full-width, h 48px, mt 24px

  PIED DE CARTE :
  - Lien "← Back to login" : text-secondary, hover accent-primary
    Flèche qui translate -4px sur hover
  - Centré, mt 24px

─── ÉTAT SUCCÈS (après envoi) ───────────────────────────────────────
  - La carte change de contenu (transition fade) :
  - Icône : ✉️ enveloppe (48px) dans cercle success/10, couleur success
  - Titre : "Check your email" Inter 700, 22px
  - Texte : "We've sent a 6-digit code to **you@example.com**"
            (l'email en font-weight 600)
  - "Didn't receive it?" text-muted + "Resend code" lien accent-primary
  - Bouton "Enter Code" : primary, full-width → redirige vers /verify-code

─── ÉTAT ERREUR ─────────────────────────────────────────────────────
  - Si email introuvable : message erreur rouge comme Login
    "No account found with this email address"
```

---

## 🔢 Écran 5 : Verify Code (OTP)

```
URL: /verify-code
Accès : Après soumission du Forgot Password

─── LAYOUT : Identique au Login ─────────────────────────────────────

─── CARTE (max-width: 420px) ───────────────────────────────────────
  - Icône : Shield/bouclier (48px) dans cercle accent-primary/10
  - En-tête : "Enter verification code" Inter 700, 22px, centré
              "We sent a 6-digit code to your@email.com"
              Inter 400, 14px, text-secondary, centré

  CHAMPS OTP (6 inputs côte à côte) :
  - 6 champs carrés, chacun :
    - Taille    : 52px × 52px
    - bg        : bg-input
    - border    : 1px border-subtle
    - radius    : 12px
    - texte     : 24px, Inter 700, text-primary, centré
    - maxLength : 1 caractère
    - Focus     : border accent-primary, ring accent-glow
  - Gap : 10px entre chaque champ
  - Comportement :
    - Auto-focus le champ suivant après saisie
    - Permettre le paste d'un code complet
    - Backspace : vider le champ et focus le précédent
  - Ligne du dessous : "Code expires in 4:59" text-muted, 12px
    Minuterie en temps réel (countdown)

  - Bouton "Verify Code" : primary, full-width, h 48px, mt 28px
  - Lien "Didn't receive the code?" text-secondary
    + "Resend" accent-primary (clickable uniquement quand timer = 0)

  PIED DE CARTE :
  - "← Back to login" lien identique à forgot-password

─── ÉTATS ────────────────────────────────────────────────────────────
  - Erreur : Les 6 champs deviennent border danger rouge, léger shake (animation)
             Message : "Invalid or expired code. Please try again."
  - Loading : Bouton affiche spinner
  - Succès  : Redirect vers /reset-password
```

---

## 🔄 Écran 6 : Reset Password

```
URL: /reset-password
Accès : Après vérification OTP réussie

─── LAYOUT : Identique au Login ─────────────────────────────────────

─── CARTE (max-width: 420px) ───────────────────────────────────────
  - Icône : Clé/key (48px) dans cercle success/10, couleur success
  - En-tête : "Set new password" Inter 700, 22px, centré
              "Choose a strong password for your account"
              Inter 400, 14px, text-secondary, centré

  FORMULAIRE :
  - Champ "New password" :
    - Input type password, icône Lock, toggle œil
    - Indicateur de force (identique à Signup : 4 barres + label)
  - Champ "Confirm password" :
    - Input type password, icône Lock
    - Validation live : si ne correspond pas →
      Petit texte "Passwords don't match" en danger, 12px, sous le champ
  - Gap 20px entre champs
  - Bouton "Reset Password" : primary, full-width, h 48px, mt 28px

─── ÉTAT SUCCÈS (après reset réussi) ────────────────────────────────
  - La carte change de contenu :
  - Icône : ✅ check dans cercle success/10 (48px)
  - Titre : "Password updated" Inter 700, 22px
  - Texte : "Your password has been reset successfully."
  - Bouton "Go to Login" : primary, full-width → redirige /login
  - Pas de lien "back", c'est la fin du flow
```

---

## 📊 Écran 7 : Dashboard

```
URL      : /dashboard
Accès    : Authentifié uniquement — redirige vers /login si session absente ou expirée
Objectif : Vue d'ensemble opérationnelle — projets, métriques d'usage, et accès rapide
           à la création. C'est le hub central de la plateforme.

─── TOP NAVBAR (sticky, h: 64px, z-50) ─────────────────────────────
  - Background : bg-base/90 + backdrop-blur 16px + border-bottom border-subtle
  - Gauche     : Logo "Lyzard.ai" (même style que Landing, cliquable → /dashboard)
  - Droite     :
    - Badge crédits : "🪙 7 credits" dans un pill bg accent-primary/10,
      texte accent-primary, 12px font-weight 600, border accent-primary/20
    - Séparateur vertical (1px × 24px, border-subtle)
    - Avatar utilisateur (36px cercle, initiale du nom, bg accent-primary/20)
      Au clic : dropdown menu avec :
        - "Settings" (icône gear) → /settings
        - "Log out" (icône logout, texte danger)
      Dropdown : bg bg-elevated, border border-subtle, radius 12px,
                 shadow-xl, padding 8px, chaque item h 40px

─── HEADER SECTION ──────────────────────────────────────────────────
  - Layout  : flex justify-between, items-end, mb 32px
  - Gauche  :
    - "Good {morning/afternoon}, {first_name}" — Inter 400, 14px, text-secondary
      (heure-dépendant : 0-12h = "Morning", 12-17h = "Afternoon", 17h+ = "Evening")
    - "My Projects" Inter 700, 28px, text-primary
  - Droite  :
    - Bouton "+ New Project" primary, h 44px
      Icône Plus à gauche du texte
      hover : shadow accent-glow 0 0 24px rgba(245,166,35,0.35)

─── STATISTIQUES (4 cartes en ligne) ────────────────────────────────
  - Layout : Grid 4 colonnes, gap 20px, mb 40px
  - Chaque stat card :
    - Style   : Card (bg-card, border-subtle, radius 16px, padding 24px)
    - Layout  : vertical
    - Top     : Icône (24px) dans un cercle 40×40px bg couleur/10
    - Milieu  : Valeur numérique, Inter 700, 32px, text-primary
    - Bas     : Label, Inter 400, 13px, text-secondary

  Cartes :
    1. Icône Layers (accent-primary)   | Valeur "12"  | "Total Projects"
    2. Icône Zap    (success)          | Valeur "47"  | "Total Generations"
    3. Icône Coins  (accent-primary)   | Valeur "7"   | "Credits Left"
       Sous le label: barre de progression (h 4px, bg white/10, fill accent-primary)
       Ratio affiché: "7/50 used" text-muted 11px
    4. Icône Clock  (text-secondary)   | Valeur "2.4s"| "Avg. Generation Time"

  - Responsive : 2 colonnes sur tablette, 1 colonne sur mobile

─── PROJECTS GRID ───────────────────────────────────────────────────
  - Titre     : "Recent Projects" Inter 600, 18px + compteur "(12)" text-muted
  - Sous-titre: Tabs ou filtre → "All" | "Draft" | "Published" (pills,
                active = bg white/10 + text-primary, inactive = text-secondary)
  - Layout    : Grid 3 colonnes, gap 24px
  - Responsive: 2 colonnes tablette, 1 colonne mobile

  Chaque project card :
    - Thumbnail (haut, h: 180px) :
      - Screenshot de la page générée OU
      - Si pas encore de contenu : gradient placeholder (bg-elevated)
        avec icône Globe centrée, 40px, text-muted
      - Radius top : 16px (suit la card)
    - Corps (padding 20px) :
      - Titre   : nom du projet, Inter 600, 16px, text-primary
                   Tronqué si trop long (ellipsis)
      - Date    : "Created Apr 3, 2026" Inter 400, 12px, text-muted
      - Ligne   : flex justify-between, items-center, mt 12px
        - Gauche: Badge status :
          - "Draft"     : bg warning/10, texte warning, 11px
          - "Published" : bg success/10, texte success, 11px
          - "Pending"   : bg white/10, texte text-secondary, 11px
        - Droite: "v3" version badge, Inter Mono 500, 11px, text-muted
    - Hover : card lift (translateY -2px), border-hover, shadow-lg
    - Click : Navigation vers /builder/{project_id}
    - Actions (visibles au hover, overlay sur le thumbnail) :
      - Fond semi-transparent bg-base/60, backdrop-blur
      - Bouton "Open" (primary, petit)
      - Bouton icône Trash (ghost, texte danger) — au coin haut droit
        Déclenche la modale de suppression

─── EMPTY STATE (quand 0 projets) ──────────────────────────────────
  - Centré dans la zone de grille
  - Icône Sparkles, 64px, text-muted, mb 16px
  - "Your canvas is empty." Inter 600, 20px, text-primary
  - "Create your first project and let the AI do the heavy lifting."
    Inter 400, 14px, text-secondary, max-width 320px, text-center
  - Bouton "+ Start Your First Project" primary, mt 24px, h 46px

─── MODAL DELETE CONFIRMATION ───────────────────────────────────────
  - Overlay : bg black/50, backdrop-blur 4px
  - Modal   : bg bg-elevated, border border-subtle, radius 20px,
              padding 32px, max-width 400px, centré
  - Titre   : "Delete this project?" Inter 700, 18px
  - Texte   : "This will permanently remove the project and all its version history.
               This action cannot be undone."
              text-secondary, 14px
  - Actions : gap 12px
    - "Cancel" bouton secondary (à gauche)
    - "Delete Project" bouton danger (bg danger, texte blanc, hover bg #CC2222)
      Petit icône Trash à gauche du texte
```

---

## 🎨 Écran 7b : Template Selection (Modal)

```
Déclencheur : Click sur "+ New Project" (Dashboard) ou "+ Start Your First Project" (Empty State)
Type        : Modal plein écran (z-50) avec overlay sombre
Objectif    : Guider l'utilisateur dans le choix d'un point de départ structuré.
              L'IA n'opère JAMAIS sur une page vierge — elle édite et personnalise
              un template validé selon le prompt fourni. Cela garantit la qualité
              et la cohérence des pages générées.

─── OVERLAY / PAGE ──────────────────────────────────────────────────
  - Background : bg black/60 + backdrop-blur 8px (si modal)
  - Container  : bg bg-base, max-width 1100px, radius 24px (si modal)
                 padding 40px, centré

─── HEADER ──────────────────────────────────────────────────────────
  - Titre    : "Choose a Template" Inter 700, 28px, text-primary
  - Sous-titre: "Pick a starting point. The AI will customize it based
                 on your description." Inter 400, 15px, text-secondary
  - Bouton close (X) en haut à droite si modal

─── CATÉGORIES (tabs horizontaux) ───────────────────────────────────
  - "All" | "Business" | "Portfolio" | "Restaurant" | "E-commerce" | "Agency"
    | "Event" | "SaaS"
  - Style pill : actif = bg white/10 + text-primary, inactif = text-secondary
  - Scroll horizontal sur mobile

─── GRILLE DE TEMPLATES (3 colonnes, gap 20px) ─────────────────────
  Chaque template card :
  - Thumbnail (h: 220px) :
    - Screenshot haute qualité du template
    - Radius top 14px
    - Hover : zoom léger (scale 1.03), overlay semi-transparent
      avec bouton "Preview" (secondary, petit) centré
  - Corps (padding 16px) :
    - Nom      : "Modern SaaS" Inter 600, 15px, text-primary
    - Catégorie: "SaaS" badge text-muted, 11px, bg white/5
    - Desc     : "Clean hero section, feature grid, pricing table"
                 Inter 400, 13px, text-secondary, max 2 lignes
  - Sélection : border 2px accent-primary quand sélectionné
                + petit check ✓ en haut droit du thumbnail (cercle accent-primary)

  Templates à inclure (minimum 8) :
    1. "Clean Business"   — Hero + services + contact
    2. "Modern SaaS"      — Hero + features + pricing + FAQ
    3. "Creative Portfolio"— Gallery grid + about + contact
    4. "Restaurant"       — Menu + réservation + carte
    5. "E-commerce Landing"— Product showcase + CTA
    6. "Agency"           — Case studies + team + services
    7. "Event / Conference"— Schedule + speakers + tickets
    8. "Minimal Blog"     — Article list + about
    9. "Blank Canvas"     — Structure HTML minimale (header + hero + footer)

  - Responsive : 2 colonnes tablette, 1 colonne mobile

─── ZONE NOM DU PROJET (en bas, sticky) ────────────────────────────
  - Layout  : flex row, items-center, gap 16px, padding 24px,
              border-top border-subtle, bg bg-card
  - Input   : "Project name" placeholder "My Landing Page"
              bg bg-input, border-subtle, radius 10px, flex-grow
  - Bouton  : "Create Project" primary, h 48px
              Désactivé tant qu'aucun template n'est sélectionné (opacity 40%)
              Quand cliqué → crée le projet avec le template choisi
              → redirige vers /builder/{new_project_id}

─── PREVIEW MODAL (optionnel) ──────────────────────────────────────
  - Click sur "Preview" d'un template
  - Ouvre un modal fullscreen avec :
    - Iframe du template en taille réelle
    - 3 boutons device switcher (Desktop/Tablet/Mobile)
    - Bouton "Use This Template" primary en bas
    - Bouton "Close" (X) en haut droite
```

---

## 💬 Écran 8 : Builder (Chat + Live Preview)

```
URL      : /builder/{project_id}
Accès    : Authentifié + propriétaire du projet (403 si accès non autorisé)
Objectif : Interface de travail principale. Permet à l'utilisateur de décrire
           ses modifications en langage naturel et de voir le résultat en temps réel
           dans un environnement sandboxé et sécurisé.

─── TOP BAR (sticky, h: 56px, full-width) ──────────────────────────
  - Background : bg-base, border-bottom border-subtle
  - Gauche :
    - Bouton "← Back" (ghost, icône ArrowLeft) → /dashboard
    - Séparateur vertical
    - Nom du projet : Inter 600, 15px, text-primary
      Cliquable pour éditer inline (focus → input, blur → sauvegarde)
  - Centre : (vide, espace respirable)
  - Droite :
    - Badge "🪙 5" crédits restants (pill, accent-primary/10)
    - Indicateur auto-save : "Saved ✓" text success, 12px
      OU "Saving..." text-muted + petit spinner
    - Bouton "Export ZIP" (secondary, icône Download)
    - Bouton "Deploy" (primary, icône Rocket) — si feature activée

─── LAYOUT PRINCIPAL : Split View (h: calc(100vh - 56px)) ─────────
  - Panneau gauche : Chat (width: 40%, min 360px)
  - Divider        : 4px, bg transparent, hover bg border-hover, cursor col-resize
  - Panneau droit  : Preview (width: 60%)
  - Les panneaux sont redimensionnables via drag du divider

─── PANNEAU GAUCHE : CHAT ──────────────────────────────────────────
  Background : bg-base

  Zone messages (scrollable, flex-grow, padding 20px) :
  - Messages utilisateur :
    - Aligné à droite
    - bg accent-primary/10, texte text-primary
    - padding 14px 18px, radius 16px 16px 4px 16px
    - Sous le message : heure "14:32" text-muted, 11px
  - Messages IA :
    - Aligné à gauche
    - bg bg-card, border border-subtle, texte text-primary
    - padding 14px 18px, radius 16px 16px 16px 4px
    - Pendant la génération : "Generating your page..."
      avec animation 3 points qui apparaissent en séquence
    - Quand fini : "✅ Page generated — version 3"
      texte success, avec lien "View changes"
    - Sous le message : heure text-muted

  Zone input (sticky en bas, padding 16px, border-top border-subtle) :
  - Input multi-ligne (textarea auto-expand, max 4 lignes) :
    - bg bg-input, border border-subtle, radius 14px
    - placeholder "Describe your landing page..."
    - padding 14px 48px 14px 16px (space pour le bouton send)
    - Focus : border accent-primary
  - Bouton Send (position: absolute, bottom right de l'input) :
    - Cercle 36×36px, bg accent-primary, icône ArrowUp blanc
    - Désactivé (opacity 30%) quand input vide
    - Hover : bg accent-secondary
  - Texte sous l'input : "Supports French, English, and Darija"
    text-muted, 11px, centré

─── PANNEAU DROIT : PREVIEW ────────────────────────────────────────
  Background : bg-card

  Toolbar (h: 48px, border-bottom border-subtle, padding 0 16px) :
  - Gauche : Device switcher — 3 boutons icônes :
    - Desktop (Monitor) | Tablet (Tablet) | Mobile (Smartphone)
    - Actif : bg white/10, text-primary. Inactif : text-muted
    - Gap 4px, chaque bouton 36×36px, radius 8px
  - Droite :
    - Version indicator : "v3" dropdown → liste des versions précédentes
      Dropdown : bg bg-elevated, chaque ligne = "v1 — Mar 28" etc.
      Click → restaure cette version dans le preview
    - Bouton "Open in new tab" (ghost, icône ExternalLink)

  Iframe container (flex-grow) :
  - Background derrière l'iframe : bg bg-elevated (gris foncé, comme un bureau)
  - Iframe centré avec ombre : shadow-2xl, radius 0
  - Largeurs selon device : 100% / 768px / 375px
  - Transition smooth sur le changement de largeur (300ms ease)
  - Contenu : le HTML/CSS généré, rendu en temps réel

  Bottom bar (h: 44px, border-top border-subtle, padding 0 16px) :
  - Bouton "View Code" (secondary, petit, icône Code)
    Toggle un panel de code (hauteur 300px) sous l'iframe
    Code affiché en JetBrains Mono, syntax highlighting (fond bg-base)
  - Bouton "Export ZIP" (primary, petit, icône Download)

─── ÉTATS SPÉCIAUX DU BUILDER ───────────────────────────────────────

  [ÉTAT VIDE — Première visite, aucune génération] :
    Zone preview, centré vertical + horizontal :
    - Icône Sparkles animée (pulse, 1.5s), 48px, text-muted
    - Titre : "Your canvas is ready." Inter 600, 18px, text-primary
    - Sous-titre : "Describe your ideal website in the chat.
                   The AI will build it for you."
      Inter 400, 14px, text-secondary
    - Flèche animée pointant vers le panneau Chat (gauche)

  [ÉTAT GÉNÉRATION EN COURS] :
    - Barre de progression fine (h: 2px) en haut de la preview area
      bg accent-primary, animate de 0% à 100% (linear, durée ~20s)
    - Le HTML s'affiche progressivement dans l'iframe (streaming visible)
    - Message IA dans le chat : "Building your page..."
      avec 3 dots animés (keyframe opacity staggered)
    - Pendant la génération, l'input chat est désactivé (opacity 50%)

  [ÉTAT ERREUR IA] :
    Message dans le chat (aligné gauche) :
    - bg danger/10, border danger/20, radius 12px, padding 14px 18px
    - Icône ⚠️ + "Generation failed. The AI couldn't complete your request."
      texte danger, 14px
    - Bouton "Try Again" secondary, mt 8px
    - Bouton "Modify Prompt" ghost, mt 4px (reload l'input avec le dernier message)

  [ÉTAT CRÉDITS ÉPUISÉS] :
    - Lors de l'envoi d'un message sans crédit :
    - Modal centré : bg bg-elevated, radius 20px, padding 32px
    - Icône pièce vide (muted), titre "You're out of credits."
    - Texte : "Upgrade to Pro for 50 monthly generations, priority AI, and more."
    - [Upgrade to Pro] primary  +  [Buy Credits] secondary

─── ARCHITECTURE : TEMPLATES + SÉCURITÉ ─────────────────────────────

  APPROCHE TEMPLATE-BASED :
  - L'IA ne génère JAMAIS de HTML from scratch.
  - Chaque projet démarre depuis un template validé (choisi à l'écran 7b).
  - Le template est un fichier HTML/CSS statique vérifié, stocké côté serveur.
  - L'IA reçoit le template actuel + le prompt utilisateur et retourne
    UNIQUEMENT les modifications (pas le fichier entier).
  - Le backend applique les modifications (merge) sur le template
    de manière contrôlée.
  - Avantages :
    • Résultats plus cohérents et de meilleure qualité
    • Surface d'attaque réduite (pas de génération libre)
    • Temps de génération plus rapide (édition vs création)
    • Moins de tokens consommés par l'IA

  PROTECTION CONTRE L'INJECTION DE CODE :
  - Le prompt utilisateur est nettoyé côté backend avant d'être envoyé à l'IA :
    • Suppression de toute balise <script>, <iframe>, <object>, <embed>
    • Suppression des attributs on* (onclick, onerror, etc.)
    • Suppression des URL javascript: et data:
  - La sortie de l'IA est AUSSI sanitisée avant d'être sauvegardée :
    • Whitelist stricte de balises autorisées (div, section, h1-h6, p, a,
      img, ul, ol, li, span, button, nav, header, footer, main, form, input,
      table, thead, tbody, tr, td, th, label, textarea, select, option)
    • Whitelist stricte d'attributs autorisés (class, id, href, src, alt,
      placeholder, type, name, value, style — uniquement propriétés CSS sûres)
    • Aucun JavaScript inline autorisé dans le contenu final
  - L'iframe de preview utilise le mode sandbox :
    • sandbox="allow-same-origin" (PAS allow-scripts en mode preview)
    • Quand l'utilisateur exporte, les scripts du template original
      sont ré-inclus dans le ZIP (ex: animations CSS, scroll effects)
  - Les versions (project_versions) sont stockées comme du contenu texte
    et jamais exécutées côté serveur.
  - Rate limiting : maximum 20 requêtes de génération par heure par user.
```

---

## ⚙️ Écran 9 : Settings

```
URL: /settings
Accès : Connecté

─── LAYOUT ──────────────────────────────────────────────────────────
  - Navbar  : Identique au Dashboard
  - Content : max-width 960px, centré, padding 40px 32px
  - Breadcrumb : "Dashboard / Settings" text-muted 12px, mb 8px
  - Titre page : "Account Settings" Inter 700, 28px, text-primary, mb 32px

─── SIDEBAR NAVIGATION (gauche, w: 220px, fixe) ────────────────────
  - Liste de navigation verticale :
    - "Profile"           icône User       (active par défaut)
    - "Credits & Billing" icône CreditCard
    - "Preferences"       icône Settings
  - Style item :
    - padding 10px 16px, radius 10px, font 14px Inter 500
    - Actif   : bg white/5, text-primary, barre gauche 3px accent-primary
    - Inactif : text-secondary, hover bg white/3
  - Responsive : tabs horizontaux sur mobile au lieu de sidebar

─── SECTION PROFILE ─────────────────────────────────────────────────
  - Card style, padding 32px
  - Avatar :
    - Cercle 80px, centré ou aligné gauche
    - Affiche l'initiale ou la photo
    - Overlay au hover : icône Camera, bg black/50
    - Click → file input pour upload
  - Champ "Full name" : Input pré-rempli
  - Champ "Email" : Input disabled, bg bg-base, text-muted
    (lecture seule, expliqué par tooltip "Email cannot be changed")
  - Bouton "Save Changes" : primary, aligné à droite, mt 24px
  - État : "Saved ✓" message success qui apparaît 3s après sauvegarde

─── SECTION CREDITS & BILLING ──────────────────────────────────────
  - Card style

  En-tête :
  - Grand affichage : "7" Inter 700, 56px, accent-primary
    + "credits remaining" Inter 400, 16px, text-secondary, aligné baseline
  - Barre de progression : h 8px, bg white/5, fill accent-primary, radius full
    Label en dessous : "7 of 10 credits used this month" text-muted 12px

  Historique d'utilisation (table) :
  - Colonnes : Date | Action | Credits | Project
  - Header   : text-muted, 12px, uppercase, tracking wide, border-bottom
  - Lignes   :
    - "Apr 3, 2026" | "Generation" | "-1" (texte danger) | "Restaurant Site"
    - "Apr 2, 2026" | "Generation" | "-1" (texte danger) | "Portfolio v2"
    - "Apr 1, 2026" | "Signup Bonus"| "+3" (texte success) | "—"
  - Style : alternating bg bg-card / bg-base, padding 14px, 13px

  Bouton "Buy More Credits" : primary, mt 24px
  Click → ouvre une modale :
    - Titre : "Get More Credits" Inter 700, 22px
    - 3 cards horizontales :
      1. "10 credits" — "$5"   bouton secondary
      2. "50 credits" — "$19"  bouton secondary
      3. "100 credits"— "$29"  bouton primary, badge "Best Value"
         (badge : bg accent-primary, texte noir, 11px, radius full)
    - Footer modale : "Payments processed securely via Stripe"
      text-muted 12px, icône Lock

─── SECTION PREFERENCES ────────────────────────────────────────────
  - Card style

  Préférences :
  - "Interface Language" → Dropdown : French | English
    Select style : bg bg-input, border border-subtle, radius 10px
  - "Theme" → Toggle switch : Dark (default) / Light
    Switch : 48×24px, bg white/10 off / accent-primary on
    Pastille : 20px cercle blanc, transition slide 200ms
  - Séparateur border-subtle, my 32px

  Danger Zone :
  - Titre : "Danger Zone" Inter 600, 16px, texte danger
  - Section bg danger/5, border danger/20, radius 12px, padding 20px
  - "Delete Account" :
    Texte : "Permanently removes your account, all projects, and all generated pages.
             This action is irreversible."
    text-secondary 13px, mb 12px
    Bouton outline : border danger, texte danger, hover bg danger/10
    Libellé : "Delete my account permanently"
    Click → Modal de confirmation :
      Titre  : "This cannot be undone." Inter 700, 18px
      Texte  : "All your projects, page versions, and account data will be
                permanently deleted. You will not be able to recover them."
      Input  : placeholder  "Type  DELETE  to confirm" — validation manuelle
      Bouton : "Yes, delete everything" — bg danger, texte blanc
              Désactivé tant que l'input ne contient pas exactement «DELETE»
```

---

## 📋 Récapitulatif des Écrans

| #   | Page               | URL                    | Access       | Description                                         |
| --- | ------------------ | ---------------------- | ------------ | --------------------------------------------------- |
| 1   | Landing Page       | `/`                    | Public      | Hero, features, how it works, pricing, social proof   |
| 2   | Login              | `/login`               | Public      | Connexion email/password + Google OAuth               |
| 3   | Signup             | `/signup`              | Public      | Inscription en 60s avec 3 crédits offerts             |
| 4   | Forgot Password    | `/forgot-password`     | Public      | Saisie email pour recevoir un code OTP                |
| 5   | Verify Code        | `/verify-code`         | Public      | Saisie du code OTP 6 chiffres + countdown             |
| 6   | Reset Password     | `/reset-password`      | Public      | Nouveau mot de passe + confirmation + force indicator |
| 7   | Dashboard          | `/dashboard`           | Authentifié | Hub central — stats, grille de projets, accès rapide  |
| 7b  | Template Selection | `/new-project` (modal) | Authentifié | Choix du template de départ avant création            |
| 8   | Builder            | `/builder/:id`         | Authentifié | Chat IA + preview live sandboxé + versioning          |
| 9   | Settings           | `/settings`            | Authentifié | Profil, crédits/historique, préférences, danger zone  |
| 10  | Error Pages        | `/404`, `/403`, `/500` | Public      | Pages d'erreur avec navigation de sortie claire       |

---

## 📱 Notes Responsive

```
BREAKPOINTS :
  - Desktop  : ≥ 1280px (layout complet)
  - Tablet   : 768px–1279px (grilles 2 cols, sidebar collapse)
  - Mobile   : < 768px (stack vertical, hamburger nav)

ADAPTATIONS CLÉS :
  - Navbar        : hamburger menu sur mobile — slide-in panel depuis la droite
  - Dashboard stats : 2 cols tablette, 1 col mobile
  - Project grid  : 2 cols tablette, 1 col mobile
  - Template grid : 2 cols tablette, 1 col mobile (scroll vertical)
  - Builder       : split vertical sur tablette (chat en haut, preview en bas)
                    Sur mobile : tabs pour switcher Chat / Preview
  - Settings      : sidebar fixe → tabs horizontaux sur mobile
  - Auth pages    : carte full-width sur mobile, max-width 420px sinon

SAFE AREAS (mobile) :
  - padding-bottom 16px + env(safe-area-inset-bottom) sur les zones de contenu
  - CTAs principaux : jamais dans les 64px du bas (zone nav native iOS/Android)
  - Toast : coin inférieur droit sur desktop, bas centré sur mobile
```

---

## 🔒 Notes Sécurité

```
ARCHITECTURE TEMPLATE-BASED :
  - L'IA ne génère jamais de HTML from scratch
  - Elle édite un template pré-validé stocké côté serveur
  - Qualité, cohérence et surface d'attaque réduite

SANITISATION DOUBLE :
  1. INPUT  : Nettoyage du prompt avant envoi à l'IA
              (balises, attributs on*, URLs javascript:/data: supprimés)
  2. OUTPUT : Whitelist stricte appliquée sur la réponse IA
              (div, section, h1-h6, p, a, img, ul, ol, li, span, button,
               nav, header, footer, main, form, input, table...)

SANDBOXING :
  - iframe preview : sandbox="allow-same-origin" (aucun script actif)
  - Scripts réintégrés uniquement dans l'export ZIP final

RATE LIMITING :
  - 20 requêtes de génération / heure / utilisateur
  - 1 génération = 1 crédit — hors-crédit : modal d'upgrade

SESSIONS :
  - JWT en httpOnly cookie (jamais localStorage)
  - Durée 7 jours, refresh auto si session active
  - 401 → déconnexion forcée + redirect /login + toast info
```

---

## 🔔 Système de Notifications (Toasts)

```
Emplacement : coin inférieur droit (desktop), bas centré (mobile)
z-index     : 9999
Stack max   : 3 toasts simultanés (plus récent en haut)
Durée auto  : 4s puis slide-out 300ms ease-in
Dismiss     : bouton x, hover met le countdown en pause

TYPES :
  SUCCESS  bg success/10, border success/30, texte success
    "Page generated — version 4 created."
    "ZIP exported and ready to download."
    "Password updated successfully."

  ERROR    bg danger/10, border danger/30, texte danger
    "Generation failed. Please try again."
    "Session expired. Please sign in again."
    "Something went wrong. Our team has been notified."

  WARNING  bg warning/10, border warning/30, texte warning
    "You have 1 credit remaining this month."
    "Auto-save failed — check your connection."

  INFO     bg white/5, border border-subtle, texte text-primary
    "Your page is being generated — this takes ~20 seconds."
    "Changes saved to version history."

STYLE : bg-elevated, backdrop-blur 12px, border 1px (type), radius 14px,
        padding 14px 18px, min-width 300px, max-width 420px,
        Inter 500 14px, shadow 0 8px 24px rgba(0,0,0,0.4)

ANIMATIONS :
  Entrée : translateX(120px→0) + opacity 0→1, 300ms ease-out
  Sortie : translateX(0→120px) + opacity 1→0, 300ms ease-in
  Stack  : les toasts existants translateY(-64px) quand un nouveau arrive
```

---

## 🚫 Écran 10 : Pages d'Erreur

```
Principe : Pages autonomes (pas de Navbar). bg-base, centré, min-h 100vh.
           Logo Lyzard.ai en haut centré cliquable.
           Animation entrée : fadeIn + translateY(16px→0), 500ms ease-out.

404 NOT FOUND
  "404" Inter 800, 140px, accent-primary, opacity 15%
  Icône Globe SVG glitch, 64px, ambre
  Titre  : "Page Not Found"
  Texte  : "The page you're looking for doesn't exist or has been moved."
  CTAs   : [Back to Dashboard] primary + [Go to Homepage] secondary

403 FORBIDDEN
  "403" même style, icône Shield-Off 64px ambre
  Titre  : "Access Denied"
  Texte  : "You don't have permission to view this resource."
  CTA    : [Back to My Dashboard] primary

500 SERVER ERROR
  "500" même style, couleur danger opacity 15%, icône AlertTriangle danger
  Titre  : "Something Went Wrong"
  Texte  : "Our engineers have been notified. Please try again in a moment."
  CTAs   : [Retry] primary + [Report an Issue] secondary
  Lien   : "contact support@lyzard.ai" — accent-primary, 13px, mt 16px
```

---

## ✨ Micro-interactions & Animations — Référence

```
PRINCIPES :
  1. Chaque animation sert un but fonctionnel (feedback, guidage, état)
  2. Durées : 80–150ms feedback immédiat / 200–400ms transitions layout
  3. Easing apparitions : cubic-bezier(0.16,1,0.3,1) (spring out)
     Easing disparitions : ease-in
  4. @media (prefers-reduced-motion: reduce) { animation-duration: 0.01ms !important }

INVENTAIRE :
  Élément                  Propriété              Durée    Easing
  ─────────────────────────────────────────────────────────────────
  Page enter               opacity+translateY     400ms    ease-out
  Card hover               translateY(-2px)       150ms    ease-out
  Button press             scale(0.97)            80ms     ease-in-out
  Button hover glow        box-shadow             200ms    ease-out
  Modal open               opacity+scale(0.96→1)  250ms    spring-out
  Modal close              opacity+scale(1→1.02)  180ms    ease-in
  Dropdown open            opacity+translateY     180ms    ease-out
  Toast in                 translateX(120px→0)    300ms    ease-out
  Toast out                translateX(0→120px)    300ms    ease-in
  Chat message appear      opacity+translateY     250ms    ease-out
  Typing dots              opacity staggered      600ms    ease-in-out loop
  Progress bar             width 0→100%           ~20s     linear
  OTP shake (erreur)       translateX ±5px x3     300ms    ease-in-out
  Spinner                  rotation 360°          2s       linear loop
  Skeleton shimmer         background-position    1.5s     ease loop
  Hero browser frame       perspective+opacity    800ms    ease-out delay:300ms
  Cursor clignotant        opacity 0→1            1s       step-end loop
  Auto-save indicator      opacity 0→1→0          3.6s     ease
  Device preview resize    width                  300ms    ease
  Password strength bars   width                  200ms    ease-out
  Badge shimmer (landing)  background-position    2s       linear loop

SKELETON LOADERS :
  Utilisés : project cards, historique crédits, stats dashboard
  Fond animé : gradient bg-card → bg-elevated → bg-card, bg-size 200%
  Timeout : si chargement > 5s → état erreur + bouton retry

ACCESSIBILITÉ :
  - :focus-visible partout (outline 2px accent-primary, offset 2px)
  - Tab order logique sur chaque page (header → main → footer)
  - aria-label sur boutons icône sans texte visible
  - aria-live="polite" sur la zone messages du chat Builder
  - aria-label="Live website preview" sur l'iframe
  - aria-busy="true" sur le bouton Send pendant la génération
```

---

> **Règle d'or :** Ce document est la **source de vérité unique** pour tous les choix de design.
> Toute déviation doit être documentée et approuvée avant d'être codée.
> Mettre à jour ce fichier en même temps que les changements UI en production.
>
> Maquettes **desktop-first** (≥ 1280px). Responsive intégré dans chaque section.
> Pour le module mobile natif futur, créer `docs/07-maquettes-mobile.md`.

