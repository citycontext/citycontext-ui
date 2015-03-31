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

all: js css

css: $(CSS_TARGET) $(CSS_STAGING_TARGET)

.PHONY: npm_install
npm_install:
	npm install

$(CSS_TARGET): $(CSS_MAIN)
	$(NODE_BIN)/yuicompressor $< -o $@

$(CSS_MAIN): $(CSS_MAIN_NO_PREFIX) | dist
	$(NODE_BIN)/autoprefixer $< -o $@

.PHONY: $(CSS_MAIN_NO_PREFIX)
$(CSS_MAIN_NO_PREFIX): $(MAIN_LESS) | build
	lessc $< > $@

.PHONY: js
js: clean_js npm_install $(JS_TARGET) $(JS_STAGING_TARGET)

.PHONY: $(JS_TARGET)
$(JS_TARGET): $(BUNDLE_JS) | dist
	$(NODE_BIN)/uglifyjs $< -c '$(UGLIFY_OPTS)' -o $@

.PHONY: $(BUNDLE_JS)
$(BUNDLE_JS): $(MAIN_JS) | build
	$(NODE_BIN)/browserify -s citycontext $< -o $@

build:
	mkdir -p build

dist:
	mkdir -p dist

clean: clean_js
	rm -rf node_modules

clean_js:
	rm -rf dist build
