import requests

usgs_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'
usgs_response = requests.get(usgs_url)

# Needs to be filtered somehow; Far too much data. Consider running script after onboarding.
nws_alerts_url = "https://api.weather.gov/alerts/active?zone=AKZ834"
nws_alerts_response = requests.get(nws_alerts_url)

nws_location_url = "https://api.weather.gov/points/40.851866,-73.914778"
nws_location_response = requests.get(nws_location_url)

print(nws_location_response.status_code)
print(nws_location_response.text)

print(nws_alerts_response.status_code)
# print(nws_alerts_response.text)

if usgs_response.status_code == 200:
    print("All data successfully retrieved.")
else:
    print("Failed to retrieve data from atleast one API.")

print(usgs_response.headers['content-type'])
# print(geo_response.json())
