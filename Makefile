
BIN := node_modules/.bin
# find all stylus files in ./styles (and its subdirectories)
STYLUS = $(wildcard styles/*.styl styles/*/*.styl)
# find all jade files in root
JADE = $(wildcard *.jade)
# optional flags to pass to jade
JADEFLAGS ?= --pretty
# optional flags to pass to stylus
STYLUSFLAGS ?=
# .styl => .css
CSS = $(STYLUS:.styl=.css)
# .jade => .html
HTML = $(JADE:.jade=.html)
# "all" things to build
ALL = $(sort $(CSS) $(HTML))

# "phony"/default target for building everything
all: $(ALL)

# build any .html file from a .jade file with the same name
%.html: %.jade node_modules
	@$(BIN)/jade $(JADEFLAGS) < $< > $@

# build any .css file from a .styl file with the same name
%.css: %.styl node_modules
	@$(BIN)/stylus $(STYLUSFLAGS) < $< > $@

# install node modules
node_modules: package.json
	@npm install
	@touch $@

# remove "built" stuff
clean:
	rm -f $(ALL)

# phony targets
.PHONY: all clean
