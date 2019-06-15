# README
**DB設計**

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|
|email|string|null: false|

### users table Association

- has_many :groups, through: members
- has_many :messages
- has_many :members

## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|

### groups table Association

- has_many :users, through: members
- has_many :messages
- has_many :members

## members table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null :false, foreign_key: true|
|group_id|integer|null :false, foreign_key: true|

### members table Association
- belongs_to :group
- belongs to :user

## messages table
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|null :false, foreign_key: true|
|group_id|integer|null :false, foreign_key: true|

### messages table Association

- belongs_to :user
- belongs_to :group

