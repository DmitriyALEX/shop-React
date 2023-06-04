import React from 'react'
import './Map.css'

const Maps = () => {
  return (
    <div className="map">
      <div className="map_large">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.0754199198977!2d30.54361281271539!3d50.4396958356232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cfa615e83fed%3A0xcc8783c751b9c7d6!2sButyshiv%20Ln%2C%2012%2C%20Kyiv%2C%2002000!5e0!3m2!1sen!2sua!4v1684760086012!5m2!1sen!2sua"
          title="map_large"
          width="600" 
          height="450" 
          style={{border: "2px solid red"}}
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
     <div className="map_small">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.082449295447!2d30.54710159999999!3d50.43956490000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cfa615e83fed%3A0xcc8783c751b9c7d6!2sButyshiv%20Ln%2C%2012%2C%20Kyiv%2C%2002000!5e0!3m2!1sen!2sua!4v1685283621736!5m2!1sen!2sua"
        title="map_small"
        width="300"
        height="300"
        style={{border: "2px solid red"}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
     </div>
    </div>
  )
}

export default Maps