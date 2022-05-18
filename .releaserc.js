module.exports = {
    repositoryUrl: 'https://github.com/bearkfear/9list-monalista-server',
    branches: ['master'],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/changelog",
        "@semantic-release/npm",
        "@semantic-release/git",
        "@semantic-release/github",
    ]
}