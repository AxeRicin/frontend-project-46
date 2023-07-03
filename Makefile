install:
	npm ci

link:
	make install
	npm link

test:
	npx jest --coverage;

test2:
	npx jest

testJson:
	gendiff ./__fixtures__/file1.json ./__fixtures__/file2.json

testYml:
	gendiff ./__fixtures__/file1.yaml ./__fixtures__/file2.yaml

publish:
	npm publish --dry-run

lint:
	npx eslint .