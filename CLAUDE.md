# Contexte — Refonte du portfolio d'Alienis

## Qui je suis
- Alienis, étudiant en **BTS SIO option SISR**, **2e année** (rentrée septembre 2026), My Digital School Caen.
- Stage effectué chez **Titan France**.
- Je préfère des explications étape par étape en français, avec le *pourquoi*, pas juste les commandes.

## Le projet
Le site actuel (https://alien61.github.io/Portfolio/) est une **première version** qui n'a pas été mise à jour depuis longtemps. C'est un peu le bazar : il y a des choses à **ajouter**, à **modifier** et à **retirer**. On fait une vraie refonte, pas juste un ajout de pages.

Chaque projet du portfolio doit avoir **sa propre page de procédure** détaillée, accessible depuis sa tuile sur `projets.html`.

## Méthode de travail (à respecter)
1. **Audit d'abord, aucune modification** : lis tout le repo et fais-moi l'inventaire — pages existantes, pages de procédure (`projet-*.html`), liens morts ou en double, tuiles "Procédure à venir", CSS/JS partagés, incohérences.
2. **On décide ensemble** : pour chaque élément existant, je te dis garder / modifier / retirer. Ne supprime rien sans mon accord.
3. **Un gabarit de procédure commun** : pars des pages `projet-*.html` existantes pour définir un modèle unique, que je valide avant de l'appliquer. Structure proposée :
   - Contexte et problématique
   - Objectifs
   - Environnement / prérequis
   - Schéma (si pertinent)
   - Étapes détaillées (commandes + explication du pourquoi)
   - Vérifications / tests
   - Problèmes rencontrés et solutions
   - Compétences du référentiel E5 mobilisées
4. **Un projet à la fois** : pour chaque nouveau projet, créer la page de procédure, ajouter la tuile dans `projets.html`, mettre à jour le tableau E5, et vérifier les compétences / la stack si besoin.
5. **Git propre** : une branche de travail pour la refonte, un commit par projet ou par modification logique. On ne pousse sur la branche publiée qu'après validation.
6. **N'invente rien** : si une info manque (dates, détails, captures), laisse un `TODO` visible et demande-moi.
7. **Portfolio public** : ni mots de passe, ni clés, ni ports NAT exacts, ni IP WAN. Les plans d'adressage internes peuvent rester génériques.

---

## Points déjà repérés sur le site actuel
- "1ère année" sur l'accueil (`year = "1ère année"`) et sur la page parcours → 2e année.
- Tableau E5 : annonce "13 réalisations" alors que 14 projets sont listés ; ne contient pas les nouveaux projets ; lignes "milieu professionnel" vides. Le PDF `synthese-e5-alienis.pdf` sera aussi à régénérer.
- Projet 12 (Portfolio GitHub) pointe vers la même page que le projet 01 (`projet-github-pages.html`).
- Projets 03 (WordPress), 05 (Windows Server + client) et 08 (GPO) : "Procédure à venir".
- Badge "Disponible pour stage / alternance" : me demander s'il est toujours d'actualité.
- Stack de l'accueil (`ls ./stack`) et page compétences : il manque pfSense, Proxmox, Guacamole, MariaDB, filtrage / pare-feu, accès distant.

---

## Nouveaux projets à ajouter (chacun avec sa page de procédure)

### A. Architecture réseau segmentée pfSense (labo `alienis.lan`)
Contexte : projet de formation en autonomie (consignes sans démonstration), sur Proxmox.
- 4 VLANs routés et filtrés par **pfSense CE** : VWEB (serveur web Debian), VBDD (bases de données), VADM (AD + bastion), VUSERS (postes clients). Une passerelle par VLAN.
- Règles inter-VLAN pour les flux AD : DNS 53, Kerberos 88, LDAP 389, SMB 445, RPC 135 + ports dynamiques, NTP 123.
- Règles de sortie Internet par machine (choix documenté : une règle par hôte plutôt que par sous-réseau).
- Documentation : schéma réseau (Mermaid + Excalidraw) réalisé dans Obsidian.
- Lien avec le projet 10 (partie Windows : AD, GPO, DHCP) : à relier, pas à fusionner.

### B. Bastion d'accès distant Apache Guacamole
- Déploiement sur Debian dans VADM (tuto IT-Connect), accès RDP/SSH centralisé via navigateur.
- Compilation depuis les sources, création manuelle du service systemd `guacd`.
- Base **MariaDB externalisée** sur une VM dédiée dans VBDD (séparation des rôles).
- `TODO` : finalisation de l'interface web et des connexions — me demander où j'en suis.

### C. Accès SSH distant sécurisé via NAT pfSense
- Clé ed25519, utilisateur non-root avec sudo, redirections de ports NAT sur le WAN pfSense, option "Block private networks", alias dans `~/.ssh/config`, alternative par rebond (`ssh -J`) via l'hôte Proxmox.
- Accès depuis iPad, PC Windows et Mac.
- Complète le projet 04 (clés SSH) : me demander si on fusionne ou si on garde deux pages.

### D. Fiches incidents (dépannage) — une page par incident ou une page regroupée, à décider
- **Perte réseau d'une VM à chaque reboot** : template Debian cloud-init, configs netplan et systemd-networkd en conflit liées à une ancienne adresse MAC. Solution : désactivation du réseau cloud-init, suppression du netplan, config `systemd-networkd` basée sur le nom d'interface.
- **Résolution DNS externe en échec** : forwarder de l'AD correct, mais règle pfSense sortante ne couvrant pas l'IP de l'AD. Ajout d'une règle dédiée. AD en Server Core (administration via `dnscmd`).
- **Service `guacd` introuvable** : unité systemd absente après compilation. Création du `.service`.
- **Sortie Internet bloquée** : mauvaise destination dans la règle pfSense + `resolv.conf` vide.

### E. Stage chez Titan France
- Automatisations **n8n**, sauvegarde et **PRA** avec **Synology Active Backup for Business**, **segmentation VLAN des caméras**.
- `TODO` : détails, dates, résultats — à me demander. À placer dans les lignes "milieu professionnel" du tableau E5.

### F. Autres réalisations possibles (me demander si je les veux sur le portfolio)
- Application web de traduction de PDF arabes → français (HTML/React, API OpenAI, hébergée sur Netlify, comparatif GPT-4o vs GPT-4o-mini, coût mesuré).
- Switch Cisco CBS220 : cartographie des adresses MAC par port dans Excel.
- Récupération d'accès à une VM Debian (GRUB, montage disque depuis Proxmox, chroot live CD).
