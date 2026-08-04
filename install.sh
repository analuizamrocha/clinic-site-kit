#!/usr/bin/env bash
# Install the clinic site kit into a target repo.
#
#   bash install.sh <target-repo-path>
#
# Copies:
#   skills/*      -> <target>/.claude/skills/
#   reference/*   -> <target>/docs/clinic-kit/
#   templates/*   -> <target>/docs/          (never overwrites)
#   CLIENT-BRIEF  -> <target>/docs/client-brief.md  (never overwrites)

set -euo pipefail

TARGET="${1:-}"
KIT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ -z "$TARGET" ]]; then
  echo "usage: bash install.sh <target-repo-path>" >&2
  exit 1
fi
if [[ ! -d "$TARGET" ]]; then
  echo "error: '$TARGET' is not a directory" >&2
  exit 1
fi

TARGET="$(cd "$TARGET" && pwd)"

if [[ "$TARGET" == "$KIT"* ]]; then
  echo "error: refusing to install the kit into itself" >&2
  exit 1
fi

if [[ ! -d "$TARGET/.git" ]]; then
  echo "warning: '$TARGET' is not a git repo — nothing will be version controlled."
  read -r -p "continue? [y/N] " reply
  [[ "$reply" == "y" || "$reply" == "Y" ]] || exit 1
fi

echo "installing clinic-site-kit -> $TARGET"

# --- skills -----------------------------------------------------------------
mkdir -p "$TARGET/.claude/skills"
for skill in "$KIT"/skills/*/; do
  name="$(basename "$skill")"
  dest="$TARGET/.claude/skills/$name"
  if [[ -e "$dest" ]]; then
    echo "  ~ .claude/skills/$name  (exists — replacing)"
    rm -rf "$dest"
  else
    echo "  + .claude/skills/$name"
  fi
  cp -R "$skill" "$dest"
done

# --- reference docs ---------------------------------------------------------
mkdir -p "$TARGET/docs/clinic-kit"
cp -R "$KIT"/reference/. "$TARGET/docs/clinic-kit/"
cp "$KIT/WORKFLOW.md" "$TARGET/docs/clinic-kit/WORKFLOW.md"
cp "$KIT/METAPROMPT.md" "$TARGET/docs/clinic-kit/METAPROMPT.md"
echo "  + docs/clinic-kit/ (PATTERNS, SEO-AEO-PLAYBOOK, WORKFLOW, METAPROMPT, compliance-examples)"

# --- templates: never clobber real work -------------------------------------
copy_if_absent() {
  local src="$1" dest="$2" label="$3"
  if [[ -e "$dest" ]]; then
    echo "  = $label (already exists — left alone)"
  else
    cp "$src" "$dest"
    echo "  + $label"
  fi
}

mkdir -p "$TARGET/docs"
copy_if_absent "$KIT/CLIENT-BRIEF.template.md" "$TARGET/docs/client-brief.md" "docs/client-brief.md"
for tpl in "$KIT"/templates/*.template.md; do
  [[ -e "$tpl" ]] || continue
  base="$(basename "$tpl" .template.md)"
  copy_if_absent "$tpl" "$TARGET/docs/$base.md" "docs/$base.md"
done

cat <<'EOF'

done.

next:
  1. fill  docs/client-brief.md            (every blank is a blocker)
  2. run   /clinic-compliance-research     (before any copy exists)
  3. read  docs/clinic-kit/WORKFLOW.md     (the full sequence)

EOF
