import { useEffect } from "react";
import Mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  useEffect(() => {
    Mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    const map = new Mapbox.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }, []);

  return <div id="map" className="h-56"></div>;
};

export default Map;
