API="${API_ORIGIN:-http://localhost:4741}"
  URL_PATH="/meals"
  curl "${API}${URL_PATH}" \
    --include \
    --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Token token=$TOKEN" \
    --data '{
      "meal": {
        "weekday": "'"${WEEKDAY}"'",
        "mealtype": "'"${MEALTYPE}"'",
        "entree": "'"${ENTREE}"'",
        "side1": "'"${SIDE1}"'",
        "side2": "'"${SIDE2}"'"
      }
    }'
