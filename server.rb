require 'sinatra'

set :public_folder, '/static'

get '/' do
  "Hi!"
end

get '/stations' do
  erb :mapquest 
end