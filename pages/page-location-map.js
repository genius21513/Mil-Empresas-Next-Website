import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const render = (status) => {
    return <h1>{status}</h1>;
};


const Map = ({ children, style, ...options }) => {
    const ref = React.useRef();
    const [map, setMap] = React.useState();
    const query = useRouter().query;
    const { address, city, province } = query;
    
    React.useEffect(() => {
        if (ref.current && !map) {            
            const map = new window.google.maps.Map(ref.current, {options});
            setMap(map);
        }
    }, [ref, map]);

    useEffect(() => {
        if (city && map) {
            const request = { query: `${address} ${city} ${province}`, fields: ["name", "geometry"],};
            const service = new google.maps.places.PlacesService(map);
            service.findPlaceFromQuery(
                request,
                (
                    results,
                    status
                ) => {     
                    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                        for (let i = 0; i < results.length; i++) {
                            createMarker(results[i]);
                        }
                        // set focus at the first result
                        map.setCenter(results[0].geometry.location);
                    }
                }
            );
        }
    }, [map, query]);

    function createMarker(place) {        
        if (!place.geometry || !place.geometry.location) return;
        const marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
        });
        
        const infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(place.name || "");
            infowindow.open(map, marker);
        });
    }

    return (
        <>
            <div ref={ref} style={style} />
            {/* {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    // @ts-ignore
                    return React.cloneElement(child, { map });
                }
            })} */}
        </>
    );
};

export default function LocationMap() {
    const zoom = 14;
    return (
        <Wrapper 
            // apiKey={API_KEY}
            render={render}
        >
            <Map
                // center={center}
                zoom={zoom}
                style={{ height: "100vh" }}
            >
                {/* <Marker /> */}
            </Map>
        </Wrapper>
    )
}