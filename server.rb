require 'sinatra'

set :public_folder, Proc.new { File.join(root, "static") }
set :destination, "default"

get '/' do
  erb :index
end

post '/vail' do
  set :destination, ""
  erb :mapquest
end

post '/breck' do
  set :destination, ""
  erb :mapquest
end

post '/keystone' do
  set :destination, ""
  erb :mapquest
end

post '/winterpark' do
  set :destination, ""
  erb :mapquest
end

get '/stations' do
  erb :mapquest 
end