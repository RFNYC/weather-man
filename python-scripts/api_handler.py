# IF YOU'RE TRYING TO UNDERSTAND THIS:
# Honestly the best way to get familiar with the way this code is written you should pull up the endpoint and read that.
# Once you see how their JSON is structured the way I navigate through dictionaries makes a little more sense.

import requests
import json

# Gets earthquake data from the last hour. Includes coordinates.
usgs_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'
usgs_response = requests.get(usgs_url)

# User coordinates goes here... Based on these coordinates a we will navigate NWS' API.
nws_location_url = "https://api.weather.gov/points/40.7685,-73.9822"
nws_location_response = requests.get(nws_location_url)

# print(nws_location_response.status_code)
location_response_json = json.loads(nws_location_response.text)
coordinate_data = location_response_json["properties"]

# Grabs the links hourly forecast as well as information about the zone. Including the NWS id. Ex: NYZ072
forecast_url = coordinate_data["forecast"]
forecast_zone_url = coordinate_data["forecastZone"]

# Converts response object from both links to strings then into JSON dicts for ease of navigation.
forecast_response = requests.get(forecast_url)
forecast_zone_response = requests.get(forecast_zone_url)

forecast = json.loads(forecast_response.text)
forecast_zone = json.loads(forecast_zone_response.text)

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

alert = json.loads(nws_alerts_response.text)
alert_features = alert["features"]

def appendAlert():
    try:
        ui_areas = alert_info["properties"]["areaDesc"]
        ui_severity = alert_info["properties"]["severity"]
        ui_event = alert_info["properties"]["event"]
        ui_sender = alert_info["properties"]["senderName"]
        ui_headline = alert_info["properties"]["headline"]
        ui_alertdesc = alert_info["properties"]["description"]
        ui_instructions = alert_info["properties"]["instruction"]
        ui_header = alert["title"]
    except:
        print("Some error has occured when adding alert information.")

if len(alert_features) > 0:
    alert_info = alert_features[0]
    appendAlert()
else:
    print("Alert information wasn't added.")

# User Interface Info (Everything displayed in the app):
# Location:
ui_area = forecast_zone_info["name"]
ui_state = forecast_zone_info["state"]
ui_daypart = coming_hour["name"]
ui_temperature = coming_hour["temperature"]
ui_unit = coming_hour["temperatureUnit"]
# ui_precipitation coming_hour["probabilityOfPrecipitation"] -- returns dict based on rainfall levels (if any) write function later.
ui_windspeed = coming_hour["windSpeed"]
ui_winddirection = coming_hour["windDirection"]
ui_shortforecast = coming_hour["shortForecast"]
ui_detailedforecast = coming_hour["detailedForecast"]

#----------------------------------------------------------

print(ui_area,ui_state,ui_daypart,ui_temperature,ui_unit,ui_windspeed,ui_winddirection,ui_shortforecast,ui_detailedforecast)
