#!/usr/bin/env python3
import requests, re, sys, json

TARGET = "http://ilearn.woodford.kyschools.us/classroom"

def get_user_info(username, password):
	params = {"username": username, "password": password}
	req = requests.post(TARGET + "/login/index.php", data=params)

	if req.status_code != 200 or "<div class=\"loginerrors\">" in req.text:
		return False

	# get name from page
	name_match = re.search('title="View profile">(.*?)</a>', req.text)
	name = name_match.group(1) if name_match else "{0} {0}".format(username)
	first_name, last_name = split_name(name)
	
	return {
		"login": username,
		"name": name,
		"first_name": first_name,
		"last_name": last_name
	}

def split_name(name):
	names = name.split(" ")

	first_name = " ".join(names[:len(names) - 1])
	last_name = names[-1]

	return first_name, last_name

if __name__ == "__main__":
	username = sys.argv[1]
	password = sys.stdin.readlines()[0].strip()

	user_info = get_user_info(username, password)

	if user_info:
		print(json.dumps(user_info))
	else:
		print("Unable to login with given credentials.", file=sys.stderr)
		sys.exit(1)
