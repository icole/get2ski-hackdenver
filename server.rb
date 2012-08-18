require 'sinatra'

set :public_folder, Proc.new { File.join(root, "static") }
set :destination, "blhblahblah"

get '/' do
  erb :locations
  set :destination, params
end

get '/stations' do
  erb :mapquest 
end