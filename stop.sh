echo "Killing existing instance....."
#Kill first
kill -9 `cat webuser-server.pid`
echo "Killed process $(cat webuser-server.pid)"
#Increase open files
#ulimit -n 10032
#Start webuser
#echo "Starting.........."
#sails lift &
#echo $! > webuser-server.pid
echo "Stopped!!!!!!!!! pid=$(cat webuser-server.pid)"
