find ~/Documents  \( -iname '*.gql' -o -iname '*.gql' \) -print0 | xargs -0 stat -f '%N '
