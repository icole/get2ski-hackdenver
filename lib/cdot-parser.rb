require 'nokogiri'
require 'rgeo'
require 'rgeo-geojson'
require 'json'

module CDOTParsable
    def generate_weather_stations
        @doc = Nokogiri::XML(File.open("weatherstation.xml"))
        @doc.xpath('//ws:WeatherStation').each do |station|
            lat = station.xpath('ws:Location/global:Latitude').text
            lon = station.xpath('ws:Location/global:Longitude').text
            station_name = station.xpath('ws:Device/global:CommonName').text
            factory = RGeo::Geographic.spherical_factory
            coordinates = factory.point(lon, lat)
            properties = Hash.new
            station.xpath('ws:Camera/camera:CameraView').each do |camera|
                key = camera.xpath('camera:ViewDescription').text + "Image"
                image_location = camera.xpath('camera:ImageLocation').text
                image_location = "http://cotrip.org/" + image_location
                properties[key.to_sym] = image_location
            end
            feature = RGeo::GeoJSON::Feature.new(coordinates, station_name, properties)
            geo_entry = RGeo::GeoJSON.encode(feature)
            File.open("stations.json", "a+") do |file|
                file.puts(geo_entry.to_json)
            end
        end
    end
end