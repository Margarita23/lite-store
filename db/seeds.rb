# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user = User.create(email: "test@example.com", password: "password1", first_name: "Mag", last_name: "Griffin", role: User.roles[:user])

item_1 = Item.create(name: "First Item", description: "Description of the item", price: 10)
item_2 = Item.create(name: "Second Item", description: "Description of the second item", price: 20)
item_3 = Item.create(name: "Third Item", description: "Description of the third item", price: 30)
