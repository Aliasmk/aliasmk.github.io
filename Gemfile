source 'https://rubygems.org'

gem 'jekyll', '~> 3.9'

gem 'github-pages', group: :jekyll_plugins
# Jekyll Plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem 'jekyll-sitemap'
  gem 'jekyll-redirect-from'
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

gem "webrick", "~> 1.7"


