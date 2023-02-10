#!/bin/bash

### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'trybe-publisher' fornecido
## pela Trybe.

[[ $# == 1 ]] && \
[[ $1 == "trybe-security-parameter" ]] && \
git filter-repo \
    --path .trybe \
    --path .github \
    --path .vscode \
    --path trybe.yml \
    --path trybe-filter-repo.sh \
    --path README.md \
    --path __tests__ \
    --path data-testids.md \
    --path db.example.sql \
    --path assets \
    --path jest-puppeteer.config.js \
    --path jest.config.js \
    --path jest-puppeteer.config.js \
    --invert-paths --force --quiet
