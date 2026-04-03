import React from 'react'

import style from './IconButton.module.css'

function IconButton({
    width,
    height,
    icon,
    children,
    color,
    backgroundColor,
    as = "button",
    type = "button",
    ...rest
}){
    const Component = as === "span" ? "span" : "button";
    return (
        <Component
            className={style.button}
                style={{
                    width: width,
                    height: height,
                    backgroundColor: backgroundColor,
                    color: color
                }}
            {...(Component === "button" ? { type } : {})}
            {...rest}
            >
                {icon && <span className={style.icon}>{icon}</span>}
                <span className={style.text}>{children}</span>
            </Component>
    )
}

export default IconButton;