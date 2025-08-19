import 'package:flutter/material.dart';

class Users extends StatefulWidget{
  @override
  State<Users> createState() => _UsersState();
}

class _UsersState extends State<Users> {
  var users = [{'id': 1, 'fullname': 'John Doe', 'IDnumber': 2023760},
    {'id': 2, 'fullname': 'John John', 'IDnumber': 2023761},
    {'id': 3, 'fullname': 'John Boo', 'IDnumber': 2023762},
    {'id': 4, 'fullname': 'John Doo', 'IDnumber': 2023763},
    {'id': 5, 'fullname': 'John Sue', 'IDnumber': 2023764},

  ];

  @override
  Widget build(BuildContext context) {

    return ListView.builder(
        itemCount: users.length,
    itemBuilder: (context, i){
          return ListTile(
            leading: Icon(Icons.account_box),
            title: Text(users[i]['fullname'].toString()),
            subtitle: Text(users[i]['IDnumber'].toString()),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                    onPressed: (){},
                    icon: Icon(Icons.edit)
                ),
                IconButton(
                    onPressed: (){},
                    icon: Icon(Icons.delete)
                ),


              ],
            ),
          );
    }
    );
  }
}
