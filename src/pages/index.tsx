import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from 'components/Common/GlobalStyle'
import Footer from 'components/Common/Footer'
import Introduction from 'components/Main/Introduction'
import CategoryList from 'components/Main/CategoryList'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
}
const IndexPage: FunctionComponent = function () {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
      <Footer />
    </Container>
  )
}

export default IndexPage
