from pymongo import MongoClient


db = MongoClient()

test_database = db['test_database']
test_collection = test_database["test_collection"]

print("Before insert:")
for x in test_collection.find():
  print(x)

test_collection.insert_one({ "name": "John", "address": "Highway 37" })

print()
print("After insert:")
for x in test_collection.find():
  print(x)

test_collection.delete_one({"name" : "John"})

print()
print("After delete:")
for x in test_collection.find():
  print(x)