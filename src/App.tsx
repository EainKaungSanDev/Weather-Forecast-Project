import type { ChangeEvent } from "react"; 

import { useState, useEffect } from "react"; 

import type { Weather } from "./types/weatherInterface"; 

import { WeatherForAll } from "./components/weatherForAll"; 

import "./App.css"

import {MdRefresh} from "react-icons/md"

import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const App = () => { 

const [city, setCity] = useState<string>(""); 

const [weather, setWeather] = useState<Weather | null>(null); 

const [loading, setLoading] = useState<boolean>(false); 

const [dots, setDots] = useState<string>(""); 

const [lastQuery, setLastQuery] = useState<string>("")

const [unit, setUnit] = useState<"metric" | "us">("metric");

const [error, setError] = useState<string>("")

const [position, setPosition] = useState<[number,number] | null>(null)

const searchByCity = () => { 

if (city.trim() === "") return;

 setLastQuery(city);
 weatherInfo(city); 
 
 }; 
   

   const weatherInfo = async (query:string) => {
   setLoading(true)
   setError("")
       try{
           const weatherRes = await fetch(`/api/weather/?query=${encodeURIComponent(query)}&unit=${unit}`)
                      
           const weatherData = await weatherRes.json();    
           
           if(!weatherRes.ok){ 
            
 throw new Error (weatherData.error)
           }      
           setWeather(weatherData.data); 
           
       }catch(error){
          console.log(error)
          if(error instanceof Error){
              setError(error.message)
          }
       }finally{
           setLoading(false)
       }
   }
   
    
     useEffect(() => { 
     if (!loading) { 
     setDots(""); return; 
     } 
    const timer = setInterval(() => { 
     setDots(prev => { 
     if (prev.length >= 3) { 
     return ""; } 
     return prev + "."; 
     }); }, 500); 
     return () => { 
     clearInterval(timer); 
     }; }, [loading]); 
     
     
     useEffect(()=>{
         if(lastQuery)
         weatherInfo(lastQuery)
     },[unit])
     
          
     const MapClick = ({
    setCity,
    setPosition
}: {
    setCity: (value: string) => void;
    setPosition: (value: [number, number] | null) => void;
}) => {

    useMapEvents({
        click: (e) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            setCity(`${lat},${lng}`);
            setPosition([lat, lng]);
        }
    });

    return null;
};

     return ( 
     <>
     
     <header>
          
          <h1>Weather Forecast</h1>

        <div className="search-div">
          
            <input type="text" placeholder="Enter a city or lat, long..." value={city} onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value) } /> 
               
         <button onClick={searchByCity} > 
             Search 
         </button> 
   
         <button onClick={()=>{
     setUnit(unit === "metric"? "us" : "metric")}} >
              Unit
         </button>
                          
               </div> 
     </header>
     
     <main>
         
        <div className="map-div">
   <MapContainer
    center={[16.8409, 96.1735]}
    zoom={13}
    style={{ height: "200px", width: "100%" }} >
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
    />

    <MapClick
        setCity={setCity}
        setPosition={setPosition}
    />

       { position && <Marker position={position} />}
</MapContainer>
           </div>    
           
           <div className="city-coords">
 { lastQuery? (<h3>{lastQuery}</h3>)
                   :
(<h3 style={{ color : "red" }} >
Search for a city or coords!</h3>) }                                     
           </div> 
 
       { loading && (<div> 
                <p>Loading{dots}</p> 
                     </div> 
                    )}
                              
       { error && (<p style={{color : "red"}}>{error}</p>) }
               
          <WeatherForAll weather={weather} unit={unit} />
      
       <div className="refresh-btn">
       
          <button onClick={()=>{ lastQuery && weatherInfo(lastQuery); navigator.vibrate(100)}}><MdRefresh /></button>   
        
        </div>

       </main>

     <footer>
               
     <div className="copyright-div">
             
        <p>© 2026 Unnoadd. All rights reserved.</p>
             
      <p>Data by <a href="https://www.visualcrossing.com" target="_blank" rel="noopener">Visual Crossing Weather</a>
      </p>
      
         </div>
               
     </footer>
   
        </> 
);}; 

export default App;
