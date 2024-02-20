# Del-Docker-Tag

Github actions for deleting the docker image tag of DockerHub

![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)

## Usage

```yml
name: del_docker_tag

on:
  pull_request:
    types: [closed]

concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

jobs:
  build_docker:
    name: Del Docker Tag
    runs-on: ubuntu-latest
    steps:
      - name: Delete docker tag
        id: docker_build
        uses: xhofe/del-docker-tag@main
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
          token: ${{ secrets.DOCKER_TOKEN }}
          tags: pr-${{ github.event.pull_request.number }}
```