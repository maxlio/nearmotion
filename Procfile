web:    bundle exec rails server -p ${PORT:-3000} -e ${RACK_ENV:-production}
worker: bundle exec sidekiq -C config/sidekiq.yml
