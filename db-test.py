from pymongo import MongoClient


db = MongoClient()

for database in db.list_databases():
    print(database)

test_database = db['monitoring']
users = test_database['patients']

# print("Before insert:")
# for collect in test_database.list_collection_names():
#     print(collect)


for x in users.find():
    print(x)

# test_collection.insert_one({"name": "John", "address": "Highway 37"})

# print()
# print("After insert:")
# for x in test_collection.find():
#   print(x)

# test_collection.delete_one({"name" : "John"})

# print()
# print("After delete:")
# for x in test_collection.find():
#   print(x)
