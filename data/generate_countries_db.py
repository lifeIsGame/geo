#!/usr/bin/python

from pymongo import Connection
import os
import sys
import json
from pprint import pprint

connection = Connection()
db = connection.geo

db.countries.remove()

dirname, filename = os.path.split(os.path.abspath(__file__))

fcountries = open("%s/countries.json" % dirname)
fgeo = open("%s/world.geo.json/countries.geo.json" % dirname)

data_countries = json.load(fcountries)
data_geo = json.load(fgeo)
countries = data_countries["geonames"]
for country in countries:
	for g in data_geo.get("features"):
		if country.get("isoAlpha3") == g.get("id"):
			country["geometry"] = g.get("geometry")
	db.countries.save(country)
