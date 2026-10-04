#!/bin/bash
cd "$(dirname "$0")"
if ! command -v python3 >/dev/null 2>&1; then
  echo "Necesitas Python 3. macOS te ofrecera instalarlo; acepta y vuelve a abrir este archivo."
  python3 --version
  read -n 1 -s -r -p "Pulsa una tecla para salir"
  exit 1
fi
python3 servidor.py
