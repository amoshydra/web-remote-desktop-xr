#!/bin/bash

echo ""
echo Generating self-sign certs for this application
echo ""

ls /workdir/certs

if [ -f "/workdir/certs/server.key" ]; then
  echo "Certs already exists, skipping"
else
  cd /workdir/certs

  apk update
  apk add openssl

  openssl req -x509 -newkey rsa:4096 -sha256 -days 90 \
    -nodes -keyout server.key -out server.crt \
    -subj "/CN=localhost" \
    \
    -addext "subjectAltName=DNS:localhost,DNS:*.localhost,IP:127.0.0.1,IP:192.168.0.1"

  echo ""
  echo "Cert generated"
fi
