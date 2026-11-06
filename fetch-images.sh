#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# Reconstruit la photothèque du site (public/images/).
#
# Les photographies proviennent de Pexels (licence libre, usage commercial
# autorisé, attribution non obligatoire). Elles privilégient les contextes
# africains : chantiers routiers, ouvrages d'art, équipes d'ingénierie.
#
# Ce script télécharge les JPEG sources ; la conversion en WebP (qualité 78,
# largeur max 1400 px) est faite ensuite par `optimize-images.py`.
#
# À n'exécuter que si public/images/ doit être reconstruit.
# -----------------------------------------------------------------------------
set -u
cd "$(dirname "$0")" || exit 1
mkdir -p public/images

dl() { # dl <nom> <id-pexels> <largeur> [slug]
  local name=$1
  local id=$2
  local w=$3
  local slug=${4:-pexels-photo-$id}   # NB : déclaration séparée, $id doit être assigné
  local out="public/images/$name.jpg"
  curl -s --max-time 40 \
    "https://images.pexels.com/photos/$id/$slug.jpeg?auto=compress&cs=tinysrgb&w=$w" -o "$out"
  if file -b "$out" | grep -q JPEG; then echo "ok   $name"; else echo "FAIL $name ($id)"; fi
}

# --- Routes et ouvrages de transport
dl route-01 18812422 1400; dl route-02 8809464 1100;  dl route-03 14005602 1400
dl route-04 28902540 1400; dl route-05 6018646 1200;  dl route-06 30234158 1100
dl route-07 7381783 1400;  dl route-08 7381786 1400;  dl route-09 3150977 1500
dl route-10 9716374 1400;  dl route-11 1579356 1400
# --- Terrassements, rail, hydraulique
dl terrassement-01 13098128 1400; dl terrassement-02 6245621 1400
dl rail-01 981282 1400;           dl hydraulique-01 2699258 1400
# --- Littoral
dl littoral-01 32041595 1100; dl littoral-02 7180632 1200; dl littoral-03 1297790 1400
# --- Environnement et stockage
dl environnement-01 3230538 1400; dl environnement-02 9090142 1400
dl environnement-03 5441305 1400; dl environnement-04 5441310 1100
dl environnement-05 128421 1200
# --- Équipes et ingénieurs
dl equipe-01 5298215 1400;  dl equipe-02 33915172 1200; dl equipe-03 11174197 1200
dl equipe-04 11174202 1000; dl equipe-05 3862371 1200;  dl equipe-06 8960946 1200
dl equipe-07 8487402 1000;  dl equipe-08 8487999 1000;  dl equipe-09 8487722 1000
dl equipe-10 8487786 1000;  dl equipe-11 8486977 1000;  dl equipe-12 11321790 1200
dl equipe-13 15200454 1200; dl equipe-14 19982408 1200; dl equipe-15 3931131 1000
# --- Bureau et réunions
dl bureau-01 30688596 1500; dl bureau-02 30688592 1500
dl bureau-03 30689114 1500; dl bureau-04 30677598 1200
# --- Plans et notes de calcul
dl plans-01 6615235 1200; dl plans-02 34573691 1200; dl plans-03 6614757 1200
dl plans-04 6894105 1200; dl plans-05 6615294 1200
# --- Matériau (armatures)
dl materiau-01 46167 1200 "iron-rods-reinforcing-bars-rods-steel-bars-46167"

echo "=== téléchargement terminé — lancer : python optimize-images.py"
