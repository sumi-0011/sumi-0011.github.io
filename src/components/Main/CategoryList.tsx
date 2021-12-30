import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

export type CategoryListProps = {
  selectedCategory: string
  categoryList: {
    // 프로퍼티 이름은 문자열, 프로퍼티 값은 숫자임을 나타내는 타입 표기 방법
    [key: string]: number
  }
}
// CategoryItem 컴포넌트에서 사용할 Props
type CategoryItemProps = {
  active: boolean
}
// Link 컴포넌트에 전달해주기 위한 Props
// & 연산자를 통해 Intersection 타입을 정의하여 두 타입을 하나로 합침
type GatsbyLinkProps = {
  children: ReactNode
  className?: string
  to: string
} & CategoryItemProps

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 768px;
  margin: 100px auto 0;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
    padding: 0 20px;
  }
`
// Query Parameter로 받은 category 이름과 동일한 아이템의 폰트를 더 굵게 표시
// active : 현재 선택된 카테고리인지 확인하기 위한 Props
// children : 컴포넌트 내부의 요소들
// className : Styled Component를 통해 정의한 스타일을 적용하기 위한 클래스명
// to : Link 컴포넌트에 전달하기 위한 경로
const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
  <Link {...props} />
))<CategoryItemProps>`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  font-weight: ${({ active }) => (active ? '800' : '400')};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
`
const CategoryList: FunctionComponent<CategoryListProps> = function ({
  selectedCategory,
  categoryList,
}) {
  return (
    <CategoryListWrapper>
      {/* Object.entries() 메서드는 for...in와 같은 순서로 주어진 객체 자체의 enumerable 속성 [key, value] 쌍의 배열을 반환합니다 => 배열을 반환하기 때문에 map메서드를 호출할 수 있다. */}
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem
          to={`/?category=${name}`}
          active={name === selectedCategory}
          key={name}
        >
          #{name}({count})
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  )
}

export default CategoryList
