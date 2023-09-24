#!/bin/sh

set -e # Halts when a command fails
set -u # Halts when using undefined variables
set -o pipefail # Halts when a command in a pipe fails

# Some black magic to make this script executable from any directory
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
PRJ_DIR="$( cd "${SCRIPTS_DIR}/.." && pwd -P )"
PKG_DIR="${PRJ_DIR}/@beautiful-tree/${1}"

if command -v gfind >/dev/null 2>&1; then
	GFIND=gfind;
else
	GFIND=find;
fi

SRC_TS=$(
	"${GFIND}" "${PKG_DIR}" -type f \
	-not -path "${PKG_DIR}/.storybook/*" \
	-not -path "${PKG_DIR}/coverage/*" \
	-not -path "${PKG_DIR}/dist/*" \
	-not -path "${PKG_DIR}/node_modules/*" \
	-not -path "${PKG_DIR}/storybook-static/*" \
	-printf '%T@\n' | sort -n | tail -1
)

DIST_TS=$(("${GFIND}" "${PKG_DIR}/dist" -type f -printf '%T@\n' 2>/dev/null || echo "0") | sort -n | tail -1)

if (exit $(echo "$SRC_TS < $DIST_TS" | bc -l)); then
	cd "${PKG_DIR}" && rm -rf dist && pnpm rollup --config rollup.config.prod.mjs && cd -;
fi
