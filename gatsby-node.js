const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

// Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {}

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
      },
    },
  })
}
// 저희는 마크다운 데이터에 한해서만 Slug 필드를 추가하고 있습니다.

// 여기서 추가되는 Slug 데이터는 contents 디렉토리 내의 마크다운 파일의 경로와 이름을 통해서 만들어집니다.
// Generate a Slug Each Post Data
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })

    createNodeField({ node, name: 'slug', value: slug })
  }
}
