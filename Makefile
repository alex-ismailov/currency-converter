i:
	npm install
dev:
	npx webpack-dev-server --open --config ./build/webpack.dev.conf.js

publish:
	npx webpack --config ./build/webpack.build.conf.js

lint:
	npx eslint --ext .jsx ./src/

lint-fix:
	npx eslint --fix --ext .jsx ./src/

logs:
	git log --oneline --decorate --graph --all
