import React, { useEffect, useRef } from 'react'
import logo_1 from "../../assets/logo/TangleThree.png"

const SIZE_MAP = {
  xs: "w-12",     // 48px
  sm: "w-15",     // 80px
  md: "w-28",     // 112px
  lg: "w-36",     // 144px
  xl: "w-44",     // 176px
  xxl: "w-60"     // 240px
}

const Logo = ({ size = "md" }) => {

  return (
    <img
      src={logo_1}
      alt="Logo"
      // Responsive size: mobile/tablet/desktop
      className={`object-contain transition-all
          ${SIZE_MAP[size] || SIZE_MAP['md']}
          sm:${SIZE_MAP['sm']}
          md:${SIZE_MAP['md']}
          lg:${SIZE_MAP['lg']}
          xl:${SIZE_MAP['xl']}
          2xl:${SIZE_MAP['xxl']}
        `}
    />
  )
}

export default Logo
