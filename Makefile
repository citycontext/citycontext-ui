DEFAULT_GOAL: all

CSS_TARGET         = dist/citycontext-ui.min.css
LESS_DIR           = less
MAIN_LESS          = $(LESS_DIR)/citycontext-ui.less

NODE_BIN           = $(PWD)/node_modules/.bin
UGLIFY_OPTS        = unused=false,drop_debugger=true,drop_console=true
MAIN_JS            = index.js
BUNDLE_JS          = /tmp/bundle.js
JS_TARGET          = dist/citycontext-ui.min.js

all: js css

css: $(CSS_TARGET) $(CSS_STAGING_TARGET)

.PHONY: npm_install
npm_install:
	npm install

$(CSS_TARGET): /tmp/main-prefixed.css
	$(NODE_BIN)/yuicompressor $< -o $@

/tmp/main-prefixed.css: /tmp/main.css
	$(NODE_BIN)/autoprefixer $< -o $@

.PHONY: /tmp/main.css
/tmp/main.css: $(MAIN_LESS)
	lessc $< > $@

.PHONY: js
js: clean_js npm_install $(JS_TARGET) $(JS_STAGING_TARGET)

.PHONY: $(JS_TARGET)
$(JS_TARGET): $(BUNDLE_JS)
	$(NODE_BIN)/uglifyjs $< -c '$(UGLIFY_OPTS)' -o $@

.PHONY: $(BUNDLE_JS)
$(BUNDLE_JS): $(MAIN_JS)
	$(NODE_BIN)/browserify -s citycontext $< -o $@

clean_js:
	rm -f $(BUNDLE_JS) $(JS_TARGET)
