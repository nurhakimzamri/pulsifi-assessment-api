/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    "moduleFileExtensions": [
        "ts", "tsx", "js", "json"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": ["ts-jest", {
            "tsconfig": "tsconfig.json",
            "isolatedModules": true
        }]
    },
    "testMatch": [
        "**/?(*.)(spec|test).ts?(x)"
    ],
    "testTimeout": 30000,
    "clearMocks": true,
    "collectCoverage": true,
    "collectCoverageFrom": [
        "src/**/*.ts",
        "!**/node_modules/**"
    ],    
    "coverageReporters": ["html", "text", "text-summary", "cobertura"],    
    "coveragePathIgnorePatterns": [
        "node_modules",
        // "build",
        "jest.config.ts",
        "main.ts",
        ".module.ts",
        ".query.ts",
        ".model.ts",
        ".dto.ts",
        ".enum.ts",
        ".repository.ts",
        ".entity.ts",
        "src/logging/*",
        "src/migrations/*",
        "src/app.controller.ts",
        "src/app.service.ts",
        "src/keycloak/keycloak.service.ts",
        "src/mikro-orm.config.ts"
    ],
    "moduleDirectories": [
        "node_modules", "src"
    ],
    "moduleNameMapper": {
        "src/(.*)": "<rootDir>/src/$1"
    }
};
