require 'sinatra'

set :public_folder, Proc.new { File.join(root, "static") }
set :destination, "default"

get '/' do
  erb :index
end

get '/vail' do
  set :destination, "vail"
  erb :mapquest
end

get '/breckinridge' do
  set :destination, "breckinridge"
  erb :mapquest
end

get '/keystone' do
  set :destination, "keystone"
  erb :mapquest
end

get '/winterpark' do
  set :destination, "winterpark"
  erb :mapquest
end

get '/stations' do
  erb :mapquest 
end