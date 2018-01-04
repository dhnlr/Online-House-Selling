# Online House Selling

:house: This repository contain simple app for sell or see property or house catalog :house:

User who has account can publish advertising for his property/house and guest can see everything about that.

## What's in the box?

* Authenticate and uthorization
* CRUD for property/house
* Searching property
* Beautiful layout

## What's the roadmap?

- [x] ~~Improve search feature~~
- [x] ~~Testing back-end (see problems)~~
- [ ] ~~Nothing~~

## How to run?

#### Server
```
1. npm install
2. npm start
```

#### Client
```
1. npm install
2. npm run dev
```

## I want try this

You can try this at [House](http://house.dhnlr.com)

Demo account
```
username : coba
password : coba
```

*Ps. I don't make sure that link always runs and don't abuse this database or CPU usage*

## How about license?
All my work licensed with AGPL 3.0. All other work belongs to owner with their license.

Ps. Sorry for using image and other work without permission. Please, don't sue me.

## Problem
I have problem with NodeJS in my system. If you know how to fix this error, please message me.
```
/usr/bin/node8[12871]: ../src/node_buffer.cc:210:char* node::Buffer::Data(v8::Local<v8::Value>): Assertion `val->IsArrayBufferView()' failed.
 1: node::Abort() [/usr/bin/node8]
 2: node::Assert(char const* const (*) [4]) [/usr/bin/node8]
 3: 0x5630c86b4b9c [/usr/bin/node8]
 4: node::crypto::Sign::SignUpdate(v8::FunctionCallbackInfo<v8::Value> const&) [/usr/bin/node8]
 5: v8::internal::FunctionCallbackArguments::Call(void (*)(v8::FunctionCallbackInfo<v8::Value> const&)) [/usr/bin/node8]
 6: 0x5630c7efe82f [/usr/bin/node8]
 7: v8::internal::Builtin_HandleApiCall(int, v8::internal::Object**, v8::internal::Isolate*) [/usr/bin/node8]
 8: 0xa89e488463d
 ```
