import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

// 자신이 원하는 프로필 이미지 링크로 설정해주세요.
const PROFILE_IMAGE_LINK =
  'https://user-images.githubusercontent.com/49177223/147726434-dafc480d-ac4d-4ac8-81c8-bfe8a37a0006.png'

const ProfileImageWrapper = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`

const ProfileImage: FunctionComponent = function () {
  return (
    <div>
      <ProfileImageWrapper src={PROFILE_IMAGE_LINK} alt="Profile Image" />
      {console.log(PROFILE_IMAGE_LINK)}
    </div>
  )
}

export default ProfileImage
