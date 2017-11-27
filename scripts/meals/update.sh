curl --include --request PATCH "http://localhost:4741/meals/${ID}" \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "meal": {
      "weekday": "'"${WEEKDAY}"'",
      "mealtype": "'"${MEALTYPE}"'",
      "entree": "'"${ENTREE}"'",
      "side1": "'"${SIDE1}"'",
      "side2": "'"${SIDE2}"'"
    }
  }'
