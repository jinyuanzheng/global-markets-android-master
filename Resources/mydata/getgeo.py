#!/usr/bin/python
# -*- coding: utf-8 -*-

import sqlite3 as lite
import sys
from pygeocoder import Geocoder

con = None

try:
    con = lite.connect('address.sqlite')
    
    cur = con.cursor()  
    cur2 = con.cursor()  
    cur.execute('SELECT distinct city, state from useacstaff where lat is null')
    
    data = cur.fetchall()
    for row in data:
        print row[0],',',row[1]
        if (row[0] is not None):
        	print 'Updating USEACSTAFF'
        	results = Geocoder.geocode(row[0]+','+row[1])
        	lat = results[0].coordinates[0]
        	lng = results[0].coordinates[1]
        	print lat,lng
        	cur2.execute('Update useacstaff set lat=?, lng=? where city=? and state=?', (lat, lng, row[0], row[1]))
        	
        	print "Number of rows updated: %d" % cur2.rowcount
        	con.commit()
except lite.Error, e:
    
    print "Error %s:" % e.args[0]
    sys.exit(1)
    
finally:
    
    if con:
        con.close()
