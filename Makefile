DEFAULT_GOAL: all

CSS_MAIN_NO_PREFIX = build/citycontext-ui-no-prefix.css
CSS_MAIN           = dist/citycontext-ui.css
CSS_TARGET         = dist/citycontext-ui.min.css
LESS_DIR           = less
MAIN_LESS          = $(LESS_DIR)/citycontext-ui.less

NODE_BIN           = $(PWD)/node_modules/.bin
UGLIFY_OPTS        = unused=false,drop_debugger=true,drop_console=true
MAIN_JS            = index.js
BUNDLE_JS          = build/citycontext-ui.js
JS_TARGET          = dist/citycontext-ui.min.js

all: npm_install test js css images

css: $(CSS_TARGET) $(CSS_STAGING_TARGET)

.PHONY: npm_install
npm_install:
	npm install

$(CSS_TARGET): $(CSS_MAIN)
	$(NODE_BIN)/yuicompressor $< -o $@

$(CSS_MAIN): $(CSS_MAIN_NO_PREFIX) | dist
	$(NODE_BIN)/postcss --use autoprefixer -c postcss.json $< -o $@

.PHONY: $(CSS_MAIN_NO_PREFIX)
$(CSS_MAIN_NO_PREFIX): $(MAIN_LESS) | build
	$(NODE_BIN)/lessc $< > $@

.PHONY: js
js: clean_js $(JS_TARGET) $(JS_STAGING_TARGET)

.PHONY: $(JS_TARGET)
$(JS_TARGET): $(BUNDLE_JS) | dist
	$(NODE_BIN)/uglifyjs $< -c '$(UGLIFY_OPTS)' -o $@

.PHONY: $(BUNDLE_JS)
$(BUNDLE_JS): $(MAIN_JS) | build
	$(NODE_BIN)/browserify -s citycontext $< -o $@

.PHONY: images
images:
	rm -rf dist/images
	cp -R images dist/

build:
	mkdir -p build

dist:
	mkdir -p dist

clean: clean_js

clean_js:
	rm -rf dist build

.PHONY: test
test:
	npm test
