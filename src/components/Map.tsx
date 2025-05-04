import { GoogleMap, LoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: 25.033,
  lng: 121.5654,
}

const Map = () => (
  <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      {/* 可以放 Marker、其他功能 */}
    </GoogleMap>
  </LoadScript>
)

export default Map
