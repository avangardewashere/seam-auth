import { useState } from 'react'
 
import './App.css'
import style from "./style.module.scss"
import clsx from 'clsx'
function App() {
  const initData =window.Telegram?.WebApp?.initDataUnsafe
  const {user} = initData
  return (
    <>
      <div className={clsx(style.header)}>
        username:
      </div>
      <div className={clsx(style.body)}>
        {/* <span>{initDataUnsafe}</span> */}
        {user?.first_name}
      </div>
    </>
  )
}

export default App
