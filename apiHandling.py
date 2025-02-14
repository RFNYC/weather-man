import requests
import json

# Gets earthquake data from the last hour. Includes coordinates.
usgs_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'
usgs_response = requests.get(usgs_url)

# User coordinates goes here... Based on these coordinates a we will navigate NWS' API.
nws_location_url = "https://api.weather.gov/points/40.7826,-73.9656"
nws_location_response = requests.get(nws_location_url)

# print(nws_location_response.status_code)
location_response_json = json.loads(nws_location_response.text)
coordinate_data = location_response_json["properties"]

# Grabs the links hourly forecast as well as information about the zone. Including the NWS id. Ex: NYZ072
forecast_url = coordinate_data["forecastHourly"]
forecast_zone_url = coordinate_data["forecastZone"]

# Converts response object from both links to strings then into JSON dicts for ease of navigation.
forecast = json.loads(requests.get(forecast_url).text)
forecast_zone = json.loads(requests.get(forecast_zone_url).text)

# Returns an array of dictionaries. Each dictionary has information about the coming hours since the info was generated.
forecast_info = forecast["properties"]
forecast_periods = forecast_info["periods"]
coming_hour = forecast_periods[0]

forecast_zone_info = forecast_zone["properties"]
user_zone = forecast_zone_info["id"]

# Gets weather advisory data for a given zone e.g., Blizzards, Hurricanes, Rainfall etc.
# Needs to be filtered somehow; Far too much data. Consider running script after onboarding.
nws_alerts_url = f"https://api.weather.gov/alerts/active?zone={user_zone}"
nws_alerts_response = requests.get(nws_alerts_url)
print(nws_alerts_response.text)



# User Interface Info (Everything displayed in the app):
# Location:
ui_area = forecast_zone_info["name"]
ui_state = forecast_zone_info["state"]
ui_daypart = coming_hour["name"]
ui_temperature = coming_hour["temperature"]
ui_unit = coming_hour["temperatureUnit"]
# ui_precipitation coming_hour["probabilityOfPrecipitation"] -- returns dict based on rainfall levels (if any) write function later.
ui_windspeed = coming_hour["windSpeed"]



if usgs_response.status_code == 200:
    print("All data successfully retrieved.")
else:
    print("Failed to retrieve data from atleast one API.")

print(usgs_response.headers['content-type'])
# print(geo_response.json())
