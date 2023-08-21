require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module Sofar
  class Application < Rails::Application
    config.load_defaults 7.0

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "34.125.177.255:3001", "http://localhost:3001"  # CORS access to the API from the React app
        resource "*", headers: :any, methods: [:get, :post, :put, :delete, :options]
      end
    end
  end
end
