require 'nokogiri'
require 'rgeo'
require 'rgeo-geojson'
require 'json'

class CDOTParser
    @doc = Nokogiri::XML(File.open("weatherstation.xml"))
    @doc.xpath('//ws:WeatherStation').each do |station|
        lat = station.xpath('ws:Location/global:Latitude').text
        lon = station.xpath('ws:Location/global:Longitude').text
        station_name = station.xpath('ws:Device/global:CommonName').text
        factory = RGeo::Geographic.spherical_factory
        coordinates = factory.point(lon, lat)
        feature = RGeo::GeoJSON::Feature.new(coordinates, station_name)
        geo_entry = RGeo::GeoJSON.encode(feature)
        File.open("stations.json", "a+") do |file|
            file.puts(geo_entry.to_json)
        end
    end
end