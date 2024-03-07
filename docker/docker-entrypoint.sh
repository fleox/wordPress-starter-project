#!/bin/sh
set -e

# first arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
	set -- supervisord "$@"
fi

if [ "$WORDPRESS_ENV" = "dev" ]; then
    composer install --no-scripts --no-interaction;
fi

exec "$@"
