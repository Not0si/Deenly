
build_dev:
    rm -rf /tmp/notrand/eas-cli-nodejs/*
	rm -rf /tmp/*
	rm -rf /tmp/expo-* /tmp/[0-9a-f]* .expo
	mkdir -p ~/.eas-tmp
	rm -rf ~/.eas-tmp/*
	TMPDIR=$$HOME/.eas-tmp npx expo prebuild --clean
	eas build --platform android --profile development --local


build:
	rm -rf ~/.gradle/caches
	rm -rf android ios
	rm -rf ~/.eas-tmp/*
	rm -rf node_modules
	npm install
	npx expo prebuild --clean
	eas build --platform android --profile preview --local