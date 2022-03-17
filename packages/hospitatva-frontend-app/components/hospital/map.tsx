import { useEffect } from "react";
import Mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { MapProps } from "../../utils/interfaces/hospital";

const Map = ({ latitude, longitude }: MapProps) => {
  useEffect(() => {
    Mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    const map = new Mapbox.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    new Mapbox.Marker().setLngLat([longitude, latitude]).addTo(map);
  }, []);

  return (
    <div
      id="map"
      className="aspect-[3/4] w-96 rounded-lg border-2 border-patient-accent shadow-sm"
    ></div>
  );
};

export default Map;
