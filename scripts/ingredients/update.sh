curl --include --request PATCH "http://localhost:4741/ingredients/${ID}" \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "ingredient": {
      "ingredient": "'"${INGREDIENT}"'"
    }
  }'
