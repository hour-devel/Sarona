import React from 'react'
import SettingUserComponent from '../_component/SettingUserComponent'
import {getUserSettingByEmailAction } from '@/action/authAction'
import { getServerSession } from 'next-auth';
import { authOption } from '@/app/api/auth/[...nextauth]/route';

const UserSettingPage = async ({params}) => {
  const getSessionData = await getServerSession(authOption);

  const email = getSessionData?.user?.email
  
  const userSettingData = await getUserSettingByEmailAction(email.replace('@','%40'));
  //console.log("User : ", userSettingData);

  return (
      <SettingUserComponent userSettingData={userSettingData}/>
  )
}
export default UserSettingPage
