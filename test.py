import requests

geo_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'
geo_response = requests.get(geo_url)
test_var = 200
test_var2 = 404

if (geo_response.status_code) == 200:
    print("Data retrived.")
else:
    print("Failed to retrieve data.")

print(geo_response.headers['content-type'])
# print(geo_response.json())
