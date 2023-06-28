install:
	npm ci
	npm link

test:
	npx jest --coverage;

test2:
	gendiff ./__fixtures__/file1.json ./__fixtures__/file2.json

publish:
	npm publish --dry-run

lint:
	npx eslint .