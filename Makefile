IMAGE_BASE = firefox-extension-base

.PHONY: help
help: ## Need to pass in GITBRANCH and TAG 'make build TAG=# GITBRANCH=test'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) |  \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

################################################################################
# BUILD STEPS
################################################################################

.PHONY: build
build: ## Builds master docker image base
	docker build -t $(IMAGE_BASE):base .

.PHONY: ext
ext:
	rm -rf dist/*
	docker run -it -v $$PWD:/home/node/$(IMAGE_BASE) $(IMAGE_BASE):base yarn build

.PHONY: clean
clean: ## Removes docker images
	@-docker rmi $(IMAGE_BASE):base 2> /dev/null ||:
	@echo "All images cleaned"

################################################################################
#  DEVELOPMENT
################################################################################

.PHONY: shell
shell:
	docker run -it --rm -v $$PWD:/home/node/$(IMAGE_BASE) -e $(IMAGE_BASE):base bash

.PHONY: prettier
prettier:
	docker run -it --rm -v $$PWD:/home/node/$(IMAGE_BASE) -e $(IMAGE_BASE):base yarn prettier

.PHONY: lint
lint:
	docker run -it --rm -v $$PWD:/home/node/$(IMAGE_BASE) -e $(IMAGE_BASE):base yarn lint
