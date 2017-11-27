#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sign-in"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo

# josephp joseph  ID=5a00b7f469453334f31f0f14 TOKEN=kCOPPCo5nBP4R9DthiSb+9FDFICpTwGg9HX2nrIQT9w=--EIwlATFgOHvJSjiCqeGMbh4hnGvQvk0ks0CdK2V6ZVY=
# janep janep ID=5a00b86069453334f31f0f16 TOKEN=8xm1qLvCE3x82eAfGu49AZFouZfX0xY53E54+IGyB3U=--iAB8xo0PmrNGfQogXGYVIGPedgoAW9KOVPJED6adIf8=
