require 'sinatra'

get '/' do
  "Hi!"
end

get '/stations' do
  erb :mapquest 
end