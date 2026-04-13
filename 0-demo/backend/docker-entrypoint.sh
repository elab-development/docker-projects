#!/bin/sh
set -e

echo "Running database seed..."
node_modules/.bin/ts-node -r tsconfig-paths/register src/seed.ts

echo "Starting NestJS API..."
exec node dist/main
