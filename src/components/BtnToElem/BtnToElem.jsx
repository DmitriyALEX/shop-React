import React, { useEffect } from 'react'
import './BtnToElem.css'

const ButtonToElem = () => {
    const [toTopButton, setToTopButton] = React.useState(false);

    useEffect(() => {
       window.addEventListener("scroll", () => {
        if(window.scrollY > 100) {   
            setToTopButton(true)  
        } else {
            setToTopButton(false)
        }
       }) 
    }, [])

    const scrollUp = () => {
        window.scrollTo({    
            top: 0,
            behavior: "smooth"
        })
    }

  return (
    <div>
      {
        toTopButton && (
            <button className="btnToTop"
            onClick={scrollUp}
            >🔝</button> 
        )
      }
    </div>
  )
}

export default ButtonToElem
