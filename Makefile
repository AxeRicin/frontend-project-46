install:
	npm ci
	npm link

test:
	gendiff /mnt/c/Users/Axel/Desktop/GitHub/frontend-project-46/__fixtures__/file1.json ./__fixtures__/file2.json

publish:
	npm publish --dry-run

lint:
	npx eslint .