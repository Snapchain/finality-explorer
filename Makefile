DOCKER ?= $(shell which docker)
GIT_ROOT := $(shell git rev-parse --show-toplevel)

build: npm run build

build-docker:
	$(DOCKER) build \
	--tag snapchain/finality-explorer \
	--build-arg NEXT_PUBLIC_FINALITY_GADGET_API_URL=$$(grep NEXT_PUBLIC_FINALITY_GADGET_API_URL .env | cut -d '=' -f2) \
	--build-arg NEXT_PUBLIC_DISPLAY_TESTING_MESSAGES=$$(grep NEXT_PUBLIC_DISPLAY_TESTING_MESSAGES .env | cut -d '=' -f2) \
	-f Dockerfile \
	$(GIT_ROOT)
.PHONY: build build-docker