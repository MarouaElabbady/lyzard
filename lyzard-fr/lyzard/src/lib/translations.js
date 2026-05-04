const translationsObject = {
  fr: {
    nav: {
      generate: "Générer une page",
      howItWorks: "Comment ça marche",
      forWhom: "Pour qui ?",
      templates: "Modèles générés",
      create: "Créer",
      pricing: "Tarifs",
      signIn: "Se connecter",
      signUp: "S'inscrire",
    },
    hero: {
      titlePrefix: "Créez votre prochaine page professionnelle",
      ideas: [
        "SaaS landing page",
        "Page de capture de leads",
        "E-commerce landing page",
        "Site vitrine d'entreprise",
      ],
      banner: "Lyzard construit la page à partir de votre texte",
    },
    footer: {
      tagline: "Lyzard AI fournit l'infrastructure pour concevoir, déployer et faire évoluer des pages de destination à fort taux de conversion instantanément grâce à l'IA générative.",
      subscribe: "S'abonner aux mises à jour",
      emailPlaceholder: "Adresse e-mail",
      ctaTitle: "Construisez votre prochaine landing page.",
      ctaSubtitle: "À la vitesse de la pensée.",
      ctaButton: "Commencer gratuitement",
      contactSales: "Contacter l'équipe",
      status: "Systèmes opérationnels",
      sections: {
        product: "Produit",
        resources: "Ressources",
        company: "Entreprise",
      },
      links: {
        product: [
          { name: "Fonctionnalités" },
          { name: "Modèles", badge: "Nouveau" },
          { name: "Intégrations" },
          { name: "Tarifs" },
          { name: "Changelog" },
          { name: "Entreprise" }
        ],
        resources: ["Guide des Prompts", "Blog", "Centre d'aide", "Communauté"],
        company: ["À propos", "Carrières", "Contact", "Confidentialité", "Conditions"]
      }
    },
    whySection: {
      title: "Pourquoi Lyzard ?",
      subtitle: "Lyzard construit la page directement à partir de votre texte",
      features: [
        { title: "Une landing page en quelques secondes", desc: "Décrivez votre projet, l'IA génère tout pour vous" },
        { title: "Zéro code requis", desc: "Aucune compétence technique nécessaire" },
        { title: "Design professionnel garanti", desc: "Des pages qui convertissent et impressionnent" },
        { title: "Personnalisation totale", desc: "Modifiez chaque détail en un clic" },
        { title: "Publication instantanée", desc: "Votre lien prêt à être partagé en moins d'une minute" },
      ]
    },
    whoIsItFor: {
      title: "C'est pour qui ?",
      subtitle: "Lyzard AI simplifie la création de landing pages pour tous les profils créatifs et professionnels.",
      personas: [
        "Entrepreneurs",
        "Agences Digitales",
        "Freelances",
        "E-commerçants",
        "Tous les Créateurs"
      ]
    },
    pricing: {
      title: "Le plan idéal pour vos projets",
      subtitle: "Rejoignez des milliers de créateurs. Choisissez l'option qui vous convient le mieux.",
      monthly: "Mensuel",
      yearly: "Annuel",
      popular: "Populaire",
      month: "mois",
      year: "an",
      plans: [
        {
          name: "Free",
          desc: "Parfait pour les petites entreprises et les startups qui débutent avec l'IA.",
          button: "Commencer",
          features: [
            "Inclus dans Free :",
            "3 Landing Pages Actives",
            "Génération IA Illimitée",
            "Modèles de Base",
            "Support Standard"
          ]
        },
        {
          name: "Pro",
          desc: "La meilleure valeur pour les entreprises en croissance ayant besoin de fonctionnalités avancées.",
          button: "S'abonner",
          features: [
            "Tout ce qui est dans Free, plus :",
            "Pages Illimitées",
            "Copywriting IA Avancé",
            "SEO Automatique Complet",
            "Intégrations CRM",
            "Support Prioritaire"
          ]
        },
        {
          name: "Pro Max",
          desc: "Plan avancé avec sécurité renforcée et accès illimité pour les grandes équipes.",
          button: "Nous contacter",
          features: [
            "Tout ce qui est dans Pro, plus :",
            "Gestion Multi-projets",
            "Total Marque Blanche",
            "Accès API Illimité",
            "Gestionnaire de compte dédié"
          ]
        }
      ]
    },
    masonry: {
      title: "Nos Créations",
      subtitle: "Découvrez des landing pages exceptionnelles générées instantanément par notre IA.",
      cta: "Générer",
      cardTitles: [
        "Stripe — Paiements SaaS",
        "Webflow — Builder No-Code",
        "Shopify — E-Commerce",
        "Linear — App SaaS",
        "Framer — Landing Builder",
        "Notion — Vitrine Produit",
        "HubSpot — Lead Capture",
        "Figma — Design Tool SaaS",
        "Vercel — Vitrine Pro",
        "Intercom — Page Capture",
        "Mailchimp — Email Marketing",
        "Supabase — Backend SaaS"
      ]
    },
    carousel: {
      tag: "Notre Expertise",
      titlePrefix: "Propulsé par ",
      titleSuffix: "l'Intelligence Artificielle",
      subtitle: "Tout ce dont vous avez besoin pour briller en ligne.",
      cards: [
        {
          title: "LANDING PAGE IA",
          description: "Décrivez votre entreprise en quelques mots. Lyzard génère une page de destination complète et optimisée en moins d'une minute.",
          cta: "Générer ma page"
        },
        {
          title: "COPYWRITING IA",
          description: "Des textes percutants écrits par l'IA : titres, avantages, appels à l'action. Un copywriting de niveau agence sans le coût.",
          cta: "Voir un exemple"
        },
        {
          title: "DESIGN SUR MESURE",
          description: "Des modèles premium ou des designs uniques générés par l'IA. Couleurs, typographie, sections — tout reflète votre identité.",
          cta: "Explorer les designs"
        },
        {
          title: "SEO AUTOMATIQUE",
          description: "Balises méta, structure sémantique, vitesse de chargement, mobile-first — l'optimisation SEO est intégrée dès la génération.",
          cta: "En savoir plus"
        },
        {
          title: "PUBLICATION INSTANTANÉE",
          description: "Un clic pour mettre votre page en ligne. Hébergement rapide inclus, SSL automatique, domaine personnalisé ou sous-domaine Lyzard.",
          cta: "Publier maintenant"
        },
        {
          title: "LEADS & DASHBOARD",
          description: "Formulaires intelligents intégrés, tableau de bord de suivi des visiteurs, conversions et sources de trafic en temps réel.",
          cta: "Voir le dashboard"
        },
        {
          title: "MULTI-LANGUE",
          description: "Lyzard traduit et adapte votre landing page dans n'importe quelle langue. Touchez une audience internationale sans effort.",
          cta: "Découvrir"
        },
        {
          title: "INTÉGRATIONS",
          description: "Connectez votre page à Mailchimp, HubSpot, Stripe, WhatsApp et plus encore. Automatisez votre tunnel de vente de bout en bout.",
          cta: "Voir les intégrations"
        }
      ]
    },
    social: {
      titlePrefix: "Rejoignez",
      titleSuffix: "Lyzard AI",
      subtitle: "Rejoignez notre communauté et restez informé des dernières nouveautés et sorties exclusives."
    },
    auth: {
      signIn: "Se connecter",
      signUp: "S'inscrire",
      email: "E-mail",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      forgotPassword: "Mot de passe oublié",
      noAccount: "Vous n'avez pas de compte ?",
      haveAccount: "Vous avez déjà un compte ?",
      backToHome: "Retour à l'accueil",
      backToLogin: "Retour à la connexion",
      continueWith: "Continuer avec",
      welcomeBack: "Bon retour",
      signInToContinue: "Connectez-vous pour continuer sur Lyzard AI",
      rememberMe: "Se souvenir de moi",
      or: "ou",
      welcomeHome: "Bienvenue chez Nous",
      createPassword: "Créez votre mot de passe",
      passwordLength: "Votre mot de passe doit comporter au moins 6 caractères.",
      oneLastStep: "Dernière étape",
      confirmPasswordToContinue: "Confirmez votre mot de passe pour continuer",
      goBack: "Retour",
      signingUp: "Inscription en cours...",
      onboarding: "Configuration...",
      finalizing: "Finalisation...",
      welcomeAboard: "Bienvenue à bord !",
      tryAgain: "Réessayer",
      getStarted: "C'est parti",
      accountCreated: "Votre compte a été créé.",
      checkEmail: "Vérifiez vos emails",
      checkEmailSent: "Nous avons envoyé un lien de réinitialisation à",
      resetPassword: "Réinitialiser",
      resetPasswordTitle: "Réinitialiser le mot de passe",
      forgotPasswordSub: "Ne vous inquiétez pas, nous vous enverrons des instructions de réinitialisation.",
      enterEmail: "Entrez votre email"
    }
  },
  en: {
    nav: {
      generate: "Generate a Page",
      howItWorks: "How it Works",
      forWhom: "For Whom?",
      templates: "Generated Templates",
      create: "Create",
      pricing: "Pricing",
      signIn: "Sign In",
      signUp: "Sign Up",
    },
    hero: {
      titlePrefix: "Create your next professional",
      ideas: [
        "SaaS landing page",
        "Lead capture page",
        "E-commerce landing page",
        "Business showcase site",
      ],
      banner: "Lyzard builds the page from your text",
    },
    footer: {
      tagline: "Lyzard AI provides the infrastructure to design, deploy, and scale high-converting landing pages instantly using generative AI.",
      subscribe: "Subscribe to product updates",
      emailPlaceholder: "Email address",
      ctaTitle: "Build your next landing page.",
      ctaSubtitle: "At the speed of thought.",
      ctaButton: "Start Building Free",
      contactSales: "Contact Sales",
      status: "All systems operational",
      sections: {
        product: "Product",
        resources: "Resources",
        company: "Company",
      },
      links: {
        product: [
          { name: "Features" },
          { name: "Templates", badge: "New" },
          { name: "Integrations" },
          { name: "Pricing" },
          { name: "Changelog" },
          { name: "Enterprise" }
        ],
        resources: ["Prompt Guide", "Blog", "Help Center", "Community"],
        company: ["About Us", "Careers", "Contact Sales", "Privacy Policy", "Terms of Service"]
      }
    },
    whySection: {
      title: "Why Lyzard?",
      subtitle: "Lyzard builds the page directly from your text",
      features: [
        { title: "A landing page in seconds", desc: "Describe your project, AI generates everything for you" },
        { title: "Zero code required", desc: "No technical skills needed" },
        { title: "Guaranteed professional design", desc: "Pages that convert and impress" },
        { title: "Total customization", desc: "Edit every detail with one click" },
        { title: "Instant online publishing", desc: "Your link ready to share in under a minute" },
      ]
    },
    whoIsItFor: {
      title: "Who is it for?",
      subtitle: "Lyzard AI simplifies landing page creation for all creative and professional profiles.",
      personas: [
        "Entrepreneurs",
        "Digital Agencies",
        "Freelancers",
        "E-commerce Owners",
        "All Creators"
      ]
    },
    pricing: {
      title: "The Ideal Plan for Your Projects",
      subtitle: "Join thousands of creators. Choose the option that fits you best.",
      monthly: "Monthly",
      yearly: "Yearly",
      popular: "Popular",
      month: "month",
      year: "year",
      plans: [
        {
          name: "Free",
          desc: "Perfect for small businesses and startups starting with AI.",
          button: "Get Started",
          features: [
            "Included in Free:",
            "3 Active Landing Pages",
            "Unlimited AI Generation",
            "Basic Templates",
            "Standard Support"
          ]
        },
        {
          name: "Pro",
          desc: "Best value for growing companies needing advanced features.",
          button: "Subscribe",
          features: [
            "Everything in Free, plus:",
            "Unlimited Pages",
            "Advanced AI Copywriting",
            "Full Automatic SEO",
            "CRM Integrations",
            "Priority Support"
          ]
        },
        {
          name: "Pro Max",
          desc: "Advanced plan with enhanced security and unlimited access for large teams.",
          button: "Contact Us",
          features: [
            "Everything in Pro, plus:",
            "Multi-project Management",
            "Total White-label",
            "Unlimited API Access",
            "Dedicated Account Manager"
          ]
        }
      ]
    },
    masonry: {
      title: "Creations",
      subtitle: "Discover exceptional landing pages generated instantly by our AI.",
      cta: "Generate",
      cardTitles: [
        "Stripe — SaaS Payments",
        "Webflow — No-Code Builder",
        "Shopify — E-Commerce",
        "Linear — SaaS App",
        "Framer — Landing Builder",
        "Notion — Product Showcase",
        "HubSpot — Lead Capture",
        "Figma — SaaS Design Tool",
        "Vercel — Pro Showcase",
        "Intercom — Capture Page",
        "Mailchimp — Email Marketing",
        "Supabase — SaaS Backend"
      ]
    },
    carousel: {
      tag: "Our Expertise",
      titlePrefix: "Powered by ",
      titleSuffix: "Artificial Intelligence",
      subtitle: "Everything you need to shine online.",
      cards: [
        {
          title: "AI LANDING PAGE",
          description: "Describe your business in a few words. Lyzard generates a complete, optimized landing page ready to convert in less than a minute.",
          cta: "Generate My Page"
        },
        {
          title: "AI COPYWRITING",
          description: "Powerful AI-written texts — headlines, benefits, calls to action. Agency-level copywriting without the cost.",
          cta: "View Example"
        },
        {
          title: "CUSTOM DESIGN",
          description: "Premium templates or unique AI-generated designs. Colors, typography, sections — everything reflects your brand identity.",
          cta: "Explore Designs"
        },
        {
          title: "AUTOMATIC SEO",
          description: "Meta tags, semantic structure, loading speed, mobile-first — SEO optimization is integrated from generation.",
          cta: "Learn More"
        },
        {
          title: "INSTANT PUBLISHING",
          description: "One click to put your page online. Fast hosting included, automatic SSL, custom domain or Lyzard subdomain.",
          cta: "Publish Now"
        },
        {
          title: "LEADS & DASHBOARD",
          description: "Integrated smart forms, visitor tracking dashboard, conversions and traffic sources in real-time.",
          cta: "View Dashboard"
        },
        {
          title: "MULTI-LANGUAGE",
          description: "Lyzard translates and adapts your landing page into any language. Reach an international audience effortlessly.",
          cta: "Discover"
        },
        {
          title: "INTEGRATIONS",
          description: "Connect your page to Mailchimp, HubSpot, Stripe, WhatsApp and more. Automate your sales funnel end-to-end.",
          cta: "View Integrations"
        }
      ]
    },
    social: {
      titlePrefix: "Join",
      titleSuffix: "Lyzard AI",
      subtitle: "Join our community and stay informed about the latest news and exclusive releases."
    },
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      forgotPassword: "Forgot password",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      backToHome: "Back to Home",
      backToLogin: "Back to Login",
      continueWith: "Continue with",
      welcomeBack: "Welcome Back",
      signInToContinue: "Sign in to continue to Lyzard AI",
      rememberMe: "Remember me",
      or: "or",
      welcomeHome: "Get started with Us",
      createPassword: "Create your password",
      passwordLength: "Your password must be at least 6 characters long.",
      oneLastStep: "One Last Step",
      confirmPasswordToContinue: "Confirm your password to continue",
      goBack: "Go back",
      signingUp: "Signing you up...",
      onboarding: "Onboarding you...",
      finalizing: "Finalizing...",
      welcomeAboard: "Welcome Aboard!",
      tryAgain: "Try Again",
      getStarted: "Get Started",
      accountCreated: "Your account has been created.",
      checkEmail: "Check your email",
      checkEmailSent: "We've sent a password reset link to",
      resetPassword: "Reset Password",
      resetPasswordTitle: "Reset Password",
      forgotPasswordSub: "No worries, we'll send you reset instructions.",
      enterEmail: "Enter your email"
    }
  }
};

export const translations = translationsObject;
