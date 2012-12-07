#!/bin/sh

[ -d dumps ] || mkdir dumps
mongoexport --db geo -h localhost -c countries -o dumps/countries-$(date +"%Y-%m-%d").json
