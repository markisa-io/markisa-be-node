module.exports = {
	globals: {
		"ts-jest": {
			tsConfig: "tsconfig.json"
		},
		"sharedTestData": {}
	},
	moduleFileExtensions: [
		"ts",
		"js"
	],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest"
    },
    collectCoverageFrom: [
        "**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/dist/**"
      ],
    testEnvironment: "node",
    setupFilesAfterEnv: ['/Users/gelarw/Projects/markisa/markisa-be-node/src/__test__/setup.ts'],
  verbose: true,
  testURL: "http://localhost:3200/",
};
